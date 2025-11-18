// Service Worker para Revista Digital - Colegio San Francisco IED - PRODUCCIÓN
const CACHE_NAME = 'revista-digital-csf-v2.2';
const OFFLINE_URL = '/offline.html';
const API_CACHE_NAME = 'revista-api-cache-v1';

// Archivos críticos para cachear
const STATIC_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/offline.html',
    '/manifest.json',
    '/api/health'
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
                    if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
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

    // Para requests de API, usar estrategia Network First
    if (event.request.url.includes('/api/')) {
        event.respondWith(handleApiRequest(event.request));
        return;
    }

    // Para recursos estáticos, usar estrategia Cache First
    event.respondWith(handleStaticRequest(event.request));
});

// Manejo de requests de API
async function handleApiRequest(request) {
    const cache = await caches.open(API_CACHE_NAME);
    
    try {
        // Intentar obtener de la red primero
        const networkResponse = await fetch(request);
        
        // Si la respuesta es exitosa, cachearla
        if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            cache.put(request, responseToCache);
        }
        
        return networkResponse;
    } catch (error) {
        // Si falla la red, intentar obtener del cache
        console.log('🌐 Error de red para API, buscando en cache...');
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Si no hay cache, devolver error
        return new Response(
            JSON.stringify({ 
                error: 'Sin conexión y sin datos en cache',
                offline: true 
            }), {
                status: 503,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// Manejo de requests estáticos
async function handleStaticRequest(request) {
    const cache = await caches.open(CACHE_NAME);
    
    try {
        // Primero intentar obtener del cache
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        // Si no está en cache, hacer fetch a la red
        const networkResponse = await fetch(request);
        
        // Si la respuesta es válida, cachearla
        if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            cache.put(request, responseToCache);
        }
        
        return networkResponse;
    } catch (error) {
        console.log('🌐 Error de red, mostrando página offline');
        
        // Si es una navegación HTML, mostrar página offline
        if (request.destination === 'document' || request.mode === 'navigate') {
            return cache.match(OFFLINE_URL);
        }
        
        // Para otros recursos, devolver fallback
        return new Response('Recurso no disponible sin conexión', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Manejo de mensajes desde la app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_API_DATA') {
        cacheApiData(event.data.payload);
    }
});

// Función para cachear datos de API
async function cacheApiData(data) {
    const cache = await caches.open(API_CACHE_NAME);
    
    // Cachear endpoints comunes
    const endpoints = [
        '/api/articles?status=published',
        '/api/users'
    ];
    
    for (const endpoint of endpoints) {
        const url = new URL(endpoint, self.location.origin).href;
        const response = new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });
        
        await cache.put(url, response);
    }
}

// Sincronización en background
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('🔄 Sincronización en background iniciada');
        event.waitUntil(doBackgroundSync());
    }
});

// Función para sincronización en background
async function doBackgroundSync() {
    try {
        // Aquí iría la lógica de sincronización de datos pendientes
        console.log('✅ Sincronización completada');
    } catch (error) {
        console.error('❌ Error en sincronización:', error);
    }
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

console.log('🚀 Service Worker cargado correctamente para producción');