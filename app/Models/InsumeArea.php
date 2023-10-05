<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InsumeArea extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'desc',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
