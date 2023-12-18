<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\WorkingSeatRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use Illuminate\Support\Facades\Http;
/**
 * Class WorkingSeatCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class WorkingSeatCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     * 
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\WorkingSeat::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/working-seat');
        CRUD::setEntityNameStrings('working seat', 'working seats');
    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::column([
            'name' => 'userId',
            'label' => 'User',
            'type' => 'select',
            'entity' => 'user', // Tên bảng liên quan
            'attribute' => 'name', // Tên trường hiển thị
            'model' => 'App\Models\User', // Tên đầy đủ của model
        ]);
        CRUD::column([
            'name' => 'cameraId',
            'label' => 'Camera',
            'type' => 'select',
            'entity' => 'camera', // Tên bảng liên quan
            'attribute' => 'cameraName', // Tên trường hiển thị
            'model' => 'App\Models\Camera', // Tên đầy đủ của model
        ]); // set columns from db columns.
        CRUD::column('x');
        CRUD::column('y');
        CRUD::column('w');
        CRUD::column('h');
        /**
         * Columns can be defined using the fluent syntax:
         * - CRUD::column('price')->type('number');
         */
    }

    /**
     * Define what happens when the Create operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(WorkingSeatRequest::class);
        CRUD::addField([
            'name' => 'userId',
            'label' => 'User',
            'type' => 'select',
            'entity' => 'users', // Tên bảng liên quan
            'attribute' => 'name', // Tên trường hiển thị
            'model' => 'App\Models\User', // Tên đầy đủ của model
        ]);
        CRUD::addField([
            'name' => 'cameraId',
            'label' => 'Camera',
            'type' => 'select',
            'entity' => 'cameras', // Tên bảng liên quan
            'attribute' => 'cameraName', // Tên trường hiển thị
            'model' => 'App\Models\Camera', // Tên đầy đủ của model
        ]);
        CRUD::field('x');
        CRUD::field('y');
        CRUD::field('w');
        CRUD::field('h');
        $response = Http::get('http://127.0.0.1:5000/capture');
        if ($response->successful()) {
            // Lấy nội dung hình ảnh từ phản hồi
            $imageContent = $response->body();

            // Lưu hoặc xử lý hình ảnh theo nhu cầu của bạn
            // Ví dụ: Lưu hình ảnh vào thư mục
            file_put_contents(public_path('images/image.jpg'), $imageContent);

            // Hiển thị hình ảnh trong Laravel Backpack nếu cần
            // Ví dụ: Hiển thị hình ảnh trong trường hình ảnh của CRUD
            $this->crud->addField([
                'name'  => 'image',
                'label' => 'Image',
                'type'  => 'image',
                'prefix' => '/images/', // Đường dẫn tới thư mục chứa hình ảnh
            ]);
        }
        /**
         * Fields can be defined using the fluent syntax:
         * - CRUD::field('price')->type('number');
         */
    }

    /**
     * Define what happens when the Update operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
