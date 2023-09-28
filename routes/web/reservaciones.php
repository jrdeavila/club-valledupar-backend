<?php

use Illuminate\Support\Facades\Route;

Route::prefix('reservaciones')->group(function () {
    Route::resource('.', App\Http\Controllers\ReservacionController::class)->names('reservaciones')
        ->parameter('', 'reservacion')
        ->except(['show', 'edit', 'update']);

    Route::patch('/{reservacion}', App\Http\Controllers\ChangeStateReservacionController::class)->name('reservaciones.estado');
});
