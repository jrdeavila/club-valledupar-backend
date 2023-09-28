<?php

use Illuminate\Support\Facades\Route;


Route::prefix('horarios')->group(function () {
    Route::apiResource('.', App\Http\Controllers\HorarioController::class)->names('horarios')
        ->parameter('', 'horario')
        ->except(['show']);
});
