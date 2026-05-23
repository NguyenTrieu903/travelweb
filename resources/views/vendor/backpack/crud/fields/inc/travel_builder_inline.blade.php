@once
    <script>
        (function () {
            if (window.__travelBuilderInlineReady) return;
            window.__travelBuilderInlineReady = true;

            var iconOptions = [
                ['fa-check', 'Đã bao gồm'],
                ['fa-route', 'Lộ trình'],
                ['fa-bus', 'Xe'],
                ['fa-plane', 'Máy bay'],
                ['fa-utensils', 'Ăn uống'],
                ['fa-hotel', 'Khách sạn'],
                ['fa-ticket-alt', 'Vé'],
                ['fa-map-marked-alt', 'Tham quan'],
                ['fa-concierge-bell', 'Dịch vụ'],
                ['fa-shield-alt', 'Bảo hiểm'],
                ['fa-gift', 'Ưu đãi']
            ];
            var typeOptions = [
                ['tour', 'Tour'],
                ['transport', 'Di chuyển'],
                ['meal', 'Ăn uống'],
                ['stay', 'Lưu trú'],
                ['ticket', 'Vé tham quan'],
                ['service', 'Dịch vụ'],
                ['other', 'Dịch vụ khác']
            ];

            function esc(value) {
                return String(value || '').replace(/[&<>"']/g, function (char) {
                    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char];
                });
            }

            function optionHtml(options, selected) {
                return options.map(function (opt) {
                    return '<option value="' + esc(opt[0]) + '"' + (opt[0] === selected ? ' selected' : '') + '>' + esc(opt[1]) + ' (' + esc(opt[0]) + ')</option>';
                }).join('');
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

            function controlsHtml(canRemove) {
                return '<div class="tour-builder-card-actions">' +
                    '<button type="button" class="btn btn-sm btn-outline-secondary" data-move-up>↑</button>' +
                    '<button type="button" class="btn btn-sm btn-outline-secondary" data-move-down>↓</button>' +
                    (canRemove ? '<button type="button" class="btn btn-sm btn-outline-danger" data-remove>Xóa</button>' : '') +
                    '</div>';
            }

            function renderServiceCard(item, titleFallback) {
                return '<div class="tour-builder-card-header">' +
                    '<div class="tour-builder-card-title"><span class="tour-builder-icon-preview"><i class="fa ' + esc(item.icon || 'fa-check') + '"></i></span>' + esc(item.title || titleFallback) + '</div>' +
                    controlsHtml(true) +
                '</div>' +
                '<div class="tour-builder-card-body"><div class="tour-builder-grid">' +
                    '<div><label class="tour-builder-field-label">Biểu tượng</label><select class="form-control" data-field="icon">' + optionHtml(iconOptions, item.icon || 'fa-check') + '</select></div>' +
                    '<div><label class="tour-builder-field-label">Loại</label><select class="form-control" data-field="type">' + optionHtml(typeOptions, item.type || 'service') + '</select></div>' +
                    '<div class="full"><label class="tour-builder-field-label">Tiêu đề</label><input type="text" class="form-control" data-field="title" value="' + esc(item.title || '') + '" placeholder="Ví dụ: Xe du lịch đời mới"></div>' +
                    '<div class="full"><label class="tour-builder-field-label">Mô tả</label><textarea class="form-control" rows="3" data-field="detail" placeholder="Mô tả ngắn về dịch vụ">' + esc(item.detail || '') + '</textarea></div>' +
                '</div></div>';
            }

            function renderPkgCard(item) {
                return '<div class="tour-builder-card-header">' +
                    '<div class="tour-builder-card-title"><span class="tour-builder-icon-preview"><i class="fa ' + esc(item.icon || 'fa-info-circle') + '"></i></span>' + esc(item.label || 'Thông tin mới') + '</div>' +
                    controlsHtml(true) +
                '</div>' +
                '<div class="tour-builder-card-body"><div class="tour-builder-grid">' +
                    '<div><label class="tour-builder-field-label">Biểu tượng</label><select class="form-control" data-field="icon">' + optionHtml(iconOptions, item.icon || 'fa-info-circle') + '</select></div>' +
                    '<div><label class="tour-builder-field-label">Nhãn</label><input type="text" class="form-control" data-field="label" value="' + esc(item.label || '') + '" placeholder="Thời lượng"></div>' +
                    '<div class="full"><label class="tour-builder-field-label">Giá trị</label><input type="text" class="form-control" data-field="val" value="' + esc(item.val || '') + '" placeholder="3 ngày 2 đêm"></div>' +
                '</div></div>';
            }

            function renderCompareCard(row, index) {
                var isHeader = index === 0;
                return '<div class="tour-builder-card-header">' +
                    '<div class="tour-builder-card-title">' + (isHeader ? 'Tiêu đề cột' : 'Hàng ' + index) + '</div>' +
                    controlsHtml(!isHeader) +
                '</div>' +
                '<div class="tour-builder-card-body"><div class="tour-builder-grid">' +
                    '<div><label class="tour-builder-field-label">Dịch vụ</label><input type="text" class="form-control" data-col="0" value="' + esc(row[0] || '') + '" placeholder="' + (isHeader ? 'Hạng mục' : 'Nhập loại dịch vụ') + '"></div>' +
                    '<div><label class="tour-builder-field-label">Đặt lẻ từng phần</label><input type="text" class="form-control" data-col="1" value="' + esc(row[1] || '') + '" placeholder="' + (isHeader ? 'Đặt lẻ' : 'Nhập giá đặt lẻ') + '"></div>' +
                    '<div class="full"><label class="tour-builder-field-label">Combo SaigonTeam</label><input type="text" class="form-control" data-col="2" value="' + esc(row[2] || '') + '" placeholder="' + (isHeader ? 'Combo' : 'Nhập giá combo') + '"></div>' +
                '</div></div>';
            }

            function initListBuilder(type, defaults, renderer, titleFallback) {
                document.querySelectorAll('[data-tour-builder="' + type + '"]').forEach(function (builder) {
                    if (builder.dataset.inlineReady === '1') return;
                    builder.dataset.inlineReady = '1';

                    var storage = document.querySelector('[data-tour-json="' + type + '"]');
                    var list = builder.querySelector('[data-tour-list]');
                    var empty = builder.querySelector('[data-tour-empty]');
                    var add = builder.querySelector('[data-tour-action]');
                    if (!storage || !list || !empty || !add) return;

                    var items = read(storage);

                    function render() {
                        list.innerHTML = '';
                        empty.style.display = items.length ? 'none' : 'block';

                        items.forEach(function (item, index) {
                            var card = document.createElement('div');
                            card.className = 'tour-builder-card';
                            card.innerHTML = renderer(item, index, titleFallback);

                            card.querySelectorAll('[data-field]').forEach(function (input) {
                                input.addEventListener('input', function () {
                                    item[input.dataset.field] = input.value;
                                    write(storage, items);
                                });
                                input.addEventListener('change', function () {
                                    item[input.dataset.field] = input.value;
                                    write(storage, items);
                                    render();
                                });
                            });

                            var remove = card.querySelector('[data-remove]');
                            if (remove) remove.addEventListener('click', function () {
                                items.splice(index, 1);
                                write(storage, items);
                                render();
                            });
                            card.querySelector('[data-move-up]').addEventListener('click', function () {
                                move(items, index, -1);
                                write(storage, items);
                                render();
                            });
                            card.querySelector('[data-move-down]').addEventListener('click', function () {
                                move(items, index, 1);
                                write(storage, items);
                                render();
                            });

                            list.appendChild(card);
                        });
                    }

                    add.addEventListener('click', function () {
                        items.push(Object.assign({}, defaults));
                        write(storage, items);
                        render();
                    });

                    render();
                });
            }

            function initCompare() {
                document.querySelectorAll('[data-tour-builder="compare"]').forEach(function (builder) {
                    if (builder.dataset.inlineReady === '1') return;
                    builder.dataset.inlineReady = '1';

                    var storage = document.querySelector('[data-tour-json="compare"]');
                    var list = builder.querySelector('[data-tour-list]');
                    var empty = builder.querySelector('[data-tour-empty]');
                    var add = builder.querySelector('[data-tour-action="add-row"]');
                    if (!storage || !list || !empty || !add) return;

                    var items = read(storage);
                    if (!items.length) {
                        items.push(['', '', '']);
                        write(storage, items);
                    }

                    function render() {
                        list.innerHTML = '';
                        empty.style.display = items.length > 1 ? 'none' : 'block';

                        items.forEach(function (row, index) {
                            var card = document.createElement('div');
                            card.className = 'tour-builder-card';
                            card.innerHTML = renderCompareCard(row || [], index);

                            card.querySelectorAll('[data-col]').forEach(function (input) {
                                input.addEventListener('input', function () {
                                    row[parseInt(input.dataset.col, 10)] = input.value;
                                    write(storage, items);
                                });
                            });

                            var remove = card.querySelector('[data-remove]');
                            if (remove) remove.addEventListener('click', function () {
                                items.splice(index, 1);
                                write(storage, items);
                                render();
                            });
                            card.querySelector('[data-move-up]').addEventListener('click', function () {
                                if (index <= 1) return;
                                move(items, index, -1);
                                write(storage, items);
                                render();
                            });
                            card.querySelector('[data-move-down]').addEventListener('click', function () {
                                if (index === 0) return;
                                move(items, index, 1);
                                write(storage, items);
                                render();
                            });

                            list.appendChild(card);
                        });
                    }

                    add.addEventListener('click', function () {
                        items.push(['', '', '']);
                        write(storage, items);
                        render();
                    });

                    render();
                });
            }

            function init() {
                initListBuilder('includes', { icon: 'fa-check', type: 'service', title: '', detail: '' }, renderServiceCard, 'Mục bao gồm mới');
                initListBuilder('components', { icon: 'fa-check', type: 'service', title: '', detail: '' }, renderServiceCard, 'Dịch vụ mới');
                initListBuilder('pkgstrip', { icon: 'fa-info-circle', label: '', val: '' }, renderPkgCard, '');
                initCompare();
            }

            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
            else init();
        })();
    </script>
@endonce
