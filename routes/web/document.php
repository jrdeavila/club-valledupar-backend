<?php

use Illuminate\Support\Facades\Route;

Route::prefix('document-request')->group(function () {
    Route::resource('.', App\Http\Controllers\PartnerController::class)->names('document-request')
        ->parameter('', 'document');
});
