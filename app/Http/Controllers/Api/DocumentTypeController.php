<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\DocumentTypeCollection;
use App\Models\DocumentRequestType;
use Illuminate\Http\Request;

class DocumentTypeController extends Controller
{
    public function __invoke()
    {
        return new DocumentTypeCollection(DocumentRequestType::all());
    }
}
