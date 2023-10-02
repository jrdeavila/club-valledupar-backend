<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservacion extends Model
{
    use HasFactory;

    protected $table = 'Reservacion';

    public $timestamps = false;

    protected $fillable = [
        'fecha_reservacion',
        'hora_reservacion',
        'horario_id',
        'user_id',
        'estado',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
