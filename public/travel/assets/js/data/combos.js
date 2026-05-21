/**
 * Combo packages data — consumed by pages/combo-detail.html.
 */
(function (root) {
  'use strict';

  const COMBOS = {
    'combo-phuquoc': {
      id: 'combo-phuquoc',
      name: 'Phú Quốc Paradise — Bay + Resort 4* + Tour 4 Đảo',
      dest: 'Phú Quốc · Kiên Giang',
      duration: '4N3Đ',
      badge: 'COMBO VIP',
      badgeType: 'vip',
      savePct: 28,
      img: 'images/du-lich-phu-quoc.jpg',
      rating: 4.9,
      reviews: 312,
      oldPrice: 12500000,
      newPrice: 8990000,
      pkgStrip: [
        { icon: 'fa-plane',          label: 'Di chuyển',    val: 'Máy bay khứ hồi HCM' },
        { icon: 'fa-hotel',          label: 'Lưu trú',      val: 'Resort 4* · 3 đêm' },
        { icon: 'fa-ship',           label: 'Hoạt động',    val: 'Tour 4 đảo + Lặn biển' },
        { icon: 'fa-calendar-check', label: 'Thời gian',    val: '4 Ngày 3 Đêm' },
        { icon: 'fa-users',          label: 'Điều kiện',    val: 'Tối thiểu 2 người' }
      ],
      components: [
        { icon: 'fa-plane',         type: 'flight',    title: 'Vé máy bay khứ hồi',              detail: 'HCM (SGN) ↔ Phú Quốc (PQC). Hàng không phổ thông, hành lý 7kg xách tay.' },
        { icon: 'fa-hotel',         type: 'hotel',     title: 'Resort 4* sát biển · 3 đêm',      detail: 'Phòng deluxe đôi view biển. Bữa sáng buffet mỗi ngày. Hồ bơi vô cực nhìn ra Vịnh Thái Lan.' },
        { icon: 'fa-ship',          type: 'activity',  title: 'Tour 4 đảo trọn gói',             detail: 'Lặn biển ngắm san hô Hòn Mun, snorkeling Hòn Thơm, tắm biển đảo nhỏ. Trưa trên tàu.' },
        { icon: 'fa-utensils',      type: 'food',      title: 'Tiệc BBQ hải sản tươi sống',      detail: '1 buổi tiệc BBQ hải sản tại resort: tôm, cua, mực, cá nướng theo thực đơn của bếp trưởng.' },
        { icon: 'fa-car',           type: 'transport', title: 'Xe đưa đón sân bay',              detail: 'Xe riêng đón/trả tại sân bay Phú Quốc. Bao gồm hành lý và nước uống trên xe.' },
        { icon: 'fa-user-tie',      type: 'guide',     title: 'Hướng dẫn viên suốt chuyến',     detail: 'HDV tiếng Việt điều phối toàn bộ lịch trình, check-in và hỗ trợ mọi yêu cầu phát sinh.' }
      ],
      compareRows: [
        ['Vé máy bay (2 người)',           '~5.600.000đ',                  'Bao gồm'],
        ['Resort 4* (3 đêm, 2 người)',     '~5.200.000đ',                  'Bao gồm'],
        ['Tour 4 đảo (2 người)',           '~1.400.000đ',                  'Bao gồm'],
        ['Xe đưa đón sân bay',             '~400.000đ',                    'Bao gồm'],
        ['Tiệc BBQ hải sản',               '~800.000đ',                    'Bao gồm'],
        ['Tổng giá trị thực',              '25.000.000đ / 2 người',        '17.980.000đ / 2 người']
      ],
      itinerary: [
        { day: 1, title: 'Bay HCM → Phú Quốc — Nhận Phòng & BBQ',
          activities: [
            'Bay buổi sáng từ Tân Sơn Nhất, đến sân bay Phú Quốc ~8:30',
            'Xe đưa về resort 4*, nhận phòng view biển',
            'Chiều: Tắm biển, bơi hồ vô cực nhìn ra Vịnh Thái Lan',
            'Tối: Tiệc BBQ hải sản tươi sống ngay tại resort'
          ],
          meals: ['Sáng', 'Tối'] },
        { day: 2, title: 'Tour 4 Đảo — Lặn San Hô & Snorkeling',
          activities: [
            'Sáng 8:00: Lên tàu tour 4 đảo khởi hành từ cảng',
            'Lặn biển ngắm san hô tại Hòn Mun — san hô đẹp nhất Phú Quốc',
            'Snorkeling tự do tại Hòn Thơm',
            'Trưa: Ăn trên tàu, thưởng thức đặc sản biển tươi',
            'Chiều: Tắm biển đảo nhỏ, câu cá'
          ],
          meals: ['Sáng', 'Trưa'] },
        { day: 3, title: 'Vinpearl Safari & Hoàng Hôn Gành Dầu',
          activities: [
            'Sáng: Vinpearl Safari — thế giới động vật hoang dã lớn nhất VN',
            'Trưa: Ăn trưa khu du lịch Vinpearl',
            'Chiều: Tự do mua sắm chợ Dương Đông, đặc sản',
            'Tối: Ngắm hoàng hôn tuyệt đẹp tại Mũi Gành Dầu'
          ],
          meals: ['Sáng'] },
        { day: 4, title: 'Phú Quốc — Bay về HCM',
          activities: [
            'Sáng: Bữa sáng buffet, tắm biển lần cuối',
            'Check-out resort, xe ra sân bay',
            'Bay về HCM buổi chiều'
          ],
          meals: ['Sáng'] }
      ],
      reviewList: [
        { name: 'Thanh Huyền', date: 'Tháng 5/2025', rating: 5, text: 'Combo quá xứng đáng! Resort đẹp, tour 4 đảo vui, BBQ ngon. Đặt cùng bạn thân tiết kiệm hơn 7 triệu so với đặt lẻ!' },
        { name: 'Minh Đức',    date: 'Tháng 4/2025', rating: 5, text: 'Giá combo tốt hơn hẳn so với tự đặt riêng. Resort 4* view biển đẹp, staff nhiệt tình. Highly recommend!' },
        { name: 'Ngọc Trâm',   date: 'Tháng 3/2025', rating: 4, text: 'Tour 4 đảo lặn san hô đẹp lắm. Combo tiện lợi vì đã có hết từ máy bay đến khách sạn, không phải tự lo gì cả!' }
      ]
    },

    'combo-danang': {
      id: 'combo-danang',
      name: 'Đà Nẵng Luxury — Bay + Beach Hotel 5* + Bà Nà Hills',
      dest: 'Đà Nẵng · Miền Trung',
      duration: '3N2Đ',
      badge: 'COMBO HOT',
      badgeType: 'hot',
      savePct: 27,
      img: 'images/dia-diem-du-lich-da-nang-thumb.jpg',
      rating: 4.8,
      reviews: 274,
      oldPrice: 10200000,
      newPrice: 7490000,
      pkgStrip: [
        { icon: 'fa-plane',          label: 'Di chuyển', val: 'Máy bay khứ hồi HCM' },
        { icon: 'fa-hotel',          label: 'Lưu trú',   val: 'Khách sạn 5* · 2 đêm' },
        { icon: 'fa-bridge',         label: 'Tham quan', val: 'Bà Nà Hills + Cầu Vàng' },
        { icon: 'fa-calendar-check', label: 'Thời gian', val: '3 Ngày 2 Đêm' },
        { icon: 'fa-users',          label: 'Điều kiện', val: 'Tối thiểu 2 người' }
      ],
      components: [
        { icon: 'fa-plane',           type: 'flight',   title: 'Vé máy bay khứ hồi',              detail: 'HCM (SGN) ↔ Đà Nẵng (DAD). Hàng không phổ thông, hành lý ký gửi 20kg.' },
        { icon: 'fa-hotel',           type: 'hotel',    title: 'Khách sạn 5* mặt biển Mỹ Khê',    detail: '2 đêm phòng sea view trực diện biển Mỹ Khê. Bữa sáng buffet quốc tế với hơn 50 món mỗi sáng.' },
        { icon: 'fa-bridge',          type: 'activity', title: 'Bà Nà Hills + Cầu Vàng',          detail: 'Vé cáp treo khứ hồi + vé vào khu du lịch. Khám phá Cầu Vàng, Làng Pháp, Fantasy Park, vườn hoa.' },
        { icon: 'fa-concierge-bell',  type: 'food',     title: 'Bữa sáng buffet 2 ngày',           detail: 'Buffet sáng quốc tế tại khách sạn 5 sao. Nhìn ra biển Mỹ Khê trong khi thưởng thức buổi sáng.' },
        { icon: 'fa-car',             type: 'transport',title: 'Xe đón – trả sân bay',             detail: 'Xe riêng đón tại sân bay Đà Nẵng và trả sân bay khi về. Bao gồm xe di chuyển đi Bà Nà Hills.' },
        { icon: 'fa-umbrella-beach',  type: 'activity', title: 'Ghế biển Mỹ Khê miễn phí',        detail: 'Ghế nằm và ô che biển từ khách sạn không giới hạn. Tắm biển Mỹ Khê — Top 10 bãi biển đẹp châu Á.' }
      ],
      compareRows: [
        ['Vé máy bay (2 người)',                  '~4.200.000đ',           'Bao gồm'],
        ['Khách sạn 5* sea view (2 đêm)',         '~7.000.000đ',           'Bao gồm'],
        ['Vé Bà Nà Hills + cáp treo (2 người)',   '~2.400.000đ',           'Bao gồm'],
        ['Bữa sáng buffet (4 bữa)',               '~1.200.000đ',           'Bao gồm'],
        ['Xe đưa đón trọn gói',                   '~600.000đ',             'Bao gồm'],
        ['Tổng giá trị thực',                     '20.400.000đ / 2 người', '14.980.000đ / 2 người']
      ],
      itinerary: [
        { day: 1, title: 'Bay HCM → Đà Nẵng — Biển Mỹ Khê',
          activities: [
            'Bay buổi sáng, đến Đà Nẵng, xe đưa về khách sạn 5*',
            'Nhận phòng sea view, thư giãn',
            'Chiều: Tắm biển Mỹ Khê ngay trước cửa khách sạn',
            'Tối: Cầu Rồng phun lửa 21:00 (cuối tuần), ăn tối hải sản Đà Nẵng'
          ],
          meals: ['Sáng'] },
        { day: 2, title: 'Bà Nà Hills — Cầu Vàng Trên Mây',
          activities: [
            'Sáng: Bữa sáng buffet view biển tại khách sạn',
            'Xe lên Bà Nà Hills, cáp treo kỷ lục thế giới',
            'Khám phá Cầu Vàng nổi tiếng thế giới trên bàn tay khổng lồ',
            'Trưa: Buffet tại khu du lịch Bà Nà',
            'Chiều: Làng Pháp, vườn hoa Le Jardin, Fantasy Park',
            'Tối: Về Đà Nẵng, tự do dạo phố'
          ],
          meals: ['Sáng'] },
        { day: 3, title: 'Buổi Sáng Biển & Bay về HCM',
          activities: [
            'Sáng: Bữa sáng buffet, tắm biển bình minh lần cuối',
            'Check-out, xe ra sân bay',
            'Bay về HCM buổi trưa/chiều'
          ],
          meals: ['Sáng'] }
      ],
      reviewList: [
        { name: 'Linh Chi', date: 'Tháng 5/2025', rating: 5, text: 'Khách sạn 5* view biển đẹp không tưởng! Buổi sáng thức dậy nhìn ra biển Mỹ Khê — không muốn về. Combo xứng đáng từng đồng!' },
        { name: 'Bảo An',   date: 'Tháng 4/2025', rating: 5, text: 'Cầu Vàng ở Bà Nà Hills đẹp đến ngỡ ngàng! Buffet sáng khách sạn rất phong phú. Sẽ đặt lại!' },
        { name: 'Hà My',    date: 'Tháng 3/2025', rating: 4, text: 'Combo rất tiện lợi. Khách sạn 5* dịch vụ chuẩn quốc tế. Biển Mỹ Khê đẹp lắm, nước trong, sóng vừa!' }
      ]
    },

    'combo-halong': {
      id: 'combo-halong',
      name: 'Hà Nội – Hạ Long Bay — Bay + Hotel + Du Thuyền 5*',
      dest: 'Hà Nội + Hạ Long · Miền Bắc',
      duration: '4N3Đ',
      badge: 'BEST SELLER',
      badgeType: 'best',
      savePct: 29,
      img: 'images/vinhhalong.png',
      rating: 4.9,
      reviews: 389,
      oldPrice: 14000000,
      newPrice: 9990000,
      pkgStrip: [
        { icon: 'fa-plane',          label: 'Di chuyển',    val: 'Máy bay khứ hồi HCM' },
        { icon: 'fa-hotel',          label: 'Lưu trú',      val: 'Hotel 3* + Du thuyền 5*' },
        { icon: 'fa-ship',           label: 'Trải nghiệm',  val: 'Cruise + Kayak + Hang động' },
        { icon: 'fa-calendar-check', label: 'Thời gian',    val: '4 Ngày 3 Đêm' },
        { icon: 'fa-users',          label: 'Điều kiện',    val: 'Tối thiểu 2 người' }
      ],
      components: [
        { icon: 'fa-plane',     type: 'flight',    title: 'Vé máy bay khứ hồi',                   detail: 'HCM (SGN) ↔ Hà Nội (HAN). Hàng không phổ thông, hành lý ký gửi 20kg.' },
        { icon: 'fa-hotel',     type: 'hotel',     title: 'Hotel 3* Hà Nội · 1 đêm',              detail: 'Phòng superior tại khách sạn 3 sao trung tâm Hà Nội, gần Hồ Gươm, phố cổ. Bữa sáng included.' },
        { icon: 'fa-ship',      type: 'activity',  title: 'Du thuyền 5* Hạ Long · 1 đêm',         detail: 'Cabin cửa sổ nhìn ra vịnh. Toàn bộ bữa ăn included. Tham quan hang Đầu Gỗ, chèo kayak hang Luồn.' },
        { icon: 'fa-utensils',  type: 'food',      title: 'Toàn bộ bữa ăn trên tàu',              detail: 'Gala dinner sang trọng buổi tối, bữa sáng và bữa trưa trên du thuyền 5 sao. Menu hải sản tươi.' },
        { icon: 'fa-car',       type: 'transport', title: 'Xe Hà Nội – Hạ Long khứ hồi',          detail: 'Xe limousine hoặc xe tiêu chuẩn từ Hà Nội đến cảng Hạ Long (~3.5h) và trả về Hà Nội.' },
        { icon: 'fa-user-tie',  type: 'guide',     title: 'HDV tiếng Việt & Anh',                  detail: 'Hướng dẫn viên song ngữ suốt 4 ngày. Kiến thức sâu về lịch sử Hà Nội và địa chất vịnh Hạ Long.' }
      ],
      compareRows: [
        ['Vé máy bay (2 người)',             '~4.400.000đ',           'Bao gồm'],
        ['Hotel 3* Hà Nội (2 người)',        '~1.200.000đ',           'Bao gồm'],
        ['Du thuyền 5* Hạ Long (2 người)',   '~9.000.000đ',           'Bao gồm'],
        ['Xe Hà Nội – Hạ Long khứ hồi',      '~800.000đ',             'Bao gồm'],
        ['HDV tiếng Việt & Anh',             '~1.200.000đ',           'Bao gồm'],
        ['Tổng giá trị thực',                '28.000.000đ / 2 người', '19.980.000đ / 2 người']
      ],
      itinerary: [
        { day: 1, title: 'Bay HCM → Hà Nội — Phố Cổ Ngàn Năm',
          activities: [
            'Bay sáng từ HCM, đến Nội Bài buổi trưa',
            'Xe đưa về Hotel 3* trung tâm, nhận phòng',
            'Chiều: Dạo Hồ Gươm, Đền Ngọc Sơn, phố cổ 36 phường',
            'Tối: Bia hơi Hà Nội, bún chả Hương Liên, bún riêu'
          ],
          meals: ['Tối'] },
        { day: 2, title: 'Hà Nội → Hạ Long — Lên Du Thuyền 5*',
          activities: [
            'Sáng: Bữa sáng khách sạn, thăm Văn Miếu Quốc Tử Giám',
            'Xe ra Hạ Long qua cao tốc (~3.5h)',
            'Lên du thuyền 5*, nhận cabin cửa sổ view vịnh',
            'Chiều: Thăm hang Đầu Gỗ, tắm biển đảo Ti Tốp',
            'Tối: Tiệc Gala dinner sang trọng trên boong'
          ],
          meals: ['Sáng', 'Tối'] },
        { day: 3, title: 'Bình Minh Vịnh — Kayak Hang Luồn',
          activities: [
            'Sáng sớm 6:00: Tập Tai Chi trên boong, ngắm bình minh vịnh',
            'Sáng: Chèo kayak vào hang Luồn huyền bí',
            'Thăm làng chài nổi Cửa Vạn — văn hóa ngư dân bao đời',
            'Trưa: Ăn trưa trên tàu, check-out cabin',
            'Chiều: Xe đưa về Hà Nội'
          ],
          meals: ['Sáng', 'Trưa'] },
        { day: 4, title: 'Hà Nội Sáng Sớm — Bay về HCM',
          activities: [
            'Sáng: Cà phê trứng Giảng, phở sáng Hà Nội',
            'Mua quà: bánh cốm, kẹo dồi, trà ô long Thái Nguyên',
            'Xe ra sân bay Nội Bài',
            'Bay về HCM buổi trưa'
          ],
          meals: ['Sáng'] }
      ],
      reviewList: [
        { name: 'Kỳ Nam',   date: 'Tháng 5/2025', rating: 5, text: 'Best seller xứng đáng! Du thuyền 5* sang xịn, Gala dinner trên boong tuyệt vời. Vịnh Hạ Long đẹp như tranh vẽ!' },
        { name: 'Thu Nga',  date: 'Tháng 4/2025', rating: 5, text: 'Combo cực kỳ hợp lý. Hà Nội một đêm rồi đi Hạ Long — lịch trình vừa đủ không quá mệt. Sẽ giới thiệu bạn bè!' },
        { name: 'Tuấn Anh', date: 'Tháng 3/2025', rating: 5, text: 'Chèo kayak vào hang Luồn là highlight! Du thuyền phòng cửa sổ nhìn ra vịnh — thức dậy bình minh Hạ Long, tuyệt đẹp!' }
      ]
    }
  };

  root.SaigonData = root.SaigonData || {};
  root.SaigonData.combos = COMBOS;
})(window);
