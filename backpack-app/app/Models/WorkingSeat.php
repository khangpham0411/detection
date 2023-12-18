<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkingSeat extends Model
{
    use CrudTrait;
    use HasFactory;

    protected $fillable = ['x', 'y', 'w', 'h', 'userId', 'cameraId'];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class, 'userId');
    }
    
    public function camera():BelongsTo
    {
        return $this->belongsTo(Camera::class, 'cameraId');
    }

}
