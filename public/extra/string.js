"use strict";

/**
 * prop_access, but with a better name
 * @param {string} accessor - The object's path to the value to access
 * @throws {Error} When the function is called with more or less than two argument
 * @throws {TypeError} When the function is not called with an object
 * @throws {TypeError} When accessor is not a string
 * @return {unknown|null} One of the property of the object, or null if it was not found
 * @example
 * get("a", {a: 1}); // 1
 * get("a.b", {a: {b: 1}}); // 1
 */
function get(accessor, target) {
    /** @var {object} value - The current object */
    let value = target;

    // Prevent accessing the function with an incorrect amount of arguments
    if (arguments.length !== 2) {
        throw new Error("Expected exactly one argument.");
    }

    // Prevent using "access" on all other JavaScript objects
    if (Object.prototype.toString.call(target) !== "[object Object]") {
        throw new TypeError(`${JSON.stringify(target)}.get(${JSON.stringify(accessor)}) is not a function.`);
    }

    // Prevent calling the function with an accessor that is not a string
    if (typeof accessor !== "string") {
        throw new TypeError(`Accessor is not a string in ${JSON.stringify(target)}.get(accessor).`);
    }

    /** @const {string} property - Each parts of the path (which is separated by dots) */
    for (const property of accessor.split(".")) {
        // Prevent accessing an undefined property
        if (!Object.prototype.hasOwnProperty.call(value, property)) {
            return null;
        }

        value = value[property];
    }

    return value;
};

// Prevent clashing with a maybe future definition of the function in the standard
if (!String.prototype.interpollate) {
    /**
     * Access properties from a string.
     * @param {object} context - An object representing the variables to access from.
     * @throws {Error} If the function is called with not exactly one argument.
     * @throws {TypeError} If the function is called with a context that is not an object.
     * @return {string} The interpollated string.
     * @example
     * "M. {user.lastname} {user.firstname}".interpollate({user: {lastname: "DOE", firstname: "Jhon"}}); // "M. DOE Jhon"
     */
    String.prototype.interpollate = function(target) {
        if (arguments.length !== 1) {
            throw new Error("Expected exactly one argument.");
        }

        if (Object.prototype.toString.call(target) !== "[object Object]") {
            throw new TypeError(`Context is not an object in ${JSON.stringify(target)}.interpollate(context).`);
        }

        /** @var {string} string - The string to interpollate. */
        let string = this;

        /** @const {RegExp} pattern - The pattern that is used to interpollate variables, generally {myVariable} */
        const pattern = /{(?<context>.*?)}/;

        // Loop until there is no more variables to interpollate
        while (pattern.exec(string)) {
            /** const {object} match - The match object */
            const match = string.match(pattern);

            // Continuing if the context has not been found for whatever reasons
            if (!match || !match.groups || !match.groups.context) {
                continue;
            }

            /** @const {unknown} accessed - The variable to access */
            const accessed = get(match.groups.context.trim(), target);

            // Continuing if the accessed variable has not been found
            if (accessed === null) {
                string = string.replace(`{${match.groups.context}}`, `["${match.groups.context}" NOT_FOUND_ATTRIBUTE]`);

                continue;
            }

            // Replacing the variable with its correct context
            string = string.replace(`{${match.groups.context}}`, accessed);
        }

        return string;
    };
}

if (!String.prototype.loadScript) {
    /**
     * Create and attach a script tag to the current DOM
     * @return {Promise<void>} A promise that is fulfilled when the script is attached and is loaded in the DOM
     * @example
     * loadScript("https://cdn.site.com/foo.js").then(onScriptLoaded);
     * await loadScript("https://cdn.site.com/foo.js");
     */
    String.prototype.loadScript = function() {
        const script = document.createElement("script");

        script.setAttribute("async", true);
        script.setAttribute("src", this);

        document.head.appendChild(script);
        
        return new Promise(function(resolve) {
            script.addEventListener("load", resolve);
        });
    };
}

if (!String.prototype.loadStylesheet) {
    /**
     * Create and attach a stylesheet to the current DOM
     * @return {Promise<void>} A promise that is fulfilled when the stylesheet is attached and is loaded in the DOM
     * @example
     * loadStylesheet("https://cdn.site.com/foo.css").then(onStylesheetLoaded);
     * await loadStylesheet("https://cdn.site.com/foo.css");
     */
    String.prototype.loadStylesheet = function() {
        const stylesheet = document.createElement("link");

        stylesheet.setAttribute("rel", "stylesheet");
        stylesheet.setAttribute("href", this);

        document.head.appendChild(stylesheet);
        
        return new Promise(function(resolve) {
            stylesheet.addEventListener("load", resolve);
        });
    };
}
