<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchOrderRequest;
use App\Http\Resources\PedidoCollection;
use App\Http\Resources\PedidoResource;
use App\Models\Pedido;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidoController extends Controller
{
    public function index(SearchOrderRequest $request)
    {
        if ($request->has('search') && $request->has('filter')) {
            if ($request->filter === 'status') {
                $orders = Pedido::where('estado', $request->search)->orderBy('created_at', 'desc')->get();
            } else {
                $partners = User::role('socio')->whereRaw("LOWER(" . $request->filter . ") LIKE ?", [
                    "%" . strtolower($request->search) . "%",
                ])->get();
                $orders = Pedido::whereIn('user_id', $partners->pluck('id'))->orderBy('created_at', 'desc')->get();
            }
        } else {
            $orders = Pedido::orderBy('created_at', 'desc')->get();
        }
        return Inertia::render('Pedido/Index', [
            'pedidos' => new PedidoCollection($orders),
        ]);
    }

    public function show(Pedido $pedido)
    {
        return Inertia::render('Pedido/Show', [
            'order' => new PedidoResource($pedido),
        ]);
    }
}
