<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateHorarioRequest;
use App\Http\Resources\HorarioCollection;
use App\Models\Horario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HorarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Horario/Index", [
            'horarios' => new HorarioCollection(Horario::orderBy("fecha_apertura", "asc")->get()),
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateHorarioRequest $request)
    {
        Horario::create($request->validated());

        return redirect()->route('horarios.index');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(CreateHorarioRequest $request, Horario $horario)
    {
        $horario->update($request->validated());
        return redirect()->route('horarios.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Horario $horario)
    {
        $horario->delete();
        return redirect()->route('horarios.index');
    }
}
