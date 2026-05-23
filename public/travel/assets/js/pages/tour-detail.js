/**
 * tour-detail page controller.
 * Reuses tour listing data for a lightweight static detail page.
 */
(function () {
  'use strict';

  let currentTour = null;
  let guestCount = 2;
  let basePath = '../';

  const reviewList = [
    { name: 'Minh Anh', date: 'Tháng 4/2026', rating: 5, text: 'Lịch trình hợp lý, hướng dẫn viên hỗ trợ kỹ và khách sạn đúng như tư vấn.' },
    { name: 'Hoàng Nam', date: 'Tháng 3/2026', rating: 5, text: 'Đoàn gia đình đi rất thoải mái, xe mới và các điểm tham quan được sắp xếp gọn.' }
  ];
  const legacyIdMap = {
    dalat: 'dn-hoian-3n',
    phuquoc: 'pq-4n',
    hoian: 'dn-hoian-3n',
    halong: 'hl-2n',
    sapa: 'hn-3n',
    nhatrang: 'dn-vinpearl',
    bangkok: 'dn-hoian-4n',
    singapore: 'dn-hoian-3n-b',
    bali: 'pq-3n'
  };

  function init() {
    const tours = (window.SaigonData && window.SaigonData.tours) || [];
    const id = new URLSearchParams(window.location.search).get('id') || (tours[0] && tours[0].id);
    basePath = document.body.dataset.base || '../';
    currentTour = tours.find((tour) => tour.id === id) ||
      tours.find((tour) => tour.id === legacyIdMap[id]) ||
      tours[0];
    if (!currentTour) return;

    renderPage(currentTour, tours);
    bindControls();
    setDefaultDates();
    updateTotal();
    setupTravelDateSync();
  }

  function renderPage(tour, tours) {
    document.title = tour.title + ' - SaigonTeam';
    setText('bc-name', tour.title);
    setText('hero-title', tour.title);
    setText('hero-dest', getDestLabel(tour) + ' · ' + tour.duration);
    setHTML('hero-stars', stars(4.9));
    setText('hero-rnum', '4.9');
    setText('hero-rcnt', '(120+ đánh giá)');
    setHTML('hero-badges', buildBadges(tour, 'hbadge'));
    setHTML('tour-desc', buildDescription(tour));
    setText('modal-name', tour.title);

    const heroImg = document.getElementById('hero-img');
    heroImg.src = assetUrl(tour.img);
    heroImg.alt = tour.title;
    heroImg.addEventListener('error', () => {
      heroImg.parentElement.style.background = tour.imgFb || 'linear-gradient(135deg,#1B2A4A,#E85D04)';
      heroImg.style.display = 'none';
    }, { once: true });

    setHTML('pkg-strip', [
      { icon: 'fa-clock', label: 'Thời lượng', val: tour.duration },
      { icon: 'fa-map-marker-alt', label: 'Khởi hành', val: tour.dep },
      { icon: 'fa-plane', label: 'Di chuyển', val: tour.airline },
      { icon: 'fa-calendar-alt', label: 'Ngày đi', val: tour.dates && tour.dates.length ? tour.dates.join(', ') : 'Theo yêu cầu' }
    ].map((item) => `
      <div class="pkg-item">
        <div class="pkg-icon"><i class="fas ${item.icon}"></i></div>
        <div><div class="pkg-label">${item.label}</div><div class="pkg-val">${item.val}</div></div>
      </div>`).join(''));

    setHTML('itin-wrap', buildItinerary(tour.itinerary));
    const includes = Array.isArray(tour.includes) ? tour.includes : [];
    setText('inc-count', includes.length + ' hạng mục');
    setHTML('components-grid', buildIncludes(includes));
    setHTML('sb-badges', buildBadges(tour, 'sb-badge'));
    setText('sb-old', tour.price ? fmt(Math.round(tour.price * 1.12)) + 'đ' : '');
    setText('sb-new', displayPrice(tour));

    setText('rv-num', '4.9');
    setHTML('rv-stars', stars(4.9));
    setText('rv-total', '120+ đánh giá');
    setHTML('rv-bars', [5, 4, 3, 2, 1].map((score) => {
      const width = score === 5 ? 82 : score === 4 ? 14 : 4;
      return `
        <div class="rv-bar-row">
          <span class="rv-score">${score}</span>
          <i class="fas fa-star rv-star-small"></i>
          <div class="rv-bar-bg"><div class="rv-bar-fill" data-width="${width}"></div></div>
        </div>`;
    }).join(''));
    applyBarWidths(document.getElementById('rv-bars'));
    setHTML('rv-cards', reviewList.map((review) => `
      <div class="rv-card">
        <div class="rv-top">
          <div class="rv-av">${review.name.charAt(0)}</div>
          <div><div class="rv-nm">${review.name}</div><div class="rv-date">${review.date}</div></div>
          <div class="rv-cstars">${stars(review.rating)}</div>
        </div>
        <div class="rv-text">"${review.text}"</div>
      </div>`).join(''));

    renderRelated(tour, tours);
  }

  function buildBadges(tour, className) {
    const badge = tour.badge ? `<span class="${className} ${tour.badge.type}">${tour.badge.text}</span>` : '';
    return badge + `<span class="${className} best">${tour.price ? 'Giá tốt' : 'Thiết kế riêng'}</span>`;
  }

  function buildDescription(tour) {
    const description = tour.description || tour.desc || '';
    const summary = tour.summary || '';
    let html = '';

    if (summary) {
      html += `<div class="tour-summary-box">${escapeHtml(summary)}</div>`;
    }

    if (description) {
      html += `<div class="tour-desc-content">${description}</div>`;
    }

    return html || '<div class="empty-state">Chưa có mô tả cho tour này.</div>';
  }

  function buildItinerary(list) {
    if (!Array.isArray(list) || !list.length) {
      return '<div class="empty-state">Chưa có lịch trình cho tour này.</div>';
    }
    return list.map((day, index) => `
      <div class="itin-day${index === 0 ? ' open' : ''}">
        <div class="itin-head">
          <div class="itin-day-num">${day.day || index + 1}</div>
          <div class="itin-day-title">Ngày ${day.day || index + 1}: ${day.title || ''}</div>
          <i class="fas fa-chevron-down itin-arrow"></i>
        </div>
        <div class="itin-body">
          <div class="itin-inner">
            <ul class="itin-acts">${arrayOf(day.activities || day.acts).map((item) => `<li><i class="fas fa-circle"></i>${item}</li>`).join('')}</ul>
            <div class="itin-meals"><span class="meal-lbl">Bữa ăn:</span>${arrayOf(day.meals).map((meal) => `<span class="meal-tag">${meal}</span>`).join('')}</div>
          </div>
        </div>
      </div>`).join('');
  }

  function buildIncludes(items) {
    if (!Array.isArray(items) || !items.length) {
      return '<div class="empty-state">Chưa có thông tin dịch vụ bao gồm cho tour này.</div>';
    }
    return items.map((item) => {
      const icon = item.icon || item[0] || 'fa-check';
      const title = item.title || item[1] || String(item);
      const detail = item.detail || item[2] || '';
      const type = item.type || 'tour';
      return `
      <div class="comp-card">
        <div class="comp-icon ${type}"><i class="fas ${icon}"></i></div>
        <div><div class="comp-title">${title}</div><div class="comp-detail">${detail}</div></div>
      </div>`;
    }).join('');
  }

  function renderRelated(current, tours) {
    const related = tours.filter((tour) => tour.id !== current.id).slice(0, 4);
    setHTML('rel-grid', related.map((tour) => `
      <article class="rel-card" data-id="${tour.id}">
        <div class="rel-img"><img src="${assetUrl(tour.img)}" alt="${escapeAttr(tour.title)}"></div>
        <div class="rel-body">
          <div class="rel-dest">${getDestLabel(tour)}</div>
          <div class="rel-name">${tour.title}</div>
          <div class="rel-pr">${tour.price ? fmt(tour.price) + 'đ' : tour.priceText}</div>
        </div>
      </article>`).join(''));
  }

  function bindControls() {
    document.getElementById('itin-wrap').addEventListener('click', (event) => {
      const head = event.target.closest('.itin-head');
      if (head) head.parentElement.classList.toggle('open');
    });
    document.querySelectorAll('[data-counter]').forEach((button) => {
      button.addEventListener('click', () => {
        guestCount = Math.max(1, Math.min(30, guestCount + parseInt(button.dataset.counter, 10)));
        setText('sb-count', guestCount);
        updateTotal();
      });
    });
    document.getElementById('rel-grid').addEventListener('click', (event) => {
      const card = event.target.closest('.rel-card');
      if (card) window.location.href = 'tour-detail.html?id=' + encodeURIComponent(card.dataset.id);
    });
    document.getElementById('btn-book').addEventListener('click', openModal);
    document.getElementById('btn-consult').addEventListener('click', () => {
      if (window.SaigonToast) window.SaigonToast.show('Vui lòng gọi hotline 0908.940.903 để được tư vấn tour.');
    });
    document.getElementById('modal').addEventListener('click', (event) => {
      if (event.target.id === 'modal') closeModal();
    });
    document.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    document.getElementById('btn-submit').addEventListener('click', submitBooking);
  }

  function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    ['sb-date', 'modal-date'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.min = today;
        el.value = today;
      }
    });
  }

  function updateTotal() {
    if (!currentTour) return;
    setText('sb-total', currentTour.price ? fmt(currentTour.price * guestCount) + 'đ' : displayPrice(currentTour));
  }

  function openModal() {
    document.getElementById('modal-date').value = document.getElementById('sb-date').value;
    renderTravelDates(document.getElementById('sb-date').value);
    document.getElementById('modal').classList.add('on');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modal').classList.remove('on');
    document.body.style.overflow = '';
  }

  async function submitBooking() {
    const modal = document.getElementById('modal-content');
    const fields = modal.querySelectorAll('.form-input');
    const payload = {
      type: 'tour',
      slug: currentTour.id,
      customer_name: fields[0] ? fields[0].value.trim() : '',
      phone: fields[1] ? fields[1].value.trim() : '',
      email: fields[2] ? fields[2].value.trim() : '',
      travel_date: document.getElementById('modal-date').value || null,
      guest_count: guestCount,
      note: fields[4] ? fields[4].value.trim() : ''
    };
    if (!payload.customer_name || !payload.phone) {
      if (window.SaigonToast) window.SaigonToast.show('Vui lòng nhập họ tên và số điện thoại.');
      return;
    }
    await postJson('/api/travel/booking-requests', payload);
    modal.innerHTML = `
      <div class="success-state">
        <div class="success-icon"><i class="fas fa-check"></i></div>
        <div class="success-title">Yêu cầu đặt tour đã được gửi</div>
        <div class="success-sub">SaigonTeam sẽ liên hệ xác nhận trong vòng <strong>30 phút</strong>.<br><br>Hotline: <strong>0908.940.903</strong></div>
      </div>`;
    setTimeout(closeModal, 3500);
  }

  async function postJson(url, payload) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Request failed');
    return response.json();
  }

  function getDestLabel(tour) {
    const cfg = (window.SaigonData && window.SaigonData.destCfg) || {};
    const key = tour.dest && tour.dest[0];
    return (cfg[key] && cfg[key].label) || (tour.tags && tour.tags[0] && tour.tags[0].l) || 'Tour du lịch';
  }
  function stars(rating) {
    return '<i class="fas fa-star"></i>'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : '');
  }
  function fmt(value) {
    return parseInt(value, 10).toLocaleString('vi-VN');
  }
  function displayPrice(tour) {
    if (tour.price) return fmt(tour.price) + 'đ';
    return tour.priceText || 'Liên hệ';
  }
  function assetUrl(value) {
    const raw = String(value || '');
    if (!raw) return '';
    if (/^(https?:)?\/\//i.test(raw) || raw.startsWith('/')) return raw;
    return basePath + raw;
  }
  function setupTravelDateSync() {
    const strip = document.getElementById('pkg-strip');
    if (!strip) return;

    const items = strip.querySelectorAll('.pkg-item');
    const departureValue = items[items.length - 1] && items[items.length - 1].querySelector('.pkg-val');
    if (departureValue) departureValue.dataset.dateRole = 'departure';

    if (!strip.querySelector('[data-date-role="return"]')) {
      const returnItem = document.createElement('div');
      returnItem.className = 'pkg-item';
      returnItem.innerHTML = '<div class="pkg-icon"><i class="fas fa-calendar-check"></i></div><div><div class="pkg-label">Ngày về</div><div class="pkg-val" data-date-role="return">Theo yêu cầu</div></div>';
      strip.appendChild(returnItem);
    }

    ['sb-date', 'modal-date'].forEach((id) => {
      const input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('change', () => syncTravelDates(id));
      input.addEventListener('input', () => syncTravelDates(id));
    });

    renderTravelDates((document.getElementById('sb-date') || {}).value || '');
  }
  function syncTravelDates(sourceId) {
    const source = document.getElementById(sourceId);
    if (!source) return;

    const target = document.getElementById(sourceId === 'sb-date' ? 'modal-date' : 'sb-date');
    if (target) target.value = source.value;

    renderTravelDates(source.value);
  }
  function renderTravelDates(departureValue) {
    const departure = parseDateInput(departureValue);
    const departureEl = document.querySelector('[data-date-role="departure"]');
    const returnEl = document.querySelector('[data-date-role="return"]');

    if (!departure) {
      if (departureEl) departureEl.textContent = 'Theo yêu cầu';
      if (returnEl) returnEl.textContent = 'Theo yêu cầu';
      return;
    }

    const returnDate = addDays(departure, Math.max(getTourDayCount(currentTour && currentTour.duration) - 1, 0));
    if (departureEl) departureEl.textContent = formatDateVi(departure);
    if (returnEl) returnEl.textContent = formatDateVi(returnDate);
  }
  function parseDateInput(value) {
    if (!value) return null;
    const parts = value.split('-').map((part) => parseInt(part, 10));
    if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  function addDays(date, days) {
    const next = new Date(date.getTime());
    next.setDate(next.getDate() + days);
    return next;
  }
  function getTourDayCount(duration) {
    const text = String(duration || '').toLowerCase();
    const dayMatch = text.match(/(\d+)\s*(ngày|ngÃ y|n)\b/);
    if (dayMatch) return parseInt(dayMatch[1], 10);
    const anyNumber = text.match(/\d+/);
    return anyNumber ? parseInt(anyNumber[0], 10) : 1;
  }
  function formatDateVi(date) {
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }
  function setHTML(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = value;
  }
  function escapeAttr(value) {
    return String(value).replace(/"/g, '&quot;');
  }
  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  function applyBarWidths(scope) {
    if (!scope) return;
    scope.querySelectorAll('[data-width]').forEach((bar) => {
      bar.style.width = bar.dataset.width + '%';
    });
  }
  function arrayOf(value) {
    return Array.isArray(value) ? value : [];
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
