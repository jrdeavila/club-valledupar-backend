<?php

use App\Http\Controllers\Api\DocumentRequestController;
use Illuminate\Support\Facades\Route;

Route::prefix('document-requests')->group(function () {
    Route::apiResource('.', DocumentRequestController::class)->only(['index', 'store'])->names('api.document-requests');
});
