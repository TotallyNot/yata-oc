// ==UserScript==
// @name         YATA OC
// @namespace    yata.alwaysdata.net
// @version      0.0.2
// @updateURL    https://raw.githubusercontent.com/TotallyNot/yata-oc/master/yata_oc.user.js
// @description  Display additional member information on the OC page using the YATA API.
// @author       Pyrit[2111649]
// @match        https://www.torn.com/factions.php*
// @grant        GM.xmlHttpRequest
// @connect      yata.alwaysdata.net
// @run-at       document-end
// ==/UserScript==

const apiKey = "";

/// {{{ styles

const styles = document.createElement("style");
styles.setAttribute("type", "text/css");
styles.innerHTML = `
.yata-nnb {
    text-align: left;
    width: 100px;
    display: inline-block;
}

.level {
    width: 50px !important;
}
`;

document.querySelector("head").appendChild(styles);
// }}}

// {{{ convenience functions

function gmFetch(url, config) {
    return new Promise((resolve) => {
        GM.xmlHttpRequest({
            url,
            method: config?.method,
            headers: config?.headers,
            data: config?.data,
            onload: (response) =>
                resolve(
                    new Response(response.response, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: Object.fromEntries(
                            response.responseHeaders
                                .split("\n")
                                .filter((header) => header !== "")
                                .map((header) =>
                                    header.split(/: (.+)/).slice(0, 2)
                                )
                        ),
                    })
                ),
        });
    });
}

function render(component) {
    if (component === undefined) {
        return "";
    }

    if (typeof component === "string") {
        return component;
    }

    if (Array.isArray(component)) {
        return component.map(render).join("");
    }

    const classes = component.classes?.join(" ");
    const attributes = Object.entries({
        ...component.attributes,
        class: classes,
    })
        .filter(([_, value]) => value !== undefined)
        .map(([name, value]) => `${name}="${value}"`)
        .join(" ");

    return (
        `<${component.tag} ${attributes}>` +
        `${render(component.children)}` +
        `</${component.tag}>`
    );
}

// }}}

// {{{ state management

let state = {};
const listeners = [];

function reducer(update) {
    state = { ...state, ...update };
    console.debug(state, update);
    listeners.forEach((listener) => listener.handler(state));
}

function shallowCompare(newObj, prevObj) {
    if (Object.keys(newObj).count !== Object.keys(prevObj).count) return false;

    if (Object.keys(newObj).length === 0) return true;

    for (const key in newObj) {
        if (newObj[key] !== prevObj[key]) return false;
    }

    return true;
}

function pick(object, keys) {
    return Object.fromEntries(
        Object.entries(object).filter(([key]) => keys.includes(key))
    );
}

class MemoListener {
    constructor(propKeys, body) {
        this.propKeys = propKeys;
        this.body = body;
    }

    handler(state) {
        const props = pick(state, this.propKeys);

        if (this.prevProps && shallowCompare(props, this.prevProps)) return;

        this.prevProps = props;
        this.body(props);
    }
}

// }}}

// {{{ OC page

const errorListener = new MemoListener(["error"], ({ error }) => {
    if (error !== undefined) {
        updateMessage(error, "red");
    }
});

const ocListListener = new MemoListener(
    ["ocList", "data", "rendering"],
    ({ ocList, data, rendering }) => {
        if (!data || !ocList || rendering) return;

        reducer({ rendering: true });

        [
            ...ocList.querySelectorAll("ul.details-list ul.title > .level"),
        ].forEach((title) => {
            title.insertAdjacentHTML(
                "afterend",
                render({
                    tag: "li",
                    classes: ["yata-nnb"],
                    children: [
                        "NNB (YATA)",
                        {
                            tag: "div",
                            classes: ["delimiter-white"],
                        },
                    ],
                })
            );
        });

        [...ocList.querySelectorAll("ul.details-list ul.item")].forEach(
            (item) => {
                const userID = item.querySelector("a").href.match(/[0-9]+/)[0];
                item.querySelector(".level").insertAdjacentHTML(
                    "afterend",
                    render({
                        tag: "li",
                        classes: ["yata-nnb"],
                        children: [
                            data.members[userID]?.NNB ?? "-",
                            {
                                tag: "div",
                                classes: ["delimiter-white"],
                            },
                        ],
                    })
                );
            }
        );

        reducer({ rendering: true });
    }
);

const ocPlannerListener = new MemoListener(
    ["ocPlanner", "data"],
    ({ ocPlanner, data }) => {
        if (!data || !ocPlanner) return;
        console.log("update oc planner...");
    }
);

const yataListener = new MemoListener(
    ["ocList", "ocPlanner", "data", "fetchingData"],
    (props) => {
        if (
            props.data ||
            props.fetchingData ||
            (!props.ocList && !props.ocPlanner)
        )
            return;

        gmFetch(
            `https://yata.alwaysdata.net/faction/members/crimes/?key=${apiKey}`
        ).then((response) => {
            if (!response.ok) {
                return response
                    .json()
                    .then((json) => reducer({ error: json.error }))
                    .catch(() =>
                        reducer({
                            fetchingData: false,
                            error: `YATA returned HTTP error ${response.status} "${response.state}"`,
                        })
                    );
            } else {
                return response.json().then((json) => reducer({ data: json }));
            }
        });

        reducer({ fetchingData: true });
    }
);

listeners.push(errorListener, ocListListener, ocPlannerListener, yataListener);

//}}}

// {{{ DOM interaction

function updateMessage(message, color) {
    let messageElement = document.querySelector("#yata-oc-message");
    if (messageElement === null) {
        messageElement = document.createElement("div");
        messageElement.id = "yata-oc-message";
        document
            .querySelector("#factions")
            .insertBefore(
                messageElement,
                document.querySelector("#faction-main")
            );
    }

    const component = {
        tag: "div",
        classes: ["info-msg-cont", "border-round", color],
        attributes: {
            style: "display:block;margin-top:8px",
        },
        children: {
            tag: "div",
            classes: ["info-msg border-round"],
            children: [
                {
                    tag: "i",
                    classes: ["info-icon"],
                },
                {
                    tag: "div",
                    classes: ["delimiter"],
                    children: {
                        tag: "div",
                        classes: ["msg", "right-round"],
                        children: {
                            tag: "div",
                            classes: ["ajax-action"],
                            children: `YATA: ${message}`,
                        },
                    },
                },
            ],
        },
    };

    messageElement.innerHTML = render(component);
}

const crimeObserver = new MutationObserver((records) => {
    const factionCrimes = records.filter(
        (record) => record.target.id === "faction-crimes"
    )[0];
    if (factionCrimes === undefined) return;

    const [ocList, ocPlanner] = [...factionCrimes.addedNodes].filter(
        (node) => node.classList?.contains("faction-crimes-wrap") ?? false
    );

    if ((ocList !== undefined, ocPlanner !== undefined))
        reducer({ ocList, ocPlanner });
});

crimeObserver.observe(document.querySelector("#factions"), {
    subtree: true,
    childList: true,
});

// }}}

// vim: fdm=marker
