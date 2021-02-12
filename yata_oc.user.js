// ==UserScript==
// @name         YATA - OC
// @namespace    yata.yt
// @version      2.1.1
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
// @require      https://unpkg.com/rxjs@6.6.3/bundles/rxjs.umd.min.js#sha256=5b57748e6106387c0c1ecc830f7ade320585f5c709efa1e13584e423e21c37fe
// @run-at       document-end
// @icon64       data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMzUuNDcgMTM1LjQ3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIHRyYW5zZm9ybT0ibWF0cml4KC45OTkwOSAwIDAgLjk5OTk4IDQuNzk1NmUtNiAtMi4zNTg4ZS03KSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE1IDQ2LjE0NCkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDg4OWUtNiAxLjg1MjEpIj48cmVjdCB4PSItMTE0Ljg4IiB5PSItNDcuOTk2IiB3aWR0aD0iMTM1LjQ3IiBoZWlnaHQ9IjEzNS40NyIgZmlsbD0iI2IzYjNiMyIgc3R5bGU9InBhaW50LW9yZGVyOm5vcm1hbCIvPjxwYXRoIGQ9Im0tMTE0Ljc4LTQ3Ljk5M2gxMzUuMjVzLTEzNC43NSAxMzYuNDYtMTM1LjI1IDEzNS40NmMtMC40OTc3Mi0wLjk5NzAyIDAtMTM1LjQ2IDAtMTM1LjQ2eiIgZmlsbD0iIzQ0N2U5YiIvPjwvZz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yMzU0IDAgMCAxLjI0MjYgLTI2LjMyMSAtMjMuMDY4KSI+PHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoMS4wNiAwIDAgMS4wNTM5IC00LjI5ODYgLTYuODEzMikiIGQ9Im0xMjEuMzggNzUuODAzYTQ1LjQ1OSA0NS40NTkgMCAwIDEtNDUuNDU5IDQ1LjQ1OSA0NS40NTkgNDUuNDU5IDAgMCAxLTQ1LjQ1OS00NS40NTkgNDUuNDU5IDQ1LjQ1OSAwIDAgMSA0NS40NTktNDUuNDU5IDQ1LjQ1OSA0NS40NTkgMCAwIDEgNDUuNDU5IDQ1LjQ1OXoiIGZpbGw9IiMzNjM2MzYiIHN0eWxlPSJwYWludC1vcmRlcjptYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KC45OTI3NCAwIDAgLjk3MzUyIC03LjQxNTIgLTExLjE2NCkiIHN0cm9rZT0iIzM2MzYzNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiBzdHJva2Utd2lkdGg9IjEuNjExOCIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KDEuMjM1NCAwIDAgMS4yNDI2IC0xOC4xOTIgLTEzLjE0NykiIGQ9Im03Ni4wNDggNzUuOCAxNS4wOC0zMy4zMDRoMTYuMzI0bC0yMy43OSA0Ny4xMTN2MjYuODA2aC0xNS4xOHYtMjYuODA2bC0yMy43OS00Ny4xMTNoMTYuMzc0eiIgZmlsbD0iI2IzYjNiMyIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz48cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgxLjIzNTQgMCAwIDEuMjQyNiAtMTguMTkyIC0xMy4xNDcpIiBkPSJtNjguNDgzIDg5LjYwOS00LjQxMzQtOC45MjU4YzAuODg0NjYtOC4wMjY0IDEuOTIzOC05LjIxNjggOC40ODk2LTEyLjI4MmwzLjUxODEgNy43NDQzIDQuNzgyMi0xMC4wNTZzNi43NTc2LTIuNTg4IDExLjMzNy04LjQ5MTRjNC4zMzIzLTUuNTg1MyA0LjMyNDktMTUuMzIxIDQuMzI0OS0xNS4zMjFsMTAuOTMxIDAuMjE4NzEtMjMuNzkgNDcuMTEzdjI2LjgwNmgtMTUuMThjMy4zMWUtNCAtOC4wMDQgMC0yNi44MDYgMC0yNi44MDZ6IiBmaWxsPSIjNDQ3ZTliIiBzdHlsZT0icGFpbnQtb3JkZXI6bWFya2VycyBmaWxsIHN0cm9rZSIvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjQwNjggLS4wNTY0NDcgLjA2NDk1OSAxLjMxMDEgLTM5LjM1NyAtMjQuMDY2KSIgZmlsbD0iIzQ0N2U5YiI+PHBhdGggZD0ibTk0Ljk1MiA5NC4yMDQtMi44MDkzIDUuMjU4OCAyLjQwNDggMi42MjM4LTEuNzAzOCAzLjE4OTMtMTEuMzY5LTEzLjMwMSAxLjQ4NDgtMi43Nzk0IDE3LjE3NCAyLjQzMzMtMS43MDM4IDMuMTg5M3ptLTQuNzU3MiAzLjEzMzUgMS45NDQxLTMuNjM5MS02LjMxNjQtMS4xMjA4eiIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz48cGF0aCBkPSJtOTQuMiA3My45MjYtMi4zODIgNC40NTg5IDExLjg4MyA2LjU2NjUtMS42MDIzIDIuOTk5My0xMS44ODMtNi41NjY1LTIuMzUgNC4zOTktMi4zODA1LTEuMzE1NSA2LjMzNDQtMTEuODU3eiIgc3R5bGU9InBhaW50LW9yZGVyOm1hcmtlcnMgZmlsbCBzdHJva2UiLz48cGF0aCBkPSJtMTA3LjgxIDcwLjEzLTIuODA5MyA1LjI1ODggMi40MDQ4IDIuNjIzOC0xLjcwMzggMy4xODkzLTExLjM2OS0xMy4zMDEgMS40ODQ4LTIuNzc5NCAxNy4xNzQgMi40MzMzLTEuNzAzOCAzLjE4OTN6bS00Ljc1NzIgMy4xMzM1IDEuOTQ0MS0zLjYzOTEtNi4zMTY0LTEuMTIwOHoiIHN0eWxlPSJwYWludC1vcmRlcjptYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PC9nPjwvZz48L3N2Zz4K
// ==/UserScript==

