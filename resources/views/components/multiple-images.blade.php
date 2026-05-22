{{-- 
    Multiple Images Component - ONE FILE FOR ALL
    
    Usage:
    1. CRUD: @include('components.multiple-images', ['name' => 'image_urls', 'context' => 'crud'])
    2. Frontend: @include('components.multiple-images', ['name' => 'gallery', 'context' => 'frontend'])
    3. Any Model: Just use this component
--}}

@php
    // Default values
    $name = $name ?? 'image_urls';
    $label = $label ?? 'Hình ảnh';
    
    // Get value from Backpack field or parameter
    $value = $value ?? $field['value'] ?? $field['data']['value'] ?? old($name) ?? $entry->{$name} ?? [];
    
    $maxFiles = $maxFiles ?? 10;
    $acceptedTypes = $acceptedTypes ?? 'image/*';
    $hint = $hint ?? 'Nhập các đường dẫn hình ảnh, mỗi URL trên một dòng';
    $context = $context ?? 'crud'; // 'crud' or 'frontend'
    $uniqueId = uniqid('img-');
    
    // Convert array to string for textarea
    $textValue = is_array($value) ? implode("\n", $value) : $value;
    
    // Use admin endpoints (with auth middleware)
    $uploadEndpoint = '/admin/upload-multiple-images';
    $deleteEndpoint = '/admin/delete-image';
@endphp

