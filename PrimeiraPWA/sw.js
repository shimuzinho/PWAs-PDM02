let cacheName = "my-first-pwa";
let filesToCache = ["/", "/index.html", "/css/style.css", "/js/main.js", "/js/script.js", "/pages/exercicio01", "/pages/exercicio02", "/pages/exercicio03"];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});