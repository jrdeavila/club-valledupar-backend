<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UpdateProfileRequest;

class PartnerUpdateProfileController extends Controller
{
    public function __invoke(UpdateProfileRequest $request)
    {
        $request->updateProfile();
        return response()->json([
            'message' => 'Perfil actualizado correctamente',
        ]);
    }
}
