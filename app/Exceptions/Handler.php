<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }


    public function render($request, Throwable $exception)
    {

        // Saber si el error se produjo en una peticion de tipo api

        if ($request->is('api/*')) {

            // Cuando las validaciones fallan
            if ($exception instanceof \Illuminate\Validation\ValidationException) {
                return response()->json([
                    'message' => 'Error de validacion',
                    'errors' => $exception->errors(),
                ], 422);
            }

            // Cuando el usuario no esta autenticado
            if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
                return response()->json([
                    'message' => 'No estas autenticado',
                ], 401);
            }


            // Cuando no encuentra un modelo
            if ($exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
                return response()->json([
                    'message' => 'No se encontro el recurso',
                ], 404);
            }

            // Cuando no encutra el route
            if ($exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
                return response()->json([
                    'message' => 'No se encontro la ruta',
                ], 404);
            }

            // Cuando el token es invalido
            if ($exception instanceof \Laravel\Sanctum\Exceptions\InvalidTokenException) {
                return response()->json([
                    'message' => 'El token es invalido',
                ], 401);
            }

            // Cuando el token no se encuentra
            if ($exception instanceof \Laravel\Sanctum\Exceptions\MustBeAuthenticatedException) {
                return response()->json([
                    'message' => 'El token no se encuentra',
                ], 401);
            }
        }
        return parent::render($request, $exception);
    }
}
