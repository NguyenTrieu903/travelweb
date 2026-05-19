/**
 * Lightbox for galleries with swipe/keyboard nav.
 *
 * Usage:
 *   SaigonLightbox.open(items, startIndex)
 *     items: array of { src, caption? }  OR  plain string urls
 */
(function (root) {
  'use strict';

  let modal, imgEl, capEl;
  let items = [];
  let idx = 0;
  let touchStartX = null;

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement('div');
    modal.className = 'lightbox';
    modal.innerHTML = `
      <button class="lb-close" type="button" aria-label="Đóng"><i class="fas fa-times"></i></button>
      <button class="lb-prev" type="button" aria-label="Trước"><i class="fas fa-chevron-left"></i></button>
      <img class="lb-img" alt="">
      <button class="lb-next" type="button" aria-label="Sau"><i class="fas fa-chevron-right"></i></button>
      <div class="lb-caption"></div>`;
    document.body.appendChild(modal);

    imgEl = modal.querySelector('.lb-img');
    capEl = modal.querySelector('.lb-caption');

    modal.querySelector('.lb-close').addEventListener('click', close);
    modal.querySelector('.lb-prev').addEventListener('click', () => move(-1));
    modal.querySelector('.lb-next').addEventListener('click', () => move(1));
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    modal.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    modal.addEventListener('touchend',   (e) => {
      if (touchStartX == null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1);
      touchStartX = null;
    });
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('on')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft')  move(-1);
      if (e.key === 'ArrowRight') move(1);
    });

    return modal;
  }

  function show() {
    const item = items[idx];
    const src   = typeof item === 'string' ? item : item.src;
    const caption = typeof item === 'string' ? '' : (item.caption || '');
    imgEl.src = src;
    capEl.textContent = caption;
    capEl.style.display = caption ? 'block' : 'none';
  }

  function move(delta) {
    if (!items.length) return;
    idx = (idx + delta + items.length) % items.length;
    show();
  }

  function open(list, startIndex) {
    items = list || [];
    idx = Math.max(0, Math.min(startIndex || 0, items.length - 1));
    ensureModal().classList.add('on');
    document.body.style.overflow = 'hidden';
    show();
  }

  function close() {
    modal.classList.remove('on');
    document.body.style.overflow = '';
  }

  root.SaigonLightbox = { open, close, next: () => move(1), prev: () => move(-1) };
})(window);
