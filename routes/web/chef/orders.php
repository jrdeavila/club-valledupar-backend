<?php

use App\Http\Controllers\ChefOrderController;
use Illuminate\Support\Facades\Route;

Route::middleware([
    'auth', 'verified',
    'can:manage orders',
])->group(function () {
    Route::get('/comanda', [ChefOrderController::class, 'index'])->name('chef.orders.index');
    Route::put('/comanda/{order}/enviar-a-mesa', [ChefOrderController::class, 'sendOrder'])->name('chef.orders.sendToTable');
    Route::put('/comanda/{order}/finalizar-orden', [ChefOrderController::class, 'finishOrder'])->name('chef.orders.finishOrder');
});
