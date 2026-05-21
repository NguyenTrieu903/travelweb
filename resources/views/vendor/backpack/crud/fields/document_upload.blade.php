{{-- Document Upload Field for PDF Files --}}
@php
    $field['value'] = $field['value'] ?? ($entry->document_file_id ?? null);
    $uploadedFile = $field['value'] ? \App\Models\UploadedFile::find($field['value']) : null;
    $context = $field['context'] ?? 'travel';
    $fieldName = $field['name'] ?? 'document_file_id';
    $uniqueId = uniqid('doc-upload-');
@endphp

<div class="document-upload-field" id="{{ $uniqueId }}">
    <label class="form-label">{{ $field['label'] ?? 'Tài liệu PDF' }}</label>
    
    @if($uploadedFile)
        <div class="alert alert-info mb-3">
            <strong>File hiện tại:</strong> {{ $uploadedFile->original_name }}
            <br>
            <small>Kích thước: {{ $uploadedFile->human_readable_size }}</small>
            <br>
            <a href="{{ backpack_url('files/' . $uploadedFile->id . '/download') }}" 
               class="btn btn-sm btn-primary mt-2" 
               target="_blank">
                <i class="la la-download"></i> Tải xuống
            </a>
            <button type="button" 
                    class="btn btn-sm btn-danger mt-2 remove-document" 
                    data-file-id="{{ $uploadedFile->id }}">
                <i class="la la-trash"></i> Xóa
            </button>
        </div>
    @endif

    <div class="upload-area border rounded p-3 text-center" style="border-style: dashed !important;">
        <input type="file" 
               id="document-input-{{ $uniqueId }}" 
               name="document_file" 
               accept="application/pdf" 
               class="d-none">
        <input type="hidden" 
               name="{{ $fieldName }}" 
               id="document-file-id-{{ $uniqueId }}" 
               value="{{ $field['value'] ?? ($entry->document_file_id ?? '') }}"
               data-initial-value="{{ $field['value'] ?? ($entry->document_file_id ?? '') }}">
        
        <div class="upload-placeholder">
            <i class="la la-file-pdf" style="font-size: 3rem; color: #dc3545;"></i>
            <p class="mt-2 mb-0">
                <button type="button" 
                        class="btn btn-primary btn-sm" 
                        onclick="document.getElementById('document-input-{{ $uniqueId }}').click()">
                    Chọn file PDF
                </button>
            </p>
            <small class="text-muted d-block mt-2">
                Chỉ chấp nhận file PDF, tối đa 30MB
            </small>
        </div>
        
        <div class="upload-progress d-none mt-3">
            <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" 
                     role="progressbar" 
                     style="width: 0%"></div>
            </div>
            <small class="text-muted">Đang upload...</small>
        </div>
        
        <div class="upload-success d-none mt-3">
            <div class="alert alert-success">
                <i class="la la-check-circle"></i> Upload thành công!
            </div>
        </div>
        
        <div class="upload-error d-none mt-3">
            <div class="alert alert-danger">
                <span class="error-message"></span>
            </div>
        </div>
    </div>
</div>

