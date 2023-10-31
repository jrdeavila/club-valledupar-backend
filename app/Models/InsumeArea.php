<?php

namespace App\Models;

use Carbon\Carbon;
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

    public function schedules()
    {
        return $this->belongsToMany(Horario::class, 'insume_area_schedule', 'insume_area_id', 'schedule_id');
    }

    public function getReservationsPending(): int
    {
        $currentDate = Carbon::now();

        return $this->reservations()->where('start_date', '>=', $currentDate)->count();
    }
}
