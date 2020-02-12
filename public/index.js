"use strict";

import "/extra/string.js";

import { ReactDOM } from "/react-dom.js";
import { createElement, Component } from "/react.js";
import { SystemNotification } from "/notification.js";
import { Router } from "/react-router-dom.js";
import { MaterializeContainer, MaterializeRow, MaterializeColumn, MaterializeButton, MaterializeBrandLogo, MaterializeNavigationItems, MaterializeNavigationItem, MaterializeNavigation, MaterializeHeader } from "/materialize.js";

class Header extends Component {
    constructor() {
        super();

        this.goToHomePage = this.goToHomePage.bind(this);
        this.goToFrenchPage = this.goToFrenchPage.bind(this);
    }

    goToHomePage(event) {
        event.preventDefault();
        Router.go("/");
    }

    goToFrenchPage(event) {
        event.preventDefault();
        Router.go("/fransser");
    }

    goToFileReaderPage(event) {
        event.preventDefault();
        Router.go("/file-reader");
    }

    render() {
        return new MaterializeHeader({}, [
            new MaterializeNavigation({}, [
                new MaterializeBrandLogo({ href: "", onclick: this.goToHomePage }, ["React Clone"]),

                new MaterializeNavigationItems({}, [
                    new MaterializeNavigationItem({ onclick: this.goToFrenchPage }, ["French"]),
                    new MaterializeNavigationItem({ onclick: this.goToFileReaderPage }, ["File Reader"])
                ])
            ])
        ]);
    }
}

class App extends Component {
    constructor() {
        super();

        this.state = { counter: 0 };
        
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);
        this.notifyCounter = this.notifyCounter.bind(this);
    }

    incrementCounter() {
        this.setState({
            counter: this.state.counter + 1
        });
    }

    decrementCounter() {
        this.setState({
            counter: this.state.counter - 1
        });
    }

    async notifyCounter() {
        try {
            await SystemNotification.askPermissions();

            new SystemNotification("Counter", {
                body: "You counter is currently at {state.counter}".interpollate(this),
                timeout: 5000
            });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return createElement("div", {}, [
            new Header(),
            new MaterializeContainer({}, [
                new MaterializeRow({}, [
                    new MaterializeColumn({ center: true }, [
                        createElement("h1", {}, ["Counter"])
                    ])
                ]),
                new MaterializeRow({}, [
                    new MaterializeColumn({ medium: "4", center: true }, [
                        new MaterializeButton({ onclick: this.decrementCounter, color: "red" }, ["Decrement"]),
                    ]),
                    new MaterializeColumn({ medium: "4", center: true }, [
                        createElement("span", { class: "flow-text" }, ["Current counter is {state.counter}".interpollate(this)]),
                    ]),
                    new MaterializeColumn({ medium: "4", center: true }, [
                        new MaterializeButton({ onclick: this.incrementCounter, color: "green" }, ["Increment"]),
                    ]),
                ]),
                new MaterializeRow({}, [
                    new MaterializeColumn({ center: true }, [
                        new MaterializeButton({ onclick: this.notifyCounter }, ["Notify"])
                    ])
                ])
            ])
        ]);
    }
}

class AppFrench extends Component {
    constructor() {
        super();

        this.state = { counter: 0 };
        
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);
        this.notifyCounter = this.notifyCounter.bind(this);
        this.goToEnglish = this.goToEnglish.bind(this);
    }

    incrementCounter() {
        this.setState({
            counter: this.state.counter + 1
        });
    }

    decrementCounter() {
        this.setState({
            counter: this.state.counter - 1
        });
    }

    async notifyCounter() {
        try {
            await SystemNotification.askPermissions();

            new SystemNotification("Compteur", {
                body: "Votre compteur est actuellement de {state.counter}".interpollate(this),
                timeout: 5000
            });
        } catch (error) {
            console.error(error);
        }
    }

    goToEnglish() {
        Router.go("/");
    }

    render() {
        return createElement("div", {}, [
            new Header(),
            new MaterializeContainer({}, [
                new MaterializeRow({}, [
                    new MaterializeColumn({ center: true }, [
                        createElement("h1", {}, ["Compteur"])
                    ])
                ]),
                new MaterializeRow({}, [
                    new MaterializeColumn({ medium: "4", center: true }, [
                        new MaterializeButton({ onclick: this.decrementCounter, color: "red" }, ["Décrémenter"]),
                    ]),
                    new MaterializeColumn({ medium: "4", center: true }, [
                        createElement("span", { class: "flow-text" }, ["Le compteur est actuellement de {state.counter}".interpollate(this)]),
                    ]),
                    new MaterializeColumn({ medium: "4", center: true }, [
                        new MaterializeButton({ onclick: this.incrementCounter, color: "green" }, ["Incrémenter"]),
                    ])
                ]),
                new MaterializeRow({}, [
                    new MaterializeColumn({ center: true }, [
                        new MaterializeButton({ onclick: this.notifyCounter }, ["Notifier"])
                    ])
                ])
            ])
        ]);
    }
}

