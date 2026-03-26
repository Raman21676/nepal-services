// Service Worker to force cache cleanup
self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    // Clear all caches
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        }).then(function() {
            // Unregister self after clearing caches
            return self.registration.unregister();
        })
    );
    self.clients.claim();
});

// Don't intercept any requests - just pass through
self.addEventListener('fetch', function(event) {
    event.respondWith(fetch(event.request));
});
