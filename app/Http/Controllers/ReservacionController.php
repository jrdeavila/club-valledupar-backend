<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateReservacionRequest;
use App\Http\Requests\QueryReservacionesRequest;
use App\Http\Resources\HorarioCollection;
use App\Http\Resources\ReservacionCollection;
use App\Http\Resources\UsuarioCollection;
use App\Models\Horario;
use App\Models\Reservacion;
use App\Models\TipoUsuario;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(QueryReservacionesRequest $request)
    {
        $models = Reservacion::where($request->validated())->get();
        return Inertia::render('Reservacion/Index', [
            "reservaciones" => new ReservacionCollection($models),
            'tipos' => TipoUsuario::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Reservacion/Create', [
            'usuarios' => new UsuarioCollection(Usuario::all()),
            'horarios' => new HorarioCollection(Horario::orderBy("fecha_apertura", "asc")->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateReservacionRequest $request)
    {
        Reservacion::create($request->validated());
        return to_route('reservaciones.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservacion $reservacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservacion $reservacion)
    {

        $reservacion->delete();
        return to_route('reservaciones.index');
    }
}
