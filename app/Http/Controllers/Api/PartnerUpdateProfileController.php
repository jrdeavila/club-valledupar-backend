<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UpdateProfileRequest;
use App\Http\Resources\Api\UserResource;

class PartnerUpdateProfileController extends Controller
{
    public function __invoke(UpdateProfileRequest $request)
    {
        $user = $request->updateProfile();
        return new UserResource($user);
    }
}
