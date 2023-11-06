<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CreateOrderRequest;
use App\Http\Resources\Api\OrderCollection;
use App\Http\Resources\Api\OrderResource;
use App\Models\DetallePedido;
use App\Models\Pedido;
use App\Models\Plato;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(User $user)
    {
        return new OrderCollection($user->pedidos->sortByDesc('created_at'));
    }

    public function store(CreateOrderRequest $request)
    {
        $this->checkCurrentOrder($request);
        DB::beginTransaction();
        $pedido = $this->createPedido($request);
        $this->createDetallePedido($request, $pedido);
        DB::commit();
        return new OrderResource($pedido);
    }

    private function checkCurrentOrder(CreateOrderRequest $request)
    {
        $user = User::findOrfail($request->partner);
        $currentOrder = $user->pedidos()->where('estado', '=', 'pendiente')->first();
        if ($currentOrder) throw new HttpResponseException(response()->json([
            'message' => 'No puedes crear un nuevo pedido hasta que el anterior sea enviado o entregado',
        ], 400));
        return;
    }

    private function createPedido(CreateOrderRequest $request)
    {
        $pedido = Pedido::create([
            'user_id' => $request->partner,
            'estado' => $request->status,
            'tipo' => $request->type,
            'direccion' => $request->address,
        ]);
        return $pedido;
    }

    private function createDetallePedido(CreateOrderRequest $request, Pedido $pedido)
    {
        $products = $request->products;
        foreach ($products as $product) {
            $detail =             DetallePedido::create([
                'pedido_id' => $pedido->id,
                'plato_id' => $product['product'],
                'cantidad' => $product['quantity'],
            ]);

            if ($product['observation']) {
                $detail->observation()->create([
                    'order_details_id' => $detail->id,
                    'observation' => $product['observation'],
                ]);
            }
        }
    }
}
