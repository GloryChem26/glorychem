// GloryChem Service Worker v1.0
// Đặt file này tại: static/js/sw.js

const CACHE_NAME = 'glorychem-v1';

// Các file cần cache để dùng offline
const STATIC_ASSETS = [
  '/',
  '/static/css/style.css',
  '/static/css/forum.css',
  '/static/css/lesson.css',
  '/static/css/periodic.css',
  '/static/css/nav-redesign.css',
  '/static/js/question.js',
  '/static/js/forum.js',
  '/manifest.json'
];

// ── INSTALL: cache static assets ──────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[SW] Một số file không cache được:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: xóa cache cũ ────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: Network first, fallback to cache ───────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Bỏ qua các request không phải GET hoặc API/socket
  if (request.method !== 'GET') return;
  if (url.pathname.startsWith('/api/')) return;
  if (url.pathname.startsWith('/socket.io')) return;
  if (url.hostname !== self.location.hostname) return;

  event.respondWith(
    fetch(request)
      .then(response => {
        // Chỉ cache response thành công
        if (response && response.status === 200) {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, cloned));
        }
        return response;
      })
      .catch(() => {
        // Khi offline: trả về từ cache
        return caches.match(request).then(cached => {
          if (cached) return cached;
          // Fallback cho navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
        });
      })
  );
});
