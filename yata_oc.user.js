// ==UserScript==
// @name         YATA - OC
// @namespace    yata.alwaysdata.net
// @version      0.0.7
// @updateURL    https://raw.githubusercontent.com/TotallyNot/yata-oc/master/yata_oc.user.js
// @description  Display additional member information on the OC page using the YATA API.
// @author       Pyrit [2111649]
// @match        https://www.torn.com/factions.php*
// @grant        GM.xmlHttpRequest
// @connect      yata.alwaysdata.net
// @run-at       document-end
// @icon64       data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMuMTAxbW0iIGhlaWdodD0iOTMuMTAxbW0iIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDkzLjEwMSA5My4xMDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogPGRlZnM+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXJHcmFkaWVudDg2MSIgeDE9IjQwLjQ4MSIgeDI9IjQwLjQ4MSIgeTE9IjkyLjYwNCIgeTI9Ii0uNTI5MTYiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoLjc3NzUxIC43Nzc1MSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBzcHJlYWRNZXRob2Q9InJlcGVhdCI+CiAgIDxzdG9wIHN0b3AtY29sb3I9IiM3NTc1NzUiIG9mZnNldD0iMCIvPgogICA8c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBvZmZzZXQ9IjEiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxmaWx0ZXIgaWQ9ImZpbHRlcjg3MSIgeD0iLS4wMTIiIHk9Ii0uMDEyIiB3aWR0aD0iMS4wMjQiIGhlaWdodD0iMS4wMjQiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CiAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjAuNDU0NTk0MDQiLz4KICA8L2ZpbHRlcj4KIDwvZGVmcz4KIDxwYXRoIGQ9Im05Mi4wMSA0Ni41NWE0NS40NTkgNDUuNDU5IDAgMCAxLTQ1LjQ1OSA0NS40NTkgNDUuNDU5IDQ1LjQ1OSAwIDAgMS00NS40NTktNDUuNDU5IDQ1LjQ1OSA0NS40NTkgMCAwIDEgNDUuNDU5LTQ1LjQ1OSA0NS40NTkgNDUuNDU5IDAgMCAxIDQ1LjQ1OSA0NS40NTl6IiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50ODYxKSIgZmlsdGVyPSJ1cmwoI2ZpbHRlcjg3MSkiIHN0cm9rZT0iIzQ0N2U5YiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuODQ0MSIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz4KIDxnIHRyYW5zZm9ybT0ibWF0cml4KDE5LjQ3OSAwIDAgMTkuNDc5IDIzMDQuMiAtMjU0OS44KSI+CiAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoLjA0NDExNyAwIDAgLjA0NDExNyAtMTEyLjQxIDEyOS42MikiPgogICA8cGF0aCBkPSJtLTc5LjE1NiA4Ni4zNTEgMTcuNTQ4LTM4Ljc1NWgxOC45OTZsLTI3LjY4MyA1NC44MjR2MzEuMTkzaC0xNy42NjR2LTMxLjE5M2wtMjcuNjgzLTU0LjgyNGgxOS4wNTR6IiBmaWxsPSIjNDQ3ZTliIiBzdHJva2U9IiM0MTRjNTEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIzLjk0MjIiIHN0eWxlPSJwYWludC1vcmRlcjptYXJrZXJzIGZpbGwgc3Ryb2tlIi8+CiAgPC9nPgogPC9nPgogPGcgdHJhbnNmb3JtPSJtYXRyaXgoLjQ3NDIgLS44ODc2NiAuODY5NzkgLjQ4MDY0IDAgMCkiIGZpbGw9IiM0MTRjNTEiIHN0cm9rZT0iI2FkYWRhZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9Ii42NTY2OCIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiIGFyaWEtbGFiZWw9IkFUQSI+CiAgPHBhdGggZD0ibS0yNS4yODUgOTYuMDE1aC01LjkyNDNsLTEuMTI2MyAzLjM3ODloLTMuNTkyOWw2LjEwNDUtMTYuMzk5aDMuMTMxMWw2LjEzODMgMTYuMzk5aC0zLjU5Mjl6bS01LjAxMi0yLjczNjloNC4wOTk3bC0yLjA2MTEtNi4xMzgzeiIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz4KICA8cGF0aCBkPSJtLTguMDA4MiA4NS43MzJoLTUuMDIzMnYxMy42NjJoLTMuMzc4OXYtMTMuNjYyaC00Ljk1NTd2LTIuNzM2OWgxMy4zNTh6IiBzdHlsZT0icGFpbnQtb3JkZXI6bWFya2VycyBmaWxsIHN0cm9rZSIvPgogIDxwYXRoIGQ9Im0xLjgzNTUgOTYuMDE1aC01LjkyNDNsLTEuMTI2MyAzLjM3ODloLTMuNTkyOWw2LjEwNDUtMTYuMzk5aDMuMTMxMWw2LjEzODMgMTYuMzk5aC0zLjU5Mjl6bS01LjAxMi0yLjczNjloNC4wOTk3bC0yLjA2MTEtNi4xMzgzeiIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz4KIDwvZz4KPC9zdmc+Cg==
// ==/UserScript==