// {{{ imports

const {
    Subject,
    BehaviorSubject,
    combineLatest,
    from,
    of,
    fromEventPattern,
    merge,
} = rxjs;

const {
    filter,
    map,
    mapTo,
    flatMap,
    switchMapTo,
    withLatestFrom,
    pairwise,
    tap,
    pluck,
    distinctUntilChanged,
    groupBy,
    first,
    multicast,
    refCount,
    catchError,
    delay,
    share,
} = rxjs.operators;

// }}}

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

function mount(anchor, position, elements) {
    if (!Array.isArray(elements)) {
        elements = [elements];
    }
    const nodes = elements.map((element) => element.render());
    const [first, ...tail] = nodes;

    if (!first) return;

    anchor.insertAdjacentElement(position, first);
    tail.reverse().forEach((node) =>
        first.insertAdjacentElement("afterend", node)
    );

    return () => nodes.forEach((node) => node.parentNode?.removeChild(node));
}

function mountStream(anchor$, dom$, position) {
    return combineLatest(anchor$, dom$)
        .pipe(
            map(([anchor, component]) => mount(anchor, position, component)),
            pairwise()
        )
        .subscribe({ next: ([unmount, _]) => unmount && unmount() });
}

const tags = [
    "div",
    "li",
    "i",
    "style",
    "form",
    "input",
    "button",
    "label",
    "hr",
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

.plans-list li.member {
    width: 200px !important;
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

.yata-message {
    background-color: white;
    border-radius: 5px;
    padding: 5px;
    margin-top: 10px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}

.yata-divider {
    width: 100%;
    margin-top: 3px !important;
    margin-bottom: 3px !important;
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

// }}}

// {{{ APIs

const yataAPI = (key, path, config) =>
    gmFetch(`https://yata.yt/api/v1/${path}/?key=${key}`, config)
        .catch(({ message }) => {
            throw { message, code: -1, source: "YATA" };
        })
        .then((response) => {
            if (response.headers.get("Content-Type") === "application/json") {
                return response
                    .json()
                    .then((body) => {
                        if (response.ok) {
                            return body;
                        } else {
                            throw {
                                message: body.error.error,
                                code: body.error.code,
                            };
                        }
                    })
                    .catch(({ message, code }) => {
                        throw {
                            message: message ?? response.statusText,
                            code: code ?? response.status,
                            source: "YATA",
                        };
                    });
            } else {
                if (response.ok) {
                    return;
                } else {
                    throw {
                        message: response.statusText,
                        code: response.status,
                    };
                }
            }
        });

const tsAPI = (key, action, config) =>
    gmFetch(
        `https://www.tornstats.com/api.php?action=${action}&key=${key}`,
        config
    )
        .catch(({ message }) => {
            throw { message, code: -1, source: "TornStats" };
        })
        .then((response) =>
            response
                .json()
                .then((body) => {
                    if (response.ok) {
                        return body;
                    } else {
                        throw {
                            message: error,
                            code: response.status,
                        };
                    }
                })
                .catch(({ message, code }) => {
                    throw {
                        message: message ?? response.statusText,
                        code: code ?? response.status,
                        source: "TornStats",
                    };
                })
        );

// }}}

// {{{ state management

const initialState = {
    settings: {
        state: "fresh",
    },
};

const state$ = new BehaviorSubject(initialState);

const sinkProxy$ = new Subject();

sinkProxy$
    .pipe(
        withLatestFrom(state$),
        map(([reducer, state]) => reducer(state))
    )
    .subscribe(state$);

const sink$ = { next: (reducer) => sinkProxy$.next(reducer) };

state$.subscribe({
    next: console.log,
    complete: console.log("state stream complete"),
});

// }}}

// {{{ components

const nnbRow = ({ nnb, rank, ea }) => [
    li({ class: "yata-nnb" }, [nnb, div({ class: "delimiter-white" })]),
    li({ class: "yata-rank" }, [rank, div({ class: "delimiter-white" })]),
    li({ class: "yata-ea" }, [ea, div({ class: "delimiter-white" })]),
];

const dataRow = ({ nnb, rank, ea, verified, source }) => {
    switch (source) {
        case "YATA":
            return nnbRow({
                nnb: nnb ? div([nnb, i({ class: "yata-icon" })]) : "-",
                rank: rank ?? "-",
                ea: ea ?? "-",
            });
        case "TS":
            return nnbRow({
                nnb: nnb ? `${nnb}${verified ? "" : "*"}  (TS)` : "-",
                rank: rank ?? "-",
                ea: "-",
            });
        default:
            return nnbRow({ nnb: "-", rank: rank ?? "-", ea: ea ?? "-" });
    }
};

const yataError = ({ message }) =>
    div({ class: "yata-message" }, [
        "YATA -OC",
        hr({ class: "yata-divider" }),
        p([span({ class: "yata-warning" }, "Error: "), message]),
    ]);

const apiKeyAlert = (apiKey) =>
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
                        sink$.next((state) => ({
                            ...state,
                            settings: {
                                state: "selected",
                                apiKey,
                                yata,
                                ts,
                            },
                        }));
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
                            sink$.next((state) => ({
                                ...state,
                                settings: {
                                    state: "selected",
                                    yata: false,
                                    ts: false,
                                },
                            })),
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
                onClick: () => {
                    const reducer$ = of(({ apiKey }) => ({
                        ...initialState,
                        apiKey,
                    }));
                    reducer$.subscribe(sink$);
                    reducer$.pipe(delay(200)).subscribe({
                        complete: () => (location.hash = "#tab=api"),
                    });
                },
            },
            "reset"
        ),
    ]);

