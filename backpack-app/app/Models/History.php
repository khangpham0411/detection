<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class History extends Model
{
    use HasFactory;
    protected $fillable = ['seatId', 'status'];

    public function workingseat():BelongsTo
    {
        return $this->belongsTo(WorkingSeat::class, 'seatId');
    }
}
