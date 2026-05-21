/**
 * Top announcement bar.
 *
 * Usage:  <div data-component="top-bar"></div>
 * Or via options: SaigonComponents.topBar({ message, link, tag })
 *
 * State of the close button is persisted in sessionStorage so it stays
 * dismissed across navigations within the same browsing session.
 */
(function (root) {
  'use strict';

  const STORAGE_KEY = 'sgt-topbar-dismissed';
  const DEFAULTS = {
    tag: '🔥 Flash Sale',
    message: 'Tour Phú Quốc &amp; Đà Nẵng giảm đến <strong>20%</strong> — Đặt trước 30/6 còn chỗ!',
    linkHref: 'index.html#tours',
    linkText: 'Xem ngay →'
  };

  function render(host, opts) {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return;

    const cfg = Object.assign({}, DEFAULTS, opts || {});
    host.outerHTML = `
      <div class="top-bar" id="topBar">
        ${cfg.tag ? `<span class="top-bar-tag">${cfg.tag}</span>` : ''}
        <span>${cfg.message}</span>
        ${cfg.linkHref ? `<a href="${cfg.linkHref}">${cfg.linkText}</a>` : ''}
        <button class="top-bar-close" type="button" aria-label="Đóng">✕</button>
      </div>`;

    document.body.classList.add('bar-on');

    const bar = document.getElementById('topBar');
    bar.querySelector('.top-bar-close').addEventListener('click', () => {
      bar.classList.add('hidden');
      document.body.classList.remove('bar-on');
      sessionStorage.setItem(STORAGE_KEY, '1');
    });
  }

  root.SaigonComponents = root.SaigonComponents || {};
  root.SaigonComponents.topBar = render;
})(window);
