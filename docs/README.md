# Bộ tài liệu source SaigonTeam Travel

Thư mục này chứa tài liệu được tạo sau khi khảo sát source và kiểm tra nhanh giao diện tại `http://localhost:5500/`.

## Nên đọc theo thứ tự

1. `source-documentation.md`
   - Tài liệu tổng quan source.
   - Phù hợp để bàn giao cho team kỹ thuật hoặc người cần hiểu hệ thống.

2. `operation-guide.md`
   - Hướng dẫn chỉnh nội dung tour, dịch vụ, combo, gallery, video.
   - Phù hợp cho người vận hành nội dung.

3. `ui-review-checklist.md`
   - Checklist thao tác giao diện để tạo lại tài liệu hoặc review website.
   - Phù hợp khi nhận request kiểu "vào giao diện thao tác rồi tạo tài liệu".

## Kết luận nhanh

Source hiện tại là website tĩnh dùng HTML, CSS và JavaScript thuần. Dữ liệu được khai báo trong các file JavaScript ở `assets/js/data/`. Chưa thấy backend, database, CMS, tích hợp Claude/AI hoặc chức năng tạo PDF/DOCX tự động trong source.
