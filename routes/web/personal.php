<?php

use Illuminate\Support\Facades\Route;

Route::prefix('administrar-personal')->group(function () {
    Route::resource('.', App\Http\Controllers\ManagePersonalController::class)->names('personal')
        ->parameter('', 'personal')
        ->except(['edit', 'update',  'create']);

    Route::put('/toggle/{employee}', [App\Http\Controllers\ManagePersonalController::class, 'toggleActivateEmployee'])->name('personal.toggle');
});
