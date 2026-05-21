<div class="image-upload-field">
    <div class="row">
        <div class="col-md-6">
            <label for="image" class="form-label">Đường dẫn hình ảnh</label>
            <input type="text"
                name="image"
                id="image"
                class="form-control"
                value="{{ old('image', $entry->image ?? $field['value'] ?? '') }}"
                placeholder="Nhập đường dẫn hình ảnh hoặc URL">
            <small class="form-text text-muted">
                Hỗ trợ: URL trực tiếp, đường dẫn tương đối từ public/
            </small>
        </div>
        <div class="col-md-6">
            <label class="form-label">Preview</label>
            <div class="image-preview" style="border: 1px solid #ddd; padding: 10px; min-height: 150px; text-align: center; background: #f8f9fa; position: relative;">
                <img id="image-preview"
                    src=""
                    alt="Preview"
                    style="max-width: 100%; max-height: 200px; display: none;">
                <div id="no-image" style="color: #6c757d; padding: 20px;">
                    <i class="fas fa-image" style="font-size: 48px; opacity: 0.3;"></i>
                    <br>
                    <small>Chưa có hình ảnh</small>
                </div>
                <button type="button"
                    id="delete-image-btn"
                    class="btn btn-danger btn-sm"
                    style="position: absolute; top: 5px; right: 5px; display: none;"
                    onclick="deleteImage()">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    </div>

    <div class="mt-3">
        <div class="upload-section">
            <input type="file"
                id="file-upload"
                accept="image/*"
                style="display: none;"
                onchange="uploadImage(this)">
            <button type="button" class="btn btn-primary btn-sm" onclick="document.getElementById('file-upload').click()">
                <i class="fas fa-upload"></i> Upload hình ảnh
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="selectImageFromGallery()">
                <i class="fas fa-images"></i> Chọn từ thư viện
            </button>
            <button type="button" class="btn btn-outline-info btn-sm" onclick="openImageManager()">
                <i class="fas fa-folder-open"></i> Quản lý hình ảnh
            </button>
        </div>
        <div id="upload-progress" style="display: none; margin-top: 10px;">
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%"></div>
            </div>
            <small class="text-muted">Đang upload...</small>
        </div>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        const imageInput = document.getElementById('image');
        const imagePreview = document.getElementById('image-preview');
        const noImage = document.getElementById('no-image');

        // Preview hình ảnh khi nhập URL
        imageInput.addEventListener('input', function() {
            const url = this.value.trim();
            const deleteBtn = document.getElementById('delete-image-btn');

            if (url) {
                imagePreview.src = url;
                imagePreview.style.display = 'block';
                noImage.style.display = 'none';
                deleteBtn.style.display = 'block';

                // Kiểm tra hình ảnh có load được không
                imagePreview.onload = function() {
                    console.log('Image loaded successfully');
                };

                imagePreview.onerror = function() {
                    console.log('Image failed to load');
                    imagePreview.style.display = 'none';
                    noImage.style.display = 'block';
                    deleteBtn.style.display = 'none';
                    noImage.innerHTML = '<i class="fas fa-exclamation-triangle" style="color: #dc3545;"></i><br><small>Không thể load hình ảnh</small>';
                };
            } else {
                imagePreview.style.display = 'none';
                noImage.style.display = 'block';
                deleteBtn.style.display = 'none';
                noImage.innerHTML = '<i class="fas fa-image" style="font-size: 48px; opacity: 0.3;"></i><br><small>Chưa có hình ảnh</small>';
            }
        });

        // Load hình ảnh ban đầu nếu có
        if (imageInput.value) {
            imageInput.dispatchEvent(new Event('input'));
        }
    });

    function uploadImage(input) {
        const file = input.files[0];
        if (!file) return;

        // Kiểm tra loại file
        if (!file.type.startsWith('image/')) {
            alert('Vui lòng chọn file hình ảnh');
            return;
        }

        // Kiểm tra kích thước file (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Kích thước file không được vượt quá 5MB');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        // Lấy CSRF token từ meta tag hoặc input hidden
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ||
            document.querySelector('input[name="_token"]')?.value;
        if (csrfToken) {
            formData.append('_token', csrfToken);
        }

        // Hiển thị progress bar
        const progressDiv = document.getElementById('upload-progress');
        const progressBar = progressDiv.querySelector('.progress-bar');
        progressDiv.style.display = 'block';

        // Upload file
        fetch('/admin/upload-image', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => {
                console.log('Upload response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Upload response data:', data);
                progressDiv.style.display = 'none';

                if (data.success) {
                    // Cập nhật input field
                    document.getElementById('image').value = data.url;
                    // Trigger preview
                    document.getElementById('image').dispatchEvent(new Event('input'));

                    // Hiển thị thông báo thành công
                    showNotification('Upload thành công!', 'success');
                } else {
                    showNotification('Upload thất bại: ' + data.message, 'error');
                }
            })
            .catch(error => {
                console.error('Upload error:', error);
                progressDiv.style.display = 'none';
                showNotification('Lỗi upload: ' + error.message, 'error');
            });
    }

    function deleteImage() {
        if (confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
            const imageInput = document.getElementById('image');
            const imagePreview = document.getElementById('image-preview');
            const noImage = document.getElementById('no-image');
            const deleteBtn = document.getElementById('delete-image-btn');

            // Clear input
            imageInput.value = '';

            // Hide preview and show no-image
            imagePreview.style.display = 'none';
            noImage.style.display = 'block';
            deleteBtn.style.display = 'none';
            noImage.innerHTML = '<i class="fas fa-image" style="font-size: 48px; opacity: 0.3;"></i><br><small>Chưa có hình ảnh</small>';

            showNotification('Đã xóa hình ảnh', 'success');
        }
    }

    function selectImageFromGallery() {
        // Mở modal chọn hình ảnh (có thể tích hợp với file manager)
        alert('Tính năng chọn từ thư viện sẽ được phát triển');
    }

    function openImageManager() {
        // Mở file manager để quản lý hình ảnh
        alert('Tính năng quản lý hình ảnh sẽ được phát triển');
    }

    function showNotification(message, type) {
        // Tạo thông báo đơn giản
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

        // Tự động ẩn sau 3 giây
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
</script>

<style>
    .image-upload-field .image-preview {
        border-radius: 4px;
        transition: all 0.3s ease;
    }

    .image-upload-field .image-preview:hover {
        border-color: #007bff;
    }

    .image-upload-field .btn {
        margin-right: 5px;
    }
</style>