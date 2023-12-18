<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use CrudTrait;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'roomName',
        'location',
    ];

    public function cameras(){
        return $this->hasMany(Camera::class, 'roomId');
    }

    public function users()
    {
        return $this->hasManyThrough(
            User::class,
            WorkingSeat::class,
            'cameraId',   // Khóa ngoại của Camera trong WorkingSeat
            'id',       // Khóa chính của WorkingSeat
            'id',       // Khóa chính của User
            'userId'    // Khóa ngoại của User trong WorkingSeat
        )->join('cameras', 'working_seats.cameraId', '=', 'cameras.id')
         ->join('rooms', 'cameras.roomId', '=', 'rooms.id')
         ->select('users.*')
         ->distinct();
    }
}
