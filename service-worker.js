/**
 * Nepal Services Directory - Service Worker
 * Enables offline functionality and faster loading
 */

const CACHE_NAME = 'nepal-services-v1';
const STATIC_CACHE = 'nepal-static-v1';
const DATA_CACHE = 'nepal-data-v1';
const IMAGE_CACHE = 'nepal-images-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/favicon.svg',
  '/js/i18n/i18n.js',
  '/js/theme.js',
  '/js/config.js',
  '/js/data-loader.js',
  '/js/filters.js',
  '/js/renderer.js',
  '/app.js',
  '/js/i18n/en.json',
  '/js/i18n/ne.json',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Cache failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== STATIC_CACHE &&
              cacheName !== DATA_CACHE &&
              cacheName !== IMAGE_CACHE
            ) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle data files (JSON)
  if (url.pathname.includes('/data/') || url.pathname.includes('-manifest.js')) {
    event.respondWith(cacheThenNetwork(request, DATA_CACHE));
    return;
  }
  
  // Handle images
  if (request.destination === 'image') {
    event.respondWith(cacheThenNetwork(request, IMAGE_CACHE));
    return;
  }
  
  // Handle static assets (CSS, JS, fonts)
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font'
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }
  
  // Handle HTML pages - network first for freshness
  if (request.destination === 'document' || url.pathname === '/') {
    event.respondWith(networkFirst(request, STATIC_CACHE));
    return;
  }
  
  // Default: cache first
  event.respondWith(cacheFirst(request, STATIC_CACHE));
});

// Cache strategies

// Cache First - serve from cache, fall back to network
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[Service Worker] Fetch failed:', error);
    // Return offline fallback if available
    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Network First - try network, fall back to cache
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Network failed, trying cache...');
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    throw error;
  }
}

// Cache Then Network - return cache immediately, update in background
async function cacheThenNetwork(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  // Return cached version immediately if available
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch((error) => {
      console.log('[Service Worker] Network fetch failed:', error);
      // Silently fail - we already returned cached version
    });
  
  // Update cache in background
  event.waitUntil(fetchPromise);
  
  return cached || fetchPromise;
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Placeholder for background sync functionality
  console.log('[Service Worker] Background sync executed');
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: data.data,
      actions: data.actions || []
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});

// Message handler from main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

console.log('[Service Worker] Loaded');
