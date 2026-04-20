// MetalTrack Service Worker v4.1
// Strategia: network-first con fallback cache. Permette aggiornamenti automatici
// quando si è online e funzionamento completo offline.

const CACHE = 'metaltrack-v4-1';
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

// Install: precarica i file essenziali
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PRECACHE).catch(err => console.warn('Precache fail:', err)))
      .then(() => self.skipWaiting())
  );
});

// Activate: pulisce cache vecchie
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch: network-first, fallback su cache
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Non cachiamo le richieste ad Appwrite (devono sempre tentare la rete)
  if (req.url.includes('appwrite.io')) {
    e.respondWith(fetch(req).catch(() => new Response('', { status: 503 })));
    return;
  }

  e.respondWith(
    fetch(req)
      .then(res => {
        // Cache una copia se è una risposta valida
        if (res && res.status === 200 && res.type !== 'opaque') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(req, clone)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req).then(cached => cached || caches.match('./index.html')))
  );
});
