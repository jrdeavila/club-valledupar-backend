<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUsuarioRequest;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsuarioController extends Controller
{

    public function store(CreateUsuarioRequest $request)
    {
        Usuario::create($request->validated());

        return to_route('reservaciones.create');
    }
}
