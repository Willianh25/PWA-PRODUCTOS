// Archivos que queremos guardar en caché para que funcionen sin internet
const CACHE_NAME = "Mis-Productos-v1";
const archivosACachear = [
  "./",
  "./index.html",
  "./public/css/estilos.css",
  "./public/img/icono-192.png",
  "./public/img/icono-512.png",
  "./public/js/clientes.js",
  "./public/js/productos.js",
  "./public/js/factura.js"
];

// Prmer evento que se ejecuta cuando se instala el Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(archivosACachear);
    })
  );
});

// Cuando se activa el Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker activado");
});

// Interceptamos todas las peticiones
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((respuesta) => {
      return respuesta || fetch(event.request);
    })
  );
});
