/**
 * Gallery page controller — renders masonry, handles filtering,
 * and opens the shared SaigonLightbox.
 */
(function () {
  'use strict';

  function init() {
    const items = (window.SaigonData && window.SaigonData.gallery) || [];
    const grid  = document.getElementById('masonry');
    const base  = grid.dataset.base || '../';

    grid.innerHTML = items.map((it, i) => `
      <div class="m-item" data-cat="${it.cat}" data-idx="${i}" data-delay="${i * 40}">
        <img src="${assetUrl(it.src, base)}" alt="${escapeAttr(it.title)}">
        <div class="m-item-ov"></div>
        <div class="m-item-info">
          <div class="m-item-cat">${it.catLabel}</div>
          <div class="m-item-ttl">${it.title}</div>
        </div>
        <div class="m-item-zoom"><i class="fas fa-search-plus"></i></div>
      </div>`).join('');

    updateCounts(items);
    grid.querySelectorAll('.m-item[data-delay]').forEach((item) => {
      item.style.animationDelay = item.dataset.delay + 'ms';
    });

    document.querySelectorAll('.ftab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.ftab').forEach((b) => b.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.cat;
        document.querySelectorAll('.m-item').forEach((el) => {
          el.classList.toggle('hidden', !(cat === 'all' || el.dataset.cat === cat));
        });
      });
    });

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.m-item');
      if (!card) return;
      const visible = Array.from(document.querySelectorAll('.m-item:not(.hidden)'));
      const start = visible.indexOf(card);
      const lbItems = visible.map((el) => {
        const i = parseInt(el.dataset.idx, 10);
        const data = items[i];
        return { src: assetUrl(data.src, base), caption: data.catLabel + ' · ' + data.title };
      });
      if (window.SaigonLightbox) window.SaigonLightbox.open(lbItems, start);
    });
  }

  function updateCounts(items) {
    const counts = items.reduce((acc, it) => {
      acc[it.cat] = (acc[it.cat] || 0) + 1;
      return acc;
    }, {});
    document.querySelectorAll('.ftab').forEach((tab) => {
      const cat   = tab.dataset.cat;
      const total = cat === 'all' ? items.length : (counts[cat] || 0);
      const cnt   = tab.querySelector('.count');
      if (cnt) cnt.textContent = total;
    });
  }

  function escapeAttr(s) { return String(s).replace(/"/g, '&quot;'); }
  function assetUrl(value, base) {
    const raw = String(value || '');
    if (!raw) return '';
    if (/^(https?:)?\/\//i.test(raw) || raw.startsWith('/')) return raw;
    return base + raw;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
