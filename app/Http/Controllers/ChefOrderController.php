<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangeOrderStatusRequest;
use App\Http\Resources\PedidoCollection;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChefOrderController extends Controller
{
    public function index()
    {
        $orders = Pedido::orderBy('updated_at', 'desc')->get();

        return Inertia::render('Chef/Orders/Index', [
            'orders' => new  PedidoCollection($orders),
        ]);
    }

    public function sendOrder(Pedido $order)
    {
        $order->update([
            'estado' => "enviado",
        ]);

        return redirect()->back();
    }

    public function finishOrder(Pedido $order)
    {
        $order->update([
            'estado' => "entregado",
        ]);

        return redirect()->back();
    }
}
