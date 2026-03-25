const CACHE_NAME = 'neocalc-v2';
const ASSETS = [
  '/neocalc-android/',
  '/neocalc-android/index.html',
  '/neocalc-android/styles.css',
  '/neocalc-android/script.js',
  '/neocalc-android/icon.png',
  '/neocalc-android/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
