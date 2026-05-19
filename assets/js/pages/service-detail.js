/**
 * service-detail page controller.
 * Depends on window.SaigonData.services.
 */
(function () {
  'use strict';

  let basePath = '../';

  function init() {
    const services = (window.SaigonData && window.SaigonData.services) || {};
    const id = new URLSearchParams(window.location.search).get('id') || 'tour-doan-le';
    const currentService = services[id] || services['tour-doan-le'];
    basePath = document.body.dataset.base || '../';
    if (!currentService) return;

    renderPage(currentService, services);
    bindTabs();
    bindModal();
    setDefaultDates();
  }

  function renderPage(service, services) {
    document.title = service.name + ' - SaigonTeam';
    setText('page-title', service.name + ' - SaigonTeam');
    setText('bc-name', service.name);
    setText('modal-service-name', service.name);
    setValue('modal-service-input', service.name);
    setText('hero-title', service.name);
    setText('hero-sub', service.sub);
    setHTML('hero-badge', '<i class="' + service.badgeIcon + '"></i> ' + service.badge);

    const heroImg = document.getElementById('hero-img');
    if (heroImg) {
      heroImg.src = basePath + service.img;
      heroImg.alt = service.name;
      heroImg.addEventListener('error', () => {
        heroImg.parentElement.style.background = service.imgFallback || 'linear-gradient(135deg,#1B2A4A,#E85D04)';
        heroImg.style.display = 'none';
      }, { once: true });
    }

    setHTML('qbar-inner', service.qbar.map((item) => `
      <div class="qitem">
        <div class="qitem-icon"><i class="${item.icon}"></i></div>
        <div>
          <div class="qitem-label">${item.label}</div>
          <div class="qitem-value">${item.value}</div>
        </div>
      </div>`).join(''));

    setText('ov-desc', service.desc);
    setHTML('ov-highlights', service.highlights.map((item) => `
      <div class="ov-item">
        <div class="ov-ico"><i class="${item.icon}"></i></div>
        <div class="ov-text"><strong>${item.title}</strong><span>${item.desc}</span></div>
      </div>`).join(''));
    setHTML('inc-list', service.includes.map((item) => `
      <div class="inc-item"><i class="fas fa-check-circle"></i><span>${item}</span></div>`).join(''));
    setHTML('pkg-grid', service.packages.map((pkg) => `
      <div class="pkg-card">
        <div class="pkg-head">
          <div class="pkg-name">${pkg.name}</div>
          <span class="pkg-badge ${pkg.badge}">${pkg.badgeText}</span>
          <div class="pkg-price">${pkg.price} <span>${pkg.priceNote}</span></div>
        </div>
        <div class="pkg-body">
          <div class="pkg-features">
            ${pkg.features.map((feature) => `<div class="pkg-feat"><i class="fas fa-check"></i><span>${feature}</span></div>`).join('')}
          </div>
          <button class="pkg-cta" type="button" data-open-modal><i class="fas fa-paper-plane"></i> Yêu cầu báo giá</button>
        </div>
      </div>`).join(''));
    setHTML('process-steps', service.process.map((step, index) => `
      <div class="step">
        <div class="step-num">${index + 1}</div>
        <div class="step-body">
          <div class="step-title">${step.title}</div>
          <div class="step-desc">${step.desc}</div>
        </div>
      </div>`).join(''));
    setHTML('faq-list', service.faq.map((item) => `
      <div class="faq-item">
        <button class="faq-q" type="button">
          <span>${item.q}</span><i class="fas fa-chevron-down"></i>
        </button>
        <div class="faq-a">${item.a}</div>
      </div>`).join(''));
    setHTML('rel-grid', Object.values(services).filter((item) => item.id !== service.id).map((item) => `
      <article class="svc-rel-card" data-id="${item.id}">
        <div class="svc-rel-img"><img src="${basePath}${item.img}" alt="${escapeAttr(item.name)}"></div>
        <div class="svc-rel-body">
          <div class="svc-rel-name">${item.name}</div>
          <span class="svc-rel-tag">${item.badge}</span>
        </div>
      </article>`).join(''));

    document.getElementById('pkg-grid').addEventListener('click', (event) => {
      if (event.target.closest('[data-open-modal]')) openModal();
    });
    document.getElementById('faq-list').addEventListener('click', (event) => {
      const btn = event.target.closest('.faq-q');
      if (btn) btn.parentElement.classList.toggle('open');
    });
    document.getElementById('rel-grid').addEventListener('click', (event) => {
      const card = event.target.closest('.svc-rel-card');
      if (card) window.location.href = 'service-detail.html?id=' + encodeURIComponent(card.dataset.id);
    });
  }

  function bindTabs() {
    document.querySelectorAll('[data-tab]').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach((item) => item.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        document.getElementById('tab-' + button.dataset.tab).classList.add('active');
      });
    });
  }

  function bindModal() {
    document.getElementById('btn-open-modal').addEventListener('click', openModal);
    document.getElementById('btn-consult').addEventListener('click', () => {
      if (window.SaigonToast) window.SaigonToast.show('Vui lòng gọi hotline 0908.940.903 để được tư vấn nhanh.');
    });
    document.getElementById('modal').addEventListener('click', (event) => {
      if (event.target.id === 'modal') closeModal();
    });
    document.querySelector('.svc-modal-close').addEventListener('click', closeModal);
    document.getElementById('btn-submit').addEventListener('click', submitRequest);
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

  function openModal() {
    const sidebarDate = document.getElementById('sb-date');
    const modalDate = document.getElementById('modal-date');
    if (sidebarDate && modalDate) modalDate.value = sidebarDate.value;
    document.getElementById('modal').classList.add('on');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modal').classList.remove('on');
    document.body.style.overflow = '';
  }

  function submitRequest() {
    document.getElementById('modal-content').innerHTML = `
      <div class="svc-success">
        <div class="svc-success-icon"><i class="fas fa-check"></i></div>
        <div class="svc-success-title">Yêu cầu đã được gửi</div>
        <div class="svc-success-sub">Cảm ơn bạn đã liên hệ SaigonTeam.<br>Tư vấn viên sẽ gọi lại trong vòng <strong>30 phút</strong>.<br><br>Hotline: <strong>0908.940.903</strong></div>
      </div>`;
    setTimeout(closeModal, 3500);
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }
  function setHTML(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = value;
  }
  function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }
  function escapeAttr(value) {
    return String(value).replace(/"/g, '&quot;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