// }}}

// {{{ cache

from(GM.getValue("state"))
    .pipe(
        map(JSON.parse),
        filter((state) => state !== null),
        map((state) => (prev) => ({ ...prev, ...state, hydrated: true }))
    )
    .subscribe(sink$);

state$
    .pipe(
        map(({ settings, yata, ts, order }) => ({
            settings,
            yata,
            ts,
            order,
        }))
    )
    .subscribe({
        next: (value) => GM.setValue("state", JSON.stringify(value)),
    });

// }}}

// {{{ OC page

const factionMain$ = of(document.querySelector("#faction-main")).pipe(
    filter((node) => node !== null)
);

const errorMessage$ = state$.pipe(
    pluck("error"),
    distinctUntilChanged(),
    map((error) => (error ? yataError({ message: error }) : []))
);

mountStream(factionMain$, errorMessage$, "beforebegin");

const yataData$ = state$.pipe(pluck("yata"), distinctUntilChanged());

const tsData$ = state$.pipe(pluck("ts"), distinctUntilChanged());

const data$ = combineLatest(yataData$, tsData$).pipe(
    map(([yata, ts]) => {
        const keys = new Set(
            Object.keys(yata?.data?.members ?? {}).concat(
                Object.keys(ts?.data?.members ?? {})
            )
        );

        return Object.fromEntries(
            [...keys].map((key) => [
                key,
                {
                    nnb:
                        yata?.data?.members[key]?.NNB ??
                        ts?.data?.members[key]?.natural_nerve,
                    rank: yata?.data?.members[key]?.ce_rank,
                    ea: yata?.data?.members[key]?.equivalent_arsons,
                    source: yata?.data?.members[key]?.NNB
                        ? "YATA"
                        : ts?.data?.members[key]?.natural_nerve
                        ? "TS"
                        : undefined,
                    verified: ts?.data?.members[key]?.verified,
                },
            ])
        );
    }),
    multicast(() => new BehaviorSubject()),
    refCount()
);

