// Fitness service worker — caches the app so it opens with no signal.
// Bump CACHE when shipping a new version so phones pick it up.
const CACHE = 'fitness-v8';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-512-maskable.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// "Check for updates" in the app: re-download every app file straight from the server
// (cache: 'reload' skips the browser's HTTP cache too), then tell the page whether it worked.
self.addEventListener('message', e => {
  if (!e.data || e.data.type !== 'refresh') return;
  e.waitUntil(caches.open(CACHE).then(async cache => {
    let ok = true;
    for (const u of SHELL) {
      try { const res = await fetch(u, { cache: 'reload' }); if (res.ok) await cache.put(u, res); else ok = false; }
      catch { ok = false; }
    }
    const clients = await self.clients.matchAll({ includeUncontrolled: true });
    clients.forEach(c => c.postMessage({ type: 'refreshed', ok }));
  }));
});

// App shell: serve from cache immediately, refresh the cache in the background.
// Fonts (Google): cache on first successful fetch so they work offline too.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isFont = url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com');
  const isShell = url.origin === location.origin;
  if (!isFont && !isShell) return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(req, { ignoreSearch: isShell });
      const network = fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
        return res;
      }).catch(() => null);
      if (cached) { network; return cached; }
      const res = await network;
      if (res) return res;
      if (req.mode === 'navigate') return cache.match('./index.html');
      return new Response('', { status: 504 });
    })
  );
});
