<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchPartnerRequest;
use App\Http\Resources\PedidoCollection;
use App\Models\Pedido;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidoController extends Controller
{
    public function index(SearchPartnerRequest $request)
    {
        if ($request->has('search') && $request->has('filter')) {
            $partners = User::role('socio')->whereRaw("LOWER(" . $request->filter . ") LIKE ?", [
                "%" . strtolower($request->search) . "%",
            ])->get();
            $orders = Pedido::whereIn('user_id', $partners->pluck('id'))->orderBy('created_at', 'desc')->paginate(10);
        } else {

            $orders = Pedido::orderBy('created_at', 'desc')->paginate(10);
        }
        return Inertia::render('Pedido/Index', [
            'pedidos' => new PedidoCollection($orders),
        ]);
    }
}
