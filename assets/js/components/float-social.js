/**
 * Floating social/contact buttons (right-bottom corner).
 * Usage: <div data-component="float-social"></div>
 */
(function (root) {
  'use strict';

  function render(host) {
    host.outerHTML = `
      <div class="float-social">
        <a href="https://facebook.com/saigonteam" class="fsoc fb" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="tel:0908940903" class="fsoc ph" aria-label="Gọi điện"><i class="fas fa-phone-alt"></i></a>
        <a href="https://zalo.me/0908940903" class="fsoc za" target="_blank" rel="noopener" aria-label="Zalo"><span>Za</span></a>
        <a href="https://maps.google.com/?q=Phạm+Hùng+Bình+Hưng+TP.HCM" class="fsoc gm" target="_blank" rel="noopener" aria-label="Bản đồ"><i class="fas fa-map-marker-alt"></i></a>
      </div>`;
  }

  root.SaigonComponents = root.SaigonComponents || {};
  root.SaigonComponents.floatSocial = render;
})(window);
