// ==UserScript==
// @name         YATA - OC
// @namespace    yata.alwaysdata.net
// @version      1.1.2
// @updateURL    https://raw.githubusercontent.com/TotallyNot/yata-oc/master/yata_oc.user.js
// @downloadURL  https://raw.githubusercontent.com/TotallyNot/yata-oc/master/yata_oc.user.js
// @description  Display additional member information on the OC page using the YATA API.
// @author       Pyrit [2111649]
// @match        https://www.torn.com/factions.php*
// @match        https://www.torn.com/preferences.php*
// @grant        GM.xmlHttpRequest
// @grant        GM.setValue
// @grant        GM.getValue
// @connect      yata.alwaysdata.net
// @connect      www.tornstats.com
// @run-at       document-end
// @icon64       data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMuMTAxbW0iIGhlaWdodD0iOTMuMTAxbW0iIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDkzLjEwMSA5My4xMDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogPGRlZnM+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXJHcmFkaWVudDg2MSIgeDE9IjQwLjQ4MSIgeDI9IjQwLjQ4MSIgeTE9IjkyLjYwNCIgeTI9Ii0uNTI5MTYiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoLjc3NzUxIC43Nzc1MSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBzcHJlYWRNZXRob2Q9InJlcGVhdCI+CiAgIDxzdG9wIHN0b3AtY29sb3I9IiM3NTc1NzUiIG9mZnNldD0iMCIvPgogICA8c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBvZmZzZXQ9IjEiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxmaWx0ZXIgaWQ9ImZpbHRlcjg3MSIgeD0iLS4wMTIiIHk9Ii0uMDEyIiB3aWR0aD0iMS4wMjQiIGhlaWdodD0iMS4wMjQiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CiAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjAuNDU0NTk0MDQiLz4KICA8L2ZpbHRlcj4KIDwvZGVmcz4KIDxwYXRoIGQ9Im05Mi4wMSA0Ni41NWE0NS40NTkgNDUuNDU5IDAgMCAxLTQ1LjQ1OSA0NS40NTkgNDUuNDU5IDQ1LjQ1OSAwIDAgMS00NS40NTktNDUuNDU5IDQ1LjQ1OSA0NS40NTkgMCAwIDEgNDUuNDU5LTQ1LjQ1OSA0NS40NTkgNDUuNDU5IDAgMCAxIDQ1LjQ1OSA0NS40NTl6IiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50ODYxKSIgZmlsdGVyPSJ1cmwoI2ZpbHRlcjg3MSkiIHN0cm9rZT0iIzQ0N2U5YiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuODQ0MSIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz4KIDxnIHRyYW5zZm9ybT0ibWF0cml4KDE5LjQ3OSAwIDAgMTkuNDc5IDIzMDQuMiAtMjU0OS44KSI+CiAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoLjA0NDExNyAwIDAgLjA0NDExNyAtMTEyLjQxIDEyOS42MikiPgogICA8cGF0aCBkPSJtLTc5LjE1NiA4Ni4zNTEgMTcuNTQ4LTM4Ljc1NWgxOC45OTZsLTI3LjY4MyA1NC44MjR2MzEuMTkzaC0xNy42NjR2LTMxLjE5M2wtMjcuNjgzLTU0LjgyNGgxOS4wNTR6IiBmaWxsPSIjNDQ3ZTliIiBzdHJva2U9IiM0MTRjNTEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIzLjk0MjIiIHN0eWxlPSJwYWludC1vcmRlcjptYXJrZXJzIGZpbGwgc3Ryb2tlIi8+CiAgPC9nPgogPC9nPgogPGcgdHJhbnNmb3JtPSJtYXRyaXgoLjQ3NDIgLS44ODc2NiAuODY5NzkgLjQ4MDY0IDAgMCkiIGZpbGw9IiM0MTRjNTEiIHN0cm9rZT0iI2FkYWRhZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9Ii42NTY2OCIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiIGFyaWEtbGFiZWw9IkFUQSI+CiAgPHBhdGggZD0ibS0yNS4yODUgOTYuMDE1aC01LjkyNDNsLTEuMTI2MyAzLjM3ODloLTMuNTkyOWw2LjEwNDUtMTYuMzk5aDMuMTMxMWw2LjEzODMgMTYuMzk5aC0zLjU5Mjl6bS01LjAxMi0yLjczNjloNC4wOTk3bC0yLjA2MTEtNi4xMzgzeiIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz4KICA8cGF0aCBkPSJtLTguMDA4MiA4NS43MzJoLTUuMDIzMnYxMy42NjJoLTMuMzc4OXYtMTMuNjYyaC00Ljk1NTd2LTIuNzM2OWgxMy4zNTh6IiBzdHlsZT0icGFpbnQtb3JkZXI6bWFya2VycyBmaWxsIHN0cm9rZSIvPgogIDxwYXRoIGQ9Im0xLjgzNTUgOTYuMDE1aC01LjkyNDNsLTEuMTI2MyAzLjM3ODloLTMuNTkyOWw2LjEwNDUtMTYuMzk5aDMuMTMxMWw2LjEzODMgMTYuMzk5aC0zLjU5Mjl6bS01LjAxMi0yLjczNjloNC4wOTk3bC0yLjA2MTEtNi4xMzgzeiIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz4KIDwvZz4KPC9zdmc+Cg==
// ==/UserScript==

