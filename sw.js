let cacheName = "mws-restaurant-app-v1";

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        "/",
        "index.html",
        "restaurant.html",
        "/restaurant.html?id=1",
        "/restaurant.html?id=2",
        "/restaurant.html?id=3",
        "/restaurant.html?id=4",
        "/restaurant.html?id=5",
        "/restaurant.html?id=6",
        "/restaurant.html?id=7",
        "/restaurant.html?id=8",
        "/restaurant.html?id=9",
        "/restaurant.html?id=10",
        "js/dbhelper.js",
        "js/restaurant_info.js",
        "data/restaurants.json",
        "img/1.jpg",
        "img/2.jpg",
        "img/3.jpg",
        "img/4.jpg",
        "img/5.jpg",
        "img/6.jpg",
        "img/7.jpg",
        "img/8.jpg",
        "img/9.jpg",
        "img/10.jpg",
        "js/main.js",
        "css/styles.css",
        "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.css"
      ]);
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(cacheName) {
            return (
              cacheName.startsWith("mws-restaurant-app") &&
              cacheName != cacheName
            );
          })
          .map(function(cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener("fetch", function(event) {
  let requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === "/") {
      event.respondWith(caches.match("/"));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      // return response if in cache or else fetch from network
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("message", function(event) {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
