<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePlatoRequest;
use App\Models\Carta;
use App\Models\Plato;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PlatoController extends Controller
{


    /**
     * Store a newly created resource in storage.
     */
    public function store(Carta $carta, CreatePlatoRequest $request)
    {
        DB::beginTransaction();
        $carta->platos()->create($request->all());
        $imageName = $this->putImagen($carta, $request->file('imagen'));
        $carta->platos->last()->update([
            'imagen' => $imageName
        ]);

        DB::commit();
        return redirect()->route('cartas.index');
    }

    private function putImagen(Carta $carta, UploadedFile $image): string
    {
        $imageName = $carta->id . "-" . $carta->platos->last()->id . "." . $image->extension();
        $image->storeAs('public/platos', $imageName);
        return $imageName;
    }

    private function deleteImage(Plato $plato)
    {
        $filepath = "public/platos/" . $plato->imagen;
        if (Storage::fileExists($filepath)) {
            Storage::delete($filepath);
        }
    }

    public function update(Carta $carta, Plato $plato, CreatePlatoRequest $request,)

    {
        DB::beginTransaction();
        if ($carta->platos->contains($plato->id)) {
            $plato->update($request->all());
            $this->putImagen($carta, $request->file('imagen'));
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
            $this->deleteImage($plato);
            $plato->delete();
            DB::commit();
            return redirect()->route('cartas.index');
        } else {
            DB::rollBack();
            throw new ModelNotFoundException();
        }
    }
}