// {{{ HTML DSL

class HTMLPrimitive {
    constructor(tag, attributes, value) {
        this.tag = tag;
        if (Array.isArray(attributes) || typeof attributes !== "object") {
            [attributes, value] = [{}, attributes];
        }
        this.attributes = attributes;
        this.value = value;
    }

    render() {
        let element = document.createElement(this.tag);

        Object.entries(this.attributes).forEach(([name, value]) => {
            if (name.startsWith("on")) {
                element.addEventListener(
                    name.substring(2).toLowerCase(),
                    value
                );
            } else {
                element.setAttribute(name, value);
            }
        });

        if (Array.isArray(this.value)) {
            this.value.forEach((child) => {
                if (child instanceof HTMLPrimitive) {
                    element.appendChild(child.render());
                } else {
                    element.appendChild(
                        document.createTextNode(child.toString())
                    );
                }
            });
        } else if (this.value !== undefined) {
            element.innerHTML = this.value.toString();
        }

        return element;
    }
}

const createFactory = (tag) => (attributes, value) =>
    new HTMLPrimitive(tag, attributes, value);

function mount(anchor, position, components) {
    if (!Array.isArray(components)) {
        components = [components];
    }
    const [first, ...tail] = components.map((component) => component.render());

    anchor.insertAdjacentElement(position, first);
    tail.reverse().forEach((component) =>
        first.insertAdjacentElement("afterend", component)
    );
}

const tags = [
    "none",
    "div",
    "li",
    "i",
    "style",
    "form",
    "input",
    "button",
    "label",
    "br",
    "h3",
    "p",
    "span",
];

Object.defineProperties(
    window,
    Object.fromEntries(
        tags.map((tag) => [tag, { value: createFactory(tag), writable: false }])
    )
);

// }}}

// {{{ styles

mount(
    document.head,
    "beforeend",
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

#yata-alert-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100010;
}

.yata-box {
    background-color: white;
    border-radius: 5px;
    padding: 5px;
    margin-top: 10px;
    display: flex;
    align-items: center;
}

.yata-box span {
    flex-grow: 1;
}

.yata-alert-box {
    position: absolute;
    left: 50%;
    top: 40%;
    display: inline-block;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 5px;
    margin: 20px;
    width: 300px;
    padding: 15px;
}

.yata-alert-box h3 {
    margin-top: 0;
    margin-bottom: 10px;
}

.yata-alert-box p {
    margin-bottom: 5px;
}

.yata-btn {
    display: inline-block;
    border: 1px solid transparent;
    color: #fff;
    border-radius: 0.25rem;
}

.yata-alert-box .yata-btn {
    margin-right: 7px;
    margin-top: 4px;
}

.yata-btn-primary {
    background-color: #007bff;
}

.yata-btn-secondary {
    background-color: #dc3545;
}

.yata-alert-box input {
    margin-right: 5px;
    vertical-align: text-top;
}

.yata-alert-box label {
    vertical-align: middle;
}

.yata-warning {
    color: red;
}

.yata-reset-btn {
    margin-right: 5px;
}

.yata-row {
    display: flex;
    align-items: center;
    margin: 4px 0 4px 0;
}

.yata-nnb div {
    display: flex;
    align-items: center;
}

