{{-- Tour includes builder --}}
@php
    $field['wrapper']['class'] = ($field['wrapper']['class'] ?? 'form-group col-sm-12') . ' tour-builder-field';
    $rawValue = old_empty_or_null($field['name'], '') ?? $field['value'] ?? $field['default'] ?? '';
@endphp

@include('crud::fields.inc.wrapper_start')
    <label>{!! $field['label'] !!}</label>
    @include('crud::fields.inc.translatable_icon')

    <div class="tour-admin-builder" data-tour-builder="includes">
        <div class="tour-builder-heading">
            <div>
                <strong>Các dịch vụ bao gồm</strong>
                <p>Thêm từng dịch vụ bằng form trực quan, không cần nhập JSON.</p>
            </div>
            <button type="button" class="btn btn-sm btn-primary" data-tour-action="add-include">
                <i class="la la-plus"></i> Thêm mục bao gồm
            </button>
        </div>

        <div class="tour-builder-error" data-tour-error></div>
        <div class="tour-builder-list" data-tour-list></div>
        <div class="tour-builder-empty" data-tour-empty>
            Chưa có dịch vụ bao gồm. Bấm <strong>Thêm mục bao gồm</strong> để bắt đầu.
        </div>
    </div>

    <textarea
        name="{{ $field['name'] }}"
        data-tour-json="includes"
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
