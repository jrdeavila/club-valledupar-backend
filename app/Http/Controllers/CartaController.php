<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCartaRequest;
use App\Http\Resources\CartaCollection;
use App\Models\Carta;
use App\Utils\ImagePlatoUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class CartaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Carta/Index', [
            'cartas' => new CartaCollection(Carta::all())
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCartaRequest $request)
    {
        Carta::create($request->validated());

        return redirect()->route('cartas.index');
    }





    /**
     * Update the specified resource in storage.
     */
    public function update(CreateCartaRequest $request, Carta $carta)
    {
        $carta->update($request->all());
        return redirect()->route('cartas.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Carta $carta)
    {
        DB::beginTransaction();
        $carta->platos->each(fn ($item) => ImagePlatoUtils::deleteImage($item));
        $carta->delete();
        DB::commit();
        return redirect()->route('cartas.index');
    }
}
