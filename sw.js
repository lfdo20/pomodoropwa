// sw.js
// https://lfdo20.github.io/pomodoroclock/

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
  './push-off.png',
  './push-on.png',
];

self.addEventListener('install', e => {
 e.waitUntil(
   // after the service worker is installed,
   // open a new cache
   caches.open(cacheName).then(cache => {
     // add all URLs of resources we want to cache
     console.log('[ServiceWorker] Caching cacheFiles');
     return cache.addAll(cacheFiles);
   })
 );
});
