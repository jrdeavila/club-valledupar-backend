<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\OrderResource;
use Illuminate\Http\Request;
use App\Models\Pedido;

class CancelOrderController extends Controller
{
    public function __invoke(Pedido $order)
    {
        $order->cancelar();
        return new OrderResource($order);
    }
}