.yata-icon {
    content: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMuMTAxbW0iIGhlaWdodD0iOTMuMTAxbW0iIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDkzLjEwMSA5My4xMDEiIHh    tbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogPGRlZnM+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXJHc    mFkaWVudDg2MSIgeDE9IjQwLjQ4MSIgeDI9IjQwLjQ4MSIgeTE9IjkyLjYwNCIgeTI9Ii0uNTI5MTYiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoLjc3NzUxIC43Nzc1MSkiIGdyYWRpZW50VW5    pdHM9InVzZXJTcGFjZU9uVXNlIiBzcHJlYWRNZXRob2Q9InJlcGVhdCI+CiAgIDxzdG9wIHN0b3AtY29sb3I9IiM3NTc1NzUiIG9mZnNldD0iMCIvPgogICA8c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBvZ    mZzZXQ9IjEiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxmaWx0ZXIgaWQ9ImZpbHRlcjg3MSIgeD0iLS4wMTIiIHk9Ii0uMDEyIiB3aWR0aD0iMS4wMjQiIGhlaWdodD0iMS4wMjQiIGNvbG9yLWludGV    ycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CiAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjAuNDU0NTk0MDQiLz4KICA8L2ZpbHRlcj4KIDwvZGVmcz4KIDxwYXRoIGQ9Im05Mi4wMSA0Ni41N    WE0NS40NTkgNDUuNDU5IDAgMCAxLTQ1LjQ1OSA0NS40NTkgNDUuNDU5IDQ1LjQ1OSAwIDAgMS00NS40NTktNDUuNDU5IDQ1LjQ1OSA0NS40NTkgMCAwIDEgNDUuNDU5LTQ1LjQ1OSA0NS40NTkgNDUuNDU    5IDAgMCAxIDQ1LjQ1OSA0NS40NTl6IiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50ODYxKSIgZmlsdGVyPSJ1cmwoI2ZpbHRlcjg3MSkiIHN0cm9rZT0iIzQ0N2U5YiIgc3Ryb2tlLWxpbmVjYXA9InJvd    W5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuODQ0MSIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz4KIDxnIHRyYW5zZm9ybT0ibWF0cml4KDE    5LjQ3OSAwIDAgMTkuNDc5IDIzMDQuMiAtMjU0OS44KSI+CiAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoLjA0NDExNyAwIDAgLjA0NDExNyAtMTEyLjQxIDEyOS42MikiPgogICA8cGF0aCBkPSJtLTc5LjE1N    iA4Ni4zNTEgMTcuNTQ4LTM4Ljc1NWgxOC45OTZsLTI3LjY4MyA1NC44MjR2MzEuMTkzaC0xNy42NjR2LTMxLjE5M2wtMjcuNjgzLTU0LjgyNGgxOS4wNTR6IiBmaWxsPSIjNDQ3ZTliIiBzdHJva2U9IiM    0MTRjNTEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIzLjk0MjIiIHN0eWxlPSJwYWludC1vcmRlcjptYXJrZXJzIGZpbGwgc3Ryb2tlI    i8+CiAgPC9nPgogPC9nPgogPGcgdHJhbnNmb3JtPSJtYXRyaXgoLjQ3NDIgLS44ODc2NiAuODY5NzkgLjQ4MDY0IDAgMCkiIGZpbGw9IiM0MTRjNTEiIHN0cm9rZT0iI2FkYWRhZCIgc3Ryb2tlLWxpbmV    jYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9Ii42NTY2OCIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiIGFyaWEtbGFiZWw9IkFUQSI+C    iAgPHBhdGggZD0ibS0yNS4yODUgOTYuMDE1aC01LjkyNDNsLTEuMTI2MyAzLjM3ODloLTMuNTkyOWw2LjEwNDUtMTYuMzk5aDMuMTMxMWw2LjEzODMgMTYuMzk5aC0zLjU5Mjl6bS01LjAxMi0yLjczNjl    oNC4wOTk3bC0yLjA2MTEtNi4xMzgzeiIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz4KICA8cGF0aCBkPSJtLTguMDA4MiA4NS43MzJoLTUuMDIzMnYxMy42NjJoLTMuMzc4O    XYtMTMuNjYyaC00Ljk1NTd2LTIuNzM2OWgxMy4zNTh6IiBzdHlsZT0icGFpbnQtb3JkZXI6bWFya2VycyBmaWxsIHN0cm9rZSIvPgogIDxwYXRoIGQ9Im0xLjgzNTUgOTYuMDE1aC01LjkyNDNsLTEuMTI    2MyAzLjM3ODloLTMuNTkyOWw2LjEwNDUtMTYuMzk5aDMuMTMxMWw2LjEzODMgMTYuMzk5aC0zLjU5Mjl6bS01LjAxMi0yLjczNjloNC4wOTk3bC0yLjA2MTEtNi4xMzgzeiIgc3R5bGU9InBhaW50LW9yZ    GVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz4KIDwvZz4KPC9zdmc+Cg==');
    width: 18px;
    height: 18px;
    margin: -8px 0 -5px 10px;
}
`
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
            data: config?.body,
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

const map = (transform, alt) => (arg) => {
    if (arg === null || arg === undefined) return alt;
    return transform(arg);
};

function mergeData(yata, ts) {
    const mapKeys = map(({ members }) => Object.keys(members), []);
    const uids = new Set([...mapKeys(yata?.data), ...mapKeys(ts?.data)]);

    const mapYATAnnb = map((nnb) => div([nnb, i({ class: "yata-icon" })]));
    const mapTSnnb = map(
        (member) => `${member.natural_nerve}${member.verified ? "" : "*"}`,
        "-"
    );

    return new Map(
        [...uids].map((userID) => [
            userID,
            {
                nnb:
                    mapYATAnnb(yata?.data.members[userID]?.NNB) ??
                    mapTSnnb(ts?.data.members[userID]),
                rank: yata?.data.members[userID]?.ce_rank ?? "-",
                ea: yata?.data.members[userID]?.equivalent_arsons ?? "-",
            },
        ])
    );
}

// }}}

// {{{ state management

let state = {
    pathname: location.pathname,
    settings: {
        state: "fresh",
    },
};

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

// {{{ components

const nnbCol = ({ nnb, rank, ea }) => [
    li({ class: "yata-nnb" }, [nnb, div({ class: "delimiter-white" })]),
    li({ class: "yata-rank" }, [rank, div({ class: "delimiter-white" })]),
    li({ class: "yata-ea" }, [ea, div({ class: "delimiter-white" })]),
];

const yataMessage = ({ color, message }) =>
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
    );

const apiKeyAlert = ({ apiKey }) =>
    div({ id: "yata-alert-container" }, [
        div({ class: "yata-alert-box" }, [
            h3("YATA - OC"),
            p("Select which sources to use to power the script:"),
            form(
                {
                    id: "yata-sources",
                    onSubmit: (event) => {
                        const yata = event.target.elements.yata.checked;
                        const ts = event.target.elements.ts.checked;
                        reducer({
                            settings: {
                                state: "selected",
                                apiKey,
                                yata,
                                ts,
                            },
                        });
                        event.preventDefault();
                    },
                },
                [
                    div({ class: "yata-row" }, [
                        label({ for: "yata" }, [
                            input({
                                type: "checkbox",
                                name: "yata",
                                checked: true,
                            }),
                            "YATA",
                        ]),
                    ]),
                    div({ class: "yata-row" }, [
                        label({ for: "ts" }, [
                            input({ type: "checkbox", name: "ts" }),
                            "TornStats",
                        ]),
                    ]),
                ]
            ),
            p([
                span({ class: "yata-warning" }, "WARNING:"),
                " this will share your API key with the selected sites in order to authorize requests sent to them.",
            ]),
            div({ class: "yata-row" }, [
                button(
                    {
                        class: "yata-btn yata-btn-secondary",
                        onClick: () =>
                            reducer({
                                settings: {
                                    state: "selected",
                                    yata: false,
                                    ts: false,
                                },
                            }),
                    },
                    "cancel"
                ),
                button(
                    {
                        class: "yata-btn yata-btn-primary",
                        type: "submit",
                        form: "yata-sources",
                    },
                    "confirm"
                ),
            ]),
        ]),
    ]);

const apiPrefs = () =>
    div({ class: "yata-box" }, [
        span("YATA - OC"),
        button(
            {
                class: "yata-btn yata-btn-secondary yata-reset-btn",
                onClick: () =>
                    reducer({
                        settings: { state: "fresh" },
                        yata: undefined,
                        ts: undefined,
                        orderState: undefined,
                    }),
            },
            "reset"
        ),
    ]);

// }}}

// {{{ cache

GM.getValue("state").then((value) => {
    const frozen = value ? JSON.parse(value) : {};
    frozen.hydrated = true;
    reducer(frozen);
});

const cacheListener = new MemoListener(
    ["settings", "yata", "ts", "prevOrder"],
    (partial) => GM.setValue("state", JSON.stringify(partial))
);

listeners.push(cacheListener);

// }}}

// {{{ OC page

const errorListener = new MemoListener(["error"], ({ error }) => {
    if (error !== undefined) {
        const old = document.getElementById("yata-oc-message");
        if (old) {
            old.parentNode.removeChild(old);
        }

        mount(
            document.querySelector("#faction-main"),
            "beforebegin",
            yataMessage({ message: error, color: "red" })
        );
    }
});

const ocListListener = new MemoListener(
    ["ocList", "yata", "ts"],
    ({ ocList, yata, ts }) => {
        if (
            (!yata && !ts) ||
            !ocList ||
            ocList.querySelector(".yata-marker") !== null
        )
            return;
        mount(ocList, "afterbegin", div({ class: "yata-marker" }));

        [
            ...ocList.querySelectorAll("ul.details-list ul.title > .level"),
        ].forEach((title) => {
            mount(
                title,
                "afterend",
                nnbCol({ nnb: "NNB", rank: "rank", ea: "EA" })
            );
        });

        const data = mergeData(yata, ts);
        [...ocList.querySelectorAll("ul.details-list ul.item")].forEach(
            (item) => {
                const userID = item.querySelector("a").href.match(/[0-9]+/)[0];
                mount(
                    item.querySelector(".level"),
                    "afterend",
                    nnbCol(data.get(userID) ?? { nnb: "-", rank: "-", ea: "-" })
                );
            }
        );
    }
);

const ocPlannerListener = new MemoListener(
    ["ocPlanner", "yata", "ts"],
    ({ ocPlanner, yata, ts }) => {
        if (
            (!yata && !ts) ||
            !ocPlanner ||
            ocPlanner.querySelector(".yata-marker") !== null
        )
            return;
        mount(ocPlanner, "afterbegin", div({ class: "yata-marker" }));

        [...ocPlanner.querySelectorAll("ul.title .offences")].forEach(
            (offences) => {
                mount(
                    offences,
                    "afterend",
                    nnbCol({ nnb: "NNB", rank: "rank", ea: "EA" })
                );
            }
        );

        const data = mergeData(yata, ts);
        [
            ...ocPlanner.querySelectorAll(".plans-list ul.item:not(.title)"),
        ].forEach((item) => {
            const userID = item.querySelector("a").href.match(/[0-9]+/)[0];
            mount(
                item.querySelector(".offences"),
                "afterend",
                nnbCol(data.get(userID) ?? { nnb: "-", rank: "-", ea: "-" })
            );
        });
    }
);

const orderListener = new MemoListener(
    ["ocPlanner", "prevOrder", "settings"],
    ({ ocPlanner, prevOrder, settings: { yata, apiKey } }) => {
        if (!ocPlanner || !yata) return;

        const plans = ocPlanner.querySelector(".plans-wrap");
        const userIDs = [
            ...plans.querySelectorAll("ul.item:not(.title) a"),
        ].map((name) => parseInt(name.href.match(/[0-9]+/)[0]));

        console.log(userIDs);

        if (
            userIDs.length === 0 ||
            (prevOrder &&
                userIDs.length == prevOrder.length &&
                userIDs.every((id, index) => id === prevOrder[index]))
        ) {
            reducer({ orderState: "pulled" });
        } else {
            reducer({ orderState: "pushing", prevOrder: userIDs });
            gmFetch(
                `https://yata.alwaysdata.net/api/v1/faction/crimes/import/ranking/?key=${apiKey}`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ sub_ranking: userIDs }),
                }
            ).then((response) => {
                if (response.ok) {
                    reducer({ orderState: "pushed" });
                } else {
                    response
                        .json()
                        .then((json) => reducer({ error: json.error.error }))
                        .catch(() =>
                            reducer({
                                error: `YATA returned HTTP error ${response.status} "${response.state}"`,
                            })
                        );
                }
            });
        }
    }
);

