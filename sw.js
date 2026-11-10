// RateAgainst service worker: uygulama kabuğunu ve kapakları önbellekte tutar, internet yokken de açılır.
// Siteyi güncelledikten sonra değişikliklerin hemen gelmesi için kendi dosyaların önce internetten alınır.
const VERSION = 'ra-v2';
const SHELL_CACHE = `${VERSION}-shell`;
const CDN_CACHE = `${VERSION}-cdn`;
const IMG_CACHE = 'ra-covers';
const IMG_LIMIT = 500;

const SHELL = ['./', './index.html', './app.js', './style.css', './manifest.json',
    './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-64.png'];
const CDN_HOSTS = ['cdn.tailwindcss.com', 'unpkg.com', 'cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com', 'www.gstatic.com'];
const IMG_HOSTS = ['dzcdn.net', 'mzstatic.com', 'archive.org', 'coverartarchive.org', 'images.weserv.nl'];

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(SHELL_CACHE);
        await Promise.allSettled(SHELL.map(url => cache.add(new Request(url, { cache: 'reload' }))));
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const keep = [SHELL_CACHE, CDN_CACHE, IMG_CACHE];
        for (const key of await caches.keys()) if (!keep.includes(key)) await caches.delete(key);
        await self.clients.claim();
    })());
});

async function trim(cacheName, max) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

// Kendi dosyaların: önce internet, olmazsa önbellek
async function networkFirst(request) {
    const cache = await caches.open(SHELL_CACHE);
    try {
        const res = await fetch(request);
        if (res && res.ok) cache.put(request, res.clone());
        return res;
    } catch (e) {
        const hit = await cache.match(request, { ignoreSearch: true });
        if (hit) return hit;
        if (request.mode === 'navigate') return (await cache.match('./index.html')) || (await cache.match('./')) || Response.error();
        return Response.error();
    }
}

// CDN (Tailwind, ikonlar, yazı tipi, Firebase): önbellekten hemen ver, arkada yenile
async function staleWhileRevalidate(request) {
    const cache = await caches.open(CDN_CACHE);
    const hit = await cache.match(request);
    const fresh = fetch(request).then(res => {
        if (res && (res.ok || res.type === 'opaque')) cache.put(request, res.clone());
        return res;
    }).catch(() => hit || Response.error());
    return hit || fresh;
}

// Kapaklar: önbellekte varsa oradan (hızlı ve internetsiz)
async function cacheFirst(request) {
    const cache = await caches.open(IMG_CACHE);
    const hit = await cache.match(request);
    if (hit) return hit;
    try {
        const res = await fetch(request);
        if (res && (res.ok || res.type === 'opaque')) { cache.put(request, res.clone()); trim(IMG_CACHE, IMG_LIMIT); }
        return res;
    } catch (e) {
        // Bu ağda engelli ya da ulaşılamıyor: sessizce hata ver, sayfa yedek kapağa geçer
        return Response.error();
    }
}

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;
    const url = new URL(request.url);
    if (url.origin === self.location.origin) { event.respondWith(networkFirst(request)); return; }
    if (CDN_HOSTS.includes(url.hostname)) { event.respondWith(staleWhileRevalidate(request)); return; }
    if (request.destination === 'image' && IMG_HOSTS.some(h => url.hostname === h || url.hostname.endsWith(`.${h}`))) { event.respondWith(cacheFirst(request)); return; }
    // MusicBrainz, Deezer, Firebase giriş ve veritabanı istekleri olduğu gibi geçer
});