/* eslint-env serviceworker */
/* global self */

const CACHE_NAME = 'greenbasket-cache-v1';

// ✅ Use PUBLIC_URL base path
const BASE_URL = self.location.pathname.includes('/grocerystore')
  ? '/grocerystore'
  : '';

const PRECACHE_URLS = [
  BASE_URL + '/',
  BASE_URL + '/index.html',
  BASE_URL + '/manifest.json',
  BASE_URL + '/favicon.ico',
  BASE_URL + '/logo192.png',
  BASE_URL + '/logo512.png'
];

// INSTALL
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// FETCH
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(request)
          .then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });

            return networkResponse;
          })
          .catch(() => caches.match(BASE_URL + '/'))
      );
    })
  );
});
