<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateReservacionRequest;
use App\Http\Requests\QueryReservacionesRequest;
use App\Http\Resources\HorarioCollection;
use App\Http\Resources\ReservacionCollection;
use App\Http\Resources\RoleCollection;
use App\Http\Resources\UsuarioCollection;
use App\Models\Horario;
use App\Models\Reservacion;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

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
            'tipos' => new RoleCollection(Role::where('name', '!=', 'admin')->get()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Reservacion/Create', [
            'usuarios' => new UsuarioCollection(User::role(['socio', 'turista'])->get()),
            'horarios' => new HorarioCollection(Horario::orderBy("fecha_apertura", "asc")->get()),
            'tipos' => new RoleCollection(Role::where('name', '!=', 'admin')->get()),
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
     * Remove the specified resource from storage.
     */
    public function destroy(Reservacion $reservacion)
    {

        $reservacion->delete();
        return to_route('reservaciones.index');
    }
}
