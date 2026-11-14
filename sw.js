// 앱 설치용 최소 서비스 워커 (오프라인 저장은 안 함)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
