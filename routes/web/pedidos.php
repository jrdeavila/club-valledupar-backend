<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['can:manage orders'])->prefix('pedidos')->group(function () {
    Route::resource('.', App\Http\Controllers\PedidoController::class)->names('pedidos')
        ->parameter('', 'pedido')
        ->except(['edit', 'update', 'destroy', 'create', 'store']);

    Route::patch("/{pedido}", App\Http\Controllers\ChangeStatePedidoController::class)->name('pedidos.estado');
});
