const cacheName = 'TBM_0101101';
const staticAssets = [
  './',
  './index.html', 
  './gfx/icon-192x192.png',  './gfx/icon-512x512.png',  
  'main_gfx/jadmin.jpg',

  'main_jslib/leaflet.js',              'main_jslib/leaflet.css',
  'main_jslib/images/jRedMarker.png',   'main_jslib/images/jblueMarker.png',
  'main_jslib/images/layers.png',       

  '../js/axios.min.js',
  '../js/coke.js',   
  '../js/je_msg.js',
  '../js/enadlib.js',  
  
  'main_codes/app_admin.js',  
  'main_codes/app_chat.js',
  'main_codes/app_db.js',   
  'main_codes/app_map.js',      
  'main_codes/app_notif.js',  
  'main_codes/app_pages.js',  
  'main_codes/app_sys.js',    
  'main_codes/main_app.js',   

  'main_codes/main_styles.css',   'main_codes/mobile.css',

  
  'main_gfx/proc_logo.gif',  

  'main_gfx/avatar.png',    'main_gfx/dots.png',    
  'main_gfx/jadd.png',      'main_gfx/jback.png',  
  'main_gfx/jbell.png',     'main_gfx/jcall.png',
  'main_gfx/jcam.png',      'main_gfx/jcancel.png', 
  
  'main_gfx/jchat.png',     'main_gfx/jdele.png',  
  'main_gfx/jedit.png',     'main_gfx/jham.png',   
  'main_gfx/jhome.png',     'main_gfx/jimage.png', 
  'main_gfx/jnotif.png',    'main_gfx/jproduct.png', 
  
  'main_gfx/jrefresh.png',  'main_gfx/jsave.png',
  'main_gfx/jsearch.png',   'main_gfx/jsend.png',
  'main_gfx/jsite.png',     'main_gfx/jsms.png', 
  'main_gfx/landmark.png',  
  
  './manifest.webmanifest'
];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(async function() {
     try{
       var res = await fetch(event.request);
       var cache = await caches.open('cache');
       cache.put(event.request.url, res.clone());
       return res;
     }
     catch(error){
       return caches.match(event.request);
      }
    }());
});

/*
addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open(cacheName)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return caches.open(cacheName)
                .then(function(cache) {
                  return cache.match('/offline.html');
                });
            });
        }
      })
  );
});     
*/

/*
self.addEventListener('fetch', event => {
  // Let the browser do its default thing
  // for non-GET requests.
  if (event.request.method != 'GET') return;

  // Prevent the default, and handle the request ourselves.
  event.respondWith(async function() {
    // Try to get the response from a cache.
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
      // If we found a match in the cache, return it, but also
      // update the entry in the cache in the background.
      event.waitUntil(cache.add(event.request));
      return cachedResponse;
    }

    // If we didn't find a match in the cache, use the network.
    return fetch(event.request);
  }());
});
*/
