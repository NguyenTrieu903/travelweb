/**
 * Simple toast notification.
 * Public API: SaigonToast.show(message, opts?)
 *   opts.icon     – Font Awesome class (default: 'fa-check-circle')
 *   opts.duration – ms before auto-hide (default: 2400)
 */
(function (root) {
  'use strict';

  let toastEl;
  let hideTimer;

  function ensureEl() {
    if (toastEl) return toastEl;
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    toastEl.innerHTML = '<i class="fas fa-check-circle"></i><span></span>';
    document.body.appendChild(toastEl);
    return toastEl;
  }

  function show(message, opts) {
    const o  = Object.assign({ icon: 'fa-check-circle', duration: 2400 }, opts || {});
    const el = ensureEl();
    el.querySelector('i').className = 'fas ' + o.icon;
    el.querySelector('span').textContent = message;

    requestAnimationFrame(() => el.classList.add('on'));

    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => el.classList.remove('on'), o.duration);
  }

  root.SaigonToast = { show };
})(window);
