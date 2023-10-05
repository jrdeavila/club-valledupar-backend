<?php


use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {

    Route::post('/login', [\App\Http\Controllers\Api\AuthenticationController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [\App\Http\Controllers\Api\AuthenticationController::class, 'logout']);
        Route::get('/me', [\App\Http\Controllers\Api\AuthenticationController::class, 'me']);
    });
});
