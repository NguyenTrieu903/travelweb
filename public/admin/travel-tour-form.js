(function () {
  "use strict";

  const includeTypes = [
    { value: "tour", label: "Tour" },
    { value: "transport", label: "Di chuyển" },
    { value: "meal", label: "Ăn uống" },
    { value: "stay", label: "Lưu trú" },
    { value: "ticket", label: "Vé tham quan" },
    { value: "service", label: "Dịch vụ" },
    { value: "other", label: "Dịch vụ khác" },
  ];

  const icons = [
    { value: "fa-check", label: "Đã bao gồm" },
    { value: "fa-route", label: "Lộ trình" },
    { value: "fa-bus", label: "Xe" },
    { value: "fa-plane", label: "Máy bay" },
    { value: "fa-utensils", label: "Ăn uống" },
    { value: "fa-hotel", label: "Khách sạn" },
    { value: "fa-ticket-alt", label: "Vé" },
    { value: "fa-map-marked-alt", label: "Tham quan" },
    { value: "fa-concierge-bell", label: "Dịch vụ" },
    { value: "fa-shield-alt", label: "Bảo hiểm" },
    { value: "fa-gift", label: "Ưu đãi" },
  ];

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function parseLines(value) {
    if (Array.isArray(value)) {
      return value;
    }

    return String(value || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  function linesToText(value) {
    return Array.isArray(value) ? value.join("\n") : "";
  }

  function readJson(storage, errorBox) {
    const raw = storage.value.trim();

    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        errorBox.style.display = "none";
        errorBox.textContent = "";
        return parsed;
      }

      throw new Error("JSON không phải danh sách.");
    } catch (error) {
      errorBox.style.display = "block";
      return [];
    }
  }

  function writeJson(storage, items) {
    storage.value = JSON.stringify(items, null, 2);
  }

  function moveItem(items, index, direction) {
    const target = index + direction;

    if (target < 0 || target >= items.length) {
      return;
    }

    const current = items[index];
    items[index] = items[target];
    items[target] = current;
  }

  function renderItinerary(builder, storage, items) {
    const list = builder.querySelector("[data-tour-list]");
    const empty = builder.querySelector("[data-tour-empty]");

    list.innerHTML = "";
    empty.style.display = items.length ? "none" : "block";

    items.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "tour-builder-card";
      card.innerHTML = `
                <div class="tour-builder-card-header">
                    <div class="tour-builder-card-title">Ngày ${escapeHtml(item.day || index + 1)}: ${escapeHtml(item.title || "Chưa có tiêu đề")}</div>
                    <div class="tour-builder-card-actions">
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-move-up>↑</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-move-down>↓</button>
                        <button type="button" class="btn btn-sm btn-outline-danger" data-remove>Xóa</button>
                    </div>
                </div>
                <div class="tour-builder-card-body">
                    <div class="tour-builder-grid">
                        <div>
                            <label class="tour-builder-field-label">Ngày thứ</label>
                            <input type="number" min="1" class="form-control" data-field="day" value="${escapeHtml(item.day || index + 1)}">
                        </div>
                        <div>
                            <label class="tour-builder-field-label">Tiêu đề ngày</label>
                            <input type="text" class="form-control" data-field="title" value="${escapeHtml(item.title || "")}" placeholder="Ví dụ: Khởi hành và tham quan phố cổ">
                        </div>
                        <div class="full">
                            <label class="tour-builder-field-label">Hoạt động</label>
                            <textarea class="form-control" rows="4" data-field="activities" placeholder="Mỗi hoạt động một dòng">${escapeHtml(linesToText(item.activities))}</textarea>
                        </div>
                        <div class="full">
                            <label class="tour-builder-field-label">Bữa ăn</label>
                            <textarea class="form-control" rows="3" data-field="meals" placeholder="Ví dụ: Sáng, Trưa, Tối">${escapeHtml(linesToText(item.meals))}</textarea>
                        </div>
                    </div>
                </div>
            `;

      card.querySelectorAll("[data-field]").forEach((input) => {
        input.addEventListener("input", () => {
          const field = input.dataset.field;
          if (field === "activities" || field === "meals") {
            item[field] = parseLines(input.value);
          } else if (field === "day") {
            item[field] = Number(input.value || index + 1);
          } else {
            item[field] = input.value;
          }
          writeJson(storage, items);
        });
      });

      card.querySelector("[data-remove]").addEventListener("click", () => {
        items.splice(index, 1);
        writeJson(storage, items);
        renderItinerary(builder, storage, items);
      });

      card.querySelector("[data-move-up]").addEventListener("click", () => {
        moveItem(items, index, -1);
        writeJson(storage, items);
        renderItinerary(builder, storage, items);
      });

      card.querySelector("[data-move-down]").addEventListener("click", () => {
        moveItem(items, index, 1);
        writeJson(storage, items);
        renderItinerary(builder, storage, items);
      });

      list.appendChild(card);
    });
  }

  function renderIncludes(builder, storage, items) {
    const list = builder.querySelector("[data-tour-list]");
    const empty = builder.querySelector("[data-tour-empty]");

    list.innerHTML = "";
    empty.style.display = items.length ? "none" : "block";

    items.forEach((item, index) => {
      const iconOptions = icons
        .map(
          (icon) =>
            `<option value="${escapeHtml(icon.value)}" ${icon.value === item.icon ? "selected" : ""}>${escapeHtml(icon.label)} (${escapeHtml(icon.value)})</option>`,
        )
        .join("");
      const typeOptions = includeTypes
        .map((type) => `<option value="${escapeHtml(type.value)}" ${type.value === item.type ? "selected" : ""}>${escapeHtml(type.label)}</option>`)
        .join("");

      const card = document.createElement("div");
      card.className = "tour-builder-card";
      card.innerHTML = `
                <div class="tour-builder-card-header">
                    <div class="tour-builder-card-title">
                        <span class="tour-builder-icon-preview"><i class="fa ${escapeHtml(item.icon || "fa-check")}"></i></span>
                        ${escapeHtml(item.title || "Mục bao gồm mới")}
                    </div>
                    <div class="tour-builder-card-actions">
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-move-up>↑</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-move-down>↓</button>
                        <button type="button" class="btn btn-sm btn-outline-danger" data-remove>Xóa</button>
                    </div>
                </div>
                <div class="tour-builder-card-body">
                    <div class="tour-builder-grid">
                        <div>
                            <label class="tour-builder-field-label">Biểu tượng</label>
                            <select class="form-control" data-field="icon">${iconOptions}</select>
                        </div>
                        <div>
                            <label class="tour-builder-field-label">Loại</label>
                            <select class="form-control" data-field="type">${typeOptions}</select>
                        </div>
                        <div class="full">
                            <label class="tour-builder-field-label">Tiêu đề</label>
                            <input type="text" class="form-control" data-field="title" value="${escapeHtml(item.title || "")}" placeholder="Ví dụ: Xe du lịch đời mới">
                        </div>
                        <div class="full">
                            <label class="tour-builder-field-label">Mô tả</label>
                            <textarea class="form-control" rows="3" data-field="detail" placeholder="Mô tả ngắn về dịch vụ">${escapeHtml(item.detail || "")}</textarea>
                        </div>
                    </div>
                </div>
            `;

      card.querySelectorAll("[data-field]").forEach((input) => {
        input.addEventListener("input", () => {
          item[input.dataset.field] = input.value;
          writeJson(storage, items);
        });

        input.addEventListener("change", () => {
          item[input.dataset.field] = input.value;
          writeJson(storage, items);
        });
      });

      card.querySelector("[data-remove]").addEventListener("click", () => {
        items.splice(index, 1);
        writeJson(storage, items);
        renderIncludes(builder, storage, items);
      });

      card.querySelector("[data-move-up]").addEventListener("click", () => {
        moveItem(items, index, -1);
        writeJson(storage, items);
        renderIncludes(builder, storage, items);
      });

      card.querySelector("[data-move-down]").addEventListener("click", () => {
        moveItem(items, index, 1);
        writeJson(storage, items);
        renderIncludes(builder, storage, items);
      });

      list.appendChild(card);
    });
  }

  function initItinerary(builder) {
    const key = builder.dataset.tourBuilder;
    const storage = document.querySelector('[data-tour-json="' + key + '"]');
    const errorBox = builder.querySelector("[data-tour-error]");
    const items = readJson(storage, errorBox);

    builder.querySelector('[data-tour-action="add-day"]').addEventListener("click", () => {
      items.push({ day: items.length + 1, title: "", activities: [], meals: [] });
      writeJson(storage, items);
      renderItinerary(builder, storage, items);
    });

    renderItinerary(builder, storage, items);
  }

  function initIncludes(builder) {
    const key = builder.dataset.tourBuilder;
    const storage = document.querySelector('[data-tour-json="' + key + '"]');
    const errorBox = builder.querySelector("[data-tour-error]");
    const items = readJson(storage, errorBox);

    const addBtn = builder.querySelector("[data-tour-action]");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        items.push({ icon: "fa-check", type: "service", title: "", detail: "" });
        writeJson(storage, items);
        renderIncludes(builder, storage, items);
      });
    }

    renderIncludes(builder, storage, items);
  }

  function renderCompare(builder, storage, items) {
    const list = builder.querySelector("[data-tour-list]");
    const empty = builder.querySelector("[data-tour-empty]");
    list.innerHTML = "";
    empty.style.display = items.length ? "none" : "block";

    items.forEach((row, index) => {
      const isHeader = index === 0;
      const card = document.createElement("div");
      card.className = "tour-builder-card";
      card.innerHTML = `
                <div class="tour-builder-card-header">
                    <div class="tour-builder-card-title">${isHeader ? "<strong>Tiêu đề cột</strong>" : "Hàng " + index}</div>
                    <div class="tour-builder-card-actions">
                        ${!isHeader ? '<button type="button" class="btn btn-sm btn-outline-secondary" data-move-up>↑</button>' : ""}
                        ${!isHeader ? '<button type="button" class="btn btn-sm btn-outline-secondary" data-move-down>↓</button>' : ""}
                        ${!isHeader ? '<button type="button" class="btn btn-sm btn-outline-danger" data-remove>Xóa</button>' : ""}
                    </div>
                </div>
                <div class="tour-builder-card-body">
                    <div class="tour-builder-grid">
                        <div><label class="tour-builder-field-label">${"DỊCH VỤ"}</label>
                            <input type="text" class="form-control" data-col="0" placeholder="Nhập loại dịch vụ"></div>
                        <div><label class="tour-builder-field-label">${"ĐẶT LẺ TỪNG PHẦN"}</label>
                            <input type="text" class="form-control" data-col="1" placeholder="Nhập giá đặt lẻ"></div>
                        <div><label class="tour-builder-field-label">${"COMBO SAIGONTEAM"}</label>
                            <input type="text" class="form-control" data-col="2" placeholder="Nhập giá combo"></div>
                    </div>
                </div>`;

      card.querySelectorAll("[data-col]").forEach((input) => {
        input.addEventListener("input", () => {
          row[parseInt(input.dataset.col, 10)] = input.value;
          writeJson(storage, items);
        });
      });

      const removeBtn = card.querySelector("[data-remove]");
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          items.splice(index, 1);
          writeJson(storage, items);
          renderCompare(builder, storage, items);
        });
      }
      const upBtn = card.querySelector("[data-move-up]");
      if (upBtn) {
        upBtn.addEventListener("click", () => {
          if (index <= 1) return;
          moveItem(items, index, -1);
          writeJson(storage, items);
          renderCompare(builder, storage, items);
        });
      }
      const downBtn = card.querySelector("[data-move-down]");
      if (downBtn) {
        downBtn.addEventListener("click", () => {
          moveItem(items, index, 1);
          writeJson(storage, items);
          renderCompare(builder, storage, items);
        });
      }

      list.appendChild(card);
    });

    renderComparePreview(builder, items);
  }

  function renderComparePreview(builder, items) {
    const preview = builder.querySelector("[data-compare-preview]");
    if (!preview) return;

    if (!items.length) {
      preview.innerHTML = '<p class="compare-preview-empty">Chưa có dữ liệu.</p>';
      return;
    }

    const [header, ...rows] = items;
    const cols = header || ["Hạng mục", "Đặt lẻ", "Combo"];
    const thHtml = cols.map((h) => `<th>${escapeHtml(h)}</th>`).join("");
    const rowsHtml = rows
      .map((row) => `<tr>${(row || []).map((cell, i) => `<td${i === 2 ? ' class="combo-val"' : ""}>${escapeHtml(cell || "")}</td>`).join("")}</tr>`)
      .join("");

    preview.innerHTML = `<table><thead><tr>${thHtml}</tr></thead><tbody>${rowsHtml}</tbody></table>`;
  }

  function initCompare(builder) {
    const storage = document.querySelector('[data-tour-json="compare"]');
    const errorBox = builder.querySelector("[data-tour-error]");
    const items = readJson(storage, errorBox);

    if (!items.length) {
      items.push(["Hạng mục", "Đặt lẻ", "Combo"]);
      writeJson(storage, items);
    }

    builder.querySelector('[data-tour-action="add-row"]').addEventListener("click", () => {
      items.push(["", "", ""]);
      writeJson(storage, items);
      renderCompare(builder, storage, items);
    });

    renderCompare(builder, storage, items);
  }

  function renderReviews(builder, storage, items) {
    const list = builder.querySelector("[data-tour-list]");
    const empty = builder.querySelector("[data-tour-empty]");
    list.innerHTML = "";
    empty.style.display = items.length ? "none" : "block";

    items.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "tour-builder-card";
      card.innerHTML = `
                <div class="tour-builder-card-header">
                    <div class="tour-builder-card-title">${escapeHtml(item.name || "Đánh giá mới")}</div>
                    <div class="tour-builder-card-actions">
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-move-up>↑</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-move-down>↓</button>
                        <button type="button" class="btn btn-sm btn-outline-danger" data-remove>Xóa</button>
                    </div>
                </div>
                <div class="tour-builder-card-body">
                    <div class="tour-builder-grid">
                        <div><label class="tour-builder-field-label">Họ tên</label>
                            <input type="text" class="form-control" data-field="name" value="${escapeHtml(item.name || "")}" placeholder="Nguyễn Văn A"></div>
                        <div><label class="tour-builder-field-label">Ngày đánh giá</label>
                            <input type="text" class="form-control" data-field="date" value="${escapeHtml(item.date || "")}" placeholder="Tháng 4/2026"></div>
                        <div><label class="tour-builder-field-label">Số sao (1–5)</label>
                            <input type="number" min="1" max="5" class="form-control" data-field="rating" value="${escapeHtml(item.rating || 5)}"></div>
                        <div class="full"><label class="tour-builder-field-label">Nội dung</label>
                            <textarea class="form-control" rows="3" data-field="text" placeholder="Nội dung đánh giá...">${escapeHtml(item.text || "")}</textarea></div>
                    </div>
                </div>`;

      card.querySelectorAll("[data-field]").forEach((input) => {
        input.addEventListener("input", () => {
          item[input.dataset.field] = input.dataset.field === "rating" ? Number(input.value) : input.value;
          writeJson(storage, items);
        });
      });

      card.querySelector("[data-remove]").addEventListener("click", () => {
        items.splice(index, 1);
        writeJson(storage, items);
        renderReviews(builder, storage, items);
      });
      card.querySelector("[data-move-up]").addEventListener("click", () => {
        moveItem(items, index, -1);
        writeJson(storage, items);
        renderReviews(builder, storage, items);
      });
      card.querySelector("[data-move-down]").addEventListener("click", () => {
        moveItem(items, index, 1);
        writeJson(storage, items);
        renderReviews(builder, storage, items);
      });

      list.appendChild(card);
    });
  }

  function initReviews(builder) {
    const storage = document.querySelector('[data-tour-json="reviews"]');
    const errorBox = builder.querySelector("[data-tour-error]");
    const items = readJson(storage, errorBox);

    builder.querySelector('[data-tour-action="add-review"]').addEventListener("click", () => {
      items.push({ name: "", date: "", rating: 5, text: "" });
      writeJson(storage, items);
      renderReviews(builder, storage, items);
    });

    renderReviews(builder, storage, items);
  }

  function renderPkgStrip(builder, storage, items) {
    const list = builder.querySelector("[data-tour-list]");
    const empty = builder.querySelector("[data-tour-empty]");
    list.innerHTML = "";
    empty.style.display = items.length ? "none" : "block";

    items.forEach((item, index) => {
      const iconOptions = icons
        .map((ic) => `<option value="${escapeHtml(ic.value)}" ${ic.value === item.icon ? "selected" : ""}>${escapeHtml(ic.label)} (${escapeHtml(ic.value)})</option>`)
        .join("");

      const card = document.createElement("div");
      card.className = "tour-builder-card";
      card.innerHTML = `
                <div class="tour-builder-card-header">
                    <div class="tour-builder-card-title">
                        <span class="tour-builder-icon-preview"><i class="fa ${escapeHtml(item.icon || "fa-info-circle")}"></i></span>
                        ${escapeHtml(item.label || "Thông tin mới")}
                    </div>
                    <div class="tour-builder-card-actions">
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-move-up>↑</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-move-down>↓</button>
                        <button type="button" class="btn btn-sm btn-outline-danger" data-remove>Xóa</button>
                    </div>
                </div>
                <div class="tour-builder-card-body">
                    <div class="tour-builder-grid">
                        <div><label class="tour-builder-field-label">Biểu tượng</label>
                            <select class="form-control" data-field="icon">${iconOptions}</select></div>
                        <div><label class="tour-builder-field-label">Tiêu đề</label>
                            <input type="text" class="form-control" data-field="label" value="${escapeHtml(item.label || "")}" placeholder="Thời lượng"></div>
                        <div class="full"><label class="tour-builder-field-label">Mô tả</label>
                            <input type="text" class="form-control" data-field="val" value="${escapeHtml(item.val || "")}" placeholder="3 ngày 2 đêm"></div>
                    </div>
                </div>`;

      card.querySelectorAll("[data-field]").forEach((input) => {
        ["input", "change"].forEach((ev) => {
          input.addEventListener(ev, () => {
            item[input.dataset.field] = input.value;
            writeJson(storage, items);
          });
        });
      });

      card.querySelector("[data-remove]").addEventListener("click", () => {
        items.splice(index, 1);
        writeJson(storage, items);
        renderPkgStrip(builder, storage, items);
      });
      card.querySelector("[data-move-up]").addEventListener("click", () => {
        moveItem(items, index, -1);
        writeJson(storage, items);
        renderPkgStrip(builder, storage, items);
      });
      card.querySelector("[data-move-down]").addEventListener("click", () => {
        moveItem(items, index, 1);
        writeJson(storage, items);
        renderPkgStrip(builder, storage, items);
      });

      list.appendChild(card);
    });
  }

  function initPkgStrip(builder) {
    const storage = document.querySelector('[data-tour-json="pkgstrip"]');
    const errorBox = builder.querySelector("[data-tour-error]");
    const items = readJson(storage, errorBox);

    builder.querySelector('[data-tour-action="add-strip-item"]').addEventListener("click", () => {
      items.push({ icon: "fa-info-circle", label: "", val: "" });
      writeJson(storage, items);
      renderPkgStrip(builder, storage, items);
    });

    renderPkgStrip(builder, storage, items);
  }

  function setActiveValue(isActive) {
    document.querySelectorAll('[name="is_active"]').forEach((input) => {
      if (input.type === "checkbox") {
        input.checked = isActive;
      } else {
        input.value = isActive ? "1" : "0";
      }
    });
  }

  function syncBeforeSubmit() {
    document.querySelectorAll("[data-tour-json]").forEach((storage) => {
      storage.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }

  function submitForm(form) {
    syncBeforeSubmit();

    if (typeof form.requestSubmit === "function") {
      form.requestSubmit();
    } else {
      form.submit();
    }
  }

  function init() {
    const itineraryBuilder = document.querySelector('[data-tour-builder="itinerary"]');
    const includesBuilder = document.querySelector('[data-tour-builder="includes"]');
    const componentsBuilder = document.querySelector('[data-tour-builder="components"]');
    const compareBuilder = document.querySelector('[data-tour-builder="compare"]');
    const reviewsBuilder = document.querySelector('[data-tour-builder="reviews"]');
    const pkgstripBuilder = document.querySelector('[data-tour-builder="pkgstrip"]');

    const hasAny = itineraryBuilder || includesBuilder || componentsBuilder || compareBuilder || reviewsBuilder || pkgstripBuilder;

    if (!hasAny) return;

    document.body.classList.add("travel-tour-admin");

    if (itineraryBuilder) initItinerary(itineraryBuilder);
    if (includesBuilder) initIncludes(includesBuilder);
    if (componentsBuilder) initIncludes(componentsBuilder);
    if (compareBuilder) initCompare(compareBuilder);
    if (reviewsBuilder) initReviews(reviewsBuilder);
    if (pkgstripBuilder) initPkgStrip(pkgstripBuilder);

    document.querySelectorAll('form[method="post"]').forEach((form) => {
      form.addEventListener("submit", syncBeforeSubmit);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
