// 대신봐쫑 서비스 워커: 앱 설치 + 휴대폰 상단 알림
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});

// 서버(쫑이)가 "다 했어요" 신호를 보내면 → 앱이 꺼져 있어도 상단 배너
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) {}
  e.waitUntil(self.registration.showNotification(d.title || '🐶 쫑이가 다 봤어요!', {
    body: d.body || '결론 나왔어요! 눌러서 확인하세요',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    tag: 'jjongi',
    renotify: true,
    vibrate: [200, 100, 200]
  }));
});

// 알림 누르면 앱 열기 (열려 있으면 그 화면으로)
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      return self.clients.openWindow('./');
    })
  );
});
