<?php

namespace App\Http\Controllers\Admin;

use App\Models\Combo;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class ComboCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup(): void
    {
        CRUD::setModel(Combo::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/combo');
        CRUD::setEntityNameStrings('combo', 'combos');
    }

    protected function setupListOperation(): void
    {
        CRUD::column('id')->label('ID');
        CRUD::column('name')->label('Name');
        CRUD::column('destination')->label('Destination');
        CRUD::column('duration')->label('Duration');
        CRUD::column('new_price')->label('Price')->type('number')->decimals(0);
        CRUD::column('is_featured')->label('Featured')->type('boolean');
        CRUD::column('is_active')->label('Active')->type('boolean');
        CRUD::column('sort_order')->label('Sort')->type('number');
        CRUD::orderBy('sort_order');
        CRUD::orderBy('created_at', 'desc');
    }

    protected function setupCreateOperation(): void
    {
        CRUD::setValidation([
            'slug' => 'required|max:255|unique:combos,slug,' . request()->route('id'),
            'name' => 'required|max:255',
        ]);

        // --- Tab: Thông tin cơ bản ---
        CRUD::field('info_basic')
            ->type('custom_html')
            ->value('<div class="alert alert-secondary mb-0 mt-2"><i class="la la-info-circle"></i> <strong>Thông tin cơ bản</strong> — Đây là thẻ combo khách nhìn thấy khi lướt danh sách. Tên hấp dẫn, ảnh đẹp và thời lượng rõ ràng giúp khách quan tâm và bấm vào xem. Điền đầy đủ để thu hút khách từ cái nhìn đầu tiên.</div>')
            ->tab('Thông tin cơ bản');
        CRUD::field('name')->label('Tên combo')->type('text')->attributes(['placeholder' => 'Ví dụ: Combo Phú Quốc 4N3Đ Bay + Khách Sạn'])->tab('Thông tin cơ bản');
        CRUD::field('slug')->label('Đường dẫn (slug)')->type('text')->hint('Chữ thường, không dấu, cách nhau bằng gạch ngang. Ví dụ: combo-phu-quoc-4n3d')->tab('Thông tin cơ bản');
        CRUD::field('destination')->label('Điểm đến')->type('text')->attributes(['placeholder' => 'Ví dụ: Phú Quốc'])->tab('Thông tin cơ bản');
        CRUD::field('duration')->label('Thời lượng')->type('text')->attributes(['placeholder' => 'Ví dụ: 4 ngày 3 đêm'])->tab('Thông tin cơ bản');
        CRUD::field('image_url')->label('Ảnh đại diện (URL)')->type('text')->attributes(['placeholder' => '/travel/assets/images/combos/example.jpg hoặc URL ảnh'])->tab('Thông tin cơ bản');

        // --- Tab: Giá ---
        CRUD::field('info_pricing')
            ->type('custom_html')
            ->value('<div class="alert alert-secondary mb-0 mt-2"><i class="la la-tags"></i> <strong>Giá</strong> — Khách chọn combo vì thấy rõ mình tiết kiệm được bao nhiêu. Điền giá gốc (tổng nếu đặt từng dịch vụ riêng lẻ) và giá combo — hệ thống tự tính phần trăm tiết kiệm hiển thị trên website.</div>')
            ->tab('Giá');
        CRUD::field('old_price')->label('Giá gốc (đặt lẻ)')->type('number')->attributes(['step' => '0.01', 'min' => '0', 'placeholder' => 'Ví dụ: 8000000'])->hint('Tổng giá nếu đặt từng dịch vụ riêng lẻ.')->tab('Giá');
        CRUD::field('new_price')->label('Giá combo')->type('number')->attributes(['step' => '0.01', 'min' => '0', 'placeholder' => 'Ví dụ: 6500000'])->hint('Giá khi đặt trọn combo. Phải nhỏ hơn giá gốc.')->tab('Giá');

        // --- Tab: Marketing ---
        CRUD::field('info_marketing')
            ->type('custom_html')
            ->value('<div class="alert alert-secondary mb-0 mt-2"><i class="la la-bullhorn"></i> <strong>Marketing</strong> — Nhãn <em>HOT</em> hay <em>Siêu tiết kiệm</em> giúp combo nổi bật hơn giữa hàng chục lựa chọn khác. Nhập phần trăm tiết kiệm nếu muốn hiển thị thêm dạng "TIẾT KIỆM 20%" trên thẻ combo.</div>')
            ->tab('Marketing');
        CRUD::field('badge')->label('Nhãn nổi bật')->type('text')->attributes(['placeholder' => 'Ví dụ: HOT, Bay thẳng, Siêu tiết kiệm'])->hint('Văn bản hiển thị trên badge. Để trống nếu không cần.')->tab('Marketing');
        CRUD::field('badge_type')->label('Kiểu nhãn')->type('text')->attributes(['placeholder' => 'Ví dụ: hot'])->hint('Màu badge: hot (đỏ cam) · best (xanh lá) · new (xanh dương) · save (teal).')->tab('Marketing');
        CRUD::field('save_percent')->label('Phần trăm tiết kiệm')->type('number')->attributes(['min' => 0, 'max' => 100, 'placeholder' => 'Ví dụ: 20'])->hint('Hiển thị dạng "TIẾT KIỆM 20%". Để trống hoặc 0 nếu không cần.')->tab('Marketing');

        // --- Tab: Nội dung ---
        CRUD::field('info_content')
            ->type('custom_html')
            ->value('<div class="alert alert-secondary mb-0 mt-2"><i class="la la-file-alt"></i> <strong>Nội dung</strong> — Phần này quyết định khách có chốt đặt combo hay không. Dịch vụ rõ ràng + lịch trình cụ thể = khách tin tưởng và sẵn sàng thanh toán. Bảng so sánh giá giúp khách thấy ngay combo tiết kiệm hơn đặt lẻ bao nhiêu.</div>')
            ->tab('Nội dung');
        CRUD::field('pkg_strip')->label('Thông tin nổi bật (strip)')->type('combo_pkgstrip_builder')->tab('Nội dung');
        CRUD::field('components')->label('Dịch vụ trong combo')->type('combo_components_builder')->tab('Nội dung');
        CRUD::field('itinerary')->label('Lịch trình')->type('tour_itinerary_builder')->tab('Nội dung');
        CRUD::field('compare_rows')->label('Bảng so sánh')->type('combo_compare_builder')->tab('Nội dung');

        // --- Tab: Cài đặt ---
        CRUD::field('info_settings')
            ->type('custom_html')
            ->value('<div class="alert alert-secondary mb-0 mt-2"><i class="la la-cog"></i> <strong>Cài đặt</strong> — Ẩn combo khi hết tour hoặc chưa sẵn sàng bán, bật lại khi cần. Combo tốt nhất nên đặt thứ tự nhỏ nhất để xuất hiện đầu tiên trong danh sách.</div>')
            ->tab('Cài đặt');
        CRUD::field('is_active')->label('Đang hiển thị')->type('boolean')->default(true)->tab('Cài đặt');
        CRUD::field('is_featured')->label('Combo nổi bật')->type('boolean')->default(false)->tab('Cài đặt');
        CRUD::field('sort_order')->label('Thứ tự sắp xếp')->type('number')->default(0)->tab('Cài đặt');
    }

    protected function setupUpdateOperation(): void
    {
        $this->setupCreateOperation();
    }
}

