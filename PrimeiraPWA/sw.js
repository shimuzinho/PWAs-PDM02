let cacheName = "my-first-pwa";
let filesToCache = ["/", "/index.html", "/css/style.css", "/js/main.js"];

self.addEventListener("install", (e) => {
    e.waitUntil(
        cache.open(cacheName).then(cache => cache.addAll(filesToCache))
    );
});

self.addEventListener("fetch", (e) =>{
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});