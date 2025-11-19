// Service Worker para Revista Digital - Colegio San Francisco IED
const CACHE_NAME = 'revista-digital-v2.1';
const OFFLINE_URL = 'offline.html';

// Archivos críticos para cachear
const STATIC_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/offline.html',
    '/manifest.json',
    'https://www.redacademica.edu.co/sites/default/files/2025-01/Enero%2024_1.png'
];

// Archivos de recursos estáticos
const STATIC_RESOURCES = [
    // Iconos y recursos locales (agregar según necesidad)
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    console.log('🔄 Service Worker instalándose...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Cacheando archivos estáticos...');
                return cache.addAll(STATIC_CACHE);
            })
            .then(() => {
                console.log('✅ Service Worker instalado correctamente');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('❌ Error durante la instalación:', error);
            })
    );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
    console.log('🎯 Service Worker activándose...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Service Worker activado correctamente');
            return self.clients.claim();
        })
    );
});

// Estrategia: Cache First con fallback a Network
self.addEventListener('fetch', (event) => {
    // Solo manejar requests HTTP/HTTPS
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Si existe en cache, devolverlo
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Si no está en cache, hacer fetch a la red
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Si la respuesta es válida, cachearla
                        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                        }
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.log('🌐 Error de red, mostrando página offline');
                        
                        // Si es una navegación HTML, mostrar página offline
                        if (event.request.destination === 'document') {
                            return caches.match(OFFLINE_URL);
                        }
                        
                        // Para otros recursos, puedes retornar un fallback
                        return new Response('Recurso no disponible sin conexión', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// Manejo de mensajes desde la app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Sincronización en background
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('🔄 Sincronización en background iniciada');
        event.waitUntil(doBackgroundSync());
    }
});

// Función para sincronización en background
function doBackgroundSync() {
    return Promise.resolve()
        .then(() => {
            // Aquí iría la lógica de sincronización
            // Por ejemplo, enviar artículos pendientes cuando haya conexión
            console.log('✅ Sincronización completada');
        })
        .catch((error) => {
            console.error('❌ Error en sincronización:', error);
        });
}

// Manejo de notificaciones push
self.addEventListener('push', (event) => {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body || 'Nueva notificación de la Revista Digital',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        tag: data.tag || 'revista-notification',
        data: data.url || '/',
        actions: [
            {
                action: 'open',
                title: 'Abrir Revista'
            },
            {
                action: 'close',
                title: 'Cerrar'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Revista Digital', options)
    );
});

// Manejo de clics en notificaciones
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'open') {
        event.waitUntil(
            clients.matchAll({ type: 'window' })
                .then((clientList) => {
                    // Buscar si ya hay una ventana abierta
                    for (const client of clientList) {
                        if (client.url.includes(self.location.origin) && 'focus' in client) {
                            return client.focus();
                        }
                    }
                    // Si no hay ventana abierta, abrir una nueva
                    if (clients.openWindow) {
                        return clients.openWindow(event.notification.data || '/');
                    }
                })
        );
    }
});

// Manejo de actualizaciones de contenido
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'content-update') {
        event.waitUntil(updateContent());
    }
});

// Función para actualizar contenido periódicamente
function updateContent() {
    return caches.open(CACHE_NAME)
        .then((cache) => {
            return fetch('/')
                .then((response) => {
                    if (response.status === 200) {
                        cache.put('/', response);
                    }
                })
                .catch((error) => {
                    console.log('No se pudo actualizar el contenido:', error);
                });
        });
}

console.log('🚀 Service Worker cargado correctamente');