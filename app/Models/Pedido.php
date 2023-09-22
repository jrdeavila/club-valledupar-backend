<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $table = 'Pedido';

    protected $fillable = [
        'usuario_id'
    ];

    public function detallePedido()
    {
        return $this->hasMany(DetallePedido::class);
    }
}
