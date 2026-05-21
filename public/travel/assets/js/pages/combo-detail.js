/**
 * combo-detail page controller.
 * Reads window.SaigonData.combos and renders one combo by ?id= param.
 */
(function () {
  'use strict';

  let current = null;
  let guestCount = 2;

  function init() {
    const COMBOS = (window.SaigonData && window.SaigonData.combos) || {};
    const base   = document.body.dataset.base || '../';
    const id     = new URLSearchParams(window.location.search).get('id') || 'combo-phuquoc';
    current = COMBOS[id] || COMBOS['combo-phuquoc'];
    if (!current) return;

    renderPage(current, base);
    renderRelated(current, COMBOS, base);

    const today = new Date().toISOString().split('T')[0];
    ['sb-date', 'modal-date'].forEach((i) => {
      const el = document.getElementById(i);
      if (el) { el.min = today; el.value = today; }
    });
    updateTotal();

    document.querySelectorAll('[data-counter]').forEach((btn) =>
      btn.addEventListener('click', () => changeCount(parseInt(btn.dataset.counter, 10)))
    );
    document.getElementById('btn-book').addEventListener('click', openModal);
    document.getElementById('btn-consult').addEventListener('click', () =>
      alert('Vui lòng gọi hotline: 0901 234 567 để được tư vấn combo!')
    );
    const modal = document.getElementById('modal');
    modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.getElementById('btn-submit').addEventListener('click', submitBooking);
  }

  function renderPage(c, base) {
    document.title = c.name + ' — SaigonTeam';
    setText('bc-name',     c.dest);
    setSrc('hero-img',     base + c.img);
    setAttr('hero-img', 'alt', c.name);
    setHeroFallback('hero-img', 'linear-gradient(135deg,#1B2A4A,#E85D04)');
    setText('hero-title',  c.name);
    setText('hero-dest',   c.dest + ' · ' + c.duration);
    setHTML('hero-stars',  stars(c.rating));
    setText('hero-rnum',   c.rating);
    setText('hero-rcnt',   '(' + c.reviews + ' đánh giá)');
    setHTML('hero-badges',
      `<span class="hbadge ${c.badgeType}">${c.badge}</span>` +
      `<span class="hbadge save">TIẾT KIỆM ${c.savePct}%</span>`);

    setHTML('pkg-strip', c.pkgStrip.map((p) =>
      `<div class="pkg-item">
        <div class="pkg-icon"><i class="fas ${p.icon}"></i></div>
        <div><div class="pkg-label">${p.label}</div><div class="pkg-val">${p.val}</div></div>
      </div>`).join(''));

    const saved = c.oldPrice - c.newPrice;
    setText('sv-pct',   c.savePct + '%');
    setText('sv-title', 'Tiết kiệm ' + fmt(saved) + 'đ khi đặt combo (2 người)');
    setHTML('sv-amounts',
      `<div class="sa-item"><div class="sa-label">Đặt lẻ</div><div class="sa-val crossed">${fmt(c.oldPrice)}đ</div></div>
       <div class="sa-item"><div class="sa-label">Giá combo</div><div class="sa-val">${fmt(c.newPrice)}đ</div></div>
       <div class="sa-item"><div class="sa-label">Tiết kiệm</div><div class="sa-val green">−${fmt(saved)}đ</div></div>`);

    setText('inc-count', c.components.length + ' dịch vụ');
    setHTML('components-grid', c.components.map((cmp) =>
      `<div class="comp-card">
        <div class="comp-icon ${cmp.type}"><i class="fas ${cmp.icon}"></i></div>
        <div><div class="comp-title">${cmp.title}</div><div class="comp-detail">${cmp.detail}</div></div>
      </div>`).join(''));

    setHTML('compare-body', c.compareRows.map((r, i) => {
      const last = i === c.compareRows.length - 1;
      return `<tr>
        <td>${r[0]}</td>
        <td>${last ? `<strong class="text-danger-strong">${r[1]}</strong>` : r[1]}</td>
        <td>${last ? `<strong class="text-brand-strong">${r[2]}</strong>` : `<i class="fas fa-check check-ic"></i> ${r[2]}`}</td>
      </tr>`;
    }).join(''));

    const itinHTML = c.itinerary.map((d, i) =>
      `<div class="itin-day${i === 0 ? ' open' : ''}">
        <div class="itin-head">
          <div class="itin-day-num">${d.day}</div>
          <div class="itin-day-title">Ngày ${d.day}: ${d.title}</div>
          <i class="fas fa-chevron-down itin-arrow"></i>
        </div>
        <div class="itin-body"><div class="itin-inner">
          <ul class="itin-acts">${d.activities.map((a) => `<li><i class="fas fa-circle"></i>${a}</li>`).join('')}</ul>
          <div class="itin-meals"><span class="meal-lbl">Bữa ăn:</span>${d.meals.map((m) => `<span class="meal-tag">${m}</span>`).join('')}</div>
        </div></div>
      </div>`).join('');
    setHTML('itin-wrap', itinHTML);
    document.getElementById('itin-wrap').addEventListener('click', (e) => {
      const head = e.target.closest('.itin-head');
      if (head) head.parentElement.classList.toggle('open');
    });

    setText('rv-num',   c.rating);
    setHTML('rv-stars', stars(c.rating));
    setText('rv-total', c.reviews + ' đánh giá');
    setHTML('rv-bars', [5, 4, 3, 2, 1].map((s) => {
      const w = s === 5 ? 78 : s === 4 ? 15 : 5;
      return `<div class="rv-bar-row">
        <span class="rv-score">${s}</span>
        <i class="fas fa-star rv-star-small"></i>
        <div class="rv-bar-bg"><div class="rv-bar-fill" data-width="${w}"></div></div>
      </div>`;
    }).join(''));
    applyBarWidths(document.getElementById('rv-bars'));
    setHTML('rv-cards', c.reviewList.map((r) =>
      `<div class="rv-card">
        <div class="rv-top">
          <div class="rv-av">${r.name[0]}</div>
          <div><div class="rv-nm">${r.name}</div><div class="rv-date">${r.date}</div></div>
          <div class="rv-cstars">${stars(r.rating)}</div>
        </div>
        <div class="rv-text">"${r.text}"</div>
      </div>`).join(''));

    setHTML('sb-badges',
      `<span class="sb-badge ${c.badgeType}">${c.badge}</span>` +
      `<span class="sb-badge save-b">TIẾT KIỆM ${c.savePct}%</span>`);
    setText('sb-old', fmt(c.oldPrice) + 'đ');
    setText('sb-new', fmt(c.newPrice) + 'đ');
    setText('modal-name', c.name);
  }

  function renderRelated(cur, COMBOS, base) {
    const list = Object.values(COMBOS).filter((c) => c.id !== cur.id);
    setHTML('rel-grid', list.map((c) =>
      `<div class="rel-card" data-id="${c.id}">
        <div class="rel-img"><img src="${base}${c.img}" alt="${escapeAttr(c.name)}"
             data-fallback="linear-gradient(135deg,#1B2A4A,#E85D04)"></div>
        <div class="rel-body">
          <div class="rel-dest">${c.dest}</div>
          <div class="rel-name">${c.name}</div>
          <div class="rel-pr">${fmt(c.newPrice)}đ <span class="rel-save-tag">−${c.savePct}%</span></div>
        </div>
      </div>`).join(''));

    document.getElementById('rel-grid').addEventListener('click', (e) => {
      const card = e.target.closest('.rel-card');
      if (!card) return;
      window.location.href = 'combo-detail.html?id=' + encodeURIComponent(card.dataset.id);
    });
    bindImageFallbacks(document.getElementById('rel-grid'));
  }

  function changeCount(d) {
    guestCount = Math.max(2, Math.min(20, guestCount + d));
    setText('sb-count', guestCount);
    updateTotal();
  }
  function updateTotal() {
    if (!current) return;
    setText('sb-total', fmt(current.newPrice * guestCount) + 'đ');
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
  async function submitBooking() {
    const modal = document.getElementById('modal-content');
    const fields = modal.querySelectorAll('.form-input');
    const adults = fields[4] ? parseInt(fields[4].value, 10) || 0 : guestCount;
    const children = fields[5] ? parseInt(fields[5].value, 10) || 0 : 0;
    const payload = {
      type: 'combo',
      slug: current.id,
      customer_name: fields[0] ? fields[0].value.trim() : '',
      phone: fields[1] ? fields[1].value.trim() : '',
      email: fields[2] ? fields[2].value.trim() : '',
      travel_date: document.getElementById('modal-date').value || null,
      guest_count: adults + children,
      note: fields[6] ? fields[6].value.trim() : ''
    };
    if (!payload.customer_name || !payload.phone) {
      alert('Vui lòng nhập họ tên và số điện thoại.');
      return;
    }
    await postJson('/api/travel/booking-requests', payload);
    modal.innerHTML = `
      <div class="success-state">
        <div class="success-icon"><i class="fas fa-check"></i></div>
        <div class="success-title">Đặt combo thành công!</div>
        <div class="success-sub">Cảm ơn bạn đã chọn SaigonTeam.<br>
          Nhân viên sẽ liên hệ xác nhận trong vòng <strong>30 phút</strong>.<br><br>
          Hotline: <strong>0901 234 567</strong>
        </div>
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

  function stars(r)    { return '<i class="fas fa-star"></i>'.repeat(Math.floor(r)) + (r % 1 >= .5 ? '<i class="fas fa-star-half-alt"></i>' : ''); }
  function fmt(n)      { return parseInt(n).toLocaleString('vi-VN'); }
  function setText(id, v) { const el = document.getElementById(id); if (el) el.textContent = v; }
  function setHTML(id, v) { const el = document.getElementById(id); if (el) el.innerHTML = v; }
  function setSrc(id, v)  { const el = document.getElementById(id); if (el) el.src = v; }
  function setAttr(id, name, v) { const el = document.getElementById(id); if (el) el.setAttribute(name, v); }
  function escapeAttr(s)  { return String(s).replace(/"/g, '&quot;'); }
  function setHeroFallback(id, fallback) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('error', () => {
      el.parentElement.style.background = fallback;
      el.style.display = 'none';
    }, { once: true });
  }
  function bindImageFallbacks(scope) {
    if (!scope) return;
    scope.querySelectorAll('img[data-fallback]').forEach((img) => {
      img.addEventListener('error', () => {
        img.parentElement.style.background = img.dataset.fallback;
        img.style.display = 'none';
      }, { once: true });
    });
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
