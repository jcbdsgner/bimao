// BIMAO OS - Page transition motion
(function () {
  var LEAVE_MS = document.body.classList.contains('fast-nav') ? 0 : 220;

  window.addEventListener('DOMContentLoaded', function () {
    requestAnimationFrame(function () {
      document.body.classList.add('page-enter');
    });
  });

  window.bmaNavigate = function (url) {
    document.body.classList.remove('page-enter');
    document.body.classList.add('page-leave');
    setTimeout(function () {
      window.location.href = url;
    }, LEAVE_MS);
  };

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var link = e.target.closest('a[href]');
    if (!link) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;
    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;

    if (link.hasAttribute('data-logout')) {
      sessionStorage.removeItem('bimao_auth');
    }

    e.preventDefault();
    window.bmaNavigate(href);
  });
})();
