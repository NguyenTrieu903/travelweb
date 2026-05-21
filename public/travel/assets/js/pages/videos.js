/**
 * Videos page controller — renders featured + grid, filter, video modal.
 */
(function () {
  'use strict';

  let modal, iframeEl, videoEl, capCat, capTtl;

  function init() {
    const data = (window.SaigonData && window.SaigonData.videos) || { featured: null, list: [] };
    const grid = document.getElementById('videoGrid');
    const base = grid.dataset.base || '../';

    renderFeatured(data.featured, base);
    renderGrid(data.list, base, grid);
    initFilter();
    initModal();
    updateCounts(data.list);
  }

  function renderFeatured(f, base) {
    if (!f) return;
    const player = document.getElementById('fv-player');
    const info   = document.getElementById('fv-info');
    if (player) {
      player.innerHTML = `
        <img src="${base}${f.thumb}" alt="${escapeAttr(f.title)}">
        <button class="fv-play" type="button" aria-label="Play"><i class="fas fa-play"></i></button>`;
      player.addEventListener('click', () => openVideo(f.src, f.title, f.cat, false));
    }
    if (info) {
      info.innerHTML = `
        <div class="fv-cat"><i class="fas fa-fire"></i> Video Nổi Bật</div>
        <h2>${f.title}</h2>
        <p>${f.description}</p>
        <div class="fv-meta">
          <div class="fv-meta-item"><i class="fas fa-clock"></i> ${f.duration}</div>
          <div class="fv-meta-item"><i class="fas fa-eye"></i> ${f.views}</div>
          <div class="fv-meta-item"><i class="fas fa-calendar"></i> ${f.date}</div>
        </div>
        <button class="fv-btn" type="button"><i class="fas fa-play-circle"></i> Xem Ngay</button>`;
      info.querySelector('.fv-btn').addEventListener('click', () => openVideo(f.src, f.title, f.cat, false));
    }
  }

  function renderGrid(list, base, grid) {
    grid.innerHTML = list.map((v, i) => {
      const badge   = v.badge   ? `<span class="vc-badge ${v.badge.type}">${v.badge.text}</span>` : '';
      const isLocal = !!v.local;
      const dur     = isLocal
        ? `<span class="vc-dur"><i class="fas fa-video vc-dur-icon"></i> ${v.duration}</span>`
        : `<span class="vc-dur">${v.duration}</span>`;
      const footLeft  = v.footLeft  || { icon:'fa-eye',      text: v.views || '' };
      const footRight = v.footRight || { icon:'fa-calendar', text: v.date  || '' };
      return `
        <div class="vcard" data-cat="${v.cat}" data-idx="${i}" data-delay="${i * 60}">
          <div class="vc-thumb">
            <img src="${base}${v.thumb}" alt="${escapeAttr(v.title)}" data-fallback="${escapeAttr(v.thumbFb || '')}">
            ${badge}
            ${dur}
            <button class="vc-play" type="button"><i class="fas fa-play"></i></button>
          </div>
          <div class="vc-body">
            <div class="vc-cat">${v.catLabel}</div>
            <h3 class="vc-ttl">${v.title}</h3>
            <p class="vc-dsc">${v.desc}</p>
            <div class="vc-foot">
              <span><i class="fas ${footLeft.icon}"></i> ${footLeft.text}</span>
              <span><i class="fas ${footRight.icon}"></i> ${footRight.text}</span>
            </div>
          </div>
        </div>`;
    }).join('');
    grid.querySelectorAll('.vcard[data-delay]').forEach((card) => {
      card.style.animationDelay = card.dataset.delay + 'ms';
    });
    bindImageFallbacks(grid);

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.vcard');
      if (!card) return;
      const v = list[parseInt(card.dataset.idx, 10)];
      const src = v.local ? (base + v.src) : v.src;
      openVideo(src, v.title, v.catLabel, !!v.local);
    });
  }

  function initFilter() {
    document.querySelectorAll('.ftab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.ftab').forEach((b) => b.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.cat;
        document.querySelectorAll('.vcard').forEach((c) => {
          c.classList.toggle('hidden', !(cat === 'all' || c.dataset.cat === cat));
        });
      });
    });
  }

  function updateCounts(list) {
    const counts = list.reduce((acc, v) => {
      acc[v.cat] = (acc[v.cat] || 0) + 1;
      return acc;
    }, {});
    document.querySelectorAll('.ftab').forEach((tab) => {
      const cat = tab.dataset.cat;
      const total = cat === 'all' ? list.length : (counts[cat] || 0);
      const cnt = tab.querySelector('.count');
      if (cnt) cnt.textContent = total;
    });
  }

  function initModal() {
    modal     = document.getElementById('vmodal');
    iframeEl  = document.getElementById('vmIframe');
    videoEl   = document.getElementById('vmVideo');
    capCat    = document.getElementById('vmcCat');
    capTtl    = document.getElementById('vmcTtl');

    modal.addEventListener('click', (e) => { if (e.target === modal) closeVideo(); });
    modal.querySelector('.vmodal-close').addEventListener('click', closeVideo);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideo(); });
  }

  function openVideo(src, title, cat, isLocal) {
    if (isLocal) {
      iframeEl.src = '';
      iframeEl.style.display = 'none';
      videoEl.src = src;
      videoEl.style.display = 'block';
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
      videoEl.src = '';
      videoEl.style.display = 'none';
      iframeEl.style.display = 'block';
      iframeEl.src = 'https://www.youtube.com/embed/' + src + '?autoplay=1&rel=0';
    }
    capTtl.textContent = title || '';
    capCat.textContent = cat || '';
    modal.classList.add('on');
    document.body.style.overflow = 'hidden';
  }

  function closeVideo() {
    iframeEl.src = '';
    iframeEl.style.display = 'block';
    videoEl.pause();
    videoEl.src = '';
    videoEl.style.display = 'none';
    modal.classList.remove('on');
    document.body.style.overflow = '';
  }

  function escapeAttr(s) { return String(s).replace(/"/g, '&quot;'); }
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
