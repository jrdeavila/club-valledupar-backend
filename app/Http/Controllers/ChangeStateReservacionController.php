<?php

namespace App\Http\Controllers;

use App\Http\Requests\EstadoReservacionRequest;
use App\Models\Reservacion;
use Illuminate\Http\Request;

class ChangeStateReservacionController extends Controller
{
    public function __invoke(Reservacion $reservacion, EstadoReservacionRequest $request)
    {

        $reservacion->estado = $request->validated()['estado'];
        $reservacion->save();
        return to_route('reservaciones.index');
    }
}
