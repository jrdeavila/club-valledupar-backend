<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePlatoRequest;
use App\Models\Carta;
use App\Models\Plato;
use App\Utils\ImagePlatoUtils;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class PlatoController extends Controller
{


    /**
     * Store a newly created resource in storage.
     */
    public function store(Carta $carta, CreatePlatoRequest $request)
    {
        DB::beginTransaction();
        $carta->platos()->create($request->all());
        $imageName = ImagePlatoUtils::putImagen($carta, $request->file('imagen'));
        $carta->platos->last()->update([
            'imagen' => $imageName
        ]);

        DB::commit();
        return redirect()->route('cartas.index');
    }



    public function update(Carta $carta, Plato $plato, CreatePlatoRequest $request,)

    {
        DB::beginTransaction();
        if ($carta->platos->contains($plato->id)) {
            $plato->update($request->all());
            ImagePlatoUtils::putImagen($carta, $request->file('imagen'));
            DB::commit();
            return redirect()->route('cartas.index');
        } else {
            DB::rollBack();
            throw new ModelNotFoundException();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Carta $carta, Plato $plato)
    {

        DB::beginTransaction();
        if ($carta->platos->contains($plato->id)) {
            ImagePlatoUtils::deleteImage($plato);
            $plato->delete();
            DB::commit();
            return redirect()->route('cartas.index');
        } else {
            DB::rollBack();
            throw new ModelNotFoundException();
        }
    }
}