// {{{ HTML DSL

const apiKey = "";

class HTMLPrimitive {
    constructor(tag, attributes, value) {
        this.tag = tag;
        if (Array.isArray(attributes) || typeof attributes !== "object") {
            [attributes, value] = [undefined, attributes];
        }
        this.attributes = attributes;
        this.value = value;

        if (this.value === undefined) {
            this.valueType = "empty";
        } else if (Array.isArray(this.value)) {
            this.valueType = "children";
        } else {
            this.valueType = "text";
        }
    }

    serialize() {
        let attrString = Object.entries(this.attributes ?? {})
            .map(([name, value]) => `${name}="${value}"`)
            .join(" ");
        if (attrString !== "") {
            attrString = " " + attrString;
        }

        let content;
        switch (this.valueType) {
            case "empty":
                content = "";
                break;
            case "children":
                content = this.value.map((child) => child.serialize()).join("");
                break;
            case "text":
                content = `${this.value}`;
        }

        if (this.tag === "none") {
            return content;
        } else {
            return `<${this.tag}${attrString}>${content}</${this.tag}>`;
        }
    }
}

const createFactory = (tag) => (attributes, value) =>
    new HTMLPrimitive(tag, attributes, value);

const component = (builder) => (attributes, value) => ({
    serialize: () => builder(attributes, value).serialize(),
});

const tags = ["none", "div", "li", "i", "style"];

Object.defineProperties(
    window,
    Object.fromEntries(
        tags.map((tag) => [tag, { value: createFactory(tag), writable: false }])
    )
);

const render = (builder) => builder.serialize();

// }}}

// {{{ styles

document.querySelector("head").insertAdjacentHTML(
    "beforeend",
    render(
        style(
            { type: "text/css" },
            `
.yata-message {
    display: block;
    margin-top: 8px;
}

.yata-nnb {
    text-align: left !important;
    width: 80px;
    display: inline-block;
}

.yata-rank {
    text-align: left !important;
    width: 35px;
    display: inline-block;
}

.yata-ea {
    text-align: left !important;
    width: 40px;
    display: inline-block;
}

.organize-wrap .level {
    width: 57px !important;
}

.plans-list li.member {
    width: 200px !important;
}

.plans-list li.offences {
    width: 80px !important;
}

.plans-list li.stat {
    width: 80px !important;
}

.plans-list .level {
    width: 50px !important;
}

.yata-marker {
    display: none;
}
`
        )
    )
);

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

const map = (transform) => (arg) => {
    if (arg === null || arg === undefined) return arg;
    return transform(arg);
};

// }}}

// {{{ components

