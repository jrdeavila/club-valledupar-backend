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
        'id_horario',
        'usuario_id',
        'estado',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id', 'id', 'Usuario');
    }
}
