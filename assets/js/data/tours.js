/**
 * Tour listing data — consumed by pages/tour-list.html.
 * Public marketing metadata only (no PII).
 */
(function (root) {
  'use strict';

  const TOURS = [
    { id:'dn-vinpearl',  dest:['danang'],  title:'Vinpearl Nam Hội An – Furama Resort Đà Nẵng',
      img:'images/dia-diem-du-lich-da-nang-thumb.jpg',
      imgFb:'linear-gradient(135deg,#219EBC,#1B2A4A)',
      duration:'3 ngày 2 đêm', filters:['3n2d','vietkieu'],
      badge:{ text:'Khởi Hành Theo Yêu Cầu', type:'special' },
      tags:[{l:'Đà Nẵng'},{l:'Hội An'},{l:'Dành Cho Việt Kiều',c:'orange'}],
      dep:'TP Hồ Chí Minh', airline:'Đi Về Bằng Máy Bay', dates:[], price:null, priceText:'Liên hệ' },

    { id:'dn-hoian-4n', dest:['danang'], title:'Đà Nẵng – Hội An – KDL Bà Nà – Cầu Vàng – Bảo Tàng Tranh 3D',
      img:'images/hoi-an.jpg', imgFb:'linear-gradient(135deg,#E85D04,#FFB703)',
      duration:'4 ngày 3 đêm', filters:['4n3d','vietkieu'],
      badge:{ text:'4 ngày 3 đêm', type:'hot' },
      tags:[{l:'Đà Nẵng'},{l:'Hội An'},{l:'Huế'},{l:'Dành Cho Việt Kiều',c:'orange'}],
      dep:'TP Hồ Chí Minh', airline:'Vietnam Airlines',
      dates:['18/07','25/07','01/08','08/08'], price:8739000, priceText:'8.739.000' },

    { id:'dn-hoian-3n', dest:['danang'], title:'Đà Nẵng – Hội An – KDL Bà Nà – Cầu Vàng – Bảo Tàng Tranh 3D',
      img:'images/dia-diem-du-lich-da-nang-thumb.jpg', imgFb:'linear-gradient(135deg,#1B2A4A,#219EBC)',
      duration:'3 ngày 2 đêm', filters:['3n2d','sale'],
      badge:{ text:'Ưu Đãi Mùa Hè 2026', type:'sale' },
      tags:[{l:'Đà Nẵng'},{l:'Hội An'},{l:'Ưu Đãi Mùa Hè 2026',c:'green'}],
      dep:'TP Hồ Chí Minh', airline:'Vietnam Airlines',
      dates:['11/07'], price:7939000, priceText:'7.939.000' },

    { id:'dn-bana-4n', dest:['danang'], title:'Đà Nẵng – Hội An – KDL Bà Nà – Cầu Vàng – Bảo Tàng Tranh 3D',
      img:'images/hoi-an.jpg', imgFb:'linear-gradient(135deg,#E85D04,#C44B00)',
      duration:'4 ngày 3 đêm', filters:['4n3d','sale'],
      badge:{ text:'Ưu Đãi Mùa Hè 2026', type:'sale' },
      tags:[{l:'Đà Nẵng'},{l:'Hội An'},{l:'Huế'},{l:'Ưu Đãi Mùa Hè 2026',c:'green'}],
      dep:'TP Hồ Chí Minh', airline:'Vietnam Airlines',
      dates:['04/07','01/08','05/09'], price:8200000, priceText:'8.200.000' },

    { id:'dn-hoian-3n-b', dest:['danang'], title:'Đà Nẵng – Hội An – KDL Bà Nà – Cầu Vàng – Bảo Tàng Tranh 3D',
      img:'images/dia-diem-du-lich-da-nang-thumb.jpg', imgFb:'linear-gradient(135deg,#219EBC,#023047)',
      duration:'3 ngày 2 đêm', filters:['3n2d','sale'],
      badge:{ text:'Ưu Đãi Mùa Hè 2026', type:'sale' },
      tags:[{l:'Đà Nẵng'},{l:'Hội An'},{l:'Ưu Đãi Mùa Hè 2026',c:'green'}],
      dep:'TP Hồ Chí Minh', airline:'Vietnam Airlines',
      dates:['04/07','18/07','25/07','01/08'], price:7500000, priceText:'7.500.000' },

    { id:'dn-phaohoa', dest:['danang'], title:'[Pháo Hoa] Đà Nẵng – Hội An – Cù Lao Chàm – Khu Du Lịch Bà Nà',
      img:'images/phaohoa-danang.jpg', imgFb:'linear-gradient(135deg,#7C3AED,#1B2A4A)',
      duration:'3 ngày 2 đêm', filters:['3n2d'],
      badge:{ text:'Lễ Hội Pháo Hoa 2026', type:'special' },
      tags:[{l:'Đà Nẵng'},{l:'Hội An'},{l:'Lễ Hội Pháo Hoa 2026',c:'purple'}],
      dep:'TP Hồ Chí Minh', airline:'Vietnam Airlines',
      dates:['12/06'], price:8900000, priceText:'8.900.000' },

    { id:'pq-4n', dest:['phuquoc'], title:'Phú Quốc – Hòn Thơm – Vườn Thú Vinpearl Safari 4N3Đ',
      img:'images/du-lich-phu-quoc.jpg', imgFb:'linear-gradient(135deg,#0B6E4F,#219EBC)',
      duration:'4 ngày 3 đêm', filters:['4n3d','sale'],
      badge:{ text:'Ưu Đãi Mùa Hè 2026', type:'sale' },
      tags:[{l:'Phú Quốc'},{l:'Biển Xanh',c:'green'}],
      dep:'TP Hồ Chí Minh', airline:'VietJet Air',
      dates:['15/07','22/07','05/08'], price:6900000, priceText:'6.900.000' },

    { id:'pq-3n', dest:['phuquoc'], title:'Phú Quốc – Đảo Rong Biển – Lặn San Hô 3N2Đ',
      img:'images/du-lich-phu-quoc.jpg', imgFb:'linear-gradient(135deg,#219EBC,#0B6E4F)',
      duration:'3 ngày 2 đêm', filters:['3n2d'],
      badge:{ text:'Phổ biến', type:'hot' },
      tags:[{l:'Phú Quốc'},{l:'Nghỉ Dưỡng',c:'green'}],
      dep:'TP Hồ Chí Minh', airline:'Bamboo Airways',
      dates:['10/07','20/07','03/08'], price:5500000, priceText:'5.500.000' },

    { id:'hn-3n', dest:['hanoi'], title:'Hà Nội – Ninh Bình – Tràng An – Hoa Lư 3N2Đ',
      img:'images/ninhbinh.jpg', imgFb:'linear-gradient(135deg,#1B2A4A,#243660)',
      duration:'3 ngày 2 đêm', filters:['3n2d'],
      badge:{ text:'Khám Phá Mới', type:'new' },
      tags:[{l:'Hà Nội'},{l:'Ninh Bình'}],
      dep:'TP Hồ Chí Minh', airline:'Vietnam Airlines',
      dates:['18/07','01/08','15/08'], price:7200000, priceText:'7.200.000' },

    { id:'hl-2n', dest:['halong'], title:'Hạ Long – Du Thuyền 5 Sao – Hang Động Thiên Cung 2N1Đ',
      img:'images/vinhhalong.png', imgFb:'linear-gradient(135deg,#1B2A4A,#219EBC)',
      duration:'2 ngày 1 đêm', filters:['sale'],
      badge:{ text:'Best Seller', type:'hot' },
      tags:[{l:'Hạ Long'},{l:'Du Thuyền',c:'green'}],
      dep:'TP Hồ Chí Minh', airline:'Vietnam Airlines',
      dates:['12/07','19/07','26/07'], price:9500000, priceText:'9.500.000' },

    { id:'hcm-3n', dest:['hcm'], title:'TP. HCM – Vũng Tàu – Cần Giờ – Rừng Ngập Mặn 3N2Đ',
      img:'images/tour-sai-gon-mui-ne-2-ngay-1-dem-4.jpg', imgFb:'linear-gradient(135deg,#E85D04,#C44B00)',
      duration:'3 ngày 2 đêm', filters:['3n2d'],
      badge:{ text:'Khởi Hành Cuối Tuần', type:'new' },
      tags:[{l:'TP. Hồ Chí Minh'},{l:'Vũng Tàu'}],
      dep:'TP Hồ Chí Minh', airline:'Xe du lịch',
      dates:['13/07','20/07','27/07'], price:3200000, priceText:'3.200.000' }
  ];

  const DEST_CFG = {
    danang:  { label:'Đà Nẵng',         tag:'Tour Đà Nẵng',  sub:'Cầu Vàng Bà Nà, Phố Cổ Hội An, Biển Mỹ Khê — hành trình hoàn hảo' },
    phuquoc: { label:'Phú Quốc',        tag:'Tour Phú Quốc', sub:'Đảo ngọc thiên đường — biển xanh, cát trắng, hải sản tươi ngon' },
    hanoi:   { label:'Hà Nội',          tag:'Tour Hà Nội',   sub:'Thủ đô ngàn năm văn hiến — phố cổ, ẩm thực, văn hóa đặc sắc' },
    halong:  { label:'Hạ Long',         tag:'Tour Hạ Long',  sub:'Kỳ quan thiên nhiên thế giới — du thuyền, hang động, vịnh biển' },
    hcm:     { label:'TP. Hồ Chí Minh', tag:'Tour TP. HCM',  sub:'Thành phố năng động — khám phá, ẩm thực, du lịch sinh thái' }
  };

  root.SaigonData = root.SaigonData || {};
  root.SaigonData.tours   = TOURS;
  root.SaigonData.destCfg = DEST_CFG;
})(window);
