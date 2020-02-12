"use strict";

import { ReactDOM } from "./react-dom.js";

/**
 * Dynamically change and react to page change without triggering any HTTP requests
 */
export class Router {
    /**
     * @param {HTMLElement} element - The HTML element to use to render the view
     * @return {Router}
     * @example
     * new Router(document.getElementById("app"));
     */
    constructor(element) {
        this.routes = [];
        this.element = element;
    }

    /**
     * Change the current page without triggering an HTTP request
     * @param {string} path - The path to go to
     * @return {undefined}
     * @example
     * Router.go("/");
     * Router.go("/about");
     */
    static go(path) {
        window.history.pushState(null, "", path);
        window.dispatchEvent(new CustomEvent("popstate"));
    }

    /**
     * Go to the previous page without triggering an HTTP request
     * @return {undefined}
     * @example
     * Router.goBack();
     */
    static goBack() {
        window.history.back();
    }

    /**
     * Add a route to the current router instance
     * @param {string} path - Render the component when that path is accessed
     * @param component - The component to render
     * @return {undefined}
     * @example
     * const router = new Router(document.getElementById("app"));
     * router.addRoute("/", HomePage);
     * router.addRoute("/about", AboutPage);
     */
    addRoute(path, component) {
        this.routes.push({ path, component });
    }

    /**
     * Render the component that first match the current route
     * @return {undefined}
     * @example
     * const router = new Router(document.getElementById("app"));
     * router.updateView();
     */
    updateView() {
        const currentRoute = window.location.pathname;

        for (const route of this.routes) {
            if (currentRoute === route.path) {
                ReactDOM.render(route.component, this.element, true);
                return;
            }
        }

        for (const route of this.routes) {
            if (route.path === "*") {
                ReactDOM.render(route.component, this.element, true);
                return;
            }
        }
    }

    /**
     * Starts listening for page changes
     * @return {undefined}
     * @example
     * const router = new Router(document.getElementById("app"));
     * router.start();
     */
    start() {
        window.addEventListener("popstate", this.updateView.bind(this));
        this.updateView();
    }
}
