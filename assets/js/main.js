/**
 * Main entry point — scans the DOM for <div data-component="..."> hosts
 * and injects the matching component via window.SaigonComponents.
 *
 * Load order in HTML:
 *   <script src="assets/js/components/toast.js"></script>
 *   <script src="assets/js/components/lightbox.js"></script>
 *   <script src="assets/js/components/top-bar.js"></script>
 *   <script src="assets/js/components/header.js"></script>
 *   <script src="assets/js/components/footer.js"></script>
 *   <script src="assets/js/components/float-social.js"></script>
 *   <script src="assets/js/main.js"></script>
 */
(function () {
  'use strict';

  function nameToFn(name) {
    return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  }

  function hydrate() {
    document.querySelectorAll('[data-component]').forEach((host) => {
      const name = host.dataset.component;
      const fn = window.SaigonComponents && window.SaigonComponents[nameToFn(name)];
      if (typeof fn === 'function') {
        fn(host);
      } else {
        console.warn('[SaigonComponents] no renderer for "' + name + '"');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrate);
  } else {
    hydrate();
  }

  // Generic data-action click handler
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-action]');
    if (!trigger) return;
    const action = trigger.dataset.action;

    if (action === 'book-tour' && window.SaigonToast) {
      const name = trigger.dataset.tourName || 'tour';
      window.SaigonToast.show('Đã gửi yêu cầu đặt: ' + name);
    }
    if (action === 'scroll-to') {
      const target = document.getElementById(trigger.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
    if (action === 'lightbox-open' && window.SaigonLightbox) {
      try {
        const items = JSON.parse(trigger.dataset.items || '[]');
        const start = parseInt(trigger.dataset.start || '0', 10);
        window.SaigonLightbox.open(items, start);
      } catch (err) {
        console.warn('[lightbox] invalid data-items', err);
      }
    }
  });

  // Reveal-on-scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on'); });
  }, { threshold: 0.12 });
  window.addEventListener('load', () => {
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  });
})();