const ocList$ = state$.pipe(
    pluck("ocList"),
    distinctUntilChanged(),
    filter((list) => list !== undefined)
);

ocList$
    .pipe(
        flatMap((list) =>
            from([
                ...list.querySelectorAll("ul.details-list ul.title > .level"),
            ])
        )
    )
    .subscribe({
        next: (header) =>
            mount(
                header,
                "afterend",
                nnbRow({ nnb: "NNB", rank: "rank", ea: "EA" })
            ),
    });

ocList$
    .pipe(
        flatMap((list) =>
            from([...list.querySelectorAll("ul.details-list ul.item")])
        ),
        groupBy((item) => item.querySelector("a").href.match(/[0-9]+/)[0])
    )
    .subscribe({
        next: (item$) => {
            const info$ = data$.pipe(
                pluck(item$.key),
                distinctUntilChanged(),
                filter((data) => data !== undefined),
                map(dataRow)
            );

            const level$ = item$.pipe(
                map((item) => item.querySelector(".level"))
            );

            mountStream(level$, info$, "afterend");
        },
    });

ocList$.subscribe({
    next: (list) => {
        // supersede injected stylesheets...
        [...list.querySelectorAll(".member")].forEach((elem) =>
            elem.setAttribute("style", "width:400px !important")
        );
        [...list.querySelectorAll(".level")].forEach((elem) =>
            elem.setAttribute("style", "width:57px !important")
        );
    },
});

const ocPlanner$ = state$.pipe(
    pluck("ocPlanner"),
    distinctUntilChanged(),
    filter((planner) => planner !== undefined)
);

ocPlanner$
    .pipe(
        flatMap((planner) =>
            from([...planner.querySelectorAll("ul.title .offences")])
        )
    )
    .subscribe({
        next: (offences) =>
            mount(
                offences,
                "afterend",
                nnbRow({ nnb: "NNB", rank: "rank", ea: "EA" })
            ),
    });

ocPlanner$
    .pipe(
        flatMap((planner) =>
            from([
                ...planner.querySelectorAll(".plans-list ul.item:not(.title)"),
            ])
        )
    )
    .subscribe({
        next: (item) => {
            const key = item.querySelector("a").href.match(/[0-9]+/)[0];

            const info$ = data$.pipe(
                pluck(key),
                distinctUntilChanged(),
                filter((data) => data !== undefined),
                map(dataRow)
            );

            const offences$ = of(item.querySelector(".offences"));
            mountStream(offences$, info$, "afterend");
        },
    });

ocPlanner$.subscribe({
    next: (planner) => {
        // supersede injected stylesheets...
        [...planner.querySelectorAll(".offences")].forEach((elem) =>
            elem.setAttribute("style", "width:80px !important")
        );
    },
});

const apiKey$ = state$.pipe(
    pluck("settings", "apiKey"),
    distinctUntilChanged(),
    filter((key) => key !== undefined)
);

const yata$ = state$.pipe(
    filter(({ settings }) => settings.yata && settings.apiKey),
    pluck("yata"),
    distinctUntilChanged()
);

const order$ = ocPlanner$.pipe(
    map((planner) =>
        planner
            .querySelector(".plans-wrap")
            .querySelectorAll("ul.item:not(.title) a")
    ),
    map((members) =>
        [...members].map((member) => parseInt(member.href.match(/[0-9]+/)[0]))
    )
);

const stateOrder$ = state$.pipe(pluck("order"), distinctUntilChanged());

