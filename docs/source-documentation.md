# Tài liệu source - SaigonTeam Travel

## 1. Tổng quan

SaigonTeam Travel là website giới thiệu dịch vụ du lịch, teambuilding, sự kiện, thuê xe, vé máy bay, tour và combo du lịch.

Source hiện tại là website tĩnh, sử dụng HTML, CSS và JavaScript thuần. Project chưa có backend, database, hệ thống đăng nhập, CMS hoặc tích hợp AI/Claude trong source.

Các dữ liệu nghiệp vụ như tour, dịch vụ, combo, gallery và video được khai báo trực tiếp trong các file JavaScript ở thư mục `assets/js/data/`.

## 2. Công nghệ sử dụng

| Thành phần | Công nghệ |
| --- | --- |
| Giao diện | HTML5, CSS3 |
| Logic frontend | JavaScript thuần |
| Icon | Font Awesome |
| Font chữ | Google Fonts |
| Dữ liệu | JavaScript object/array tĩnh |
| Backend | Chưa có |
| Database | Chưa có |

## 3. Cấu trúc thư mục

```text
travelweb-main/
  index.html
  pages/
    about.html
    contact.html
    gallery.html
    services.html
    service-detail.html
    tours.html
    tour-list.html
    tour-detail.html
    combo-detail.html
    videos.html
  assets/
    css/
      base.css
      components.css
      layout.css
      main.css
      variables.css
      pages/
    js/
      main.js
      components/
      data/
      pages/
  images/
  docs/
```

### File/thư mục chính

| Đường dẫn | Vai trò |
| --- | --- |
| `index.html` | Trang chủ, chứa nhiều section chính của website. |
| `pages/` | Các trang con như danh sách tour, chi tiết tour, dịch vụ, liên hệ. |
| `assets/css/` | CSS dùng chung và CSS riêng từng trang. |
| `assets/js/components/` | Component dùng chung như header, footer, floating social, toast, lightbox. |
| `assets/js/data/` | Dữ liệu tĩnh của tour, dịch vụ, combo, gallery, video. |
| `assets/js/pages/` | Logic JavaScript riêng cho từng page. |
| `images/` | Ảnh dùng trong website. |

## 4. Danh sách màn hình

| Màn hình | File HTML | JS liên quan | Chức năng chính |
| --- | --- | --- | --- |
| Trang chủ | `index.html` | `assets/js/main.js` | Giới thiệu thương hiệu, dịch vụ, tour nổi bật, combo, đánh giá, liên hệ. |
| Giới thiệu | `pages/about.html` | `assets/js/main.js` | Thông tin công ty, cam kết, năng lực. |
| Dịch vụ | `pages/services.html` | `assets/js/main.js` | Danh sách dịch vụ chính. |
| Chi tiết dịch vụ | `pages/service-detail.html` | `assets/js/data/services.js`, `assets/js/pages/service-detail.js` | Render nội dung dịch vụ theo query `id`. |
| Tour | `pages/tours.html` | `assets/js/pages/tours.js` | Trang giới thiệu/điều hướng tour. |
| Danh sách tour | `pages/tour-list.html` | `assets/js/data/tours.js`, `assets/js/pages/tour-list.js` | Danh sách tour, lọc/sắp xếp theo dữ liệu tĩnh. |
| Chi tiết tour | `pages/tour-detail.html` | `assets/js/data/tours.js`, `assets/js/pages/tour-detail.js` | Render chi tiết tour theo query `id`, tính tổng tiền theo số khách, popup đặt tour. |
| Chi tiết combo | `pages/combo-detail.html` | `assets/js/data/combos.js`, `assets/js/pages/combo-detail.js` | Render chi tiết combo theo query `id`. |
| Gallery | `pages/gallery.html` | `assets/js/data/gallery.js`, `assets/js/pages/gallery.js` | Thư viện ảnh, lightbox. |
| Videos | `pages/videos.html` | `assets/js/data/videos.js`, `assets/js/pages/videos.js` | Danh sách video. |
| Liên hệ | `pages/contact.html` | `assets/js/pages/contact.js` | Thông tin liên hệ, bản đồ, form liên hệ. |

## 5. Luồng người dùng chính

### Xem tour và gửi yêu cầu đặt tour

1. Người dùng vào trang chủ hoặc trang danh sách tour.
2. Chọn một tour.
3. Website mở `pages/tour-detail.html?id=<tour-id>`.
4. JavaScript đọc `id` trên URL và tìm dữ liệu tương ứng trong `assets/js/data/tours.js`.
5. Trang render tiêu đề, ảnh, thời lượng, điểm đến, giá, lịch trình và tour liên quan.
6. Người dùng chọn ngày, tăng/giảm số khách.
7. Website tính tổng tiền ở frontend.
8. Khi bấm đặt tour, popup hiển thị form yêu cầu.
9. Khi submit, giao diện hiển thị trạng thái thành công giả lập. Hiện tại chưa thấy gửi dữ liệu về server.

### Xem dịch vụ và gửi yêu cầu báo giá

1. Người dùng vào trang dịch vụ.
2. Chọn một dịch vụ như Tour, TeamBuilding, Sự kiện, Thuê xe hoặc Vé máy bay.
3. Website mở `pages/service-detail.html?id=<service-id>`.
4. JavaScript đọc dữ liệu từ `assets/js/data/services.js`.
5. Trang render mô tả, điểm nổi bật, gói dịch vụ, quy trình, FAQ và dịch vụ liên quan.
6. Người dùng bấm yêu cầu báo giá.
7. Popup hiển thị form yêu cầu.
8. Khi submit, giao diện hiển thị thành công giả lập. Hiện tại chưa thấy gửi dữ liệu về server.

### Xem combo

