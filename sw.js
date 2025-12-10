// Premium Service Worker for HLPFL Link-in-Bio
const CACHE_NAME = 'hlpfl-premium-v1';
const urlsToCache = [
  '/',
  '/index-premium.html',
  '/style-premium.css',
  '/script-premium.js',
  '/manifest.json',
  '/admin-premium.html',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          // Offline fallback for HTML pages
          if (event.request.destination === 'document') {
            return caches.match('/index-premium.html');
          }
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for analytics
self.addEventListener('sync', event => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

// Push notification handling
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update from HLPFL',
    icon: '/images/icon-192x192.png',
    badge: '/images/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/images/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('HLPFL Update', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Sync analytics function
function syncAnalytics() {
  // Get stored analytics from IndexedDB
  return getStoredAnalytics().then(analytics => {
    if (analytics.length > 0) {
      // Send analytics to server
      return sendAnalyticsToServer(analytics).then(() => {
        // Clear stored analytics
        clearStoredAnalytics();
      });
    }
  });
}

// Mock functions for analytics storage (would implement IndexedDB in production)
function getStoredAnalytics() {
  return Promise.resolve([]);
}

function sendAnalyticsToServer(analytics) {
  // Would send to actual analytics endpoint
  console.log('Syncing analytics:', analytics);
  return Promise.resolve();
}

function clearStoredAnalytics() {
  // Would clear IndexedDB storage
  return Promise.resolve();
}