class AppNotFound extends Component {
    constructor() {
        super();

        this.goBack = this.goBack.bind(this);
        this.goHome = this.goHome.bind(this);
    }

    goBack() {
        Router.goBack();
    }

    goHome() {
        Router.go("/");
    }

    render() {
        return createElement("div", {}, [
            new MaterializeContainer({}, [
                new MaterializeRow({}, [
                    new MaterializeColumn({ center: true }, [
                        createElement("h1", {}, ["404 — Page Not Found"])
                    ])
                ]),
                new MaterializeRow({}, [
                    new MaterializeColumn({ center: true }, [
                        createElement("p", { class: "flow-text" }, ["Seems like you are lost, traveler..."])
                    ])
                ]),
                new MaterializeRow({}, [
                    new MaterializeColumn({ center: true }, [
                        new MaterializeButton({ onclick: this.goBack }, ["Go back?"]),
                    ])
                ]),
                new MaterializeRow({}, [
                    new MaterializeColumn({ center: true }, [
                        new MaterializeButton({ onclick: this.goHome }, ["Go home?"]),
                    ])
                ])
            ])
        ])
    }
}

class AppFileReader extends Component {
    constructor() {
        super();

        this.state = { content: "" };

        this.readFile = this.readFile.bind(this);
    }

    readFile(event) {
        const fileReader = new FileReader();

        fileReader.readAsText(event.currentTarget.files[0]);

        fileReader.addEventListener("load", () => {
            this.setState({
                content: fileReader.result
            });
        });
    }

    render() {
        return createElement("div", {}, [
            new Header(),
            new MaterializeContainer({}, [
                new MaterializeRow({}, [
                    new MaterializeColumn({ small: 12, center: true }, [
                        createElement("h1", {}, ["File Reader"])
                    ])
                ]),
                new MaterializeRow({}, [
                    new MaterializeColumn({}, [
                        createElement("div", { class: "file-field input-field" }, [
                            createElement("div", { class: "btn" }, [
                                createElement("span", {}, ["Upload"]),
                                createElement("input", { type: "file", onchange: this.readFile }, [])
                            ]),
                            createElement("div", { class: "file-path-wrapper" }, [
                                createElement("input", { class: "file-path", placeholder: "Upload a text file", type: "text" }, [])
                            ])
                        ])
                    ])
                ]),
                new MaterializeRow({}, [
                    new MaterializeColumn({}, [
                        createElement("pre", {}, [
                            createElement("code", {}, [this.state.content])
                        ])
                    ])
                ])
            ])
        ]);
    }
}

window.addEventListener("load", async function() {
    await Promise.all([
        "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css".loadStylesheet(),
        "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js".loadScript()
    ])

    const app = document.getElementById("app");
    const router = new Router(app);

    router.addRoute("/", new App());
    router.addRoute("/fransser", new AppFrench());
    router.addRoute("/file-reader", new AppFileReader());
    router.addRoute("*", new AppNotFound());
    router.start();

    // If the navigator does not support service workers, just do nothing (that's not mandatory)
    if (!navigator.serviceWorker) {
        return;
    }

    // Same thing if the service worker fails to register
    try { await navigator.serviceWorker.register("/service-worker.js"); } catch {}
});
