//writing code for offline availability of app

let cacheName = 'pwa-offline-quizapp';

//array of file that need to be cached only
let filesToCache = [
  '/',
  '/app.js',
  '/static/js/bundle.js',
  '/static/js/0.chunk.js',
  '/static/js/main.chunk.js',
  '/static/js/vendors~main.chunk.js',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png'
]

this.addEventListener('activate', (e) => {
  console.log('serviceworker activated');
})

this.addEventListener('install', (e) => {
  console.log('serviceworker install');
   e.waitUntil(
     caches.open(cacheName).then((cache) => {
       console.log('serviceworker caching files')
       return cache.addAll(filesToCache);
     })
   );
 });

 this.addEventListener('fetch', (e) => {
   console.log('serviceworker fetch', e.request.url);
   e.respondWith(
     caches.match(e.request).then((resp) => {
       return resp || fetch(e.request.clone());

     })
   )
 })
