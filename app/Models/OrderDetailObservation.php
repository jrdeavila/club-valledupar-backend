<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetailObservation extends Model
{
    use HasFactory;

    protected $table = 'order_detail_observations';
    public $timestamps = false;

    protected $fillable = [
        'order_details_id',
        'observation',
    ];

    public function orderDetail()
    {
        return $this->belongsTo(OrderDetail::class, 'order_details_id', 'id', 'DetallePedido');
    }
}
