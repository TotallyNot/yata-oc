// ==UserScript==
// @name         YATA - OC
// @namespace    yata.yt
// @version      1.1.4
// @updateURL    https://raw.githubusercontent.com/TotallyNot/yata-oc/master/yata_oc.user.js
// @downloadURL  https://raw.githubusercontent.com/TotallyNot/yata-oc/master/yata_oc.user.js
// @description  Display additional member information on the OC page using the YATA API.
// @author       Pyrit [2111649]
// @match        https://www.torn.com/factions.php*
// @match        https://www.torn.com/preferences.php*
// @grant        GM.xmlHttpRequest
// @grant        GM.setValue
// @grant        GM.getValue
// @connect      yata.yt
// @connect      www.tornstats.com
// @run-at       document-end
// @icon64       data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMzUuNDcgMTM1LjQ3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIHRyYW5zZm9ybT0ibWF0cml4KC45OTkwOSAwIDAgLjk5OTk4IDQuNzk1NmUtNiAtMi4zNTg4ZS03KSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE1IDQ2LjE0NCkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDg4OWUtNiAxLjg1MjEpIj48cmVjdCB4PSItMTE0Ljg4IiB5PSItNDcuOTk2IiB3aWR0aD0iMTM1LjQ3IiBoZWlnaHQ9IjEzNS40NyIgZmlsbD0iI2IzYjNiMyIgc3R5bGU9InBhaW50LW9yZGVyOm5vcm1hbCIvPjxwYXRoIGQ9Im0tMTE0Ljc4LTQ3Ljk5M2gxMzUuMjVzLTEzNC43NSAxMzYuNDYtMTM1LjI1IDEzNS40NmMtMC40OTc3Mi0wLjk5NzAyIDAtMTM1LjQ2IDAtMTM1LjQ2eiIgZmlsbD0iIzQ0N2U5YiIvPjwvZz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yMzU0IDAgMCAxLjI0MjYgLTI2LjMyMSAtMjMuMDY4KSI+PHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoMS4wNiAwIDAgMS4wNTM5IC00LjI5ODYgLTYuODEzMikiIGQ9Im0xMjEuMzggNzUuODAzYTQ1LjQ1OSA0NS40NTkgMCAwIDEtNDUuNDU5IDQ1LjQ1OSA0NS40NTkgNDUuNDU5IDAgMCAxLTQ1LjQ1OS00NS40NTkgNDUuNDU5IDQ1LjQ1OSAwIDAgMSA0NS40NTktNDUuNDU5IDQ1LjQ1OSA0NS40NTkgMCAwIDEgNDUuNDU5IDQ1LjQ1OXoiIGZpbGw9IiMzNjM2MzYiIHN0eWxlPSJwYWludC1vcmRlcjptYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KC45OTI3NCAwIDAgLjk3MzUyIC03LjQxNTIgLTExLjE2NCkiIHN0cm9rZT0iIzM2MzYzNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiBzdHJva2Utd2lkdGg9IjEuNjExOCIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KDEuMjM1NCAwIDAgMS4yNDI2IC0xOC4xOTIgLTEzLjE0NykiIGQ9Im03Ni4wNDggNzUuOCAxNS4wOC0zMy4zMDRoMTYuMzI0bC0yMy43OSA0Ny4xMTN2MjYuODA2aC0xNS4xOHYtMjYuODA2bC0yMy43OS00Ny4xMTNoMTYuMzc0eiIgZmlsbD0iI2IzYjNiMyIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgxLjIzNTQgMCAwIDEuMjQyNiAtMTguMTkyIC0xMy4xNDcpIiBkPSJtNjguNDgzIDg5LjYwOS00LjQxMzQtOC45MjU4YzAuODg0NjYtOC4wMjY0IDEuOTIzOC05LjIxNjggOC40ODk2LTEyLjI4MmwzLjUxODEgNy43NDQzIDQuNzgyMi0xMC4wNTZzNi43NTc2LTIuNTg4IDExLjMzNy04LjQ5MTRjNC4zMzIzLTUuNTg1MyA0LjMyNDktMTUuMzIxIDQuMzI0OS0xNS4zMjFsMTAuOTMxIDAuMjE4NzEtMjMuNzkgNDcuMTEzdjI2LjgwNmgtMTUuMThjMy4zMWUtNCAtOC4wMDQgMC0yNi44MDYgMC0yNi44MDZ6IiBmaWxsPSIjNDQ3ZTliIiBzdHlsZT0icGFpbnQtb3JkZXI6bWFya2VycyBmaWxsIHN0cm9rZSIvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjQwNjggLS4wNTY0NDcgLjA2NDk1OSAxLjMxMDEgLTM5LjM1NyAtMjQuMDY2KSIgZmlsbD0iIzQ0N2U5YiI+PHBhdGggZD0ibTk0Ljk1MiA5NC4yMDQtMi44MDkzIDUuMjU4OCAyLjQwNDggMi42MjM4LTEuNzAzOCAzLjE4OTMtMTEuMzY5LTEzLjMwMSAxLjQ4NDgtMi43Nzk0IDE3LjE3NCAyLjQzMzMtMS43MDM4IDMuMTg5M3ptLTQuNzU3MiAzLjEzMzUgMS45NDQxLTMuNjM5MS02LjMxNjQtMS4xMjA4eiIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz48cGF0aCBkPSJtOTQuMiA3My45MjYtMi4zODIgNC40NTg5IDExLjg4MyA2LjU2NjUtMS42MDIzIDIuOTk5My0xMS44ODMtNi41NjY1LTIuMzUgNC4zOTktMi4zODA1LTEuMzE1NSA2LjMzNDQtMTEuODU3eiIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz48cGF0aCBkPSJtMTA3LjgxIDcwLjEzLTIuODA5MyA1LjI1ODggMi40MDQ4IDIuNjIzOC0xLjcwMzggMy4xODkzLTExLjM2OS0xMy4zMDEgMS40ODQ4LTIuNzc5NCAxNy4xNzQgMi40MzMzLTEuNzAzOCAzLjE4OTN6bS00Ljc1NzIgMy4xMzM1IDEuOTQ0MS0zLjYzOTEtNi4zMTY0LTEuMTIwOHoiIHN0eWxlPSJwYWludC1vcmRlcjptYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PC9nPjwvZz48L3N2Zz4K
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
    content: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMzUuNDcgMTM1LjQ3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIHRyYW5zZm9ybT0ibWF0cml4KC45OTkwOSAwIDAgLjk5OTk4IDQuNzk1NmUtNiAtMi4zNTg4ZS03KSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE1IDQ2LjE0NCkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDg4OWUtNiAxLjg1MjEpIj48cmVjdCB4PSItMTE0Ljg4IiB5PSItNDcuOTk2IiB3aWR0aD0iMTM1LjQ3IiBoZWlnaHQ9IjEzNS40NyIgZmlsbD0iI2IzYjNiMyIgc3R5bGU9InBhaW50LW9yZGVyOm5vcm1hbCIvPjxwYXRoIGQ9Im0tMTE0Ljc4LTQ3Ljk5M2gxMzUuMjVzLTEzNC43NSAxMzYuNDYtMTM1LjI1IDEzNS40NmMtMC40OTc3Mi0wLjk5NzAyIDAtMTM1LjQ2IDAtMTM1LjQ2eiIgZmlsbD0iIzQ0N2U5YiIvPjwvZz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yMzU0IDAgMCAxLjI0MjYgLTI2LjMyMSAtMjMuMDY4KSI+PHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoMS4wNiAwIDAgMS4wNTM5IC00LjI5ODYgLTYuODEzMikiIGQ9Im0xMjEuMzggNzUuODAzYTQ1LjQ1OSA0NS40NTkgMCAwIDEtNDUuNDU5IDQ1LjQ1OSA0NS40NTkgNDUuNDU5IDAgMCAxLTQ1LjQ1OS00NS40NTkgNDUuNDU5IDQ1LjQ1OSAwIDAgMSA0NS40NTktNDUuNDU5IDQ1LjQ1OSA0NS40NTkgMCAwIDEgNDUuNDU5IDQ1LjQ1OXoiIGZpbGw9IiMzNjM2MzYiIHN0eWxlPSJwYWludC1vcmRlcjptYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KC45OTI3NCAwIDAgLjk3MzUyIC03LjQxNTIgLTExLjE2NCkiIHN0cm9rZT0iIzM2MzYzNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiBzdHJva2Utd2lkdGg9IjEuNjExOCIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KDEuMjM1NCAwIDAgMS4yNDI2IC0xOC4xOTIgLTEzLjE0NykiIGQ9Im03Ni4wNDggNzUuOCAxNS4wOC0zMy4zMDRoMTYuMzI0bC0yMy43OSA0Ny4xMTN2MjYuODA2aC0xNS4xOHYtMjYuODA2bC0yMy43OS00Ny4xMTNoMTYuMzc0eiIgZmlsbD0iI2IzYjNiMyIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgxLjIzNTQgMCAwIDEuMjQyNiAtMTguMTkyIC0xMy4xNDcpIiBkPSJtNjguNDgzIDg5LjYwOS00LjQxMzQtOC45MjU4YzAuODg0NjYtOC4wMjY0IDEuOTIzOC05LjIxNjggOC40ODk2LTEyLjI4MmwzLjUxODEgNy43NDQzIDQuNzgyMi0xMC4wNTZzNi43NTc2LTIuNTg4IDExLjMzNy04LjQ5MTRjNC4zMzIzLTUuNTg1MyA0LjMyNDktMTUuMzIxIDQuMzI0OS0xNS4zMjFsMTAuOTMxIDAuMjE4NzEtMjMuNzkgNDcuMTEzdjI2LjgwNmgtMTUuMThjMy4zMWUtNCAtOC4wMDQgMC0yNi44MDYgMC0yNi44MDZ6IiBmaWxsPSIjNDQ3ZTliIiBzdHlsZT0icGFpbnQtb3JkZXI6bWFya2VycyBmaWxsIHN0cm9rZSIvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjQwNjggLS4wNTY0NDcgLjA2NDk1OSAxLjMxMDEgLTM5LjM1NyAtMjQuMDY2KSIgZmlsbD0iIzQ0N2U5YiI+PHBhdGggZD0ibTk0Ljk1MiA5NC4yMDQtMi44MDkzIDUuMjU4OCAyLjQwNDggMi42MjM4LTEuNzAzOCAzLjE4OTMtMTEuMzY5LTEzLjMwMSAxLjQ4NDgtMi43Nzk0IDE3LjE3NCAyLjQzMzMtMS43MDM4IDMuMTg5M3ptLTQuNzU3MiAzLjEzMzUgMS45NDQxLTMuNjM5MS02LjMxNjQtMS4xMjA4eiIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz48cGF0aCBkPSJtOTQuMiA3My45MjYtMi4zODIgNC40NTg5IDExLjg4MyA2LjU2NjUtMS42MDIzIDIuOTk5My0xMS44ODMtNi41NjY1LTIuMzUgNC4zOTktMi4zODA1LTEuMzE1NSA2LjMzNDQtMTEuODU3eiIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz48cGF0aCBkPSJtMTA3LjgxIDcwLjEzLTIuODA5MyA1LjI1ODggMi40MDQ4IDIuNjIzOC0xLjcwMzggMy4xODkzLTExLjM2OS0xMy4zMDEgMS40ODQ4LTIuNzc5NCAxNy4xNzQgMi40MzMzLTEuNzAzOCAzLjE4OTN6bS00Ljc1NzIgMy4xMzM1IDEuOTQ0MS0zLjYzOTEtNi4zMTY0LTEuMTIwOHoiIHN0eWxlPSJwYWludC1vcmRlcjptYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PC9nPjwvZz48L3N2Zz4K');
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
        (member) => `${member.natural_nerve}${member.verified ? "" : "*"} (TS)`,
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
                        prevOrder: undefined,
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
    ["settings", "yata", "ts", "prevOrder", "orderState"],
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
                `https://yata.yt/api/v1/faction/crimes/import/ranking/?key=${apiKey}`,
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
            `https://yata.yt/api/v1/faction/crimes/export/?key=${settings.apiKey}`
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