1. Người dùng chọn combo từ trang chủ hoặc trang liên quan.
2. Website mở `pages/combo-detail.html?id=<combo-id>`.
3. JavaScript đọc dữ liệu từ `assets/js/data/combos.js`.
4. Trang render thông tin combo, lịch trình, thành phần gói và CTA liên hệ.

## 6. Quản lý dữ liệu

### Tour

File: `assets/js/data/tours.js`

Dữ liệu tour nằm trong mảng `TOURS`. Mỗi tour có các trường quan trọng:

| Trường | Ý nghĩa |
| --- | --- |
| `id` | Mã tour, dùng trên URL chi tiết tour. |
| `dest` | Nhóm điểm đến để lọc và hiển thị nhãn. |
| `title` | Tên tour. |
| `img` | Đường dẫn ảnh. |
| `duration` | Thời lượng tour. |
| `filters` | Nhóm filter như `3n2d`, `4n3d`, `sale`. |
| `badge` | Nhãn nổi bật. |
| `tags` | Các tag hiển thị trên card. |
| `dep` | Điểm khởi hành. |
| `airline` | Phương tiện/hãng bay. |
| `dates` | Ngày khởi hành. |
| `price` | Giá dạng số, dùng để tính toán. |
| `priceText` | Giá dạng text để hiển thị. |

Khi thêm tour mới, cần đảm bảo `id` không trùng và ảnh trong `img` tồn tại trong thư mục `images/`.

### Dịch vụ

File: `assets/js/data/services.js`

Dữ liệu dịch vụ nằm trong object `SERVICES`, mỗi key là một service id như:

```text
tour-doan-le
teambuilding
su-kien
thue-xe
ve-may-bay
```

Mỗi dịch vụ gồm mô tả, ảnh, quick bar, highlights, includes, packages, process và FAQ. Trang chi tiết dịch vụ lấy service theo URL:

```text
pages/service-detail.html?id=teambuilding
```

### Combo

File: `assets/js/data/combos.js`

Dữ liệu combo được dùng bởi `pages/combo-detail.html`. Mỗi combo cần có `id` ổn định để điều hướng từ card sang chi tiết.

### Gallery và video

| Loại nội dung | File dữ liệu |
| --- | --- |
| Gallery | `assets/js/data/gallery.js` |
| Video | `assets/js/data/videos.js` |

## 7. Component dùng chung

| Component | File | Vai trò |
| --- | --- | --- |
| Header | `assets/js/components/header.js` | Render menu desktop/mobile. |
| Footer | `assets/js/components/footer.js` | Render footer dùng chung. |
| Floating social | `assets/js/components/float-social.js` | Nút liên hệ nhanh/floating social. |
| Toast | `assets/js/components/toast.js` | Hiển thị thông báo nhỏ trên giao diện. |
| Lightbox | `assets/js/components/lightbox.js` | Xem ảnh dạng popup. |
| Top bar | `assets/js/components/top-bar.js` | Thanh thông báo phía trên nếu được gọi. |

## 8. Cách chạy project

### Cách 1: Mở trực tiếp

Có thể mở file:

```text
index.html
```

Tuy nhiên một số trình duyệt có thể chặn tài nguyên hoặc xử lý đường dẫn khác khi mở bằng `file://`.

### Cách 2: Chạy local server

Khuyến nghị chạy local server tại thư mục source:

```powershell
py -m http.server 5500
```

Sau đó mở:

```text
http://localhost:5500/
```

## 9. Kết quả kiểm tra giao diện

Đã kiểm tra nhanh trên local app tại `http://localhost:5500/`.

| URL | Title ghi nhận |
| --- | --- |
| `/` | SaigonTeam - Dịch Vụ & Sự Kiện |
| `/pages/tour-list.html` | Danh Sách Tour - SaigonTeam |
| `/pages/tour-detail.html?id=pq-4n` | Phú Quốc - Hòn Thơm - Vườn Thú Vinpearl Safari 4N3Đ - SaigonTeam |
| `/pages/services.html` | Dịch Vụ - SaigonTeam Travel |
| `/pages/service-detail.html?id=teambuilding` | Tổ Chức TeamBuilding - SaigonTeam |
| `/pages/combo-detail.html?id=combo-phuquoc` | Phú Quốc Paradise - Bay + Resort 4* + Tour 4 Đảo - SaigonTeam |
| `/pages/gallery.html` | Thư Viện Ảnh - SaigonTeam |
| `/pages/contact.html` | Liên Hệ - SaigonTeam Travel |

## 10. Ghi chú kỹ thuật

- Website đang là static site, chưa có backend xử lý form.
- Các popup đặt tour/yêu cầu báo giá hiện hiển thị thành công ở frontend, chưa xác nhận có gửi email/API.
- Dữ liệu đang hard-code trong JavaScript, chưa có CMS để người không kỹ thuật chỉnh sửa.
- Một số ảnh trong data cần kiểm tra lại để đảm bảo file thật sự tồn tại trong `images/`.
- Nếu muốn có tính năng AI/Claude tạo tài liệu, cần phát triển thêm backend/API riêng. Source hiện tại chưa có phần này.

## 11. Đề xuất phát triển tiếp

| Hạng mục | Mục đích |
| --- | --- |
| Backend form liên hệ | Gửi yêu cầu đặt tour/báo giá về email, CRM hoặc database. |
| CMS quản lý tour/dịch vụ | Cho nhân sự vận hành chỉnh nội dung không cần sửa code. |
| Export PDF/DOCX báo giá | Tạo tài liệu tour, proposal, báo giá cho khách. |
| Tích hợp AI | Sinh lịch trình, nội dung proposal, email tư vấn hoặc tài liệu bán hàng. |
| Kiểm tra ảnh/link tự động | Giảm lỗi ảnh mất, link sai, query id không tồn tại. |
