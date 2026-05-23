(function () {
  "use strict";

  function filterTours(cat, btn) {
    document.querySelectorAll(".ftab").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".tcard").forEach((card) => {
      const match = cat === "all" || card.dataset.cat === cat;
      card.classList.toggle("hidden", !match);
    });
  }

  function bookTour(name) {
    if (window.SaigonComponents && window.SaigonComponents.toast) {
      window.SaigonComponents.toast(
        '<i class="fas fa-check-circle" style="color:var(--gd)"></i> Đã thêm <strong style="color:var(--gd)">' + name + "</strong> — Chúng tôi sẽ liên hệ bạn sớm!",
      );
      return;
    }
    const existing = document.getElementById("toast-inline");
    if (existing) existing.remove();
    const t = document.createElement("div");
    t.id = "toast-inline";
    t.style.cssText =
      "position:fixed;bottom:100px;right:32px;background:var(--nv);color:#fff;padding:14px 22px;border-radius:14px;font-size:.85rem;font-weight:600;box-shadow:0 8px 30px rgba(0,0,0,.25);z-index:8888;display:flex;align-items:center;gap:10px";
    t.innerHTML =
      '<i class="fas fa-check-circle" style="color:var(--gd);font-size:1.1rem"></i>Đã thêm <strong style="color:var(--gd)">' +
      name +
      "</strong> — Chúng tôi sẽ liên hệ bạn sớm!";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 4000);
  }

  function filterDest(type, btn) {
    document.querySelectorAll(".df-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest(".tc-fav")) {
      const btn = e.target.closest(".tc-fav");
      const active = btn.style.background === "rgb(232, 93, 4)";
      btn.style.background = active ? "" : "var(--or)";
      btn.style.color = active ? "" : "#fff";
    }
  });

  window.filterTours = filterTours;
  window.bookTour = bookTour;
  window.filterDest = filterDest;

  (function () {
    var cfg = (window.SaigonData && window.SaigonData.destCfg) || {};
    document.querySelectorAll(".dm-card[data-dest-slug]").forEach(function (card) {
      var entry = cfg[card.dataset.destSlug];
      var el = card.querySelector(".dm-count");
      if (el && entry && entry.tourCount != null) {
        el.textContent = entry.tourCount + " tour khả dụng";
      } else if (el && !entry) {
        el.textContent = "";
      }
    });
  })();
})();
