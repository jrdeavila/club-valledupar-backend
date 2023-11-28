<?php

use Illuminate\Support\Facades\Route;

Route::middleware([
    'can:manage reservations',
])->prefix('/reservations')->group(function () {
    Route::apiResource('/{user}', App\Http\Controllers\Api\ReservationController::class)
        ->only(['index', 'store']);

    Route::delete('/{reservation}/{user}', [App\Http\Controllers\Api\ReservationController::class, 'destroy']);
});

Route::get('/insume-areas', App\Http\Controllers\Api\InsumeAreasController::class);
Route::get('/type-reservations', App\Http\Controllers\Api\TypeReservationController::class);
