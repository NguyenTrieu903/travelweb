// Announcement bar
(function () {
  const bar = document.getElementById("topBar");
  if (bar && !sessionStorage.getItem("barDismissed")) {
    document.body.classList.add("bar-on");
  } else if (bar) {
    bar.classList.add("hidden");
  }
})();
function dismissBar() {
  document.getElementById("topBar").classList.add("hidden");
  document.body.classList.remove("bar-on");
  sessionStorage.setItem("barDismissed", "1");
}

// Nav scroll
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("solid", window.scrollY > 60);
});

// Card 3D tilt — desktop pointer devices only
if (!("ontouchstart" in window) && navigator.maxTouchPoints === 0) {
  document.querySelectorAll(".tcard,.srv,.ccard").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-7px) scale(1.015) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// Mobile nav
function toggleNav() {
  document.getElementById("mnav").classList.toggle("on");
  document.getElementById("overlay").classList.toggle("on");
}
// Mobile sub-menu accordion
function toggleMsub(btn) {
  const li = btn.parentElement;
  const isOpen = li.classList.contains("open");
  document.querySelectorAll(".has-msub.open").forEach((el) => el.classList.remove("open"));
  if (!isOpen) li.classList.add("open");
}

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("on"), i * 90);
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Counter
const cio = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !e.target._done) {
        e.target._done = true;
        const target = +e.target.dataset.t;
        const dur = 2000;
        const step = target / (dur / 16);
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          e.target.textContent = Math.floor(cur);
          if (cur >= target) clearInterval(t);
        }, 16);
      }
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll(".cnt").forEach((el) => cio.observe(el));

// Tour filter tabs
function filterTours(cat, btn) {
  document.querySelectorAll(".ftab").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".tcard").forEach((c) => {
    const match = cat === "all" || c.dataset.cat === cat;
    c.classList.toggle("hidden", !match);
  });
}

// Tour / Combo booking toast
function bookTour(name) {
  const existing = document.getElementById("toast");
  if (existing) existing.remove();
  const t = document.createElement("div");
  t.id = "toast";
  t.style.cssText =
    "position:fixed;bottom:100px;right:32px;background:var(--nv);color:#fff;padding:14px 22px;border-radius:14px;font-size:.85rem;font-weight:600;box-shadow:0 8px 30px rgba(0,0,0,.25);z-index:8888;display:flex;align-items:center;gap:10px;animation:fdRight .4s ease";
  t.innerHTML =
    '<i class="fas fa-check-circle" style="color:var(--gd);font-size:1.1rem"></i>Đã thêm <strong style="color:var(--gd)">' +
    name +
    "</strong> — Chúng tôi sẽ liên hệ bạn sớm!";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}

// Heart toggle
document.addEventListener("click", (e) => {
  if (e.target.closest(".tc-fav")) {
    const btn = e.target.closest(".tc-fav");
    btn.style.background = btn.style.background === "rgb(232, 93, 4)" ? "" : "var(--or)";
    btn.style.color = btn.style.color === "rgb(255, 255, 255)" ? "" : "#fff";
  }
});

// Lightbox
let lbItems = [],
  lbIdx = 0,
  lbTouchX = 0;

function openLb(el) {
  lbItems = Array.from(document.querySelectorAll(".gi"));
  lbIdx = lbItems.indexOf(el);
  _showLb();
  document.getElementById("lb").classList.add("on");
  document.body.style.overflow = "hidden";
}

function _showLb() {
  const el = lbItems[lbIdx];
  const img = el.querySelector("img");
  document.getElementById("lb-img").src = img.src.replace(/w=\d+/, "w=1400").replace(/h=\d+/, "");
  document.getElementById("lb-cap").textContent = el.dataset.lbl || "";
  document.getElementById("lb-counter").textContent = lbIdx + 1 + " / " + lbItems.length;
}

function navLb(dir) {
  lbIdx = (lbIdx + dir + lbItems.length) % lbItems.length;
  _showLb();
}

