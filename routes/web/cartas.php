<?php

use Illuminate\Support\Facades\Route;

Route::prefix('cartas')->middleware([
    'auth', 'verified',
    'can:manage products'
])->group(function () {
    Route::resource('.', App\Http\Controllers\CartaController::class)->middleware(['auth', 'verified'])->names("cartas")->only([
        'index', 'store', 'update', 'destroy',
    ])->parameter('', 'carta');
    Route::apiResource('.platos', App\Http\Controllers\PlatoController::class)->names("platos")->except([
        'index', 'show'
    ])->parameters([
        '' => 'carta',
        'plato' => 'plato'
    ]);
    Route::put('/{carta}/platos/{plato}/disponibilidad', App\Http\Controllers\ChangeDispPlatoController::class)->name('platos.toggle-disp');
});
