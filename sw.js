const staticCache = "mws-restaurant-static-v1";
const dynamicPagesCache = "mws-restaurant-dynamic-pages-v1";
const dynamicImagesCache = "mws-restaurant-dynamic-images-v1";
const dynamicMapsCache = "mws-restaurant-dynamic-maps-v1";

const scripts = [
  "https://unpkg.com/leaflet@1.3.1/dist/leaflet.js",
  "build/js/index.min.js",
  "build/js/restaurant.min.js"
];
const styles = [
  "https://unpkg.com/leaflet@1.3.1/dist/leaflet.css",
  "build/css/styles.min.css"
];

// Install Event
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(staticCache)
      .then(cache => {
        cache.addAll(["/", ...styles, ...scripts]);
      })
      .catch(() => {
        console.log("Some error while caching static assets!");
      })
  );
});

// Activate Event
self.addEventListener("activate", event => {
  if (self.clients && clients.claim) {
    clients.claim();
  }
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName.startsWith("mws-") && cacheName !== staticCache;
            })
            .map(cacheName => {
              return caches.delete(cacheName);
            })
        ).catch(error => {
          console.log("Error removing already existing cache!" + error);
        });
      })
      .catch(error => {
        console.log("Error removing already existing cache!" + error);
      })
  );
});

// Fetch Event
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request)
          .then(fetchResponse => {
            if (
              event.request.url.endsWith(".webp") ||
              event.request.url.endsWith(".jpg")
            ) {
              return cacheDynamicRequestData(
                dynamicImagesCache,
                event.request.url,
                fetchResponse.clone()
              );
            } else if (event.request.url.includes(".html")) {
              return cacheDynamicRequestData(
                dynamicPagesCache,
                event.request.url,
                fetchResponse.clone()
              );
            } else {
              return cacheDynamicRequestData(
                dynamicMapsCache,
                event.request.url,
                fetchResponse.clone()
              );
            }
          })
          .catch(error => {
            console.log(
              "Error saving to or fetching data from dynamic cache!" + error
            );
          })
      );
    })
  );
});

function cacheDynamicRequestData(dynamicCacheName, url, fetchResponse) {
  return caches
    .open(dynamicCacheName)
    .then(cache => {
      cache.put(url, fetchResponse.clone());
      return fetchResponse;
    })
    .catch(error => {
      console.log(
        "Error saving to or fetching data from dynamic cache!" + error
      );
    });
}
