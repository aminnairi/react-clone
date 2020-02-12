"use strict";

// Used for cache invalidation
const CACHE_NAME = "0.1.0";

self.addEventListener("install", function(event) {
    event.waitUntil(resourcesAreCached([
        "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js",
        "/",
        "/fransser",
        "/file-reader",
        "/robots.txt",
        "/type.js",
        "/service-worker.js",
        "/materialize.js",
        "/react-router-dom.js",
        "/index.html",
        "/react.js",
        "/notification.js",
        "/manifest.webmanifest",
        "/favicon.ico",
        "/images/icon.png",
        "/index.js",
        "/extra/string.js",
        "/react-dom.js",
    ]));
});

// This is where the cache-first strategy magic happens
self.addEventListener("fetch", function(event) {
    event.respondWith(cacheFirstStrategy(event));
});

// This is where we clean the old cache
self.addEventListener("activate", function(event) {
    event.waitUntil(cacheCleanedExcept(CACHE_NAME));
});

/**
 * Cache a list of resource for the current Service Worker 
 * @param {string[]} resources - List of all HTTP resources to cache
 * @return {Promise<void>}
 * @example
 * resourcesAreCached(["/", "/index.html", "http://api.com/stuff"]);
 */
async function resourcesAreCached(resources) {
    const cache = await caches.open(CACHE_NAME);

    await cache.addAll(resources);
}

/**
 * Serve files that are in cache before serving the resource from the network
 * @param {Event} event - An event that will be used to respond with the correct resource
 * @return {Promise<Response>} An HTTP response from the cache before the network
 * @example
 * cacheFirstStrategy(event);
 */
async function cacheFirstStrategy(event) {
    console.log("here");
    try {
        const response = await caches.match(event.request);

        if (!response.ok) {
            throw new Error("Never gonna let you down");
        }

        return response;
    } catch (error) {
        try {
            const response = await fetch(event.request);

            if (!response.ok) {
                throw new Error("Never gonna give you up");
            }

            return response;
        } catch (error) {
            return caches.match("/");
        }
    }
}

/**
 * Completely remove all cache except the one needed
 * @param {string} cacheToKeep - The name of the cache to keep
 * @return {Promise<void>} A promise that is fulfilled once the cache is cleaned
 * @example
 * cacheCleanedExcept("CACHE_NAME_TO_KEEP");
 */
async function cacheCleanedExcept(cacheToKeep) {
    const keys = await caches.keys(); 

    await Promise.all(keys.filter(cacheName => cacheName !== cacheToKeep).map(cacheName => caches.delete(cacheName)));
}
