<?php

namespace App\Http\Controllers;

use App\Http\Requests\EstadoPedidoRequest;
use App\Models\Pedido;
use Illuminate\Http\Request;

class ChangeStatePedidoController extends Controller
{
    public function __invoke(Pedido $pedido, EstadoPedidoRequest $request)
    {
        $pedido->estado = $request->validated()['estado'];
        $pedido->save();
        return to_route('pedidos.index');
    }
}
