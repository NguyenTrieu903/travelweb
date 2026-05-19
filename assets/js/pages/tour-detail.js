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
    setText('modal-name', tour.title);

    const heroImg = document.getElementById('hero-img');
    heroImg.src = basePath + tour.img;
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

    setHTML('itin-wrap', buildItinerary(tour));
    setText('inc-count', '7 hạng mục');
    setHTML('components-grid', buildIncludes());
    setHTML('sb-badges', buildBadges(tour, 'sb-badge'));
    setText('sb-old', tour.price ? fmt(Math.round(tour.price * 1.12)) + 'đ' : '');
    setText('sb-new', tour.price ? fmt(tour.price) + 'đ' : 'Liên hệ');

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

  function buildItinerary(tour) {
    const days = parseInt(tour.duration, 10) || 3;
    const templates = [
      { title: 'Khởi hành - Check-in điểm đến', acts: ['Đón khách tại điểm hẹn', 'Di chuyển đến điểm đến chính', 'Dùng bữa theo chương trình', 'Nhận phòng và nghỉ ngơi'], meals: ['Trưa', 'Tối'] },
      { title: 'Tham quan - Trải nghiệm địa phương', acts: ['Tham quan các điểm nổi bật', 'Trải nghiệm ẩm thực địa phương', 'Tự do chụp ảnh và mua sắm', 'Giao lưu cùng đoàn vào buổi tối'], meals: ['Sáng', 'Trưa', 'Tối'] },
      { title: 'Tự do khám phá - Kết thúc hành trình', acts: ['Ăn sáng tại khách sạn', 'Tự do khám phá hoặc mua quà', 'Làm thủ tục trả phòng', 'Đưa khách về điểm hẹn ban đầu'], meals: ['Sáng', 'Trưa'] }
    ];
    const list = Array.from({ length: Math.max(2, Math.min(days, 4)) }, (_, index) => templates[Math.min(index, templates.length - 1)]);
    return list.map((day, index) => `
      <div class="itin-day${index === 0 ? ' open' : ''}">
        <div class="itin-head">
          <div class="itin-day-num">${index + 1}</div>
          <div class="itin-day-title">Ngày ${index + 1}: ${day.title}</div>
          <i class="fas fa-chevron-down itin-arrow"></i>
        </div>
        <div class="itin-body">
          <div class="itin-inner">
            <ul class="itin-acts">${day.acts.map((item) => `<li><i class="fas fa-circle"></i>${item}</li>`).join('')}</ul>
            <div class="itin-meals"><span class="meal-lbl">Bữa ăn:</span>${day.meals.map((meal) => `<span class="meal-tag">${meal}</span>`).join('')}</div>
          </div>
        </div>
      </div>`).join('');
  }

  function buildIncludes() {
    return [
      ['fa-bus', 'Xe du lịch', 'Xe đời mới, điều hòa, phục vụ theo lịch trình'],
      ['fa-hotel', 'Lưu trú', 'Khách sạn theo tiêu chuẩn gói tour'],
      ['fa-utensils', 'Bữa ăn', 'Các bữa ăn ghi trong chương trình'],
      ['fa-ticket-alt', 'Vé tham quan', 'Vé vào cổng các điểm theo lịch trình'],
      ['fa-user-tie', 'Hướng dẫn viên', 'HDV tiếng Việt đồng hành cùng đoàn'],
      ['fa-shield-alt', 'Bảo hiểm', 'Bảo hiểm du lịch theo quy định']
    ].map((item) => `
      <div class="comp-card">
        <div class="comp-icon tour"><i class="fas ${item[0]}"></i></div>
        <div><div class="comp-title">${item[1]}</div><div class="comp-detail">${item[2]}</div></div>
      </div>`).join('');
  }

  function renderRelated(current, tours) {
    const related = tours.filter((tour) => tour.id !== current.id).slice(0, 4);
    setHTML('rel-grid', related.map((tour) => `
      <article class="rel-card" data-id="${tour.id}">
        <div class="rel-img"><img src="${basePath}${tour.img}" alt="${escapeAttr(tour.title)}"></div>
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
    setText('sb-total', currentTour.price ? fmt(currentTour.price * guestCount) + 'đ' : 'Liên hệ');
  }

  function openModal() {
    document.getElementById('modal-date').value = document.getElementById('sb-date').value;
    document.getElementById('modal').classList.add('on');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modal').classList.remove('on');
    document.body.style.overflow = '';
  }

  function submitBooking() {
    document.getElementById('modal-content').innerHTML = `
      <div class="success-state">
        <div class="success-icon"><i class="fas fa-check"></i></div>
        <div class="success-title">Yêu cầu đặt tour đã được gửi</div>
        <div class="success-sub">SaigonTeam sẽ liên hệ xác nhận trong vòng <strong>30 phút</strong>.<br><br>Hotline: <strong>0908.940.903</strong></div>
      </div>`;
    setTimeout(closeModal, 3500);
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
  function applyBarWidths(scope) {
    if (!scope) return;
    scope.querySelectorAll('[data-width]').forEach((bar) => {
      bar.style.width = bar.dataset.width + '%';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
