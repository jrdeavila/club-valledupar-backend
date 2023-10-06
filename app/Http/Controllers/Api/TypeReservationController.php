<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\TypeReservationCollection;
use App\Models\TypeReservation;
use Illuminate\Http\Request;

class TypeReservationController extends Controller
{
    public function __invoke()
    {
        return new TypeReservationCollection(TypeReservation::all());
    }
}
