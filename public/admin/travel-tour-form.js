(function () {
    'use strict';

    const includeTypes = [
        { value: 'tour', label: 'Tour' },
        { value: 'transport', label: 'Di chuyển' },
        { value: 'meal', label: 'Ăn uống' },
        { value: 'stay', label: 'Lưu trú' },
        { value: 'ticket', label: 'Vé tham quan' },
        { value: 'service', label: 'Dịch vụ' },
        { value: 'other', label: 'Dịch vụ khác' },
    ];

    const icons = [
        { value: 'fa-check', label: 'Đã bao gồm' },
        { value: 'fa-route', label: 'Lộ trình' },
        { value: 'fa-bus', label: 'Xe' },
        { value: 'fa-plane', label: 'Máy bay' },
        { value: 'fa-utensils', label: 'Ăn uống' },
        { value: 'fa-hotel', label: 'Khách sạn' },
        { value: 'fa-ticket-alt', label: 'Vé' },
        { value: 'fa-map-marked-alt', label: 'Tham quan' },
        { value: 'fa-concierge-bell', label: 'Dịch vụ' },
        { value: 'fa-shield-alt', label: 'Bảo hiểm' },
        { value: 'fa-gift', label: 'Ưu đãi' },
    ];

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function parseLines(value) {
        if (Array.isArray(value)) {
            return value;
        }

        return String(value || '')
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean);
    }

    function linesToText(value) {
        return Array.isArray(value) ? value.join('\n') : '';
    }

    function readJson(storage, errorBox) {
        const raw = storage.value.trim();

        if (!raw) {
            return [];
        }

        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                errorBox.style.display = 'none';
                errorBox.textContent = '';
                return parsed;
            }

            throw new Error('JSON không phải danh sách.');
        } catch (error) {
            errorBox.textContent = 'Dữ liệu cũ không đúng định dạng. Vui lòng kiểm tra lại trước khi lưu.';
            errorBox.style.display = 'block';
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
        const list = builder.querySelector('[data-tour-list]');
        const empty = builder.querySelector('[data-tour-empty]');

        list.innerHTML = '';
        empty.style.display = items.length ? 'none' : 'block';

        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'tour-builder-card';
            card.innerHTML = `
                <div class="tour-builder-card-header">
                    <div class="tour-builder-card-title">Ngày ${escapeHtml(item.day || index + 1)}: ${escapeHtml(item.title || 'Chưa có tiêu đề')}</div>
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
                            <input type="text" class="form-control" data-field="title" value="${escapeHtml(item.title || '')}" placeholder="Ví dụ: Khởi hành và tham quan phố cổ">
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

            card.querySelectorAll('[data-field]').forEach((input) => {
                input.addEventListener('input', () => {
                    const field = input.dataset.field;
                    if (field === 'activities' || field === 'meals') {
                        item[field] = parseLines(input.value);
                    } else if (field === 'day') {
                        item[field] = Number(input.value || index + 1);
                    } else {
                        item[field] = input.value;
                    }
                    writeJson(storage, items);
                });
            });

            card.querySelector('[data-remove]').addEventListener('click', () => {
                items.splice(index, 1);
                writeJson(storage, items);
                renderItinerary(builder, storage, items);
            });

            card.querySelector('[data-move-up]').addEventListener('click', () => {
                moveItem(items, index, -1);
                writeJson(storage, items);
                renderItinerary(builder, storage, items);
            });

            card.querySelector('[data-move-down]').addEventListener('click', () => {
                moveItem(items, index, 1);
                writeJson(storage, items);
                renderItinerary(builder, storage, items);
            });

            list.appendChild(card);
        });

    }

    function renderIncludes(builder, storage, items) {
        const list = builder.querySelector('[data-tour-list]');
        const empty = builder.querySelector('[data-tour-empty]');

        list.innerHTML = '';
        empty.style.display = items.length ? 'none' : 'block';

        items.forEach((item, index) => {
            const iconOptions = icons.map((icon) => (
                `<option value="${escapeHtml(icon.value)}" ${icon.value === item.icon ? 'selected' : ''}>${escapeHtml(icon.label)} (${escapeHtml(icon.value)})</option>`
            )).join('');
            const typeOptions = includeTypes.map((type) => (
                `<option value="${escapeHtml(type.value)}" ${type.value === item.type ? 'selected' : ''}>${escapeHtml(type.label)}</option>`
            )).join('');

            const card = document.createElement('div');
            card.className = 'tour-builder-card';
            card.innerHTML = `
                <div class="tour-builder-card-header">
                    <div class="tour-builder-card-title">
                        <span class="tour-builder-icon-preview"><i class="fa ${escapeHtml(item.icon || 'fa-check')}"></i></span>
                        ${escapeHtml(item.title || 'Mục bao gồm mới')}
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
                            <input type="text" class="form-control" data-field="title" value="${escapeHtml(item.title || '')}" placeholder="Ví dụ: Xe du lịch đời mới">
                        </div>
                        <div class="full">
                            <label class="tour-builder-field-label">Mô tả</label>
                            <textarea class="form-control" rows="3" data-field="detail" placeholder="Mô tả ngắn về dịch vụ">${escapeHtml(item.detail || '')}</textarea>
                        </div>
                    </div>
                </div>
            `;

            card.querySelectorAll('[data-field]').forEach((input) => {
                input.addEventListener('input', () => {
                    item[input.dataset.field] = input.value;
                    writeJson(storage, items);
                });

                input.addEventListener('change', () => {
                    item[input.dataset.field] = input.value;
                    writeJson(storage, items);
                });
            });

            card.querySelector('[data-remove]').addEventListener('click', () => {
                items.splice(index, 1);
                writeJson(storage, items);
                renderIncludes(builder, storage, items);
            });

            card.querySelector('[data-move-up]').addEventListener('click', () => {
                moveItem(items, index, -1);
                writeJson(storage, items);
                renderIncludes(builder, storage, items);
            });

            card.querySelector('[data-move-down]').addEventListener('click', () => {
                moveItem(items, index, 1);
                writeJson(storage, items);
                renderIncludes(builder, storage, items);
            });

            list.appendChild(card);
        });

    }

    function initItinerary(builder) {
        const storage = document.querySelector('[data-tour-json="itinerary"]');
        const errorBox = builder.querySelector('[data-tour-error]');
        const items = readJson(storage, errorBox);

        builder.querySelector('[data-tour-action="add-day"]').addEventListener('click', () => {
            items.push({
                day: items.length + 1,
                title: '',
                activities: [],
                meals: [],
            });
            writeJson(storage, items);
            renderItinerary(builder, storage, items);
        });

        renderItinerary(builder, storage, items);
    }

    function initIncludes(builder) {
        const storage = document.querySelector('[data-tour-json="includes"]');
        const errorBox = builder.querySelector('[data-tour-error]');
        const items = readJson(storage, errorBox);

        builder.querySelector('[data-tour-action="add-include"]').addEventListener('click', () => {
            items.push({
                icon: 'fa-check',
                type: 'service',
                title: '',
                detail: '',
            });
            writeJson(storage, items);
            renderIncludes(builder, storage, items);
        });

        renderIncludes(builder, storage, items);
    }

    function setActiveValue(isActive) {
        document.querySelectorAll('[name="is_active"]').forEach((input) => {
            if (input.type === 'checkbox') {
                input.checked = isActive;
            } else {
                input.value = isActive ? '1' : '0';
            }
        });
    }

    function syncBeforeSubmit() {
        document.querySelectorAll('[data-tour-json]').forEach((storage) => {
            storage.dispatchEvent(new Event('change', { bubbles: true }));
        });
    }

    function submitForm(form) {
        syncBeforeSubmit();

        if (typeof form.requestSubmit === 'function') {
            form.requestSubmit();
        } else {
            form.submit();
        }
    }

    function addStickyActions() {
        const form = document.querySelector('form[method="post"]');
        if (!form || document.querySelector('.tour-builder-sticky-actions')) {
            return;
        }

        const bar = document.createElement('div');
        bar.className = 'tour-builder-sticky-actions';
        bar.innerHTML = `
            <span>Quản lý tour</span>
            <div>
                <button type="button" class="btn btn-outline-light btn-sm" data-tour-save-draft>Lưu nháp</button>
                <button type="button" class="btn btn-light btn-sm" data-tour-save> Lưu </button>
                <button type="button" class="btn btn-primary btn-sm" data-tour-save-active>Lưu & kích hoạt</button>
            </div>
        `;

        bar.querySelector('[data-tour-save-draft]').addEventListener('click', () => {
            setActiveValue(false);
            submitForm(form);
        });

        bar.querySelector('[data-tour-save]').addEventListener('click', () => {
            submitForm(form);
        });

        bar.querySelector('[data-tour-save-active]').addEventListener('click', () => {
            setActiveValue(true);
            submitForm(form);
        });

        document.body.appendChild(bar);
    }

    function init() {
        const itineraryBuilder = document.querySelector('[data-tour-builder="itinerary"]');
        const includesBuilder = document.querySelector('[data-tour-builder="includes"]');

        if (!itineraryBuilder && !includesBuilder) {
            return;
        }

        document.body.classList.add('travel-tour-admin');

        if (itineraryBuilder) {
            initItinerary(itineraryBuilder);
        }

        if (includesBuilder) {
            initIncludes(includesBuilder);
        }

        document.querySelectorAll('form[method="post"]').forEach((form) => {
            form.addEventListener('submit', syncBeforeSubmit);
        });

        addStickyActions();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
