import { offlineFallback, warmStrategyCache } from 'workbox-recipes';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

const pageCache = new CacheFirst({
    cacheName: 'pwa-geoloc-cache',
    plugins: [
        new CacheableResponsePlugin({
            statuses: [0, 200]
        }),
        new ExpirationPlugin({
            maxAgeSeconds: 30 * 24 * 60 * 60,
        })
    ]
});

warmStrategyCache({
    urls: ['/index.html', '/'],
    strategy: pageCache
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

registerRoute(
    ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
    new StaleWhileRevalidate({
        cacheName: 'asset-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            })
        ]
    })
);

offlineFallback({
    pageFallback: '/offline.html',
});

registerRoute(({ request }) => request.destination === 'image', 
    new CacheFirst({
    cacheName: 'images',
    plugins: [
        new CacheableResponsePlugin({
            statuses: [0, 200]
        }),
        new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 30
        })
    ]
}));