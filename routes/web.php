<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('cartas')->group(function () {
        Route::resource('.', App\Http\Controllers\CartaController::class)->middleware(['auth', 'verified'])->names("cartas")->only([
            'index', 'store', 'update', 'destroy',
        ])->parameter('', 'carta');
        Route::apiResource('.platos', App\Http\Controllers\PlatoController::class)->names("platos")->except([
            'index',
        ])->parameters([
            '' => 'carta',
            'plato' => 'plato'
        ]);
        Route::put('/{carta}/platos/{plato}/disponibilidad', App\Http\Controllers\ChangeDispPlatoController::class)->name('platos.toggle-disp');
    });

    Route::prefix('horarios')->group(function () {
        Route::apiResource('.', App\Http\Controllers\HorarioController::class)->names('horarios')
            ->parameter('', 'horario')
            ->except(['show']);
    });

    Route::prefix('reservaciones')->group(function () {
        Route::resource('.', App\Http\Controllers\ReservacionController::class)->names('reservaciones')
            ->parameter('', 'reservacion');

        Route::patch('/{reservacion}', App\Http\Controllers\ChangeStateReservacionController::class)->name('reservaciones.estado');
    });
});
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
