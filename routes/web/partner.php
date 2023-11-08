<?php

use Illuminate\Support\Facades\Route;

Route::prefix('socios')->group(function () {
    Route::resource('.', App\Http\Controllers\PartnerController::class)->names('partner')
        ->parameter('', 'partner')
        ->only(['index']);

    Route::put('/toggle/{partner}', [App\Http\Controllers\PartnerController::class, 'togglePartner'])->name('partner.toggle');
});
