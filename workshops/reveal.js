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
