<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetallePedido extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'DetallePedido';

    protected $fillable = [
        'pedido_id',
        'plato_id',
        'cantidad'
    ];

    public function pedido()
    {
        return $this->belongsTo(Pedido::class);
    }

    public function plato()
    {
        return $this->belongsTo(Plato::class);
    }

    public function total()
    {
        return $this->cantidad * $this->plato->precio;
    }

    public function observation()
    {
        return $this->hasOne(OrderDetailObservation::class, 'order_details_id', 'id', 'order_detail_observations');
    }
}
