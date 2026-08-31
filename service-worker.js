const CACHE_NAME = 'so-mandiri-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/main.css',
  './css/components.css',
  './css/responsive.css',
  './js/config.js',
  './js/api.js',
  './js/auth.js',
  './js/app.js',
  './js/dashboard.js',
  './js/stock-opname.js',
  './js/scanner.js',
  './js/history.js',
  './js/users.js',
  './js/settings.js',
  './js/logs.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Network first with cache fallback
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
