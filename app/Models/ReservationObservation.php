<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationObservation extends Model
{
    use HasFactory;


    public $timestamps = false;

    protected $fillable = [
        'reservation_id',
        'observation',
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
