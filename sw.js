// sw.js
// https://lfdo20.github.io/pomodoroclockpwa/

var cacheName = 'pomoclock-pwa-cache-v1';
var cacheFiles = [
  './',
  './index.html',
  './pomodoro.css',
  './pomodoro.js',
  './notification.js',
  './easytimer.min.js',
  './newmessage.mp3',
  './served.mp3',
  './favicon.ico',
  './favicon-32x32.png',
  './favicon-16x16.png',
  './android-chrome-192x192.png',
  './android-chrome-384x384.png',
  './android-chrome-512x512.png',
  './push-off.png',
  './push-on.png',
  './badge.png',
];

// Install Service Worker
self.addEventListener('install', e => {
  console.log('Service Worker: Installing....');
 e.waitUntil(
   // open a new cache
   caches.open(cacheName).then(cache => {
     // add all URLs of resources we want to cache
     console.log('[ServiceWorker] Caching cacheFiles');
     return cache.addAll(cacheFiles);
   })
 );
});

// Fired when the Service Worker starts up
self.addEventListener('activate', function(event) {

    console.log('Service Worker: Activating....');

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(key) {
                if( key !== cacheName) {
                    console.log('Service Worker: Removing Old Cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

// This event helps serve the app shell from the cache.
self.addEventListener('fetch', function(event) {

    console.log('Service Worker: Fetch', event.request.url);

    console.log("Url", event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
