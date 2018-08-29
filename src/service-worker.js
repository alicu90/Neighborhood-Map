// Service worker 
export default function registerLocalServiceWorker() {
    const swPath = 'sw.js';
    if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'production') {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register(swPath).then(function(registration) {
          // Registration successful
          console.log('ServiceWorker registration successful with scope: ',
                      registration.scope);
        }, function(err) {
          // Registration fail
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
}