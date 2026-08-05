// BIMAO OS - Shared sidebar include (single source of truth: partials/sidebar.html)
(function () {
  var slot = document.getElementById('sidebar-slot');
  if (!slot) return;

  fetch('/partials/sidebar.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      slot.outerHTML = html;

      var currentPage = location.pathname.split('/').pop() || 'index.html';
      var activeLink = document.querySelector('.nav-link[data-nav="' + currentPage + '"]');
      if (!activeLink) return;

      activeLink.classList.remove('text-slate-400', 'hover:text-white', 'hover:bg-white/5', 'font-medium');
      activeLink.classList.add('bg-[#00007B]', 'text-white', 'font-semibold', 'shadow-lg', 'shadow-[#00007B]/40');

      var icon = activeLink.querySelector('svg');
      if (icon) {
        icon.classList.remove('text-slate-500');
        icon.classList.add('text-white');
      }
    });
})();
