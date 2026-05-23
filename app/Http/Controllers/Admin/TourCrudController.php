<?php

namespace App\Http\Controllers\Admin;

use App\Models\Destination;
use App\Models\Tour;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use Illuminate\Support\Str;

class TourCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation {
        store as traitStore;
    }
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation {
        update as traitUpdate;
    }
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup(): void
    {
        CRUD::setModel(Tour::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/tour');
        CRUD::setEntityNameStrings('tour', 'tour');
    }

    protected function setupListOperation(): void
    {
        CRUD::column('id')->label('ID');
        CRUD::column('title')->label('Tên tour');
        CRUD::column('destination.name')->label('Điểm đến');
        CRUD::column('duration')->label('Thời lượng');
        CRUD::column('price')->label('Giá')->type('number')->decimals(0);
        CRUD::column('is_featured')->label('Nổi bật')->type('boolean');
        CRUD::column('is_active')->label('Đang hiển thị')->type('boolean');
        CRUD::column('sort_order')->label('Thứ tự')->type('number');
        CRUD::orderBy('sort_order');
        CRUD::orderBy('created_at', 'desc');
    }

    protected function setupCreateOperation(): void
    {
        CRUD::setValidation([
            'slug' => 'required|max:255|unique:tours,slug,' . request()->route('id'),
            'title' => 'required|max:255',
            'itinerary' => 'nullable|json',
            'includes' => 'nullable|json',
        ]);

        CRUD::field('destination_name')
            ->label('Điểm đến')
            ->type('text')
            ->attributes(['placeholder' => 'Ví dụ: Đà Nẵng, Phú Quốc, Hà Nội'])
            ->hint('Admin nhập tên điểm đến tại đây. Hệ thống sẽ tự tạo/tìm điểm đến tương ứng để website hiển thị.')
            ->tab('Thông tin cơ bản');

        CRUD::field('destination_id')
            ->type('hidden')
            ->tab('Thông tin cơ bản');

        CRUD::field('title')
            ->label('Tên tour')
            ->type('text')
            ->attributes(['placeholder' => 'Ví dụ: Khám phá Đà Nẵng - Hội An 3N2Đ'])
            ->tab('Thông tin cơ bản');

        CRUD::field('slug')
            ->label('Đường dẫn')
            ->type('text')
            ->hint('Dùng chữ thường, không dấu, cách nhau bằng dấu gạch ngang. Ví dụ: da-nang-hoi-an-3n2d')
            ->tab('Thông tin cơ bản');

        CRUD::field('summary')
            ->label('Mô tả ngắn')
            ->type('textarea')
            ->attributes(['rows' => 4, 'placeholder' => 'Tóm tắt ngắn gọn điểm nổi bật của tour'])
            ->tab('Thông tin cơ bản');

        CRUD::field('image_url')
            ->label('Ảnh đại diện')
            ->type('text')
            ->attributes(['placeholder' => '/travel/assets/images/tours/example.jpg hoặc URL ảnh'])
            ->tab('Thông tin cơ bản');

        CRUD::field('duration')
            ->label('Thời lượng')
            ->type('text')
            ->attributes(['placeholder' => 'Ví dụ: 3 ngày 2 đêm'])
            ->tab('Thông tin cơ bản');

        CRUD::field('departure')
            ->label('Khởi hành')
            ->type('text')
            ->attributes(['placeholder' => 'Ví dụ: Hằng tuần từ TP.HCM'])
            ->tab('Thông tin cơ bản');

        CRUD::field('transport')
            ->label('Phương tiện')
            ->type('text')
            ->attributes(['placeholder' => 'Ví dụ: Máy bay, xe du lịch'])
            ->tab('Thông tin cơ bản');

        CRUD::field('description')
            ->label('Mô tả chi tiết')
            ->type('summernote')
            ->tab('Nội dung tour');

        CRUD::field('itinerary')
            ->label('Lịch trình tour')
            ->type('tour_itinerary_builder')
            ->tab('Nội dung tour');

        CRUD::field('includes')
            ->label('Dịch vụ bao gồm')
            ->type('tour_includes_builder')
            ->tab('Nội dung tour');

        CRUD::field('price')
            ->label('Giá số')
            ->type('number')
            ->attributes(['step' => '0.01', 'min' => '0', 'placeholder' => 'Ví dụ: 3500000'])
            ->hint('Có thể để trống nếu chỉ muốn hiển thị giá dạng chữ.')
            ->tab('Giá & lịch khởi hành');

        CRUD::field('price_text')
            ->label('Giá hiển thị')
            ->type('text')
            ->attributes(['placeholder' => 'Ví dụ: Liên hệ theo yêu cầu'])
            ->hint('Nếu nhập trường này, frontend nên ưu tiên hiển thị nội dung này.')
            ->tab('Giá & lịch khởi hành');

        CRUD::field('departure_dates')
            ->label('Ngày khởi hành')
            ->type('textarea')
            ->attributes(['rows' => 5, 'placeholder' => "Mỗi ngày một dòng\nVí dụ:\n15/06/2026\n22/06/2026"])
            ->hint('Nhập mỗi ngày khởi hành trên một dòng.')
            ->tab('Giá & lịch khởi hành');

        CRUD::field('marketing_info')
            ->type('custom_html')
            ->value('
                <div class="alert alert-info mb-0 mt-2">
                    <strong><i class="la la-bullhorn"></i> Hướng dẫn tab Marketing</strong><br>
                    <b>Nhãn nổi bật</b>: văn bản hiển thị trên badge của tour (ví dụ: HOT, Sale -20%, Mới).<br>
                    <b>Kiểu nhãn</b>: giá trị CSS quyết định màu badge — chọn một trong: <code>hot</code> <code>best</code> <code>new</code> <code>vip</code> <code>save</code>.<br>
                    <b>Từ khóa</b>: JSON array — hiển thị dưới dạng chip trên card tour. Mỗi phần tử gồm <code>l</code> (tên hiển thị) và <code>c</code> (css class, có thể để trống).<br>
                    <b>Bộ lọc</b>: JSON array — dùng cho nút lọc trên trang danh sách tour. Giá trị hợp lệ: <code>"3n2d"</code>, <code>"4n3d"</code>, <code>"vietkieu"</code>, <code>"sale"</code>.
                </div>
            ')
            ->tab('Marketing');

        CRUD::field('badge_text')
            ->label('Nhãn nổi bật')
            ->type('text')
            ->attributes(['placeholder' => 'Ví dụ: HOT, Sale -20%, Mới'])
            ->hint('Văn bản hiển thị trên badge của tour. Để trống nếu không cần nhãn.')
            ->tab('Marketing');

        CRUD::field('badge_type')
            ->label('Kiểu nhãn')
            ->type('text')
            ->attributes(['placeholder' => 'Ví dụ: hot'])
            ->hint('Quyết định màu sắc badge: hot (đỏ cam) · best (xanh lá) · new (xanh dương) · vip (vàng tím) · save (teal). Để trống = không có màu.')
            ->tab('Marketing');


        CRUD::field('filters')
            ->label('Bộ lọc')
            ->type('textarea')
            ->attributes(['rows' => 3, 'placeholder' => '["3n2d","sale"]'])
            ->hint('JSON array. Giá trị hợp lệ: "3n2d", "4n3d", "vietkieu", "sale". Ví dụ: ["3n2d","sale"]')
            ->tab('Marketing');

        CRUD::field('is_active')
            ->label('Đang hiển thị')
            ->type('boolean')
            ->default(true)
            ->tab('Cài đặt');

        CRUD::field('is_featured')
            ->label('Tour nổi bật')
            ->type('boolean')
            ->default(false)
            ->tab('Cài đặt');

        CRUD::field('sort_order')
            ->label('Thứ tự sắp xếp')
            ->type('number')
            ->default(0)
            ->tab('Cài đặt');
    }

    protected function setupUpdateOperation(): void
    {
        $this->setupCreateOperation();
    }

    public function store()
    {
        $this->prepareDestinationInput();

        return $this->traitStore();
    }

    public function update()
    {
        $this->prepareDestinationInput();

        return $this->traitUpdate();
    }

    private function prepareDestinationInput(): void
    {
        $destinationName = trim((string) request()->input('destination_name', ''));

        if ($destinationName === '') {
            request()->merge([
                'destination_id' => null,
                'destination_name' => null,
            ]);

            return;
        }

        $slug = Str::slug($destinationName);

        if ($slug === '') {
            $slug = 'diem-den-' . substr(md5($destinationName), 0, 8);
        }

        $destination = Destination::firstOrCreate(
            ['slug' => $slug],
            [
                'name' => $destinationName,
                'is_active' => true,
                'is_featured' => false,
                'sort_order' => 0,
            ]
        );

        request()->merge([
            'destination_id' => $destination->id,
            'destination_name' => null,
        ]);
    }
}
