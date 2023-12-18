{{-- This file is used for menu items by any Backpack v6 theme --}}
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('dashboard') }}"><i class="la la-home nav-icon"></i> {{ trans('backpack::base.dashboard') }}</a></li>

<x-backpack::menu-item title="Users" icon="la la-user" :link="backpack_url('user')" />
<x-backpack::menu-item title="Rooms" icon="la la-table" :link="backpack_url('room')" />
<x-backpack::menu-item title="Cameras" icon="la la-video-camera" :link="backpack_url('camera')" />
<x-backpack::menu-item title="Working seats" icon="la la-expand-arrows-alt" :link="backpack_url('working-seat')" />