// ==UserScript==
// @name         YATA OC
// @namespace    yata.alwaysdata.net
// @version      0.0.1
// @updateURL    https://raw.githubusercontent.com/TotallyNot/yata-oc/master/yata_oc.user.js
// @description  Display additional member information on the OC page using the YATA API.
// @author       Pyrit[2111649]
// @match        https://www.torn.com/factions.php*
// @grant        GM.xmlHttpRequest
// @connect      yata.alwaysdata.net
// @run-at       document-end
// ==/UserScript==

const apiKey = "";

// {{{ convenience functions

function gmFetch(url, config) {
    return new Promise((resolve) => {
        GM.xmlHttpRequest({
            url,
            method: config?.method,
            headers: config?.headers,
            body: config?.data,
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

// }}}

// {{{ state management

let state = {};
const listeners = [];

function reducer(action) {
    state = { ...state, ...action };
    listeners.forEach((listener) => listener(state));
}

function shallowCompare(newObj, prevObj) {
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

function memoListener(propKeys, body) {
    return function (state) {
        const props = pick(state, propKeys);

        if (this.prevProps && shallowCompare(props, this.prevProps)) return;

        this.prevProps = props;
        body(props);
    };
}

const errorListener = memoListener(["error"], ({ error }) => {
    if (error !== undefined) {
        updateMessage(error, "red");
    }
});

const ocListListener = memoListener(["ocList", "data"], ({ ocList, data }) => {
    if (!data || !ocList) return;
    console.log("update oc list...");
});

const ocPlannerListener = memoListener(
    ["ocPlanner", "data"],
    ({ ocPlanner, data }) => {
        if (!data || !ocPlanner) return;
        console.log("update oc planner...");
    }
);

const yataListener = memoListener(
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

    messageElement.innerHTML = `
        <div class="info-msg-cont border-round ${color}" style="display:block;margin-top:8px">
            <div class="info-msg border-round">
                <i class="info-icon"></i>
                <div class="delimiter">
                    <div class="msg right-round">
                        <div class="ajax-action">
                            YATA: ${message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
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
