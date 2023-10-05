<?php

use Illuminate\Support\Facades\Route;

Route::prefix('/sections')->group(function () {
    Route::get('/', \App\Http\Controllers\Api\SectionController::class);
});


Route::prefix('/orders')->group(function () {
    Route::apiResource('/', \App\Http\Controllers\Api\OrderController::class)->parameters([
        '' => 'order'
    ])->only(['store']);

    Route::put('/{order}/cancel', \App\Http\Controllers\Api\CancelOrderController::class)->name('orders.cancel');

    Route::get('/{user}', [\App\Http\Controllers\Api\OrderController::class, 'index'])->name('orders.index');
});
