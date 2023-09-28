<?php

use Illuminate\Support\Facades\Route;

Route::prefix('pedidos')->group(function () {
    Route::resource('.', App\Http\Controllers\PedidoController::class)->names('pedidos')
        ->parameter('', 'pedido')
        ->except(['show', 'edit', 'update', 'destroy', 'create', 'store']);

    Route::patch("/{pedido}", App\Http\Controllers\ChangeStatePedidoController::class)->name('pedidos.estado');
});
