/**
 * Service data — consumed by pages/service-detail.html.
 */
(function (root) {
  'use strict';

  const SERVICES = {
    'tour-doan-le': {
      id: 'tour-doan-le', name: 'Tour Khách Đoàn & Lẻ', badge: 'TOUR DU LỊCH', badgeIcon: 'fas fa-route',
      img: 'images/tour-sai-gon-mui-ne-2-ngay-1-dem-4.jpg',
      imgFallback: 'linear-gradient(135deg,#E85D04,#1B2A4A)',
      sub: 'Chương trình du lịch trong nước và quốc tế đa dạng — từ tour khách lẻ đến đoàn doanh nghiệp hàng trăm người, với hướng dẫn viên chuyên nghiệp và giá cạnh tranh nhất.',
      qbar: [
        { icon: 'fas fa-globe',          label: 'Phạm vi',    value: 'Trong & Ngoài nước' },
        { icon: 'fas fa-users',          label: 'Quy mô',     value: '2 – 500+ người' },
        { icon: 'fas fa-calendar-alt',   label: 'Khởi hành',  value: 'Linh hoạt hàng tuần' },
        { icon: 'fas fa-star',           label: 'Đánh giá',   value: '4.9 / 5 ★' },
        { icon: 'fas fa-map-marked-alt', label: 'Điểm đến',   value: '50+ địa điểm' }
      ],
      desc: 'SaigonTeam thiết kế và vận hành các chương trình du lịch chất lượng cao cho cả khách lẻ và đoàn doanh nghiệp. Với hơn 5 năm kinh nghiệm, chúng tôi đã đưa hàng nghìn du khách trải nghiệm những hành trình đáng nhớ tại các điểm đến nổi bật trong nước như Đà Lạt, Phú Quốc, Hội An, Hạ Long, Sapa... và quốc tế như Thái Lan, Singapore, Bali. Mỗi tour được thiết kế tỉ mỉ với lịch trình hợp lý, ăn ở đảm bảo, phương tiện hiện đại.',
      highlights: [
        { icon: 'fas fa-user-tie', title: 'HDV Chuyên Nghiệp',      desc: 'Hướng dẫn viên giàu kinh nghiệm, thông thạo địa bàn, hỗ trợ 24/7 trong suốt hành trình' },
        { icon: 'fas fa-hotel',    title: 'Khách Sạn Chuẩn',         desc: 'Đối tác khách sạn 3–5 sao, chọn lọc kỹ về vị trí và chất lượng phòng' },
        { icon: 'fas fa-bus',      title: 'Phương Tiện Hiện Đại',    desc: 'Xe du lịch mới, điều hòa, wifi, ghế êm ái cho mọi cung đường' },
        { icon: 'fas fa-utensils', title: 'Ẩm Thực Đặc Sắc',          desc: 'Bữa ăn tại nhà hàng địa phương uy tín, giữ hương vị vùng miền đặc trưng' }
      ],
      includes: [
        'Xe đưa đón tại điểm hẹn khởi hành',
        'Khách sạn theo tiêu chuẩn gói đã chọn',
        'Bữa ăn theo chương trình (sáng/trưa/tối)',
        'Vé tham quan toàn bộ điểm đến trong lịch trình',
        'Hướng dẫn viên tiếng Việt (và tiếng Anh theo yêu cầu)',
        'Bảo hiểm du lịch toàn hành trình',
        'Nước uống miễn phí trên xe'
      ],
      packages: [
        { name: 'Tour Tiết Kiệm',  badge: 'basic',   badgeText: 'PHỔ THÔNG',       price: 'Từ 1.990.000đ', priceNote: '/người · nội địa 2N1Đ', features: ['Khách sạn 2–3 sao','Xe du lịch 16–29 chỗ tiêu chuẩn','Bữa ăn bình dân địa phương','HDV tiếng Việt','Bảo hiểm cơ bản'] },
        { name: 'Tour Tiêu Chuẩn', badge: 'popular', badgeText: 'PHỔ BIẾN NHẤT',   price: 'Từ 2.990.000đ', priceNote: '/người · nội địa 3N2Đ', features: ['Khách sạn 3–4 sao','Xe du lịch mới, điều hòa tốt','Bữa ăn nhà hàng chọn lọc','HDV song ngữ Việt – Anh','Bảo hiểm toàn diện','Nước uống & khăn lạnh'] },
        { name: 'Tour Premium',    badge: 'premium', badgeText: 'CAO CẤP',         price: 'Từ 5.990.000đ', priceNote: '/người · nội địa 4N3Đ', features: ['Resort / Hotel 4–5 sao','Xe VIP limousine hoặc xe riêng','Bữa ăn fine dining đặc sắc','HDV cá nhân 1–1','Bảo hiểm premium','Quà tặng & kỷ niệm hành trình'] }
      ],
      process: [
        { title: 'Tư Vấn Miễn Phí',       desc: 'Liên hệ hotline hoặc điền form — đội ngũ tư vấn phản hồi trong 30 phút, giải đáp mọi thắc mắc về tour và giá cả.' },
        { title: 'Chọn Gói & Xác Nhận',   desc: 'Lựa chọn gói tour phù hợp ngân sách, đặt cọc 30% để giữ chỗ, nhận xác nhận đặt tour chính thức.' },
        { title: 'Chuẩn Bị Hành Trình',   desc: 'Nhận lịch trình chi tiết, danh sách cần chuẩn bị. HDV liên hệ trước 24h để nhắc nhở và giải đáp thêm.' },
        { title: 'Trải Nghiệm Tour',      desc: 'Khởi hành đúng giờ, HDV đồng hành xuyên suốt. Mọi vấn đề phát sinh được xử lý ngay lập tức.' },
        { title: 'Phản Hồi & Hoàn Thiện', desc: 'Sau tour, chia sẻ đánh giá để SaigonTeam nâng cao chất lượng. Khách cũ nhận ưu đãi đặt tour lần sau.' }
      ],
      faq: [
        { q: 'Tôi có thể thiết kế tour theo yêu cầu riêng không?',    a: 'Hoàn toàn có thể. SaigonTeam nhận thiết kế tour theo yêu cầu 100% — từ lịch trình, điểm đến, loại hình khách sạn đến các hoạt động đặc biệt. Liên hệ tư vấn viên để được hỗ trợ.' },
        { q: 'Chính sách hủy tour như thế nào?',                       a: 'Hủy trước 15 ngày: hoàn 90% tiền. Hủy trước 7 ngày: hoàn 70%. Hủy trước 3 ngày: hoàn 50%. Hủy dưới 3 ngày: không hoàn cọc nhưng được đổi ngày khởi hành miễn phí 1 lần.' },
        { q: 'Tour có bao gồm vé máy bay không?',                       a: 'Các tour tiêu chuẩn không bao gồm vé máy bay. Tuy nhiên combo bay + tour được bán riêng với giá ưu đãi hơn. SaigonTeam hỗ trợ đặt vé máy bay giá tốt nhất.' },
        { q: 'Trẻ em tính giá như thế nào?',                            a: 'Trẻ dưới 5 tuổi: miễn phí (không có suất ăn/phòng riêng). Trẻ 5–11 tuổi: 75% giá người lớn. Trẻ từ 12 tuổi: tính bằng người lớn.' }
      ]
    },

    'teambuilding': {
      id: 'teambuilding', name: 'Tổ Chức TeamBuilding', badge: 'TEAMBUILDING', badgeIcon: 'fas fa-users',
      img: 'images/teambuilding-1.jpg',
      imgFallback: 'linear-gradient(135deg,#1B2A4A,#E85D04)',
      sub: 'Chương trình teambuilding sáng tạo, gắn kết đội nhóm hiệu quả. Từ 20 đến 5.000+ người với đa dạng hình thức outdoor, indoor và hybrid. Nâng cao tinh thần, xây dựng văn hóa doanh nghiệp mạnh.',
      qbar: [
        { icon: 'fas fa-users',          label: 'Quy mô',     value: '20 – 5.000+ người' },
        { icon: 'fas fa-map-marker-alt', label: 'Địa điểm',   value: 'Toàn quốc' },
        { icon: 'fas fa-clock',          label: 'Thời lượng', value: '1 – 3 ngày' },
        { icon: 'fas fa-star',           label: 'Đánh giá',   value: '4.9 / 5 ★' },
        { icon: 'fas fa-building',       label: 'Khách hàng', value: '500+ doanh nghiệp' }
      ],
      desc: 'SaigonTeam là đơn vị tổ chức teambuilding hàng đầu khu vực phía Nam, với đội ngũ facilitator chuyên nghiệp và kho ý tưởng hoạt động phong phú. Chúng tôi thiết kế chương trình phù hợp văn hóa từng doanh nghiệp — không có hai chương trình nào giống nhau. Từ các trò chơi năng động ngoài trời đến game show trí tuệ trong hội trường, mỗi hoạt động đều có mục tiêu gắn kết cụ thể và được đo lường bằng kết quả thực tế.',
      highlights: [
        { icon: 'fas fa-lightbulb',  title: 'Sáng Tạo & Độc Đáo',          desc: 'Hàng trăm concept teambuilding khác nhau, thiết kế riêng theo văn hóa và mục tiêu từng công ty' },
        { icon: 'fas fa-medal',      title: 'Facilitator Giàu Kinh Nghiệm', desc: 'Đội ngũ MC và facilitator được đào tạo bài bản, năng động và chuyên nghiệp' },
        { icon: 'fas fa-tools',      title: 'Trang Thiết Bị Đầy Đủ',        desc: 'Hệ thống âm thanh, ánh sáng, props và dụng cụ hoạt động hiện đại, phong phú' },
        { icon: 'fas fa-chart-line', title: 'Đo Lường Hiệu Quả',            desc: 'Báo cáo sau chương trình với các chỉ số gắn kết và phản hồi từ từng thành viên' }
      ],
      includes: [
        'Khảo sát và tư vấn thiết kế chương trình',
        'MC / Facilitator chuyên nghiệp',
        'Toàn bộ trang thiết bị âm thanh ánh sáng',
        'Props và dụng cụ hoạt động',
        'Bữa ăn & nước uống trong chương trình',
        'Quà tặng và giải thưởng cho người chơi',
        'Nhiếp ảnh / Quay phim chuyên nghiệp (gói premium)',
        'Báo cáo tổng kết sau chương trình'
      ],
      packages: [
        { name: 'Gói Half-Day',         badge: 'basic',   badgeText: 'NỬA NGÀY',      price: 'Từ 350.000đ',   priceNote: '/người · tối thiểu 50 người', features: ['3–4 tiếng chương trình','Indoor hoặc outdoor','2–3 hoạt động chính','MC dẫn chương trình','Nước uống & snack'] },
        { name: 'Gói Full-Day',         badge: 'popular', badgeText: 'PHỔ BIẾN NHẤT', price: 'Từ 550.000đ',   priceNote: '/người · tối thiểu 50 người', features: ['6–8 tiếng chương trình','Kết hợp indoor & outdoor','5–7 hoạt động đa dạng','MC + Facilitator đội','Bữa trưa / tối tại nhà hàng','Phần thưởng và kỷ niệm'] },
        { name: 'Gói 2N1Đ Nghỉ Dưỡng',  badge: 'premium', badgeText: 'CAO CẤP',       price: 'Từ 1.490.000đ', priceNote: '/người · tối thiểu 30 người', features: ['Khách sạn 4–5 sao nghỉ đêm','Full-day teambuilding + gala dinner','Show diễn nghệ thuật tối','Nhiếp ảnh / Video chuyên nghiệp','Toàn bộ bữa ăn 5 bữa','Quà tặng cao cấp cho mỗi thành viên'] }
      ],
      process: [
        { title: 'Khảo Sát Doanh Nghiệp', desc: 'Tư vấn viên lắng nghe nhu cầu, mục tiêu, văn hóa công ty và ngân sách để đề xuất concept phù hợp nhất.' },
        { title: 'Thiết Kế Chương Trình', desc: 'Đội ngũ sáng tạo xây dựng kịch bản riêng cho công ty bạn — hoạt động, thông điệp, trò chơi, giải thưởng.' },
        { title: 'Khảo Sát Địa Điểm',     desc: 'Đến tận nơi khảo sát địa điểm tổ chức, lên phương án bố trí và dự phòng mọi tình huống.' },
        { title: 'Tổ Chức & Điều Phối',   desc: 'Đội ngũ đến trước 2h chuẩn bị, MC và facilitator dẫn dắt toàn bộ chương trình chuyên nghiệp.' },
        { title: 'Tổng Kết & Bàn Giao',   desc: 'Gửi ảnh/video chuyên nghiệp, báo cáo tổng kết chương trình và phiếu khảo sát hài lòng trong vòng 3 ngày.' }
      ],
      faq: [
        { q: 'SaigonTeam có thể tổ chức teambuilding bao nhiêu người?',         a: 'SaigonTeam đã tổ chức thành công cho các sự kiện từ 20 người đến hơn 3.000 người. Không có giới hạn về quy mô — chúng tôi sẽ điều chỉnh phương án phù hợp với số lượng tham gia.' },
        { q: 'Thời gian đặt trước tối thiểu là bao lâu?',                        a: 'Khuyến nghị đặt trước ít nhất 2–3 tuần để có thời gian thiết kế chương trình. Trường hợp gấp (1 tuần) vẫn có thể tổ chức với các concept có sẵn.' },
        { q: 'Địa điểm do SaigonTeam hay công ty tự chọn?',                      a: 'Cả hai đều được. SaigonTeam có hệ thống đối tác địa điểm toàn quốc (resort, khách sạn, khu vui chơi) hoặc có thể tổ chức tại địa điểm do công ty đề xuất.' },
        { q: 'Nếu trời mưa thì chương trình ngoài trời có bị hủy không?',        a: 'Chúng tôi luôn chuẩn bị phương án dự phòng indoor. Trong trường hợp thời tiết xấu, chương trình được chuyển sang không gian có mái che với hoạt động được điều chỉnh phù hợp.' }
      ]
    },

    'su-kien': {
      id: 'su-kien', name: 'Tổ Chức Sự Kiện', badge: 'SỰ KIỆN DOANH NGHIỆP', badgeIcon: 'fas fa-calendar-alt',
      img: 'images/teambuilding-2.jpg',
      imgFallback: 'linear-gradient(135deg,#7C3AED,#1B2A4A)',
      sub: 'Lên kế hoạch và thực hiện mọi loại sự kiện doanh nghiệp chuyên nghiệp từ A đến Z — hội nghị, gala dinner, lễ kỷ niệm, ra mắt sản phẩm, tiệc tất niên và hơn thế nữa.',
      qbar: [
        { icon: 'fas fa-users',           label: 'Quy mô',              value: '50 – 5.000 khách' },
        { icon: 'fas fa-map-marker-alt',  label: 'Địa điểm',            value: 'Toàn quốc' },
        { icon: 'fas fa-calendar-check',  label: 'Loại sự kiện',        value: '10+ hình thức' },
        { icon: 'fas fa-star',            label: 'Đánh giá',            value: '4.8 / 5 ★' },
        { icon: 'fas fa-trophy',          label: 'Sự kiện đã tổ chức',  value: '300+ sự kiện' }
      ],
      desc: 'SaigonTeam là đối tác tổ chức sự kiện doanh nghiệp tin cậy với hơn 300 sự kiện thành công trên toàn quốc. Từ hội nghị nghiêm túc đến gala dinner hoành tráng, từ lễ kỷ niệm ấm cúng đến lễ ra mắt sản phẩm đình đám — đội ngũ của chúng tôi am hiểu mọi quy chuẩn, chuẩn bị tỉ mỉ và điều phối liền mạch để sự kiện của bạn diễn ra hoàn hảo.',
      highlights: [
        { icon: 'fas fa-drafting-compass', title: 'Thiết Kế Sân Khấu',     desc: 'Đội ngũ thiết kế sáng tạo với hệ thống backdrop, sân khấu hiện đại, phù hợp từng thương hiệu' },
        { icon: 'fas fa-volume-up',        title: 'Âm Thanh & Ánh Sáng',   desc: 'Thiết bị âm thanh ánh sáng chuyên nghiệp, kỹ thuật viên giàu kinh nghiệm' },
        { icon: 'fas fa-camera',           title: 'Ghi Lại Khoảnh Khắc',   desc: 'Nhiếp ảnh và quay phim chuyên nghiệp, bàn giao ảnh/video trong 3 ngày' },
        { icon: 'fas fa-concierge-bell',   title: 'F&B & Catering',         desc: 'Phối hợp nhà hàng đối tác cung cấp dịch vụ ăn uống từ tiệc đứng đến gala dinner cao cấp' }
      ],
      includes: [
        'Tư vấn concept và lên kế hoạch chi tiết',
        'Thiết kế và thi công backdrop, sân khấu, banner',
        'Hệ thống âm thanh, ánh sáng, micro, máy chiếu',
        'MC dẫn chương trình chuyên nghiệp',
        'Lễ tân, BTC và đội hỗ trợ hiện trường',
        'Hoa trang trí và bàn đón khách',
        'Quay phim, chụp ảnh chuyên nghiệp',
        'Dọn dẹp sau sự kiện'
      ],
      packages: [
        { name: 'Sự Kiện Nhỏ',  badge: 'basic',   badgeText: '50–200 KHÁCH',     price: 'Từ 15.000.000đ',     priceNote: '/sự kiện',             features: ['Sân khấu & backdrop thiết kế','Âm thanh ánh sáng cơ bản','MC dẫn chương trình','Lễ tân 2–3 người','Chụp ảnh sự kiện'] },
        { name: 'Sự Kiện Vừa',  badge: 'popular', badgeText: '200–500 KHÁCH',    price: 'Từ 45.000.000đ',     priceNote: '/sự kiện',             features: ['Sân khấu chuyên nghiệp 3D mapping','Dàn âm thanh & ánh sáng chuyên nghiệp','MC + PG/PB hỗ trợ','Tiệc cocktail hoặc gala','Ảnh + Video edit highlight','Trang trí hoa & bàn chủ tịch'] },
        { name: 'Sự Kiện Lớn',  badge: 'premium', badgeText: '500–5.000 KHÁCH', price: 'Liên hệ báo giá',     priceNote: 'tùy quy mô & yêu cầu', features: ['Thiết kế sự kiện tổng thể toàn diện','LED wall, laser, hiệu ứng đặc biệt','Ekip đầy đủ 20+ người','Gala dinner / Tiệc buffet cao cấp','Live band / Show nghệ thuật','Livestream / Phát trực tiếp'] }
      ],
      process: [
        { title: 'Brief & Ý Tưởng',         desc: 'Nhận brief từ khách hàng về mục tiêu, thông điệp, quy mô và ngân sách. Đội sáng tạo đề xuất 2–3 concept khác nhau.' },
        { title: 'Lên Kế Hoạch Chi Tiết',   desc: 'Sau khi chọn concept, lập kế hoạch tổng thể: timeline, danh sách nhà cung cấp, sơ đồ mặt bằng, kịch bản chương trình.' },
        { title: 'Thiết Kế & Thi Công',     desc: 'Thiết kế backdrop, banner, trang trí. Thi công và setup địa điểm tối thiểu 6h trước giờ khai mạc.' },
        { title: 'Dress Rehearsal',          desc: 'Diễn tập trước 2–3h. Kiểm tra toàn bộ âm thanh ánh sáng, kịch bản MC, vị trí nhân sự.' },
        { title: 'Tổ Chức & Bàn Giao',      desc: 'Điều phối toàn bộ sự kiện, xử lý phát sinh. Sau sự kiện bàn giao ảnh/video và báo cáo tổng kết.' }
      ],
      faq: [
        { q: 'SaigonTeam có thể tổ chức sự kiện ở tỉnh khác không?',         a: 'Có. Chúng tôi đã tổ chức sự kiện tại 20+ tỉnh thành trên cả nước. Chi phí di chuyển và ăn ở của đội ngũ được tính vào báo giá tổng thể.' },
        { q: 'Thời gian chuẩn bị tối thiểu cho một sự kiện là bao lâu?',      a: 'Sự kiện nhỏ (dưới 100 khách) cần ít nhất 1–2 tuần. Sự kiện lớn (200+ khách) cần 3–4 tuần để đảm bảo chất lượng. Trường hợp gấp vui lòng liên hệ trực tiếp.' },
        { q: 'Địa điểm tổ chức có do SaigonTeam đề xuất không?',              a: 'SaigonTeam có hệ thống đối tác là các khách sạn, trung tâm hội nghị, resort trên toàn quốc. Chúng tôi sẽ đề xuất địa điểm phù hợp theo quy mô và ngân sách, hoặc hỗ trợ khảo sát địa điểm do khách hàng chọn.' },
        { q: 'Có thể thay đổi kịch bản sau khi đã ký hợp đồng không?',        a: 'Có thể thay đổi nhỏ trong vòng 7 ngày trước sự kiện. Thay đổi lớn (quy mô, địa điểm, ngày tổ chức) cần báo trước 2 tuần và có thể phát sinh chi phí bổ sung.' }
      ]
    },

    'thue-xe': {
      id: 'thue-xe', name: 'Cho Thuê Xe Du Lịch', badge: 'VẬN CHUYỂN', badgeIcon: 'fas fa-bus-alt',
      img: 'images/teambuilding-1.jpg',
      imgFallback: 'linear-gradient(135deg,#0B6E4F,#1B2A4A)',
      sub: 'Đội xe hiện đại đa dạng từ 4 đến 45 chỗ. Tài xế kinh nghiệm, am hiểu địa bàn, phục vụ 24/7. Giải pháp vận chuyển an toàn, đúng giờ, chuyên nghiệp cho doanh nghiệp và du lịch.',
      qbar: [
        { icon: 'fas fa-car',             label: 'Loại xe',     value: '4 – 45 chỗ' },
        { icon: 'fas fa-clock',           label: 'Phục vụ',     value: '24/7' },
        { icon: 'fas fa-map-marked-alt',  label: 'Tuyến đường', value: 'Toàn quốc' },
        { icon: 'fas fa-star',            label: 'Đánh giá',    value: '4.9 / 5 ★' },
        { icon: 'fas fa-shield-alt',      label: 'Bảo hiểm',    value: 'Đầy đủ' }
      ],
      desc: 'SaigonTeam sở hữu và quản lý đội xe du lịch đa dạng, thường xuyên được bảo dưỡng và nâng cấp. Tài xế được tuyển chọn kỹ, có kinh nghiệm, am hiểu các tuyến đường trong và ngoài thành phố, đảm bảo chuyến đi an toàn và đúng giờ. Xe được trang bị đầy đủ điều hòa, USB sạc, wifi (tùy dòng xe) phục vụ thoải mái.',
      highlights: [
        { icon: 'fas fa-car-side',           title: 'Đội Xe Đa Dạng',       desc: 'Sedan, MPV 7 chỗ, xe 16 chỗ, 29 chỗ, 45 chỗ — đáp ứng mọi nhu cầu từ gia đình đến đoàn lớn' },
        { icon: 'fas fa-user-shield',        title: 'Tài Xế Chuyên Nghiệp', desc: 'Tài xế được đào tạo, bằng lái phù hợp, không bia rượu, phục vụ lịch sự và tận tình' },
        { icon: 'fas fa-tools',              title: 'Bảo Dưỡng Định Kỳ',    desc: 'Xe được kiểm tra kỹ thuật định kỳ, đảm bảo tình trạng tốt nhất trước mỗi chuyến đi' },
        { icon: 'fas fa-file-invoice-dollar',title: 'Giá Minh Bạch',          desc: 'Báo giá rõ ràng, không phát sinh chi phí ẩn. Hợp đồng rõ ràng, thanh toán linh hoạt' }
      ],
      includes: [
        'Xe mới, điều hòa, bảo hiểm đầy đủ',
        'Tài xế kinh nghiệm phục vụ trong suốt hành trình',
        'Phí cầu đường và bến bãi (theo thỏa thuận)',
        'Nước uống miễn phí trên xe',
        'Túi đựng rác và khăn lau tay',
        'Hỗ trợ 24/7 nếu sự cố phát sinh'
      ],
      packages: [
        { name: 'Xe 4–7 Chỗ',    badge: 'basic',   badgeText: 'GIA ĐÌNH',      price: 'Từ 800.000đ',   priceNote: '/ngày (8 tiếng)', features: ['Sedan / MPV 4–7 chỗ đời mới','Điều hòa 2 chiều','Tài xế chuyên nghiệp','Bảo hiểm hành khách','Phù hợp nội thành & ngoại ô'] },
        { name: 'Xe 16–29 Chỗ',  badge: 'popular', badgeText: 'PHỔ BIẾN NHẤT', price: 'Từ 1.500.000đ', priceNote: '/ngày (8 tiếng)', features: ['Xe 16 / 29 chỗ limousine hoặc tiêu chuẩn','Điều hòa mạnh, ghế êm','Wifi trên xe (xe limousine)','Tài xế phụ cho tuyến dài','Bảo hiểm toàn diện'] },
        { name: 'Xe 45 Chỗ',     badge: 'premium', badgeText: 'ĐOÀN LỚN',      price: 'Từ 2.800.000đ', priceNote: '/ngày (8 tiếng)', features: ['Xe 45 chỗ đời mới cao cấp','Điều hòa 2 hàng, micro, màn hình','Tài xế dày dạn kinh nghiệm','Bảo hiểm hành khách đầy đủ','Phù hợp đoàn du lịch & doanh nghiệp'] }
      ],
      process: [
        { title: 'Yêu Cầu & Tư Vấn',        desc: 'Liên hệ hotline hoặc điền form với thông tin: số người, tuyến đường, ngày giờ. Nhận báo giá trong 15 phút.' },
        { title: 'Xác Nhận Đặt Xe',         desc: 'Xác nhận lịch trình và thanh toán đặt cọc. Nhận thông tin tài xế và biển số xe trước ngày khởi hành 24h.' },
        { title: 'Khởi Hành Đúng Giờ',      desc: 'Tài xế đến đúng địa điểm và giờ hẹn, hỗ trợ xếp hành lý. Khởi hành theo lịch trình đã thỏa thuận.' },
        { title: 'Hỗ Trợ Trong Hành Trình', desc: 'Tài xế luôn sẵn sàng điều chỉnh lộ trình theo yêu cầu. Đường dây nóng 24/7 hỗ trợ mọi tình huống.' },
        { title: 'Hoàn Thành & Thanh Toán', desc: 'Hoàn thành hành trình, thanh toán số dư. Nhận hóa đơn VAT theo yêu cầu của doanh nghiệp.' }
      ],
      faq: [
        { q: 'Có thể thuê xe cả ngày lẫn đêm không?',         a: 'Có. SaigonTeam phục vụ 24/7 kể cả ban đêm, ngày lễ và Tết. Chi phí ban đêm (22h–6h) có thêm phụ phí 20%.' },
        { q: 'Phí cầu đường và bến bãi tính như thế nào?',    a: 'Phí cầu đường và bến bãi tính theo thực tế, tách riêng với giá thuê xe. Báo giá sẽ ước tính trước nếu biết tuyến đường cụ thể.' },
        { q: 'Xe có được phép đi tỉnh xa không?',              a: 'Có. Xe phục vụ toàn quốc. Đối với hành trình trên 300km, xe thường đi cùng 2 tài xế thay ca để đảm bảo an toàn.' },
        { q: 'Nếu xe hỏng giữa đường thì sao?',                 a: 'SaigonTeam cam kết điều xe thay thế trong vòng 60 phút (trong nội thành HCM). Hành trình không bị gián đoạn, mọi chi phí phát sinh do SaigonTeam chịu.' }
      ]
    },

    've-may-bay': {
      id: 've-may-bay', name: 'Bán Vé Máy Bay', badge: 'VÉ MÁY BAY', badgeIcon: 'fas fa-plane-departure',
      img: 'images/vemaybaygiare.jpg',
      imgFallback: 'linear-gradient(135deg,#219EBC,#1B2A4A)',
      sub: 'Đặt vé máy bay nội địa và quốc tế với giá tốt nhất thị trường. Tư vấn 24/7, xuất vé nhanh, hỗ trợ hành trình đến tận nơi. Là đại lý được uỷ quyền của các hãng hàng không lớn.',
      qbar: [
        { icon: 'fas fa-plane',      label: 'Hãng hàng không', value: '10+ hãng' },
        { icon: 'fas fa-globe',      label: 'Đường bay',        value: 'Nội địa & Quốc tế' },
        { icon: 'fas fa-bolt',       label: 'Xuất vé',          value: 'Trong ngày' },
        { icon: 'fas fa-star',       label: 'Đánh giá',         value: '4.8 / 5 ★' },
        { icon: 'fas fa-percentage', label: 'Tiết kiệm',        value: 'Đến 30%' }
      ],
      desc: 'SaigonTeam là đại lý vé máy bay được uỷ quyền chính thức, kết nối với hệ thống GDS (Global Distribution System) để tìm kiếm và đặt vé với giá tốt nhất. Chúng tôi phục vụ cả khách lẻ và doanh nghiệp — đặc biệt có chính sách ưu đãi dành riêng cho đặt vé số lượng lớn theo đoàn tour hoặc công tác của công ty.',
      highlights: [
        { icon: 'fas fa-tag',          title: 'Giá Tốt Nhất',       desc: 'So sánh giá từ 10+ hãng hàng không, đảm bảo tìm được vé phù hợp ngân sách nhất' },
        { icon: 'fas fa-bolt',         title: 'Xuất Vé Nhanh',      desc: 'Xác nhận đặt vé và xuất vé điện tử ngay trong ngày làm việc' },
        { icon: 'fas fa-headset',      title: 'Tư Vấn 24/7',        desc: 'Đội ngũ tư vấn hỗ trợ chọn chuyến bay, hạng vé, hành lý phù hợp nhất' },
        { icon: 'fas fa-exchange-alt', title: 'Hỗ Trợ Đổi/Hoàn',    desc: 'Hỗ trợ xử lý đổi vé, hoàn vé, nâng hạng theo đúng chính sách của từng hãng' }
      ],
      includes: [
        'Tư vấn lựa chọn chuyến bay và hạng vé phù hợp',
        'Đặt chỗ và giữ giá trong thời gian ưu đãi',
        'Xuất vé điện tử gửi qua email/Zalo',
        'Hỗ trợ chọn chỗ ngồi ưu tiên',
        'Tư vấn quy định hành lý của từng hãng',
        'Hỗ trợ check-in online và làm thủ tục',
        'Hỗ trợ xử lý sự cố: chậm, hủy chuyến'
      ],
      packages: [
        { name: 'Vé Lẻ Cá Nhân',   badge: 'basic',   badgeText: '1–4 KHÁCH',   price: 'Giá gốc + phí 50.000đ',  priceNote: '/người',           features: ['Tất cả hãng nội địa & quốc tế','Xuất vé trong ngày','Gửi vé qua email/Zalo','Hỗ trợ check-in online','Tư vấn miễn phí'] },
        { name: 'Vé Theo Nhóm',    badge: 'popular', badgeText: '5–20 KHÁCH',  price: 'Ưu đãi từ 5% – 15%',     priceNote: 'so với giá lẻ',     features: ['Giữ chỗ nhóm cùng chuyến','Phí dịch vụ giảm theo số lượng','Hỗ trợ làm thủ tục tập thể','Xuất hóa đơn VAT','Quản lý danh sách hành khách'] },
        { name: 'Vé Doanh Nghiệp', badge: 'premium', badgeText: '20+ KHÁCH',   price: 'Liên hệ báo giá',          priceNote: 'chính sách riêng',  features: ['Tài khoản doanh nghiệp ưu đãi','Đặt vé định kỳ theo hợp đồng','Giá thỏa thuận theo khối lượng','Account manager riêng','Báo cáo chi phí hàng tháng'] }
      ],
      process: [
        { title: 'Yêu Cầu Đặt Vé',       desc: 'Cung cấp thông tin: tuyến bay, ngày đi/về, số hành khách, hạng vé mong muốn. SaigonTeam tra cứu giá tốt nhất trong 15 phút.' },
        { title: 'Báo Giá & Xác Nhận',   desc: 'Nhận báo giá từ nhiều hãng, chọn chuyến phù hợp. Cung cấp thông tin hành khách (họ tên, CCCD/Hộ chiếu).' },
        { title: 'Thanh Toán',            desc: 'Thanh toán qua chuyển khoản, momo, thẻ ngân hàng. SaigonTeam xác nhận thanh toán trong 30 phút.' },
        { title: 'Xuất & Gửi Vé',         desc: 'Vé điện tử (e-ticket) được xuất và gửi qua email và Zalo trong ngày. In vé hoặc lưu trên điện thoại đều được chấp nhận.' },
        { title: 'Hỗ Trợ Sau Đặt Vé',     desc: 'Nhắc nhở check-in online trước 24h. Hỗ trợ xử lý nếu có thay đổi lịch bay, chậm, hủy chuyến từ hãng.' }
      ],
      faq: [
        { q: 'SaigonTeam có bán vé cho tất cả các hãng không?',                a: 'Có. Chúng tôi đặt vé cho tất cả hãng nội địa (Vietnam Airlines, VietJet, Bamboo, Vietravel Airlines) và hầu hết các hãng quốc tế qua hệ thống GDS.' },
        { q: 'Giá vé tại SaigonTeam có đắt hơn đặt trực tiếp không?',           a: 'Ngược lại — nhờ hệ thống GDS và hợp đồng đại lý, chúng tôi thường tìm được mức giá bằng hoặc rẻ hơn giá niêm yết. Phí dịch vụ của SaigonTeam rất thấp (50.000đ/vé lẻ, miễn phí cho đoàn).' },
        { q: 'Có thể đặt vé khứ hồi và vé một chiều không?',                    a: 'Cả hai đều được. SaigonTeam đặt vé một chiều, khứ hồi, và cả hành trình nhiều chặng (multi-city).' },
        { q: 'Nếu hãng hủy chuyến, tôi được hoàn tiền như thế nào?',            a: 'Nếu hãng hủy chuyến, bạn được hoàn 100% theo quy định của hãng. SaigonTeam hỗ trợ xử lý hoàn tiền hoặc đổi sang chuyến khác nhanh nhất có thể.' }
      ]
    }
  };

  root.SaigonData = root.SaigonData || {};
  root.SaigonData.services = SERVICES;
})(window);
