<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $table = 'Pedido';

    protected $fillable = [
        'user_id',
        'estado',
        'tipo',
        'direccion',
    ];

    public function detallePedido()
    {
        return $this->hasMany(DetallePedido::class);
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id', 'id', 'Usuario');
    }

    public function cancelar()
    {
        $this->update(['estado' => 'cancelado']);
    }
}
