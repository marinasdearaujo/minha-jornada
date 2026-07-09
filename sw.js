const CACHE='semente-v2';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.mode==='navigate'){
    e.respondWith(
      fetch(req).then(res=>{const c=res.clone();caches.open(CACHE).then(ca=>ca.put(req,c));return res;})
        .catch(()=>caches.match(req).then(m=>m||caches.match('./')))
    );
  }
});