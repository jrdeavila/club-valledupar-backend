<?php

use App\Http\Controllers\Api\DocumentRequestController;
use App\Http\Controllers\Api\DocumentTypeController;
use Illuminate\Support\Facades\Route;

Route::prefix('document-requests')->group(function () {
    Route::apiResource('.', DocumentRequestController::class)->only(['index', 'store'])->names('api.document-requests');

    Route::get('/types', DocumentTypeController::class)->name('api.document-requests.types');
});
