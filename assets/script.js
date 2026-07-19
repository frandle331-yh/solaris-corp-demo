/* SOLARIS demo — interactions */
(function () {
  var hdr = document.getElementById('hdr');
  var menuBtn = document.getElementById('menuBtn');

  /* header: transparent over hero -> solid on scroll (always solid on subpages) */
  var isTop = !!document.querySelector('.hero');
  function onScroll() {
    if (!isTop || window.scrollY > 40) hdr.classList.add('is-solid');
    else if (!hdr.classList.contains('is-open')) hdr.classList.remove('is-solid');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile drawer */
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      hdr.classList.toggle('is-open');
      onScroll();
    });
    document.querySelectorAll('.drawer a').forEach(function (a) {
      a.addEventListener('click', function () {
        hdr.classList.remove('is-open');
        onScroll();
      });
    });
  }

  /* scroll reveal */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-on');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-on'); });
  }
})();
