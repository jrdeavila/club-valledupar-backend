<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'start_date',
        'end_date',
        'is_ever',
        'insume_area_id',
        'type_reservation_id',
        'user_id',
    ];


    public function insumeArea()
    {
        return $this->belongsTo(InsumeArea::class);
    }

    public function typeReservation()
    {
        return $this->belongsTo(TypeReservation::class);
    }

    public function observations()
    {
        return $this->hasMany(ReservationObservation::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