const redirectListener = new MemoListener(
    ["hydrated", "settings", "pathname"],
    ({ hydrated, settings, pathname }) => {
        if (
            hydrated &&
            pathname !== "/preferences.php" &&
            settings.state === "fresh" &&
            confirm(
                "The YATA - OC userscript isn't linked to your account yet. Do you want to do that now?"
            )
        ) {
            location.href = "https://www.torn.com/preferences.php#tab=api";
        }
    }
);

listeners.push(
    errorListener,
    ocListListener,
    ocPlannerListener,
    orderListener,
    redirectListener
);

//}}}

// {{{ pref page

const prefListener = new MemoListener(["apiKey"], ({ apiKey }) => {
    if (apiKey) {
        mount(
            document.querySelector(".preferences-wrap"),
            "afterend",
            apiPrefs()
        );
    }
});

const modalListener = new MemoListener(
    ["apiKey", "settings"],
    ({ apiKey, settings }) => {
        if (apiKey && settings.state === "fresh") {
            mount(document.body, "afterbegin", apiKeyAlert({ apiKey }));
        } else {
            map((container) => container.parentNode.removeChild(container))(
                document.getElementById("yata-alert-container")
            );
        }
    }
);

listeners.push(modalListener, prefListener);

// }}}

// {{{ DOM interaction

