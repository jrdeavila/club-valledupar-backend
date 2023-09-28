<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $table = 'Pedido';

    protected $fillable = [
        'usuario_id',
        'estado',
        'direccion',
    ];

    public function detallePedido()
    {
        return $this->hasMany(DetallePedido::class);
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id', 'id', 'Usuario');
    }
}
