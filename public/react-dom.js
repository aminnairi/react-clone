"use strict";

import { Component } from "./react.js";
import { typeCheck } from "./type.js";

/**
 * Manage virtual to DOM manipulation
 */
export class ReactDOM {
    /**
     * Transform a React Component into its virtual DOM representation
     * @param {Component} component - The component to turn into a virtual DOM
     * @return {object} The virtual DOM
     * @example
     * ReactDOM.componentToVirtualDom(new MaterializeContainer());
     */
    static componentToVirtualDom(component) {
        const virtualDom = component.render();

        if (virtualDom instanceof Component) {
            return ReactDOM.componentToVirtualDom(virtualDom);
        }

        return virtualDom;
    }

    /**
     * Render a component
     * @param {Component|object} component - The component or virtual DOM to render
     * @param {HTMLElement} output - An HTML Element to render the component or the virtual DOM to
     * @param {boolean} clean - Whether the output should be emptied before rendering the component or virtual DOM
     * @return {undefined}
     * @example
     * ReactDOM.render(new App(), document.getElementById("app"));
     */
    static render(component, output, clean = true) {
        if (clean) {
            output.innerHTML = "";
        }

        const { name, attributes, children } = component instanceof Component ? ReactDOM.componentToVirtualDom(component) : component;

        const element = document.createElement(name);

        element.dataset.react = component.id;

        for (const [property, value] of Object.entries(attributes)) {
            if (property.startsWith("on")) {
                if (typeCheck(value, {type: "function"}) || typeCheck(value, {type: "asyncfunction"})) {
                    element.addEventListener(property.slice(2), value);
                }
            } else {
                element.setAttribute(property, value);
            }
        }

        for (const child of children) {
            if (typeof child === "string") {
                element.appendChild(document.createTextNode(child));
            } else {
                ReactDOM.render(child, element, false);
            }
        }

        output.appendChild(element);
    }
}