function closeLb(e) {
  if (e && e.target !== document.getElementById("lb") && !e.target.closest(".lb-close")) return;
  document.getElementById("lb").classList.remove("on");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  const lb = document.getElementById("lb");
  if (!lb || !lb.classList.contains("on")) return;
  if (e.key === "Escape") closeLb({ target: document.getElementById("lb") });
  if (e.key === "ArrowLeft") navLb(-1);
  if (e.key === "ArrowRight") navLb(1);
});

// Touch swipe
(function () {
  const lb = document.getElementById("lb");
  if (!lb) return;
  lb.addEventListener(
    "touchstart",
    (e) => {
      lbTouchX = e.touches[0].clientX;
    },
    { passive: true },
  );
  lb.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - lbTouchX;
      if (Math.abs(dx) > 50) navLb(dx < 0 ? 1 : -1);
    },
    { passive: true },
  );
})();

// Form
async function submitForm(btn) {
  const form = btn.closest(".ct-form");
  const inputs = form ? form.querySelectorAll("input") : [];
  const selects = form ? form.querySelectorAll("select") : [];
  const textarea = form ? form.querySelector("textarea") : null;
  const payload = {
    name: inputs[0] ? inputs[0].value.trim() : "",
    phone: inputs[1] ? inputs[1].value.trim() : "",
    email: inputs[2] ? inputs[2].value.trim() : "",
    subject: selects[0] ? selects[0].value : "",
    message: [selects[1] ? "Quy mô: " + selects[1].value : "", textarea ? textarea.value.trim() : ""].filter(Boolean).join("\n"),
  };
  if (!payload.name || !payload.phone) {
    if (window.SaigonToast) window.SaigonToast.show("Vui lòng nhập họ tên và số điện thoại.");
    return;
  }
  const orig = btn.innerHTML;
  btn.disabled = true;
  try {
    const response = await fetch("/api/travel/contact-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Request failed");
  } catch (error) {
    btn.disabled = false;
    if (window.SaigonToast) window.SaigonToast.show("Không gửi được yêu cầu. Vui lòng thử lại.");
    return;
  }
  btn.innerHTML = '<i class="fas fa-check"></i> Đã Gửi — Chúng Tôi Sẽ Liên Hệ Lại Sớm!';
  btn.style.background = "#16a34a";
  setTimeout(() => {
    btn.innerHTML = orig;
    btn.style.background = "";
    btn.disabled = false;
  }, 4000);
}

function filterDest(type, btn) {
  document.querySelectorAll(".df-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}

// Data-attribute actions keep index.html free of inline JavaScript.
document.addEventListener("click", (e) => {
  const dismissBtn = e.target.closest("[data-dismiss-bar]");
  if (dismissBtn) {
    dismissBar();
    return;
  }

  const navToggle = e.target.closest("[data-nav-toggle]");
  if (navToggle) {
    toggleNav();
    return;
  }

  const subToggle = e.target.closest("[data-msub-toggle]");
  if (subToggle) {
    toggleMsub(subToggle);
    return;
  }

  const scrollBtn = e.target.closest("[data-scroll-target]");
  if (scrollBtn) {
    const target = document.getElementById(scrollBtn.dataset.scrollTarget);
    if (target) target.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const tourFilter = e.target.closest("[data-filter-tour]");
  if (tourFilter) {
    filterTours(tourFilter.dataset.filterTour, tourFilter);
    return;
  }

  const destFilter = e.target.closest("[data-filter-dest]");
  if (destFilter) {
    filterDest(destFilter.dataset.filterDest, destFilter);
    return;
  }

  const bookingBtn = e.target.closest("[data-book-tour]");
  if (bookingBtn) {
    e.stopPropagation();
    bookTour(bookingBtn.dataset.bookTour);
    return;
  }

  const submitBtn = e.target.closest("[data-submit-form]");
  if (submitBtn) {
    submitForm(submitBtn);
    return;
  }

  const linkCard = e.target.closest("[data-href]");
  if (linkCard) {
    window.location.href = linkCard.dataset.href;
  }
});

document.querySelectorAll("[data-fallback]").forEach((img) => {
  img.addEventListener(
    "error",
    () => {
      img.parentElement.style.background = img.dataset.fallback;
      img.style.display = "none";
    },
    { once: true },
  );
});

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
