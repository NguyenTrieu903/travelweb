{{-- Combo components builder --}}
@php
    $field['wrapper']['class'] = ($field['wrapper']['class'] ?? 'form-group col-sm-12') . ' tour-builder-field';
    $rawValue = old_empty_or_null($field['name'], '') ?? $field['value'] ?? $field['default'] ?? '';
@endphp

@include('crud::fields.inc.wrapper_start')
    <label>{!! $field['label'] !!}</label>
    @include('crud::fields.inc.translatable_icon')

    <div class="tour-admin-builder" data-tour-builder="components">
        <div class="tour-builder-heading">
            <div>
                <strong>Các dịch vụ trong combo</strong>
                <p>Thêm từng dịch vụ mà combo bao gồm</p>
            </div>
            <button type="button" class="btn btn-sm btn-primary" data-tour-action="add-component">
                <i class="la la-plus"></i> Thêm dịch vụ
            </button>
        </div>

        <div class="tour-builder-error" data-tour-error></div>
        <div class="tour-builder-list" data-tour-list></div>
        <div class="tour-builder-empty" data-tour-empty>
            Chưa có dịch vụ nào. Bấm <strong>Thêm dịch vụ</strong> để bắt đầu.
        </div>
    </div>

    <textarea
        name="{{ $field['name'] }}"
        data-tour-json="components"
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
