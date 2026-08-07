// BIMAO OS - Shared sidebar include (single source of truth: partials/sidebar.html)
(function () {
  var slot = document.getElementById('sidebar-slot');
  if (!slot) return;

  fetch('/partials/sidebar.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      slot.outerHTML = html;

      var currentPage = location.pathname.split('/').pop() || 'index.html';
      var activeLinks = document.querySelectorAll('.nav-link[data-nav="' + currentPage + '"]');
      activeLinks.forEach(function (activeLink) {
        activeLink.classList.remove('text-slate-400', 'hover:text-white', 'hover:bg-white/5', 'font-medium');
        activeLink.classList.add('bg-[#00007B]', 'text-white', 'font-semibold', 'shadow-lg', 'shadow-[#00007B]/40');

        var icon = activeLink.querySelector('svg');
        if (icon) {
          icon.classList.remove('text-slate-500');
          icon.classList.add('text-white');
        }
      });

      var backdrop = document.getElementById('mobile-nav-backdrop');
      var drawer = document.getElementById('mobile-nav-drawer');
      var closeBtn = document.getElementById('mobile-nav-close');
      var toggleBtns = document.querySelectorAll('[data-mobile-nav-toggle]');
      if (!backdrop || !drawer) return;

      function openDrawer() {
        backdrop.classList.remove('hidden');
        drawer.classList.remove('-translate-x-full');
        document.body.classList.add('overflow-hidden');
      }
      function closeDrawer() {
        backdrop.classList.add('hidden');
        drawer.classList.add('-translate-x-full');
        document.body.classList.remove('overflow-hidden');
      }

      toggleBtns.forEach(function (btn) { btn.addEventListener('click', openDrawer); });
      backdrop.addEventListener('click', closeDrawer);
      if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });
      drawer.querySelectorAll('a[href]').forEach(function (link) { link.addEventListener('click', closeDrawer); });
    });
})();
