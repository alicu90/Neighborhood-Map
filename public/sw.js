// Service worker & cache files
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('neighborhood-map-1').then((cache) => {
			return cache.addAll([
			    '../src/css/App.css',
			    '../src/App.js',
			    '../src/index.css',
                '../src/components/Map.js',
                '../src/components/MapErrorBoundary.js',
                '../src/components/Sidebar.js',
                '../src/components/Venue.js',
                '../src/components/VenueErrorBoundary.js',
                '../src/components/VenueSearch.js',
                '../src/components/VenuesList.js',
			    'index.html'
			]);
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request, {ignoreSearch: true}).then((response) => {
			return response || fetch(event.request);
		})
	);
});