{{-- Tour itinerary builder --}}
@php
    $field['wrapper']['class'] = ($field['wrapper']['class'] ?? 'form-group col-sm-12') . ' tour-builder-field';
    $rawValue = old_empty_or_null($field['name'], '') ?? $field['value'] ?? $field['default'] ?? '';
@endphp

@include('crud::fields.inc.wrapper_start')
    @once
        <style>
            .tour-builder-field{margin-top:14px!important}
            .tour-builder-field>label{color:#172033!important;font-weight:800!important;margin-bottom:8px!important}
            .tour-admin-builder{background:linear-gradient(180deg,#fff 0%,#fbfcff 100%)!important;border:1px solid #d8deea!important;border-radius:16px!important;box-shadow:0 14px 32px rgba(15,23,42,.08)!important;margin-top:8px!important;overflow:hidden!important;padding:0!important}
            .tour-builder-heading{align-items:center!important;background:linear-gradient(135deg,#f7f5ff 0%,#eef6ff 100%)!important;border-bottom:1px solid #dce2ee!important;display:flex!important;gap:16px!important;justify-content:space-between!important;margin:0!important;padding:18px 20px!important}
            .tour-builder-heading strong{color:#101828!important;display:block!important;font-size:17px!important;font-weight:800!important;letter-spacing:-.01em!important}
            .tour-builder-heading p{color:#64748b!important;font-size:13px!important;line-height:1.55!important;margin:5px 0 0!important;max-width:680px!important}
            .tour-builder-heading [data-tour-action]{align-items:center!important;background:linear-gradient(135deg,#6d5dfc,#4f46e5)!important;border:0!important;border-radius:999px!important;box-shadow:0 10px 24px rgba(79,70,229,.28)!important;color:#fff!important;display:inline-flex!important;flex-shrink:0!important;font-weight:800!important;gap:7px!important;min-height:38px!important;padding:9px 15px!important;text-transform:none!important}
            .tour-builder-heading [data-tour-action]:hover{background:linear-gradient(135deg,#5b4cf4,#4338ca)!important;box-shadow:0 14px 30px rgba(79,70,229,.36)!important;transform:translateY(-1px)!important}
            .tour-builder-list{padding:16px 16px 0!important}
            .tour-builder-empty{background:#fff!important;border:1px dashed #cbd5e1!important;border-radius:12px!important;color:#64748b!important;margin:16px!important;padding:24px!important;text-align:center!important}
            .tour-builder-error{background:#fff1f2!important;border:1px solid #fecdd3!important;border-radius:8px!important;color:#be123c!important;display:none;margin:16px 16px 0!important;padding:10px 12px!important}
            .tour-builder-card{background:#fff!important;border:1px solid #dce2ee!important;border-radius:14px!important;box-shadow:0 10px 24px rgba(15,23,42,.06)!important;margin-bottom:14px!important;overflow:hidden!important}
            .tour-builder-card-header{align-items:center!important;background:#f8fafc!important;border-bottom:1px solid #edf1f7!important;display:flex!important;gap:10px!important;justify-content:space-between!important;padding:12px 14px!important}
            .tour-builder-card-title{color:#172033!important;font-weight:800!important}
            .tour-builder-card-actions{display:flex!important;flex-wrap:wrap!important;gap:6px!important}
            .tour-builder-card-actions .btn{border-radius:999px!important;font-weight:700!important;min-width:38px!important}
            .tour-builder-card-body{padding:16px!important}
            .tour-builder-grid{display:grid!important;gap:14px!important;grid-template-columns:repeat(2,minmax(0,1fr))!important}
            .tour-builder-grid .full{grid-column:1/-1!important}
            .tour-builder-field-label{color:#475569!important;display:block!important;font-size:12px!important;font-weight:800!important;margin-bottom:6px!important;text-transform:uppercase!important}
            .tour-admin-builder .form-control{background:#fff!important;border-color:#d9e0ec!important;border-radius:10px!important;color:#111827!important;min-height:40px!important}
            .tour-admin-builder textarea.form-control{min-height:104px!important}
            .tour-admin-builder .form-control:focus{border-color:#6d5dfc!important;box-shadow:0 0 0 .2rem rgba(109,93,252,.12)!important}
            @media(max-width:767px){.tour-builder-heading{align-items:stretch!important;flex-direction:column!important}.tour-builder-grid{grid-template-columns:1fr!important}}
        </style>
    @endonce

    <label>{!! $field['label'] !!}</label>
    @include('crud::fields.inc.translatable_icon')

    <div class="tour-admin-builder" data-tour-builder="itinerary">
        <div class="tour-builder-heading">
            <div>
                <strong>Lịch trình từng ngày</strong>
                <p>Admin chỉ cần nhập nội dung từng ngày, hệ thống sẽ tự lưu đúng định dạng.</p>
            </div>
            <button type="button" class="btn btn-sm btn-primary" data-tour-action="add-day">
                <i class="la la-plus"></i> Thêm ngày
            </button>
        </div>

        <div class="tour-builder-error" data-tour-error></div>
        <div class="tour-builder-list" data-tour-list></div>
        <div class="tour-builder-empty" data-tour-empty>
            Chưa có lịch trình. Bấm <strong>Thêm ngày</strong> để bắt đầu.
        </div>
    </div>

    <textarea
        name="{{ $field['name'] }}"
        data-tour-json="itinerary"
        class="tour-json-storage d-none"
        @include('crud::fields.inc.attributes')
    >{{ $rawValue }}</textarea>

    @if (isset($field['hint']))
        <p class="help-block">{!! $field['hint'] !!}</p>
    @endif
@include('crud::fields.inc.wrapper_end')

@once
    <link rel="stylesheet" href="{{ asset('admin/travel-tour-form.css') }}?v={{ filemtime(public_path('admin/travel-tour-form.css')) }}">
    <script src="{{ asset('admin/travel-tour-form.js') }}?v={{ filemtime(public_path('admin/travel-tour-form.js')) }}"></script>
    <script>
        (function () {
            function esc(value) {
                return String(value || '').replace(/[&<>"']/g, function (char) {
                    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char];
                });
            }

            function parseLines(value) {
                return String(value || '').split(/\r?\n/).map(function (line) {
                    return line.trim();
                }).filter(Boolean);
            }

            function linesToText(value) {
                return Array.isArray(value) ? value.join('\n') : '';
            }

            function read(storage) {
                try {
                    var parsed = JSON.parse((storage.value || '').trim() || '[]');
                    return Array.isArray(parsed) ? parsed : [];
                } catch (e) {
                    return [];
                }
            }

            function write(storage, items) {
                storage.value = JSON.stringify(items, null, 2);
                storage.dispatchEvent(new Event('change', { bubbles: true }));
            }

            function move(items, index, direction) {
                var target = index + direction;
                if (target < 0 || target >= items.length) return;
                var current = items[index];
                items[index] = items[target];
                items[target] = current;
            }

            function render(builder, storage, items) {
                var list = builder.querySelector('[data-tour-list]');
                var empty = builder.querySelector('[data-tour-empty]');
                if (!list || !empty) return;

                list.innerHTML = '';
                empty.style.display = items.length ? 'none' : 'block';

                items.forEach(function (item, index) {
                    var card = document.createElement('div');
                    card.className = 'tour-builder-card';
                    card.innerHTML =
                        '<div class="tour-builder-card-header">' +
                            '<div class="tour-builder-card-title">Ngày ' + esc(item.day || index + 1) + ': ' + esc(item.title || 'Chưa có tiêu đề') + '</div>' +
                            '<div class="tour-builder-card-actions">' +
                                '<button type="button" class="btn btn-sm btn-outline-secondary" data-move-up>↑</button>' +
                                '<button type="button" class="btn btn-sm btn-outline-secondary" data-move-down>↓</button>' +
                                '<button type="button" class="btn btn-sm btn-outline-danger" data-remove>Xóa</button>' +
                            '</div>' +
                        '</div>' +
                        '<div class="tour-builder-card-body">' +
                            '<div class="tour-builder-grid">' +
                                '<div><label class="tour-builder-field-label">Ngày thứ</label><input type="number" min="1" class="form-control" data-field="day" value="' + esc(item.day || index + 1) + '"></div>' +
                                '<div><label class="tour-builder-field-label">Tiêu đề ngày</label><input type="text" class="form-control" data-field="title" value="' + esc(item.title || '') + '" placeholder="Ví dụ: Khởi hành và tham quan phố cổ"></div>' +
                                '<div class="full"><label class="tour-builder-field-label">Hoạt động</label><textarea class="form-control" rows="4" data-field="activities" placeholder="Mỗi hoạt động một dòng">' + esc(linesToText(item.activities)) + '</textarea></div>' +
                                '<div class="full"><label class="tour-builder-field-label">Bữa ăn</label><textarea class="form-control" rows="3" data-field="meals" placeholder="Ví dụ: Sáng, Trưa, Tối">' + esc(linesToText(item.meals)) + '</textarea></div>' +
                            '</div>' +
                        '</div>';

                    card.querySelectorAll('[data-field]').forEach(function (input) {
                        input.addEventListener('input', function () {
                            var field = input.dataset.field;
                            if (field === 'activities' || field === 'meals') item[field] = parseLines(input.value);
                            else if (field === 'day') item[field] = Number(input.value || index + 1);
                            else item[field] = input.value;
                            write(storage, items);
                            if (field === 'title' || field === 'day') {
                                var title = card.querySelector('.tour-builder-card-title');
                                if (title) title.textContent = 'Ngày ' + (item.day || index + 1) + ': ' + (item.title || 'Chưa có tiêu đề');
                            }
                        });
                    });

                    card.querySelector('[data-remove]').addEventListener('click', function () {
                        items.splice(index, 1);
                        write(storage, items);
                        render(builder, storage, items);
                    });
                    card.querySelector('[data-move-up]').addEventListener('click', function () {
                        move(items, index, -1);
                        write(storage, items);
                        render(builder, storage, items);
                    });
                    card.querySelector('[data-move-down]').addEventListener('click', function () {
                        move(items, index, 1);
                        write(storage, items);
                        render(builder, storage, items);
                    });

                    list.appendChild(card);
                });
            }

            function init() {
                document.querySelectorAll('[data-tour-builder="itinerary"]').forEach(function (builder) {
                    if (builder.dataset.inlineItineraryReady === '1') return;
                    builder.dataset.inlineItineraryReady = '1';
                    var storage = document.querySelector('[data-tour-json="itinerary"]');
                    if (!storage) return;
                    var items = read(storage);
                    var add = builder.querySelector('[data-tour-action="add-day"]');
                    if (add) {
                        add.addEventListener('click', function () {
                            items.push({ day: items.length + 1, title: '', activities: [], meals: [] });
                            write(storage, items);
                            render(builder, storage, items);
                        });
                    }
                    render(builder, storage, items);
                });
            }

            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
            else init();
        })();
    </script>
@endonce
