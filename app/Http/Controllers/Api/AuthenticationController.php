<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Resources\Api\UserResource;
use App\Http\Resources\AuthenticatedResource;
use App\Models\User;
use Illuminate\Http\Request;

class AuthenticationController extends Controller
{
    public function login(LoginRequest $request)
    {
        $request->authenticate();
        return new AuthenticatedResource(null);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->noContent();
    }

    public function me(Request $request)
    {
        $user = User::find($request->user()->id);
        return new UserResource($user);
    }
}
