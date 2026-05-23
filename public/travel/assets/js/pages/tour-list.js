/**
 * tour-list page controller.
 * Depends on:
 *   - window.SaigonData.tours, window.SaigonData.destCfg
 *   - DOM: #filterChips, #sortSelect, #tourGrid, #noResults, #listCount,
 *          #hero-tag, #hero-title, #hero-sub, #stat-dest, #stat-count, #bc-dest
 */
(function () {
  'use strict';

  const detailHref = (id) => 'tour-detail.html?id=' + encodeURIComponent(id);
  let activeFilter = 'all';
  let currentDest  = 'all';
  let basePath = '../';

  function init() {
    const TOURS    = (window.SaigonData && window.SaigonData.tours)   || [];
    const DEST_CFG = (window.SaigonData && window.SaigonData.destCfg) || {};
    basePath = document.body.dataset.base || '../';

    currentDest = new URLSearchParams(window.location.search).get('destination') || 'all';
    const cfg = DEST_CFG[currentDest];
    if (cfg) {
      document.title = cfg.tag + ' — SaigonTeam';
      setText('hero-tag',   cfg.tag);
      setText('hero-title', cfg.label);
      setText('hero-sub',   cfg.sub);
      setText('stat-dest',  cfg.label);
      setText('bc-dest',    cfg.label);
    }

    document.getElementById('filterChips').addEventListener('click', (e) => {
      const btn = e.target.closest('.fb-chip');
      if (!btn) return;
      document.querySelectorAll('.fb-chip').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      render(TOURS);
    });

    document.getElementById('sortSelect').addEventListener('change', () => render(TOURS));

    render(TOURS);
  }

  function render(TOURS) {
    const sort = document.getElementById('sortSelect').value;
    let list = TOURS.filter((t) => {
      const destMatch   = currentDest === 'all' || t.dest.includes(currentDest);
      const filterMatch = activeFilter === 'all' || t.filters.includes(activeFilter);
      return destMatch && filterMatch;
    });
    if (sort === 'price-asc')  list.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sort === 'price-desc') list.sort((a, b) => (b.price || 0) - (a.price || 0));

    const total = TOURS.filter((t) => currentDest === 'all' || t.dest.includes(currentDest)).length;
    setText('stat-count', total + ' tour khả dụng');
    document.getElementById('listCount').innerHTML =
      'Hiển thị <strong>' + list.length + '</strong> tour' +
      (activeFilter !== 'all' ? ' (đã lọc)' : '');

    const grid  = document.getElementById('tourGrid');
    const noRes = document.getElementById('noResults');
    if (!list.length) {
      grid.innerHTML = '';
      noRes.classList.remove('is-hidden');
      return;
    }
    noRes.classList.add('is-hidden');
    grid.innerHTML = list.map(buildCard).join('');

    grid.onclick = (e) => {
      const card = e.target.closest('.tc');
      if (!card) return;
      window.location.href = detailHref(card.dataset.id);
    };
    bindImageFallbacks(grid);
  }

  function buildCard(t) {
    const badge = t.badge ? `<div class="tc-badge ${t.badge.type}">${t.badge.text}</div>` : '';
    const tags  = t.tags.map((tg) => `<span class="tc-tag ${tg.c || ''}">${tg.l}</span>`).join('');
    const dates = (t.dates || []).slice(0, 4).map((d, i) => {
      if (i === 0) return `<span class="tc-date highlight">${d}</span>`;
      if (i === 3 && t.dates.length > 4) return `<span class="tc-date more">...</span>`;
      return `<span class="tc-date">${d}</span>`;
    }).join('');

    const priceBlock = t.price
      ? `<div><div class="tc-price-lbl">Giá từ</div>
           <div class="tc-price-val">${t.priceText} <span class="tc-price-unit">đ</span></div>
         </div>`
      : `<div><div class="tc-price-lbl">Giá từ</div>
           <div class="tc-price-val tc-price-contact">${t.priceText}</div>
         </div>`;

    return `
      <div class="tc" data-id="${t.id}">
        <div class="tc-img-wrap">
          <img src="${assetUrl(t.img)}" alt="${escapeAttr(t.title)}" data-fallback="${escapeAttr(t.imgFb || '')}">
          ${badge}
          <div class="tc-dur">${t.duration}</div>
        </div>
        <div class="tc-body">
          <div class="tc-tags">${tags}</div>
          <div class="tc-title">${t.title}</div>
          ${t.summary ? `<div class="tc-summary">${escapeHtml(t.summary)}</div>` : ''}
          <div class="tc-meta">
            <div class="tc-meta-row"><i class="fas fa-map-marker-alt"></i>Khởi hành từ ${t.dep}</div>
            <div class="tc-meta-row"><i class="fas fa-plane"></i>${t.airline}</div>
          </div>
          ${dates ? `<div class="tc-dates">${dates}</div>` : ''}
          <div class="tc-footer">
            ${priceBlock}
            <button class="tc-btn" type="button" data-detail>Chi tiết</button>
          </div>
        </div>
      </div>`;
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }
  function escapeAttr(s) { return String(s).replace(/"/g, '&quot;'); }
  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  function assetUrl(value) {
    const raw = String(value || '');
    if (!raw) return '';
    if (/^(https?:)?\/\//i.test(raw) || raw.startsWith('/')) return raw;
    return basePath + raw;
  }
  function bindImageFallbacks(scope) {
    scope.querySelectorAll('img[data-fallback]').forEach((img) => {
      img.addEventListener('error', () => {
        img.parentElement.style.background = img.dataset.fallback;
        img.style.display = 'none';
      }, { once: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
