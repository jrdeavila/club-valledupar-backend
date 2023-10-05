<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\SectionCollection as ApiSectionCollection;
use App\Models\Carta;

class SectionController extends Controller
{
    public function __invoke()
    {
        return new ApiSectionCollection(Carta::all());
    }
}
