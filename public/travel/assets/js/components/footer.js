/**
 * Site footer.
 * Usage: <div data-component="footer" data-base=""></div>
 *   data-base="../" when used from /pages/ subfolder.
 */
(function (root) {
  'use strict';

  function pathOf(base, name) {
    if (base === '../') {
      return name === 'index' ? '../index.html' : name + '.html';
    }
    return name === 'index' ? 'index.html' : 'pages/' + name + '.html';
  }

  function render(host, opts) {
    const base = (opts && opts.base) != null ? opts.base : (host.dataset.base || '');
    const indexHref = (base === '../') ? '../index.html' : 'index.html';
    const servicePath = (slug) =>
      (base === '../' ? 'service-detail.html' : 'pages/service-detail.html') + '?id=' + slug;

    host.outerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="ft-grid">
            <div>
              <div class="ft-brand">
                <img src="${base}images/logo-3.png" alt="SaigonTeam">
                <div>
                  <div class="ft-brand-nm">SAIGONTEAM TRAVEL.JSC</div>
                  <div class="ft-brand-sl">Cùng Nhau Trải Nghiệm</div>
                </div>
              </div>
              <p class="ft-dsc">Công Ty TNHH Dịch Vụ &amp; Sự Kiện SaigonTeam — đối tác du lịch &amp; sự kiện tin cậy với hơn 5 năm kinh nghiệm phục vụ doanh nghiệp Việt Nam.</p>
              <div class="socials">
                <a href="#" class="soc" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="soc" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                <a href="#" class="soc" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
              </div>
            </div>
            <div>
              <div class="ft-ttl">Dịch Vụ</div>
              <ul class="ft-ul">
                <li><a href="${servicePath('tour-doan-le')}">Tour Khách Đoàn &amp; Lẻ</a></li>
                <li><a href="${servicePath('teambuilding')}">Tổ Chức TeamBuilding</a></li>
                <li><a href="${servicePath('su-kien')}">Tổ Chức Sự Kiện</a></li>
                <li><a href="${servicePath('thue-xe')}">Cho Thuê Xe Du Lịch</a></li>
                <li><a href="${servicePath('ve-may-bay')}">Bán Vé Máy Bay</a></li>
              </ul>
            </div>
            <div>
              <div class="ft-ttl">Khám Phá</div>
              <ul class="ft-ul">
                <li><a href="${indexHref}">Trang Chủ</a></li>
                <li><a href="${indexHref}#tours">Tour &amp; Combo</a></li>
                <li><a href="${pathOf(base,'gallery')}">Thư Viện Ảnh</a></li>
                <li><a href="${pathOf(base,'videos')}">Thư Viện Video</a></li>
                <li><a href="${indexHref}#contact">Liên Hệ</a></li>
              </ul>
            </div>
            <div>
              <div class="ft-ttl">Liên Hệ</div>
              <ul class="ft-cl">
                <li><i class="fas fa-map-marker-alt"></i>Số 14/149, Ấp 32 Phạm Hùng, Xã Bình Hưng, TP. HCM</li>
                <li><i class="fas fa-phone-alt"></i><a href="tel:0908940903">0908.940.903</a></li>
                <li><i class="fas fa-envelope"></i>Saigonteamtravel2021@gmail.com</li>
                <li><i class="fas fa-clock"></i>T2–T7: 8:00–18:00 | CN: 8:00–12:00</li>
              </ul>
            </div>
          </div>
          <div class="ft-bot">
            <span>© 2024 SaigonTeam. All rights reserved.</span>
            <span>Thiết kế chuyên nghiệp để demo khách hàng</span>
          </div>
        </div>
      </footer>`;
  }

  root.SaigonComponents = root.SaigonComponents || {};
  root.SaigonComponents.footer = render;
})(window);
