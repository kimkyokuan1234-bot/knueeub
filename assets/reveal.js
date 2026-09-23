// 스크롤 시 섹션이 부드럽게 나타나도록 (동작 최소화 설정 시 비활성)
// index.html, workshops/*.html 공용
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
  // threshold를 0으로 두어야 뷰포트보다 긴 섹션도 조건이 충족된다
  items.forEach(function (el) { io.observe(el); });
})();

// 앵커(#...)로 들어왔을 때, 이미지가 늦게 로드되며 생기는 위치 밀림 보정.
// 사용자가 직접 스크롤했으면 건드리지 않는다.
(function () {
  if (!location.hash) return;
  var moved = false;
  ['wheel', 'touchmove', 'keydown'].forEach(function (t) {
    window.addEventListener(t, function () { moved = true; }, { passive: true, once: true });
  });
  function jump() {
    if (moved) return;
    var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el) el.scrollIntoView();
  }
  window.addEventListener('load', function () { jump(); setTimeout(jump, 400); });
})();
