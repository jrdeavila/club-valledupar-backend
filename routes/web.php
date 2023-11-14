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
    return redirect(route("login"));
});



Route::middleware(['auth', 'verified'])->group(function () {


    $dir = __DIR__ . "/web";

    $files = scandir($dir);

    foreach ($files as $file) {
        if (pathinfo($file, PATHINFO_EXTENSION) === "php") {
            include($dir . "/" . $file);
        }
        // If is a directory
        if (is_dir($dir . "/" . $file) && $file != "." && $file != "..") {
            $dirname = $file;
            Route::prefix($dirname)->group(function () use ($dir, $file) {
                $subdir = scandir($dir . "/" . $file);
                foreach ($subdir as $subfile) {
                    if (pathinfo($subfile, PATHINFO_EXTENSION) === "php") {
                        include($dir . "/" . $file . "/" . $subfile);
                    }
                }
            });
        }
    }
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