combineLatest(order$, stateOrder$)
    .pipe(
        filter(
            ([order, stateOrder]) =>
                !stateOrder?.every((el, idx) => el === order[idx])
        ),
        pluck(0),
        withLatestFrom(apiKey$),
        flatMap(([order, key]) =>
            from(
                yataAPI(key, "faction/crimes/import/ranking", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ sub_ranking: order }),
                })
            ).pipe(
                mapTo((state) => ({ ...state, order, yata: undefined })),
                catchError((error) => of((state) => ({ ...state, error })))
            )
        )
    )
    .subscribe(sink$);

const initialYATA$ = yata$.pipe(filter((yata) => !yata));

const refreshYATA$ = yata$.pipe(
    filter((yata) => yata?.timestamp && Date.now() - yata.timestamp > 3600000)
);

merge(initialYATA$, refreshYATA$)
    .pipe(
        switchMapTo(
            combineLatest(order$, stateOrder$).pipe(
                filter(([order, stateOrder]) =>
                    stateOrder?.every((el, idx) => el === order[idx])
                ),
                first()
            )
        ),
        switchMapTo(apiKey$.pipe(first())),
        flatMap((key) =>
            from(yataAPI(key, "faction/crimes/export")).pipe(
                map((data) => (state) => ({
                    ...state,
                    yata: { data, timestamp: Date.now() },
                })),
                catchError((error) => of((state) => ({ ...state, error })))
            )
        )
    )
    .subscribe(sink$);

const ts$ = state$.pipe(
    filter(({ settings }) => settings.ts && settings.apiKey),
    pluck("ts"),
    distinctUntilChanged()
);

const initalTS$ = ts$.pipe(filter((ts) => !ts));

const refreshTS$ = ts$.pipe(
    filter((ts) => ts?.timestamp && Date.now() - ts.timestamp > 3600000)
);

merge(initalTS$, refreshTS$)
    .pipe(
        switchMapTo(apiKey$.pipe(first())),
        flatMap((key) =>
            from(tsAPI(key, "crimes")).pipe(
                map((data) => (state) => ({
                    ...state,
                    ts: { data, timestamp: Date.now() },
                })),
                catchError((error) => of((state) => ({ ...state, error })))
            )
        )
    )
    .subscribe(sink$);

// }}}

// {{{ pref page

const modal$ = state$.pipe(
    distinctUntilChanged(
        (prev, curr) =>
            prev.apiKey === curr.apiKey && prev.settings === curr.settings
    ),
    map(({ apiKey, settings }) =>
        apiKey && settings.state === "fresh" ? apiKeyAlert(apiKey) : []
    )
);

const pref$ = of(apiPrefs());

const prefWrap$ = of(document.querySelector(".preferences-wrap")).pipe(
    filter((wrap) => wrap !== null)
);

mountStream(prefWrap$, modal$, "afterend");

mountStream(prefWrap$, pref$, "afterend");

// }}}

// {{{ DOM interaction

if (location.pathname === "/factions.php") {
    const dom$ = fromEventPattern(
        (handler) => {
            const observer = new MutationObserver(handler);
            observer.observe(document.getElementById("factions"), {
                subtree: true,
                childList: true,
            });
            return observer;
        },
        (_, observer) => observer.disconnect()
    ).pipe(pluck(0), share());

    dom$.pipe(
        map((records) =>
            records.find((record) => record.target.id === "faction-crimes")
        ),
        filter((crimes) => crimes !== undefined),
        map((crimes) =>
            [...crimes.addedNodes].filter((node) =>
                node.classList?.contains("faction-crimes-wrap")
            )
        ),
        filter((nodes) => nodes.length === 2),
        map(([ocList, ocPlanner]) => (state) => ({
            ...state,
            ocList,
            ocPlanner,
        }))
    ).subscribe(sink$);

    dom$.pipe(
        map((records) =>
            records.map((record) => [...record.addedNodes]).flat()
        ),
        map((addedNodes) =>
            addedNodes.filter(
                (node) =>
                    node.classList &&
                    (node.classList.contains("doctorn-faction-nnb-value") ||
                        node.classList.contains("tt-nnb"))
            )
        )
    ).subscribe({
        next: (nodes) => nodes.forEach((node) => node.remove()),
    });
}

if (location.pathname === "/preferences.php") {
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
                    response.json().then(({ apiKey }) =>
                        sink$.next((state) => ({
                            ...state,
                            apiKey,
                        }))
                    );
                })
                .catch(reject)
        );
    };
}

// }}}

// vim: fdm=marker
