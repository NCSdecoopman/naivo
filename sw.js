const CACHE_NAME = 'naivo-cache-v1';

// On ne met en cache que les ressources critiques de base.
// Le reste sera mis en cache dynamiquement via stale-while-revalidate.
const PRECACHE_ASSETS = [
    '/',
    '/manifest.webmanifest',
    '/logo/naivo-light.svg',
    '/logo/flocon-white.svg'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Bypasser le cache en développement (localhost) pour éviter de bloquer le HMR (WebSocket)
    // et les outils de développement.
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1' || !url.protocol.startsWith('http')) {
        return;
    }

    // On ne met en cache que les requêtes GET (le cache.put ne supporte pas POST, etc.)
    if (event.request.method !== 'GET') {
        return;
    }

    // Pour les fichiers de données (GitHub), on ne met pas en cache ici pour éviter les données périmées
    if (url.hostname.includes('raw.githubusercontent.com') || url.hostname.includes('cloudflare-worker')) {
        return;
    }

    // Stratégie pour les pages HTML (Navigation) : Network First
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // Autres ressources (Images, JS, CSS) : Stale-While-Revalidate
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const copy = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                }
                return networkResponse;
            });
            return cachedResponse || fetchPromise;
        })
    );
});
