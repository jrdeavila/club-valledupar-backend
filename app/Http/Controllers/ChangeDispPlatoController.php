<?php

namespace App\Http\Controllers;

use App\Http\Requests\ToggleDispPlatoRequest;
use App\Http\Resources\PlatoResource;
use App\Models\Carta;
use App\Models\Plato;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class ChangeDispPlatoController extends Controller
{
    public function __invoke(Carta $carta, Plato $plato, ToggleDispPlatoRequest $request)
    {
        DB::beginTransaction();
        if ($carta->platos->contains($plato)) {
            $plato->update($request->all());
            DB::commit();
            return redirect()->route('platos.show', [
                'carta' => $carta,
                'plato' => new PlatoResource($plato)
            ]);
        } else {
            DB::rollBack();
            throw new ModelNotFoundException();
        }
    }
}
