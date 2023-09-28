<?php

namespace App\Http\Controllers;

use App\Http\Resources\PedidoCollection;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidoController extends Controller
{
    public function index()
    {
        return Inertia::render('Pedido/Index', [
            'pedidos' => new PedidoCollection(Pedido::orderBy('created_at', 'desc')->get()),
        ]);
    }
}
