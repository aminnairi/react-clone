"use strict";

/**
 * Create operating system-like notifications
 */
export class SystemNotification extends Notification {
    /**
     * @param {string} title - The title of the notifications
     * @param {object} options - Options for the notification
     * @example
     * new SystemNotification("Title", { body: "Body", timeout: 5000 });
     */
    constructor(title, options) {
        super(title, options);

        if ("timeout" in options) {
            setTimeout(() => this.close(), options.timeout);
        }
    }

    /**
     * Ask the user for permissions to display system notifications
     * @return {Promise<void>} A promise that resolves if the notification is supported and allowed, and rejects otherwise
     * @example
     * SystemNotification.askPermissions();
     */
    static askPermissions() {
        return new Promise(function(resolve, reject) {
            if (window.Notification.permission === "denied") {
                reject("You have blocked notifications.");
                return;
            }

            if (window.Notification.permission === "granted") {
                resolve();
                return;
            }

            window.Notification.requestPermission(function(newPermission) {
                if (newPermission === "denied") {
                    reject("You have blocked notifications.");
                    return;
                }

                resolve();
            });
        });
    }
}
