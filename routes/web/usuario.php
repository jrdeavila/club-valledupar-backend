<?php

use Illuminate\Support\Facades\Route;

Route::prefix('usuarios')->group(function () {
    Route::resource('.', App\Http\Controllers\UsuarioController::class)->names('usuarios')
        ->parameter('', 'usuario')
        ->except(['show', 'edit', 'update', 'destroy', 'index', 'create']);
});
