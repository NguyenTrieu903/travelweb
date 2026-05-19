/**
 * Site header (top nav + mobile nav drawer).
 *
 * Usage: <div data-component="header" data-base="" data-solid="false"></div>
 *   data-base="../"   when used from /pages/ subfolder (links resolved relative to that)
 *   data-solid="true" forces solid nav (no transparent-to-solid scroll behavior)
 */
(function (root) {
  'use strict';

  function pathOf(base, name) {
    // Map a page name to a URL relative to the current page.
    // base = '' means we are at site root; base = '../' means we are in /pages/
    if (base === '../') {
      return name === 'index' ? '../index.html' : name + '.html';
    }
    return name === 'index' ? 'index.html' : 'pages/' + name + '.html';
  }

  function render(host, opts) {
    const base  = (opts && opts.base)  != null ? opts.base  : (host.dataset.base  || '');
    const solid = (opts && opts.solid) != null ? opts.solid : (host.dataset.solid === 'true');

    const indexHref = (base === '../') ? '../index.html' : 'index.html';
    const logoImg   = base + 'images/logo-3.png';

    const desktopLinks = `
      <li><a href="${indexHref}#about">Về Chúng Tôi</a></li>
      <li><a href="${indexHref}#tours">Tour &amp; Combo</a></li>
      <li><a href="${indexHref}#services">Dịch Vụ</a></li>
      <li><a href="${pathOf(base,'gallery')}">Gallery</a></li>
      <li><a href="${pathOf(base,'videos')}">Video</a></li>
      <li><a href="${indexHref}#contact" class="nav-cta">Liên Hệ Ngay</a></li>`;

    const mobileLinks = `
      <li class="has-msub">
        <button class="mnav-link" type="button" data-msub-toggle>
          Tour &amp; Điểm Đến
          <i class="fas fa-chevron-down mnav-arrow"></i>
        </button>
        <ul class="mnav-sub">
          <li><a href="${indexHref}#destinations" data-mnav-close><i class="fas fa-map-marker-alt"></i> Điểm Đến Nổi Bật</a></li>
          <li><a href="${indexHref}#tours"        data-mnav-close><i class="fas fa-compass"></i> Tour Nội Địa</a></li>
          <li><a href="${indexHref}#tours"        data-mnav-close><i class="fas fa-globe"></i> Tour Quốc Tế</a></li>
          <li><a href="${indexHref}#combos"       data-mnav-close><i class="fas fa-tag"></i> Combo Bay + Khách Sạn</a></li>
        </ul>
      </li>
      <li class="has-msub">
        <button class="mnav-link" type="button" data-msub-toggle>
          Dịch Vụ
          <i class="fas fa-chevron-down mnav-arrow"></i>
        </button>
        <ul class="mnav-sub">
          <li><a href="${indexHref}#services" data-mnav-close><i class="fas fa-users"></i> Tổ Chức TeamBuilding</a></li>
          <li><a href="${indexHref}#services" data-mnav-close><i class="fas fa-star"></i> Tổ Chức Sự Kiện</a></li>
          <li><a href="${indexHref}#services" data-mnav-close><i class="fas fa-bus-alt"></i> Cho Thuê Xe Du Lịch</a></li>
          <li><a href="${indexHref}#services" data-mnav-close><i class="fas fa-plane-departure"></i> Bán Vé Máy Bay</a></li>
          <li><a href="${indexHref}#services" data-mnav-close><i class="fas fa-route"></i> Tour Khách Đoàn &amp; Lẻ</a></li>
        </ul>
      </li>
      <li><a href="${pathOf(base,'gallery')}" data-mnav-close>Gallery</a></li>
      <li><a href="${pathOf(base,'videos')}"  data-mnav-close>Video</a></li>
      <li><a href="${indexHref}#contact"     data-mnav-close>Liên Hệ</a></li>
      <li class="mnav-cta-li">
        <a href="${indexHref}#contact" data-mnav-close>
          <i class="fas fa-phone-alt"></i>&nbsp; Liên Hệ Ngay
        </a>
      </li>`;

    host.outerHTML = `
      <nav id="nav"${solid ? ' class="always-solid"' : ''}>
        <div class="container">
          <div class="nav-in">
            <a href="${indexHref}" class="logo">
              <img src="${logoImg}" alt="SaigonTeam Travel" class="logo-ico-img">
              <div>
                <div class="logo-nm">SAIGONTEAM TRAVEL.JSC</div>
                <div class="logo-sl">Cùng Nhau Trải Nghiệm</div>
              </div>
            </a>
            <ul class="nav-ul">${desktopLinks}</ul>
            <button class="hbg" type="button" aria-label="Mở menu" data-nav-toggle>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>
      <div class="overlay" id="overlay" data-nav-toggle></div>
      <div class="mnav" id="mnav">
        <button class="mnav-close" type="button" data-nav-toggle aria-label="Đóng">
          <i class="fas fa-times"></i>
        </button>
        <ul>${mobileLinks}</ul>
      </div>`;

    initBehavior(solid);
  }

  function initBehavior(solid) {
    const nav     = document.getElementById('nav');
    const mnav    = document.getElementById('mnav');
    const overlay = document.getElementById('overlay');

    const toggleNav = () => {
      mnav.classList.toggle('on');
      overlay.classList.toggle('on');
    };

    document.querySelectorAll('[data-nav-toggle]').forEach(el =>
      el.addEventListener('click', toggleNav)
    );
    document.querySelectorAll('[data-mnav-close]').forEach(el =>
      el.addEventListener('click', () => { if (mnav.classList.contains('on')) toggleNav(); })
    );
    document.querySelectorAll('[data-msub-toggle]').forEach(btn =>
      btn.addEventListener('click', () => btn.parentElement.classList.toggle('open'))
    );

    if (!solid) {
      const onScroll = () => {
        if (window.scrollY > 60) nav.classList.add('solid');
        else nav.classList.remove('solid');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  root.SaigonComponents = root.SaigonComponents || {};
  root.SaigonComponents.header = render;
})(window);
