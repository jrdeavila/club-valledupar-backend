<?php

namespace App\Http\Controllers;

use App\Http\Resources\Api\InsumeAreaResource;
use App\Models\InsumeArea;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InsumeAreaController extends Controller
{
    public function index()
    {

        $areas = InsumeAreaResource::collection(InsumeArea::all());
        return Inertia::render("Horario/Index", [
            'areas' => $areas,
        ]);
    }
}
