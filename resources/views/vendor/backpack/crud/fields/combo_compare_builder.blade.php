{{-- Combo comparison table builder --}}
@php
    $field['wrapper']['class'] = ($field['wrapper']['class'] ?? 'form-group col-sm-12') . ' tour-builder-field';
    $rawValue = old_empty_or_null($field['name'], '') ?? $field['value'] ?? $field['default'] ?? '';
@endphp

@include('crud::fields.inc.wrapper_start')
    <label>{!! $field['label'] !!}</label>
    @include('crud::fields.inc.translatable_icon')

    <div class="tour-admin-builder" data-tour-builder="compare">

        <div class="compare-intro">
            <div class="compare-intro-text">
                <strong><i class="la la-balance-scale"></i> Bảng này dùng để làm gì?</strong>
                <p>Khi khách phân vân giữa đặt lẻ và mua combo, bảng này giúp họ thấy ngay <strong>combo tiết kiệm hơn bao nhiêu</strong>. Mỗi hàng là một dịch vụ (vé máy bay, khách sạn…). Cột giữa là giá đặt lẻ — cột phải là ưu đãi khi mua combo.</p>
            </div>
            <div class="compare-intro-example">
                <div class="compare-intro-example-label">Ví dụ trên website:</div>
                <table class="compare-sample-table">
                    <thead>
                        <tr><th>DỊCH VỤ</th><th>ĐẶT LẺ TỪNG PHẦN</th><th>COMBO SAIGONTEAM</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Vé máy bay</td><td>4.500.000đ</td><td class="combo-cell">✓ Bao gồm</td></tr>
                        <tr><td>Khách sạn 3★ (3 đêm)</td><td>3.000.000đ</td><td class="combo-cell">✓ Bao gồm</td></tr>
                        <tr class="compare-total-row"><td><strong>Tổng</strong></td><td><strong>7.500.000đ</strong></td><td class="combo-cell"><strong>5.990.000đ</strong></td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="compare-workspace">
            <div class="compare-editor-panel">
                <div class="tour-builder-heading">
                    <strong>Chỉnh sửa nội dung bảng</strong>
                    <button type="button" class="btn btn-sm btn-primary" data-tour-action="add-row">
                        <i class="la la-plus"></i> Thêm hàng
                    </button>
                </div>
                <div class="tour-builder-error" data-tour-error></div>
                <div class="tour-builder-list" data-tour-list></div>
                <div class="tour-builder-empty" data-tour-empty>
                    Chưa có dữ liệu. Bấm <strong>Thêm hàng</strong> để bắt đầu.
                </div>
            </div>
        </div>

    </div>

    <textarea
        name="{{ $field['name'] }}"
        data-tour-json="compare"
        class="tour-json-storage d-none"
        @include('crud::fields.inc.attributes')
    >{{ $rawValue }}</textarea>

    @if (isset($field['hint']))
        <p class="help-block">{!! $field['hint'] !!}</p>
    @endif
@include('crud::fields.inc.wrapper_end')

@once
    @push('after_styles')
        <link rel="stylesheet" href="{{ asset('admin/travel-tour-form.css') }}?v={{ filemtime(public_path('admin/travel-tour-form.css')) }}">
    @endpush
    @push('after_scripts')
        <script src="{{ asset('admin/travel-tour-form.js') }}?v={{ filemtime(public_path('admin/travel-tour-form.js')) }}"></script>
    @endpush
@endonce
