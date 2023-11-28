<?php

use Illuminate\Support\Facades\Route;

Route::middleware([
    'can:manage documents',
])->prefix('solicitudes-de-documentos')->group(function () {
    Route::resource('.', App\Http\Controllers\DocumentRequestController::class)->names('document-request')
        ->parameter('', 'document')->only(['index']);

    Route::put('status-change/{document}', [App\Http\Controllers\DocumentRequestController::class, 'changeStatus'])->name('document-request.change-status');
});
