<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{

    use HasFactory;

    protected $table = 'Usuario';

    protected $fillable = [
        'nombre',
        'apellido',
        'telefono',
        'email',
        'tipo_usuario_id',
    ];

    public function tipo()
    {
        return $this->belongsTo(TipoUsuario::class, 'tipo_usuario_id', 'id', 'TipoUsuario');
    }
}
