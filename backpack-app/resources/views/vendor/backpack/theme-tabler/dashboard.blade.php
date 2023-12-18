@extends(backpack_view('blank'))
@php
    $userCount = App\Models\User::Count();
    $cameraCount = App\Models\Camera::Count();
    $roomCount = App\Models\Room::Count();
    $Widget['before_content'][]=[
        'type'          =>'jumbotron',
        'heading'       =>trans('backpack::base.welcome'),
        'content'       =>trans('backpack::base.use_sidebar'),
        'button_link'   =>backpack_url('logout'),
        'button_link'   =>trans('backpack::base.logout'),
    ];

    // alternatively, use a fluent syntax to define each widget attribute
    Widget::add()
        ->to('before_content')
        ->type('div')
        ->class('row mt-3')
        ->content([
            Widget::make()
                ->type('progress')
                ->class('card mb-3')
                ->statusBorder('start')
                ->accentColor('danger')
                ->ribbon(['top','la-user'])
                ->progressClass('progress-bar')
                ->value($userCount)
                ->description('Number of User.'),
                // ->progress(100),
                // ->hint(1000 - 239 .'more until next milestone.'),
            Widget::make()
                ->type('progress')
                ->class('card mb-3')
                ->statusBorder('start')
                ->accentColor('success')
                ->ribbon(['top','la-table'])
                ->progressClass('progress-bar')
                ->value($roomCount)
                ->description('Number of Room.'),
                // ->progress(100),
                // ->hint(1000 - 500 .'more until next milestone.'),
            Widget::make()
                ->type('progress')
                ->class('card mb-3')
                ->statusBorder('start')
                ->accentColor('warning')
                ->ribbon(['top','la-video-camera'])
                ->progressClass('progress-bar')
                ->value($cameraCount)
                ->description('Number of Camera.'),
                // ->progress(100),
                // ->hint(1000 - 500 .' more until next milestone.'),
        ]);
@endphp   
@section('content')
    
@endsection