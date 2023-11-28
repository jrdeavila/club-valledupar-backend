<?php

use Illuminate\Support\Facades\Route;


Route::middleware([
    'can:manage reservations',
])->prefix('insumos')->group(function () {
    Route::apiResource('.', App\Http\Controllers\InsumeAreaController::class)->names('insumos')
        ->parameter('', 'insumo')
        ->except(['show']);
});