@push('after_scripts')
<script>
    (function() {
        const uniqueId = '{{ $uniqueId }}';
        const context = '{{ $context }}';
        const input = document.getElementById('document-input-' + uniqueId);
        const fileIdInput = document.getElementById('document-file-id-' + uniqueId);
        const uploadArea = document.querySelector('#{{ $uniqueId }} .upload-area');
        const placeholder = uploadArea.querySelector('.upload-placeholder');
        const progressDiv = uploadArea.querySelector('.upload-progress');
        const progressBar = progressDiv.querySelector('.progress-bar');
        const successDiv = uploadArea.querySelector('.upload-success');
        const errorDiv = uploadArea.querySelector('.upload-error');
        const errorMessage = errorDiv.querySelector('.error-message');

        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;

            // Validate file type
            if (file.type !== 'application/pdf') {
                showError('Chỉ cho phép upload file PDF');
                return;
            }

            // Validate file size (30MB)
            if (file.size > 30 * 1024 * 1024) {
                showError('File không được vượt quá 30MB');
                return;
            }

            uploadFile(file);
        });

        function uploadFile(file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('context', context);
            formData.append('_token', document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || 
                document.querySelector('input[name="_token"]')?.value);

            // Show progress
            placeholder.classList.add('d-none');
            progressDiv.classList.remove('d-none');
            successDiv.classList.add('d-none');
            errorDiv.classList.add('d-none');
            progressBar.style.width = '0%';

            // Simulate progress
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 10;
                if (progress < 90) {
                    progressBar.style.width = progress + '%';
                }
            }, 200);

            fetch('{{ backpack_url("files/upload") }}', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                credentials: 'same-origin' // Đảm bảo cookies/session được gửi kèm
            })
            .then(response => {
                // Check if response is ok
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message || 'Upload thất bại');
                    });
                }
                return response.json();
            })
            .then(data => {
                clearInterval(progressInterval);
                progressBar.style.width = '100%';

                if (data.success) {
                    const fileId = data.data.id;
                    
                    // Set giá trị vào hidden input trong view field
                    fileIdInput.value = fileId;
                    
                    // Cũng set giá trị vào hidden field của Backpack nếu có
                    const hiddenField = document.querySelector('input[name="document_file_id"][type="hidden"]');
                    if (hiddenField) {
                        hiddenField.value = fileId;
                        // Trigger change event để đảm bảo form biết giá trị đã thay đổi
                        hiddenField.dispatchEvent(new Event('change', { bubbles: true }));
                        hiddenField.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                    
                    // Log để debug
                    console.log('File uploaded, document_file_id set to:', fileId);
                    console.log('Hidden input (view) value:', fileIdInput.value);
                    console.log('Hidden field (Backpack) value:', hiddenField ? hiddenField.value : 'not found');
                    
                    showSuccess(data.data.original_name);
                    
                    // KHÔNG reload page ngay, để user có thể submit form với giá trị mới
                    // Chỉ reload nếu cần thiết
                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 1000);
                } else {
                    showError(data.message || 'Có lỗi xảy ra khi upload file');
                }
            })
            .catch(error => {
                clearInterval(progressInterval);
                showError('Có lỗi xảy ra: ' + error.message);
            });
        }

        function showSuccess(fileName) {
            progressDiv.classList.add('d-none');
            successDiv.classList.remove('d-none');
        }

        function showError(message) {
            progressDiv.classList.add('d-none');
            errorDiv.classList.remove('d-none');
            errorMessage.textContent = message;
            placeholder.classList.remove('d-none');
        }

        // Handle remove document button
        document.querySelectorAll('.remove-document').forEach(btn => {
            btn.addEventListener('click', function() {
                if (confirm('Bạn có chắc chắn muốn xóa file này?')) {
                    fileIdInput.value = '';
                    
                    // Cũng xóa giá trị trong hidden field nếu có
                    const hiddenField = document.querySelector('input[name="document_file_id"][type="hidden"]');
                    if (hiddenField) {
                        hiddenField.value = '';
                        hiddenField.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                    
                    // Remove the alert div
                    const alertDiv = this.closest('.alert');
                    if (alertDiv) {
                        alertDiv.remove();
                    }
                    // Show placeholder again
                    placeholder.classList.remove('d-none');
                }
            });
        });

        // Đảm bảo giá trị được giữ khi form submit
        // Lắng nghe sự kiện submit form để đảm bảo hidden input có giá trị
        const form = fileIdInput.closest('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                // Đảm bảo giá trị từ hidden input được gửi đi
                const viewFieldValue = fileIdInput.value;
                const backpackHiddenField = document.querySelector('input[name="document_file_id"][type="hidden"]');
                
                // Đồng bộ giá trị giữa view field và Backpack hidden field
                if (viewFieldValue && backpackHiddenField) {
                    backpackHiddenField.value = viewFieldValue;
                }
                
                // Log để debug
                console.log('Form submit - document_file_id values:', {
                    viewField: viewFieldValue,
                    backpackField: backpackHiddenField ? backpackHiddenField.value : 'not found'
                });
            });
        }
    })();
</script>
@endpush