const crimeObserver = new MutationObserver((records) => {
    const factionCrimes = records.filter(
        (record) => record.target.id === "faction-crimes"
    )[0];
    if (factionCrimes === undefined) return;

    const [ocList, ocPlanner] = [...factionCrimes.addedNodes].filter(
        (node) => node.classList?.contains("faction-crimes-wrap") ?? false
    );

    if (ocList !== undefined || ocPlanner !== undefined)
        reducer({ ocList, ocPlanner });
});

const observerListener = new MemoListener(["pathname"], ({ pathname }) => {
    if (pathname === "/factions.php") {
        crimeObserver.observe(document.getElementById("factions"), {
            subtree: true,
            childList: true,
        });
    } else if (pathname === "/preferences.php") {
        const oldFetch = fetch;
        unsafeWindow.fetch = function () {
            if (arguments[0].indexOf("ajax=getApiData") === -1) {
                return oldFetch.apply(this, arguments);
            }

            return new Promise((resolve, reject) =>
                oldFetch
                    .apply(this, arguments)
                    .then((response) => {
                        resolve(response.clone());
                        response
                            .json()
                            .then((json) => reducer({ apiKey: json.apiKey }));
                    })
                    .catch(reject)
            );
        };
    } else {
        crimeObserver.disconnect();
    }
});

