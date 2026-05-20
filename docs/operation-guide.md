# Hướng dẫn vận hành nội dung

Tài liệu này dành cho người cần chỉnh nội dung website SaigonTeam Travel ở mức cơ bản.

## 1. Chỉnh thông tin tour

File cần sửa:

```text
assets/js/data/tours.js
```

Mỗi tour nằm trong mảng `TOURS`. Khi sửa tour, thường chỉnh các trường:

```js
{
  id: 'pq-4n',
  title: 'Tên tour',
  img: 'images/du-lich-phu-quoc.jpg',
  duration: '4 ngày 3 đêm',
  dates: ['15/07', '22/07'],
  price: 6900000,
  priceText: '6.900.000'
}
```

Lưu ý:

- `id` là mã tour trên URL, không nên đổi nếu link đã được dùng.
- `price` là số, không dùng dấu chấm phân cách.
- `priceText` là text hiển thị.
- `img` cần trỏ đúng file trong thư mục `images/`.
- Nếu tour không có giá cố định, có thể để `price: null` và `priceText: 'Liên hệ'`.

## 2. Thêm tour mới

1. Copy một object tour đang có trong `TOURS`.
2. Dán vào cuối mảng.
3. Đổi `id`, `title`, `img`, `duration`, `dates`, `price`, `priceText`.
4. Kiểm tra dấu phẩy giữa các object.
5. Mở `pages/tour-list.html` để kiểm tra card tour.
6. Mở `pages/tour-detail.html?id=<id-tour-moi>` để kiểm tra trang chi tiết.

Ví dụ URL kiểm tra:

```text
http://localhost:5500/pages/tour-detail.html?id=pq-4n
```

## 3. Chỉnh nội dung dịch vụ

File cần sửa:

```text
assets/js/data/services.js
```

Các dịch vụ hiện có:

| ID | Dịch vụ |
| --- | --- |
| `tour-doan-le` | Tour khách đoàn và khách lẻ |
| `teambuilding` | Tổ chức teambuilding |
| `su-kien` | Tổ chức sự kiện |
| `thue-xe` | Cho thuê xe du lịch |
| `ve-may-bay` | Bán vé máy bay |

Trang chi tiết dịch vụ dùng URL dạng:

```text
http://localhost:5500/pages/service-detail.html?id=teambuilding
```

Các nhóm nội dung thường chỉnh:

| Trường | Nội dung |
| --- | --- |
| `name` | Tên dịch vụ |
| `sub` | Mô tả ngắn ở hero |
| `desc` | Mô tả chi tiết |
| `highlights` | Điểm nổi bật |
| `includes` | Dịch vụ bao gồm |
| `packages` | Các gói/bảng giá |
| `process` | Quy trình thực hiện |
| `faq` | Câu hỏi thường gặp |

## 4. Chỉnh combo

File cần sửa:

```text
assets/js/data/combos.js
```

Sau khi chỉnh combo, mở URL:

```text
http://localhost:5500/pages/combo-detail.html?id=<combo-id>
```

Nếu trang không đúng dữ liệu, kiểm tra:

- `id` trên URL có đúng với `id` trong data không.
- File JS data có lỗi dấu phẩy, dấu ngoặc hoặc dấu nháy không.
- Ảnh trong combo có tồn tại không.

## 5. Chỉnh gallery

File cần sửa:

```text
assets/js/data/gallery.js
```

Mỗi item gallery thường có category, tiêu đề và đường dẫn ảnh. Sau khi sửa, mở:

```text
http://localhost:5500/pages/gallery.html
```

## 6. Chỉnh video

File cần sửa:

```text
assets/js/data/videos.js
```

Sau khi sửa, mở:

```text
http://localhost:5500/pages/videos.html
```

## 7. Chỉnh header/footer

| Nội dung | File |
| --- | --- |
| Menu/header | `assets/js/components/header.js` |
| Footer | `assets/js/components/footer.js` |
| Nút liên hệ nổi | `assets/js/components/float-social.js` |

Khi đổi đường dẫn menu, cần kiểm tra cả trang chủ và trang con vì base path có thể khác nhau.

## 8. Chỉnh giao diện

CSS dùng chung:

```text
assets/css/base.css
assets/css/components.css
assets/css/layout.css
assets/css/main.css
assets/css/variables.css
```

CSS riêng từng trang:

```text
assets/css/pages/
```

Nếu chỉ chỉnh một trang, ưu tiên sửa CSS riêng trong `assets/css/pages/` để hạn chế ảnh hưởng toàn site.

## 9. Checklist sau khi chỉnh nội dung

- Mở lại trang vừa sửa trên `http://localhost:5500/`.
- Kiểm tra console trình duyệt có lỗi JavaScript không.
- Kiểm tra ảnh có hiển thị không.
- Kiểm tra link điều hướng có đúng không.
- Kiểm tra desktop và mobile nếu thay đổi layout.
- Với tour/dịch vụ/combo mới, mở trực tiếp URL chi tiết theo `id`.

## 10. Những phần chưa có trong source

- Chưa có dashboard quản trị.
- Chưa có lưu form vào database.
- Chưa có gửi email tự động.
- Chưa có upload ảnh từ giao diện.
- Chưa có chức năng tạo PDF/DOCX.
- Chưa có tích hợp Claude/AI.
