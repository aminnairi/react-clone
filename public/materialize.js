"use strict";

import { Component, createElement } from "./react.js";
import { typeCheck } from "./type.js";

export class MaterializeContainer extends Component {
    render() {
        return createElement("div", { class: "container" }, this.props.children);
    }
}

export class MaterializeRow extends Component {
    render() {
        return createElement("div", {class: "row"}, this.props.children);
    }
}

export class MaterializeColumn extends Component {
    render() {
        if (!typeCheck(this.props, { small: { type: "string", values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] }})) {
            throw new TypeError("Small column size is mandatory and must be a string");
        }

        return createElement("div", {class: `col s${this.props.small || "12"} m${this.props.medium || "12"} ${this.props.center ? "center" : ""}`}, this.props.children);
    }
}

export class MaterializeButton extends Component {
    render() {
        return createElement("button", {class: `btn ${this.props.color || "teal"}`, ...this.props}, this.props.children);
    }
}

export class MaterializeBrandLogo extends Component {
    render() {
        return createElement("a", { class: "brand-logo left", ...this.props }, this.props.children);
    }
}

export class MaterializeNavigationItems extends Component {
    render() {
        return createElement("ul", { class: "right" }, this.props.children);
    }
}

export class MaterializeNavigationItem extends Component {
    render() {
        return createElement("li", {}, [
            createElement("a", { href: "", ...this.props }, this.props.children)
        ]);
    }
}

export class MaterializeNavigation extends Component {
    render() {
        return createElement("nav", {}, this.props.children);
    }
}

export class MaterializeHeader extends Component {
    render() {
        return createElement("header", {}, this.props.children);
    }
}
