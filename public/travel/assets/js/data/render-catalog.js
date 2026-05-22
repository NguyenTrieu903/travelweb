/**
 * Catalog renderer — mounts DB-backed tour, combo, and service cards
 * into placeholder grids on any page.
 *
 * Usage in HTML:
 *   <div class="tour-grid"   data-catalog="tours"    data-base=""></div>
 *   <div class="combo-grid"  data-catalog="combos"   data-base=""></div>
 *   <div class="srv-grid"    data-catalog="services" data-base=""></div>
 *
 * data-base controls relative URLs for detail page links and images.
 * Use "" from site root, "../" from /pages/ subfolder.
 *
 * Data source: window.SaigonData[<key>], populated by /travel-data/<key>.js
 * (TravelContentApiController::script). If the bridge script has not been
 * loaded yet, this renderer will lazy-load it before mounting.
 */
(function (root) {
  'use strict';

  const BRIDGE_URL = {
    tours:    '/travel-data/tours.js',
    combos:   '/travel-data/combos.js',
    services: '/travel-data/services.js',
  };

  // Map destination slug -> homepage filter region tag.
  // Unknown slugs fall back to "all" so the card still shows.
  const REGION_MAP = {
    'phuquoc': 'nam', 'hcm': 'nam', 'dalat': 'nam', 'vungtau': 'nam', 'muine': 'nam',
    'danang': 'trung', 'hoian': 'trung', 'nhatrang': 'trung', 'hue': 'trung', 'quynhon': 'trung',
    'hanoi': 'bac', 'halong': 'bac', 'sapa': 'bac', 'ninhbinh': 'bac', 'hagiang': 'bac',
    'bangkok': 'quocte', 'singapore': 'quocte', 'bali': 'quocte',
    'thailan': 'quocte', 'dailoan': 'quocte', 'nhatban': 'quocte', 'hanquoc': 'quocte',
  };

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatPriceVnd(n) {
    if (n == null || isNaN(Number(n))) return null;
    return Math.round(Number(n)).toLocaleString('vi-VN') + 'đ';
  }

  function ensureBridge(key) {
    if (root.SaigonData && root.SaigonData[key]) return Promise.resolve();
    const src = BRIDGE_URL[key];
    if (!src) return Promise.reject(new Error('Unknown catalog key: ' + key));
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-catalog-bridge="' + key + '"]');
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('Bridge load failed: ' + src)));
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.dataset.catalogBridge = key;
      s.onload  = () => resolve();
      s.onerror = () => reject(new Error('Bridge load failed: ' + src));
      document.head.appendChild(s);
    });
  }

  function emptyMessage(label) {
    return '<p class="catalog-empty" style="grid-column:1/-1;text-align:center;color:#94a3b8;font-size:.95rem;padding:24px">'
      + escapeHtml(label) + '</p>';
  }

  function regionFor(destSlugs) {
    if (!Array.isArray(destSlugs)) return 'all';
    for (const slug of destSlugs) {
      if (REGION_MAP[slug]) return REGION_MAP[slug];
    }
    return 'all';
  }

  function joinBase(base, page) {
    if (base === '../') return page; // already inside /pages/
    return 'pages/' + page;
  }

  function imgSrc(base, raw) {
    if (!raw) return '';
    if (/^(https?:)?\/\//i.test(raw)) return raw;
    if (raw.startsWith('/')) return raw;
    // Static images sit under /images at site root.
    const rel = raw.replace(/^images\//, '');
    return base + 'images/' + rel;
  }

  function renderTours(mount, destCfg) {
    const tours = (root.SaigonData && root.SaigonData.tours) || [];
    if (!tours.length) {
      mount.innerHTML = emptyMessage('Hiện chưa có tour nào. Vui lòng quay lại sau.');
      return;
    }
    const base = mount.dataset.base || '';
    mount.innerHTML = tours.map((tour) => {
      const region   = regionFor(tour.dest);
      const detail   = joinBase(base, 'tour-detail.html') + '?id=' + encodeURIComponent(tour.id);
      const cfg      = destCfg && tour.dest && tour.dest[0] ? destCfg[tour.dest[0]] : null;
      const destLbl  = cfg ? cfg.label : (tour.dest && tour.dest[0]) || '';
      const price    = formatPriceVnd(tour.price);
      const priceTx  = price || (tour.priceText ? escapeHtml(tour.priceText) : 'Liên hệ');
      const dates    = Array.isArray(tour.dates) && tour.dates.length
        ? tour.dates.slice(0, 3).join(' · ')
        : '';
      const badge    = tour.badge && tour.badge.text
        ? '<span class="tbadge ' + escapeHtml(tour.badge.type || 'hot') + '">' + escapeHtml(tour.badge.text) + '</span>'
        : '';
      return ''
        + '<div class="tcard reveal" data-cat="' + escapeHtml(region) + '" data-href="' + escapeHtml(detail) + '" style="cursor:pointer">'
        +   '<div class="tc-img">'
        +     '<img src="' + escapeHtml(imgSrc(base, tour.img)) + '" alt="' + escapeHtml(tour.title || '') + '" data-fallback="' + escapeHtml(tour.imgFb || 'linear-gradient(135deg,#219EBC,#1B2A4A)') + '">'
        +     '<div class="tc-badges">' + badge + (tour.duration ? '<span class="tbadge dur">' + escapeHtml(tour.duration) + '</span>' : '') + '</div>'
        +     '<button class="tc-fav" type="button" title="Yêu thích"><i class="fas fa-heart"></i></button>'
        +     (destLbl ? '<div class="tc-dest-bar"><div class="tc-dest"><i class="fas fa-map-marker-alt"></i> ' + escapeHtml(destLbl) + '</div></div>' : '')
        +   '</div>'
        +   '<div class="tc-body">'
        +     '<h3 class="tc-name">' + escapeHtml(tour.title || '') + '</h3>'
        +     '<div class="tc-meta">'
        +       (tour.dep     ? '<span><i class="fas fa-map-marker-alt"></i> ' + escapeHtml(tour.dep) + '</span>' : '')
        +       (tour.airline ? '<span><i class="fas fa-plane"></i> ' + escapeHtml(tour.airline) + '</span>' : '')
        +       (dates        ? '<span><i class="fas fa-calendar-alt"></i> ' + escapeHtml(dates) + '</span>' : '')
        +     '</div>'
        +     '<div class="tc-footer">'
        +       '<div class="tc-price"><span class="new-pr">' + priceTx + '</span><span class="per-pr">/người</span></div>'
        +       '<button class="btn-book" type="button" data-book-tour="' + escapeHtml(tour.title || '') + '">Đặt Tour</button>'
        +     '</div>'
        +   '</div>'
        + '</div>';
    }).join('');
  }

  function renderCombos(mount) {
    const map = (root.SaigonData && root.SaigonData.combos) || {};
    const combos = Object.values(map);
    if (!combos.length) {
      mount.innerHTML = emptyMessage('Hiện chưa có combo nào. Vui lòng quay lại sau.');
      return;
    }
    const base = mount.dataset.base || '';
    mount.innerHTML = combos.map((combo) => {
      const detail = joinBase(base, 'combo-detail.html') + '?id=' + encodeURIComponent(combo.id);
      const newP   = formatPriceVnd(combo.newPrice);
      const oldP   = formatPriceVnd(combo.oldPrice);
      const save   = combo.savePct ? 'TIẾT KIỆM ' + combo.savePct + '%' : '';
      const incs   = Array.isArray(combo.components) ? combo.components.slice(0, 5) : [];
      const includes = incs.map((c) =>
        '<li><i class="fas ' + escapeHtml(c.icon || 'fa-check') + '"></i> ' + escapeHtml(c.title || '') + '</li>'
      ).join('');
      return ''
        + '<div class="ccard reveal" data-href="' + escapeHtml(detail) + '" style="cursor:pointer">'
        +   '<div class="cc-img">'
        +     '<img src="' + escapeHtml(imgSrc(base, combo.img)) + '" alt="' + escapeHtml(combo.name || '') + '" data-fallback="linear-gradient(135deg,#0096C7,#0077B6)">'
        +     (combo.badge ? '<div class="cc-tag">' + escapeHtml(combo.badge) + '</div>' : '')
        +     (save ? '<div class="cc-save">' + escapeHtml(save) + '</div>' : '')
        +   '</div>'
        +   '<div class="cc-body">'
        +     '<div class="cc-dest"><i class="fas fa-map-marker-alt"></i> ' + escapeHtml(combo.dest || '') + (combo.duration ? ' · ' + escapeHtml(combo.duration) : '') + '</div>'
        +     '<div class="cc-name">' + escapeHtml(combo.name || '') + '</div>'
        +     (includes ? '<ul class="cc-inc">' + includes + '</ul>' : '')
        +     '<div class="cc-foot">'
        +       '<div class="cc-pr-wrap">'
        +         (oldP ? '<span class="cc-old">' + oldP + '</span>' : '')
        +         (newP ? '<span class="cc-new">' + newP + '</span>' : '')
        +         '<span class="cc-per">/người · 2 người đặt cùng</span>'
        +       '</div>'
        +       '<button class="btn-combo" type="button" data-book-tour="' + escapeHtml(combo.name || '') + '">Đặt Combo</button>'
        +     '</div>'
        +   '</div>'
        + '</div>';
    }).join('');
  }

  function renderServices(mount) {
    const map = (root.SaigonData && root.SaigonData.services) || {};
    const services = Object.values(map);
    if (!services.length) {
      mount.innerHTML = emptyMessage('Hiện chưa có dịch vụ nào. Vui lòng quay lại sau.');
      return;
    }
    const base = mount.dataset.base || '';
    const gradients = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'];
    mount.innerHTML = services.map((service, idx) => {
      const detail = joinBase(base, 'service-detail.html') + '?id=' + encodeURIComponent(service.id);
      const gClass = gradients[idx % gradients.length];
      const icon   = service.badgeIcon || 'fas fa-star';
      const tagBits = [];
      if (Array.isArray(service.qbar)) {
        service.qbar.slice(0, 3).forEach((q) => {
          if (q && q.value) tagBits.push('<span class="srv-tag">' + escapeHtml(q.value) + '</span>');
        });
      }
      return ''
        + '<div class="srv reveal" data-href="' + escapeHtml(detail) + '" style="cursor:pointer">'
        +   '<div class="srv-top ' + gClass + '">'
        +     '<img src="' + escapeHtml(imgSrc(base, service.img)) + '" alt="' + escapeHtml(service.name || '') + '" data-fallback="' + escapeHtml(service.imgFallback || 'linear-gradient(135deg,#1B2A4A,#E85D04)') + '">'
        +     '<i class="' + escapeHtml(icon) + '" style="position:relative;z-index:2"></i>'
        +   '</div>'
        +   '<div class="srv-body">'
        +     '<h3 class="srv-ttl">' + escapeHtml(service.name || '') + '</h3>'
        +     '<p class="srv-dsc">' + escapeHtml(service.sub || '') + '</p>'
        +     (tagBits.length ? '<div class="srv-tags">' + tagBits.join('') + '</div>' : '')
        +   '</div>'
        + '</div>';
    }).join('');
  }

  function attachImageFallbacks(scope) {
    scope.querySelectorAll('img[data-fallback]').forEach((img) => {
      img.addEventListener('error', () => {
        if (img.parentElement) img.parentElement.style.background = img.dataset.fallback;
        img.style.display = 'none';
      }, { once: true });
    });
  }

  function bootstrap() {
    const tourMount    = document.querySelector('[data-catalog="tours"]');
    const comboMount   = document.querySelector('[data-catalog="combos"]');
    const serviceMount = document.querySelector('[data-catalog="services"]');

    const work = [];
    if (tourMount)    work.push(ensureBridge('tours'));
    if (comboMount)   work.push(ensureBridge('combos'));
    if (serviceMount) work.push(ensureBridge('services'));

    if (!work.length) return;

    Promise.all(work).then(() => {
      const destCfg = (root.SaigonData && root.SaigonData.destCfg) || {};
      if (tourMount)    { renderTours(tourMount, destCfg); attachImageFallbacks(tourMount); }
      if (comboMount)   { renderCombos(comboMount);        attachImageFallbacks(comboMount); }
      if (serviceMount) { renderServices(serviceMount);    attachImageFallbacks(serviceMount); }

      // Reveal-on-scroll for freshly-rendered cards (main.js attached its
      // observer on load, before our cards existed).
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on'); });
      }, { threshold: 0.12 });
      document.querySelectorAll('[data-catalog] .reveal').forEach((el) => io.observe(el));
    }).catch((err) => {
      console.error('[render-catalog]', err);
      if (tourMount    && !tourMount.children.length)    tourMount.innerHTML    = emptyMessage('Không tải được danh sách tour.');
      if (comboMount   && !comboMount.children.length)   comboMount.innerHTML   = emptyMessage('Không tải được danh sách combo.');
      if (serviceMount && !serviceMount.children.length) serviceMount.innerHTML = emptyMessage('Không tải được danh sách dịch vụ.');
    });
  }

  // Delegated click handler for dynamically-rendered cards.
  document.addEventListener('click', (e) => {
    const fav = e.target.closest('.tc-fav');
    if (fav) {
      e.stopPropagation();
      const active = fav.dataset.active === '1';
      fav.dataset.active = active ? '0' : '1';
      fav.style.background = active ? '' : 'var(--or, #E85D04)';
      fav.style.color      = active ? '' : '#fff';
      return;
    }
    const book = e.target.closest('[data-book-tour]');
    if (book) {
      e.stopPropagation();
      const name = book.dataset.bookTour || 'tour';
      if (root.SaigonToast)                          root.SaigonToast.show('Đã gửi yêu cầu đặt: ' + name);
      else if (typeof root.bookTour === 'function')  root.bookTour(name);
      return;
    }
    const link = e.target.closest('[data-href]');
    if (link && !e.target.closest('button, a')) {
      root.location.href = link.dataset.href;
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})(window);