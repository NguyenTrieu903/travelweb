(function () {
  'use strict';

  function submitForm(btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Đã Gửi — Chúng Tôi Sẽ Liên Hệ Lại Sớm!';
    btn.style.background = '#16a34a';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }

  window.submitForm = submitForm;
})();
