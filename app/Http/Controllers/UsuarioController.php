<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUsuarioRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{

    public function store(CreateUsuarioRequest $request)

    {
        DB::beginTransaction();
        $user = User::factory()->create($request->only(
            'firstname',
            'lastname',
            'email',
            'phone',
        ));
        $user->assignRole($request->role_id);
        DB::commit();


        return to_route('reservaciones.create');
    }
}
