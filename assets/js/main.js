// Musuhi LP — スクロール演出と水引コードの描画
(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ヘッダー: スクロールで影をつける
  var header = document.getElementById('site-header');
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // .reveal: ビューポートに入ったらフェードイン
  var reveals = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(function (el) { io.observe(el); });
  }

  // .draw-path: 線が自分で描かれていくアニメーション
  var paths = document.querySelectorAll('.draw-path');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    paths.forEach(function (path) {
      var len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
    });
    var pathIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var path = entry.target;
            path.classList.add('is-drawn');
            // 次フレームでオフセットを0にして transition を発火させる
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                path.style.strokeDashoffset = '0';
              });
            });
            pathIo.unobserve(path);
          }
        });
      },
      { threshold: 0.4 }
    );
    paths.forEach(function (path) { pathIo.observe(path); });
  }
})();
