@push('after_scripts')
<script>
jQuery(document).ready(function($) {
    // ✅ Sync tất cả Summernote editors trước khi submit
    function syncAllSummernotes() {
        // ✅ Hỗ trợ tất cả các field: content_, description_, và các field khác
        $('textarea[data-summernote], textarea[name^="content_"], textarea[name^="description_"]').each(function() {
            var $textarea = $(this);
            
            // Kiểm tra xem có Summernote instance không
            if ($textarea.data('summernote') || $textarea.next('.note-editor').length) {
                var $editor = $textarea.next('.note-editor');
                
                if ($editor.length) {
                    var $codeview = $editor.find('.note-codable');
                    
                    // Nếu đang ở codeview
                    if ($codeview.length && $codeview.is(':visible')) {
                        var content = $codeview.val();
                        $textarea.val(content);
                        // Cập nhật Summernote instance nếu có
                        if ($textarea.summernote && typeof $textarea.summernote === 'function') {
                            $textarea.summernote('code', content);
                        }
                    } else {
                        // Lấy nội dung từ Summernote
                        if ($textarea.summernote && typeof $textarea.summernote === 'function') {
                            var content = $textarea.summernote('code');
                            $textarea.val(content);
                        }
                    }
                }
            }
        });
    }
    
    // Hook vào form submit
    $(document).on('submit', 'form[method="post"]', function(e) {
        syncAllSummernotes();
    });
    
    // Hook vào nút Save
    $(document).on('click', 'button[type="submit"]', function() {
        setTimeout(syncAllSummernotes, 50);
    });
});
</script>
@endpush
