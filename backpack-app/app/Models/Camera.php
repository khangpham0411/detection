<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Camera extends Model
{
    use CrudTrait;
    use HasFactory;
    protected $fillable = ['cameraName', 'URL', 'width', 'height', 'description', 'status', 'roomId'];

    public function workingSeats(){
        return $this->hasMany(WorkingSeat::class, 'cameraId');
    }

    public function room():BelongsTo
    {
        return $this->belongsTo(Room::class, 'roomId');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'working_seats', 'cameraId', 'userId');
    }

}
