const CACHE_NAME = 'v1';
const CACHE_RESURCES = [
    "/",
    "/index.html",
    "/manifest.json",
    "/app.js",
    "/ios/192.png",
    "/ios/512.png",
]

// Установка - кэшируем все необходимые ресурсы!!!!!!!!!!!!!!!!!!!
self.addEventListener('install', event => {
    console.log('🔄 Service Worker: Установка');

    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('🚀 Service Worker: Активация');

    return self.clients.claim();
});


self.addEventListener("fetch", (event) => {
    if (navigator.onLine) {
        event.respondWith(
            (async () => {
                return fetch(event.request)
                    .then(response => {
                        // кэшируем тут, ожидается что все данные для приложения будут получены сразу
                        if (response && response.status === 200) {
                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    console.log('кэшируем ответ от сервера ' + event.request.url);
                                    cache.put(event.request, responseToCache);
                                });
                        }
                        return response;
                    })
                    .catch(async (error) => {
                        if (error.message == "Failed to fetch") {
                            console.log('сервер не отвечает, отдаем из кэша ' + event.request.url)
                            return caches.match(event.request)
                        }
                    })
            })()
        )
    } else {
        event.respondWith(caches.match(event.request));
    }
});


// Перехват запросов - стратегия "Cache First" с fallback!
// self.addEventListener('fetch', event => {
//     console.log(event)
//     // Пропускаем не-GET запросы и chrome-extension
//     if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension')) {
//         return;
//     }

//     event.respondWith(
//         caches.match(event.request)
//             .then(response => {
//                 // Если есть в кэше - возвращаем
//                 if (response) {
//                     console.log('📂 Из кэша:', response, event.request.url);
//                     return response;
//                 }

//                 // Если нет в кэше - загружаем из сети
//                 console.log('🌐 Загружаем из сети:', event.request.url);
//                 return fetch(event.request)
//                     .then(networkResponse => {
//                         // Кэшируем новый ресурс
//                         if (networkResponse && networkResponse.status === 200) {
//                             const responseToCache = networkResponse.clone();
//                             caches.open(CACHE_NAME)
//                                 .then(cache => {
//                                     cache.put(event.request, responseToCache);
//                                 });
//                         }
//                         return networkResponse;
//                     })
//             })
//     );
// });