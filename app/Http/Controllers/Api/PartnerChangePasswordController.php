<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ChangePasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;

class PartnerChangePasswordController extends Controller
{
    public function __invoke(ChangePasswordRequest $request)
    {
        $user = User::find(auth('api')->user()->id);

        $user->password = bcrypt($request->new_password);
        $user->save();

        return response()->json([
            'message' => 'Contraseña actualizada correctamente',
        ]);
    }
}