const nnbCol = component(({ nnb, rank, ea }) =>
    none([
        li({ class: "yata-nnb" }, [
            none(nnb),
            div({ class: "delimiter-white" }),
        ]),
        li({ class: "yata-rank" }, [
            none(rank),
            div({ class: "delimiter-white" }),
        ]),
        li({ class: "yata-ea" }, [none(ea), div({ class: "delimiter-white" })]),
    ])
);

const yataMessage = component(({ color, message }) =>
    div(
        {
            class: `info-msg-cont border-round yata-message ${color}`,
            id: "yata-oc-message",
        },
        [
            div({ class: "info-msg border-round" }, [
                i({ class: "info-icon" }),
                div({ class: "delimiter" }, [
                    div({ class: "msg right-round" }, `YATA - OC: ${message}`),
                ]),
            ]),
        ]
    )
);

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

// {{{ state listeners

const errorListener = new MemoListener(["error"], ({ error }) => {
    if (error !== undefined) {
        const old = document.getElementById("yata-oc-message");
        if (old) {
            old.parentNode.removeChild(old);
        }
        document
            .querySelector("#faction-main")
            .insertAdjacentHTML(
                "beforebegin",
                render(yataMessage({ message: error, color: "red" }))
            );
    }
});

const ocListListener = new MemoListener(
    ["ocList", "data"],
    ({ ocList, data }) => {
        if (!data || !ocList || ocList.querySelector(".yata-marker") !== null)
            return;
        ocList.insertAdjacentHTML(
            "afterbegin",
            render(div({ class: "yata-marker" }))
        );

        [
            ...ocList.querySelectorAll("ul.details-list ul.title > .level"),
        ].forEach((title) => {
            title.insertAdjacentHTML(
                "afterend",
                render(nnbCol({ nnb: "NNB (YATA)", rank: "rank", ea: "EA" }))
            );
        });

        [...ocList.querySelectorAll("ul.details-list ul.item")].forEach(
            (item) => {
                const userID = item.querySelector("a").href.match(/[0-9]+/)[0];
                item.querySelector(".level").insertAdjacentHTML(
                    "afterend",
                    render(
                        nnbCol({
                            nnb: data.members[userID]?.NNB ?? "-",
                            rank:
                                map((rank) => "#" + rank)(
                                    data.members[userID]?.ce_rank
                                ) ?? "-",
                            ea: data.members[userID]?.equivalent_arsons ?? "-",
                        })
                    )
                );
            }
        );
    }
);

const ocPlannerListener = new MemoListener(
    ["ocPlanner", "data"],
    ({ ocPlanner, data }) => {
        if (
            !data ||
            !ocPlanner ||
            ocPlanner.querySelector(".yata-marker") !== null
        )
            return;
        ocPlanner.insertAdjacentHTML(
            "afterbegin",
            render(div({ class: "yata-marker" }))
        );

        [...ocPlanner.querySelectorAll("ul.title .offences")].forEach(
            (offences) => {
                offences.insertAdjacentHTML(
                    "afterend",
                    render(
                        nnbCol({ nnb: "NNB (YATA)", rank: "rank", ea: "EA" })
                    )
                );
            }
        );

        [
            ...ocPlanner.querySelectorAll(".plans-list ul.item:not(.title)"),
        ].forEach((item) => {
            const userID = item.querySelector("a").href.match(/[0-9]+/)[0];
            item.querySelector(".offences").insertAdjacentHTML(
                "afterend",
                render(
                    nnbCol({
                        nnb: data.members[userID]?.NNB ?? "-",
                        rank:
                            map((rank) => "#" + rank)(
                                data.members[userID]?.ce_rank
                            ) ?? "-",
                        ea: data.members[userID]?.equivalent_arsons ?? "-",
                    })
                )
            );
        });
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
            `https://yata.alwaysdata.net/api/v1/faction/crimes/export/?key=${apiKey}`
        ).then((response) => {
            if (!response.ok) {
                return response
                    .json()
                    .then((json) => reducer({ error: json.error.error }))
                    .catch(() =>
                        reducer({
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
