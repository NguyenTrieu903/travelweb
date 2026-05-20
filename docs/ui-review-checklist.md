# Checklist thao tác giao diện để tạo tài liệu source

Checklist này dùng khi cần "vào giao diện thao tác rồi tạo tài liệu" cho source.

## 1. Chuẩn bị

Chạy local server tại thư mục source:

```powershell
py -m http.server 5500
```

Mở trình duyệt:

```text
http://localhost:5500/
```

## 2. Kiểm tra trang chủ

URL:

```text
http://localhost:5500/
```

Cần kiểm tra:

- Header/menu hiển thị.
- Hero section hiển thị ảnh/nội dung.
- Các section dịch vụ, tour, combo, đánh giá, liên hệ hiển thị.
- Nút điều hướng đến section hoặc trang con hoạt động.
- Footer hiển thị đúng thông tin.

Ghi lại:

- Website dùng để giới thiệu dịch vụ du lịch/sự kiện.
- Trang chủ đang gom nhiều nội dung marketing chính.

## 3. Kiểm tra danh sách tour

URL:

```text
http://localhost:5500/pages/tour-list.html
```

Cần kiểm tra:

- Danh sách tour render từ `assets/js/data/tours.js`.
- Bộ lọc hoặc sắp xếp nếu có.
- Click card tour chuyển sang chi tiết tour.
- Ảnh, giá, ngày khởi hành hiển thị đúng.

Ghi lại:

- Tour là dữ liệu tĩnh.
- Chi tiết tour dùng query `id`.

## 4. Kiểm tra chi tiết tour

URL mẫu:

```text
http://localhost:5500/pages/tour-detail.html?id=pq-4n
```

Cần kiểm tra:

- Tiêu đề tour, ảnh, thời lượng, giá.
- Lịch trình từng ngày.
- Các hạng mục bao gồm.
- Bộ tăng/giảm số khách và tổng tiền.
- Nút đặt tour mở popup.
- Submit popup có trạng thái thành công hay gửi thật.
- Tour liên quan điều hướng đúng.

Ghi lại:

- `tour-detail.js` xử lý đọc `id`, render UI và tính tổng tiền.
- Form hiện tại là xử lý frontend, chưa thấy backend.

## 5. Kiểm tra dịch vụ

URL:

```text
http://localhost:5500/pages/services.html
```

Cần kiểm tra:

- Các card dịch vụ chính.
- Click dịch vụ chuyển sang chi tiết.
- Nội dung ảnh/card đúng.

## 6. Kiểm tra chi tiết dịch vụ

URL mẫu:

```text
http://localhost:5500/pages/service-detail.html?id=teambuilding
```

Cần kiểm tra:

- Hero dịch vụ.
- Quick bar thông tin nhanh.
- Tabs hoặc section mô tả/gói/quy trình/FAQ.
- Nút yêu cầu báo giá mở popup.
- Submit popup có trạng thái thành công hay gửi thật.
- Dịch vụ liên quan điều hướng đúng.

Ghi lại:

- Dữ liệu đến từ `assets/js/data/services.js`.
- `service-detail.js` render nội dung theo query `id`.

## 7. Kiểm tra combo

URL mẫu:

```text
http://localhost:5500/pages/combo-detail.html?id=combo-phuquoc
```

Cần kiểm tra:

- Thông tin combo.
- Thành phần gói.
- Lịch trình.
- CTA liên hệ/đặt combo.
- Ảnh và giá.

Ghi lại:

- Dữ liệu combo nằm trong `assets/js/data/combos.js`.

## 8. Kiểm tra gallery và video

URL:

```text
http://localhost:5500/pages/gallery.html
http://localhost:5500/pages/videos.html
```

Cần kiểm tra:

- Gallery render ảnh từ data.
- Lightbox mở ảnh lớn nếu có.
- Video list render đúng.
- Filter/category nếu có.

## 9. Kiểm tra liên hệ

URL:

```text
http://localhost:5500/pages/contact.html
```

Cần kiểm tra:

- Thông tin công ty, hotline, email.
- Bản đồ iframe.
- Form liên hệ.
- Submit form có gửi thật hay chỉ hiển thị thông báo.

## 10. Nội dung cần đưa vào tài liệu cuối

Tài liệu cuối nên có:

- Tổng quan website.
- Công nghệ sử dụng.
- Cấu trúc thư mục.
- Danh sách màn hình.
- Luồng người dùng.
- File data và cách chỉnh nội dung.
- Component dùng chung.
- Cách chạy local.
- Kết quả kiểm tra giao diện.
- Ghi chú phần chưa có như backend, database, CMS, AI, xuất PDF/DOCX.

## 11. Kết luận mẫu

```text
Source hiện tại là website tĩnh giới thiệu dịch vụ SaigonTeam Travel. Dữ liệu tour, dịch vụ, combo, gallery và video được quản lý trong các file JavaScript tĩnh. Giao diện có các form đặt tour/yêu cầu báo giá nhưng hiện tại xử lý ở frontend, chưa thấy backend/API để lưu hoặc gửi dữ liệu. Source chưa có tích hợp Claude/AI hoặc chức năng tạo tài liệu tự động.
```
