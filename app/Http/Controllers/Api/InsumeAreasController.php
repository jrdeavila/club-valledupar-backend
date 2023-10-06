<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\InsumeAreaCollection;
use App\Models\InsumeArea;
use Illuminate\Http\Request;

class InsumeAreasController extends Controller
{
    public function __invoke()
    {
        return new InsumeAreaCollection(InsumeArea::all());
    }
}
