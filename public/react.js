"use strict";

import { ReactDOM } from "./react-dom.js";

/**
 * Create a virtual representation of an HTML Element
 * @param {string} name - The name of the HTML Element
 * @param {object} attributes - The attributes to attach to the HTML Element
 * @param {(string|object|Component)[]} The children of this HTML Element
 * @return {object} An object representing the virtual representation of that HTML Element
 * @example
 * createElement("h1", {class: "center"}, ["Hello world!"]);
 */
export function createElement(name, attributes, children) {
    const id = new Date().getMilliseconds().toString() + Math.random() * 10e16;

    return {
        id,
        name,
        attributes,
        children
    };
}

/**
 * Create dynamic component
 */
export class Component {
    /**
     * @param {object} props - Props that will be passed to the component
     * @param {(string|object|Component)[]} children - A list of all children bound to that component
     * @return {Component}
     * @example
     * new Component({foo: "bar"}, ["Hello world!"]);
     */
    constructor(props, children) {
        this.state = null;
        this.oldState = undefined;
        this.id = (new Date().getMilliseconds() + Math.random() * 10e16).toString();
        this.props = { ...props, children };
    }

    /**
     * Update the current state with and re-render the necessary DOM elements
     * @param {unknown} newState - The updated version of the current state
     * @return {void}
     * @example
     * this.setState({counter: this.state.counter + 1});
     */
    setState(newState) {
        let shouldUpdate = false;

        if (JSON.stringify(newState) !== JSON.stringify(this.state)) {
            shouldUpdate = true;
        }

        this.oldState = this.state;
        this.state = newState;

        if (shouldUpdate) {
            ReactDOM.render(this.render(), document.querySelector(`[data-react="${this.id}"]`), true);
        }
    }
}