listeners.push(observerListener);

// }}}

// {{{ APIs

const yataListener = new MemoListener(
    ["orderState", "yata", "error", "settings"],
    ({ orderState, yata, error, settings }) => {
        if (
            !settings.yata ||
            error ||
            (orderState && ["pushing", "pulling"].includes(orderState)) ||
            (yata?.timestamp &&
                orderState === "pulled" &&
                Date.now() - yata.timestamp < 3600000)
        )
            return;

        gmFetch(
            `https://yata.alwaysdata.net/api/v1/faction/crimes/export/?key=${settings.apiKey}`
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
                return response.json().then((json) =>
                    reducer({
                        yata: { data: json, timestamp: Date.now() },
                        orderState: "pulled",
                    })
                );
            }
        });
        reducer({ orderState: "pulling" });
    }
);

const tsListener = new MemoListener(
    ["ts", "error", "settings"],
    ({ ts, error, settings }) => {
        if (
            !settings.ts ||
            error ||
            (ts?.timestamp && Date.now() - ts.timestamp < 3600000)
        )
            return;

        gmFetch(
            `https://www.tornstats.com/api.php?action=crimes&key=${settings.apiKey}`
        ).then((response) => {
            if (!response.ok) {
                return response
                    .json()
                    .then((json) => reducer({ error: json.error.error }))
                    .catch(() =>
                        reducer({
                            error: `TornStats returned HTTP error ${response.status} "${response.state}"`,
                        })
                    );
            } else {
                return response.json().then((json) =>
                    reducer({
                        ts: { data: json, timestamp: Date.now() },
                    })
                );
            }
        });
    }
);

listeners.push(yataListener, tsListener);

// }}}

// vim: fdm=marker