<div class="multiple-images-field" data-context="{{ $context }}" id="{{ $uniqueId }}">
    <div class="row">
        <div class="col-md-8">
            <label for="{{ $name }}_{{ $uniqueId }}" class="form-label">{{ $label }}</label>
            <textarea name="{{ $name }}" 
                id="{{ $name }}_{{ $uniqueId }}" 
                class="form-control" 
                rows="5"
                placeholder="{{ $hint }}&#10;Ví dụ:&#10;https://example.com/image1.jpg&#10;https://example.com/image2.jpg">{{ $textValue }}</textarea>
            <small class="form-text text-muted">
                Mỗi URL trên một dòng. Hỗ trợ: URL trực tiếp, đường dẫn tương đối ( hình đầu tiên sẽ là hình ảnh chính )
            </small>
        </div>
        <div class="col-md-4">
            <label class="form-label">Preview</label>
            <div class="images-preview" style="border: 1px solid #ddd; padding: 10px; min-height: 200px; max-height: 300px; overflow-y: auto; background: #f8f9fa; border-radius: 4px;">
                <div class="images-container">
                    <!-- Images will be loaded here -->
                </div>
                <div class="no-images" style="color: #6c757d; text-align: center; padding: 20px;">
                    <i class="fas fa-images" style="font-size: 48px; opacity: 0.3;"></i>
                    <br>
                    <small>Chưa có hình ảnh</small>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-3">
        <div class="upload-section">
            <input type="file" class="file-upload" accept="{{ $acceptedTypes }}" multiple style="display: none;">
            <button type="button" class="btn btn-primary btn-sm upload-btn">
                <i class="fas fa-upload"></i> Upload nhiều hình ảnh
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm add-url-btn">
                <i class="fas fa-plus"></i> Thêm URL
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm clear-all-btn">
                <i class="fas fa-trash"></i> Xóa tất cả
            </button>
        </div>
        <div class="upload-progress" style="display: none; margin-top: 10px;">
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%"></div>
            </div>
            <small class="text-muted">Đang upload...</small>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const component = document.getElementById('{{ $uniqueId }}');
    if (!component) return;
    
    const textarea = component.querySelector('textarea');
    const imagesContainer = component.querySelector('.images-container');
    const noImagesDiv = component.querySelector('.no-images');
    const fileInput = component.querySelector('.file-upload');
    const uploadBtn = component.querySelector('.upload-btn');
    const addUrlBtn = component.querySelector('.add-url-btn');
    const clearAllBtn = component.querySelector('.clear-all-btn');
    const progressDiv = component.querySelector('.upload-progress');
    const progressBar = progressDiv.querySelector('.progress-bar');
    
    // Initialize
    updatePreview();
    
    // Event listeners
    textarea.addEventListener('input', updatePreview);
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => handleUpload(e.target));
    addUrlBtn.addEventListener('click', addUrl);
    clearAllBtn.addEventListener('click', clearAll);
    
    function updatePreview() {
        const urls = textarea.value.split('\n').filter(url => url.trim() !== '');
        imagesContainer.innerHTML = '';
        
        if (urls.length === 0) {
            noImagesDiv.style.display = 'block';
            return;
        }
        
        noImagesDiv.style.display = 'none';
        
        urls.forEach((url, index) => {
            if (url.trim()) {
                const div = document.createElement('div');
                div.style.cssText = 'position: relative; display: inline-block; margin: 5px; border: 1px solid #ddd; border-radius: 4px; overflow: hidden;';
                
                const img = document.createElement('img');
                img.src = url.trim();
                img.style.cssText = 'width: 80px; height: 80px; object-fit: cover; display: block;';
                img.alt = `Image ${index + 1}`;
                
                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'btn btn-danger btn-sm';
                deleteBtn.style.cssText = 'position: absolute; top: 2px; right: 2px; padding: 2px 4px; font-size: 10px;';
                deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
                deleteBtn.onclick = () => removeImage(index, url.trim());
                
                img.onerror = () => img.style.opacity = '0.5';
                
                div.appendChild(img);
                div.appendChild(deleteBtn);
                imagesContainer.appendChild(div);
            }
        });
    }
    
    function removeImage(index, url) {
        if (confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
            const urls = textarea.value.split('\n').filter(url => url.trim() !== '');
            urls.splice(index, 1);
            textarea.value = urls.join('\n');
            updatePreview();
            
            // Delete from storage if it's a storage file
            if (url.includes('/storage/images/') || url.includes('storage/images/')) {
                deleteFromStorage(url);
            }
            
            showNotification('Đã xóa hình ảnh', 'success');
        }
    }
    
    function addUrl() {
        const url = prompt('Nhập URL hình ảnh:');
        if (url && url.trim()) {
            const urls = textarea.value.split('\n').filter(url => url.trim() !== '');
            if (urls.length >= {{ $maxFiles }}) {
                alert(`Chỉ được phép tối đa {{ $maxFiles }} hình ảnh`);
                return;
            }
            urls.push(url.trim());
            textarea.value = urls.join('\n');
            updatePreview();
            showNotification('Đã thêm hình ảnh', 'success');
        }
    }
    
    function clearAll() {
        if (confirm('Bạn có chắc chắn muốn xóa tất cả hình ảnh?')) {
            const urls = textarea.value.split('\n').filter(url => url.trim() !== '');
            urls.forEach(url => {
                if (url.includes('/storage/images/') || url.includes('storage/images/')) {
                    deleteFromStorage(url);
                }
            });
            textarea.value = '';
            updatePreview();
            showNotification('Đã xóa tất cả hình ảnh', 'success');
        }
    }
    
    function handleUpload(input) {
        console.log('handleUpload called');
        console.log('Input:', input);
        console.log('Input.files:', input.files);
        
        const files = input.files;
        console.log('Files selected:', files ? files.length : 0);
        
        if (!files || files.length === 0) {
            alert('Vui lòng chọn ít nhất một file');
            return;
        }
        
        const urls = textarea.value.split('\n').filter(url => url.trim() !== '');
        if (urls.length + files.length > {{ $maxFiles }}) {
            alert(`Chỉ được phép tối đa {{ $maxFiles }} hình ảnh`);
            return;
        }
        
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('images[]', files[i]);
        }
        
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ||
            document.querySelector('input[name="_token"]')?.value;
        
        console.log('CSRF Token:', csrfToken ? 'Found' : 'Not found');
        
        if (csrfToken) {
            formData.append('_token', csrfToken);
        }
        
        progressDiv.style.display = 'block';
        progressBar.style.width = '0%';
        
        console.log('Uploading to:', '{{ $uploadEndpoint }}');
        
        fetch('{{ $uploadEndpoint }}', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Upload response:', data);
            progressDiv.style.display = 'none';
            
            if (data.success && data.urls && data.urls.length > 0) {
                const newUrls = [...urls, ...data.urls];
                textarea.value = newUrls.join('\n');
                updatePreview();
                showNotification(`Upload thành công ${data.urls.length} hình ảnh!`, 'success');
            } else {
                showNotification('Upload thất bại: ' + (data.message || 'Unknown error'), 'error');
            }
        })
        .catch(error => {
            console.error('Upload error:', error);
            progressDiv.style.display = 'none';
            showNotification('Lỗi upload: ' + error.message, 'error');
        });
    }
    
    function deleteFromStorage(url) {
        let filename = '';
        if (url.includes('/storage/images/')) {
            filename = url.split('/storage/images/')[1];
        } else if (url.includes('storage/images/')) {
            filename = url.split('storage/images/')[1];
        }
        
        if (!filename) return;
        
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ||
            document.querySelector('input[name="_token"]')?.value;
        
        if (!csrfToken) return;
        
        fetch('{{ $deleteEndpoint }}', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({ filename: filename })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('File deleted:', filename);
            }
        })
        .catch(error => {
            console.error('Delete error:', error);
        });
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
});
</script>

<style>
    .multiple-images-field .images-preview {
        border-radius: 4px;
    }
    
    .multiple-images-field .upload-section {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
    
    .multiple-images-field .upload-section .btn {
        white-space: nowrap;
    }
    
    @media (max-width: 768px) {
        .multiple-images-field .upload-section {
            flex-direction: column;
        }
        
        .multiple-images-field .upload-section .btn {
            width: 100%;
        }
    }
</style>