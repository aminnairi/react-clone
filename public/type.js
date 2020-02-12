"use strict";

/**
 * Fine type checking for anything
 * @param {unknown} target - The target to check
 * @param {object} options - An object representing the check to operate
 * @return {boolean} True if the check is successful, false otherwise
 * @example
 * typeCheck("jhon", { type: "string", value: "jhon" });
 * typeCheck({ user: "jhon" }, { type: "object", properties: { user: { type: "string", values: [ "jhon", "amin" ]}}});
 */
export function typeCheck(target, options) {
    const typeString = Object.prototype.toString.call(target).replace("[object ", "").replace("]", "").toLowerCase();

    if (Object.prototype.hasOwnProperty.call(options, "type") && typeString !== options.type) {
        return false; 
    }

    if (Object.prototype.hasOwnProperty.call(options, "value") && target !== options.value) {
        return false;
    }

    if (Object.prototype.hasOwnProperty.call(options, "values")) {
        let ok = false;

        for (const value of options.values) {
            if (value === target) {
                ok = true;
            }
        }

        if (!ok) {
            return false;
        }
    }

    if (options.hasOwnProperty("properties")) {
        for (const [property, propertyOptions] of Object.entries(options.properties)) {
            if (!Object.prototype.hasOwnProperty.call(target, property)) {
                return false;
            }

            if (!typeCheck(target[property], propertyOptions)) {
                return false;
            }
        }
    }

    return true;
}
