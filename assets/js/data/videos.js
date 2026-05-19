/**
 * Video listing data — consumed by pages/videos.html.
 * `src` is either a YouTube ID (default) or a local mp4 path when `local:true`.
 */
(function (root) {
  'use strict';

  const featured = {
    src: 'dQw4w9WgXcQ',
    cat: 'Tour Nổi Bật',
    title: 'Highlight Tour Phú Quốc 4N3Đ — Đảo Ngọc Của Việt Nam',
    description: 'Hành trình 4 ngày 3 đêm cùng 50 khách hàng trải nghiệm Phú Quốc thiên đường — lặn ngắm san hô, safari thú hoang, và chuyến đi biển đáng nhớ tại Bãi Sao.',
    thumb: 'images/du-lich-phu-quoc.jpg',
    duration: '3:24',
    views: '12.5K lượt xem',
    date: 'Tháng 4, 2024'
  };

  const videos = [
    { cat:'tour',         catLabel:'Tour Du Lịch', title:'Tour Hạ Long 2N1Đ — Du Thuyền 5 Sao',
      desc:'Trải nghiệm Vịnh Hạ Long trên du thuyền 5 sao với 45 khách hàng từ TP. HCM.',
      thumb:'images/vinhhalong.png', thumbFb:'linear-gradient(135deg,#219EBC,#023047)',
      src:'dQw4w9WgXcQ', duration:'4:12', badge:{ text:'HOT', type:'hot' },
      views:'8.2K lượt xem', date:'03/2024' },

    { cat:'tour',         catLabel:'Tour Du Lịch', title:'Khám Phá Đà Lạt Mộng Mơ — Hành Trình Mùa Xuân',
      desc:'Cùng nhóm 35 khách hàng khám phá thung lũng tình yêu, đồi chè Cầu Đất và LangBiang.',
      thumb:'images/mountains-in-Vietnam-banner.jpg', thumbFb:'linear-gradient(135deg,#6B8F71,#3D5A3E)',
      src:'dQw4w9WgXcQ', duration:'5:38', badge:{ text:'MỚI', type:'new' },
      views:'5.4K lượt xem', date:'05/2024' },

    { cat:'tour',         catLabel:'Tour Du Lịch', title:'Sài Gòn — Mũi Né 2N1Đ — Đồi Cát Bay & Bình Minh',
      desc:'Chuyến đi cuối tuần cho 30 khách lẻ với đồi cát vàng, suối Tiên và resort biển 4 sao.',
      thumb:'images/tour-sai-gon-mui-ne-2-ngay-1-dem-4.jpg', thumbFb:'linear-gradient(135deg,#E85D04,#FFB703)',
      src:'dQw4w9WgXcQ', duration:'3:55',
      views:'7.1K lượt xem', date:'02/2024' },

    { cat:'tour',         catLabel:'Tour Du Lịch', title:'Ninh Bình — Tràng An Cổ Tích & Hang Múa Hùng Vĩ',
      desc:'Tour 3N2Đ khám phá vịnh Hạ Long trên cạn — Tràng An, Hang Múa, chùa Bái Đính.',
      thumb:'images/ninhbinh.jpg', thumbFb:'linear-gradient(135deg,#2D6A4F,#1B4332)',
      src:'dQw4w9WgXcQ', duration:'4:48',
      views:'6.8K lượt xem', date:'01/2024' },

    { cat:'teambuilding', catLabel:'TeamBuilding', title:'TeamBuilding Acecook — Nha Trang Biển Xanh',
      desc:'Video thực tế chương trình teambuilding Acecook tại Nha Trang — hoạt động biển sôi động, gắn kết đội nhóm.',
      thumb:'images/hanhtrinhcuanhungkyniem-1.jpg', thumbFb:'linear-gradient(135deg,#0096C7,#0077B6)',
      src:'videos/ACECOOK NHA TRANG_TEAM.mp4', local:true, duration:'Local', badge:{ text:'THỰC TẾ', type:'new' },
      footLeft:{ icon:'fa-film', text:'Video thực tế' },
      footRight:{ icon:'fa-map-marker-alt', text:'Nha Trang' } },

    { cat:'teambuilding', catLabel:'TeamBuilding', title:'TeamBuilding Vũng Tàu — Năng Lượng Bùng Nổ Cùng 80+ Nhân Viên',
      desc:'Sự kiện 2 ngày 1 đêm với hoạt động ngoài trời, đốt lửa trại và mini game thú vị.',
      thumb:'images/teambuilding-1.jpg', thumbFb:'linear-gradient(135deg,#1B2A4A,#2D4080)',
      src:'dQw4w9WgXcQ', duration:'6:24', badge:{ text:'HOT', type:'hot' },
      views:'14.2K lượt xem', date:'04/2024' },

    { cat:'teambuilding', catLabel:'TeamBuilding', title:'Building Activities Indoor — Khám Phá Tinh Thần Đồng Đội',
      desc:'Hoạt động indoor sáng tạo cho 60 thành viên — game tư duy, kỹ năng team work.',
      thumb:'images/teambuilding-2.jpg', thumbFb:'linear-gradient(135deg,#E85D04,#FF8C42)',
      src:'dQw4w9WgXcQ', duration:'5:12',
      views:'9.5K lượt xem', date:'03/2024' },

    { cat:'teambuilding', catLabel:'TeamBuilding', title:'Hybrid TeamBuilding Đà Nẵng — Sáng Tạo Không Giới Hạn',
      desc:'Mô hình hybrid kết hợp indoor + outdoor cho 100 nhân viên doanh nghiệp lớn.',
      thumb:'images/dia-diem-du-lich-da-nang-thumb.jpg', thumbFb:'linear-gradient(135deg,#219EBC,#1B2A4A)',
      src:'dQw4w9WgXcQ', duration:'4:36', badge:{ text:'MỚI', type:'new' },
      views:'4.8K lượt xem', date:'05/2024' },

    { cat:'event',        catLabel:'Sự Kiện',      title:'Gala Dinner Cuối Năm 2023 — Đêm Hoàng Gia Lộng Lẫy',
      desc:'Tổ chức gala 250 khách với MC, ban nhạc, ánh sáng chuyên nghiệp tại khách sạn 5 sao.',
      thumb:'images/hanhtrinhcuanhungkyniem-5.jpg', thumbFb:'linear-gradient(135deg,#7C3AED,#3730A3)',
      src:'dQw4w9WgXcQ', duration:'8:15', badge:{ text:'HOT', type:'hot' },
      views:'18.6K lượt xem', date:'12/2023' },

    { cat:'event',        catLabel:'Sự Kiện',      title:'Hội Nghị Khách Hàng 2024 — Sự Kiện 500+ Người Hoành Tráng',
      desc:'Lên kế hoạch và thực hiện trọn gói hội nghị khách hàng quy mô lớn.',
      thumb:'images/hanhtrinhcuanhungkyniem-9.jpg', thumbFb:'linear-gradient(135deg,#059669,#0D9488)',
      src:'dQw4w9WgXcQ', duration:'6:48',
      views:'11.3K lượt xem', date:'02/2024' }
  ];

  root.SaigonData = root.SaigonData || {};
  root.SaigonData.videos = { featured, list: videos };
})(window);
