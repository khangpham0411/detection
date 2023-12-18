<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\CameraRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class CameraCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class CameraCrudController extends CrudController
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
        CRUD::setModel(\App\Models\Camera::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/camera');
        CRUD::setEntityNameStrings('camera', 'cameras');
    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::column('cameraName');
        CRUD::column('URL');
        CRUD::column('width');
        CRUD::column('height');
        CRUD::column('description');
        CRUD::column('status');
        CRUD::column('roomId')->type('select')->label('Room')->entity('room')->attribute('roomName');
    }

    /**
     * Define what happens when the Create operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(CameraRequest::class);
        CRUD::field('cameraName');
        CRUD::field('URL');
        CRUD::field('width');
        CRUD::field('height');
        CRUD::field('description');
        CRUD::field('status');
        CRUD::addField([
            'name' => 'roomId',
            'label' => 'Room',
            'type' => 'select',
            'entity' => 'room', // Tên bảng liên quan
            'attribute' => 'roomName', // Tên trường hiển thị
            'model' => 'App\Models\Room', // Tên đầy đủ của model
        ]);
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

    protected function setupShowOperation()
    {
        $this->autoSetupShowOperation();
        CRUD::column('roomId')->remove();
        CRUD::column('room_id')->type('select')->label('Room')->entity('room')->attribute('roomName');
        CRUD::addColumn([
            'name' => 'name',
            'label' => 'User Name',
            'type' => 'select', // Vì đây là hiển thị thông tin người dùng, không phải là select
            'entity' => 'users', // Tên entity (bảng) liên quan
            'attribute' => 'name', // Tên cột bạn muốn hiển thị
            'model' => 'App\Models\User',
        ]);
        CRUD::setFromDb();
    }

}
