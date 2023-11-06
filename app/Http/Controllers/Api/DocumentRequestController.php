<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\RequestNewDocument;
use App\Http\Resources\Api\DocumentRequestCollection;
use App\Http\Resources\Api\DocumentRequestResource;
use App\Models\User;
use Illuminate\Http\Request;

class DocumentRequestController extends Controller
{
    public function index()
    {
        return new DocumentRequestCollection(auth()->user()->documentRequests);
    }

    public function store(RequestNewDocument $request)
    {
        $user = User::find(auth()->id());
        $documentRequest = $user->documentRequests()->create([
            'document_request_type_id' => $request->document_request_type_id,
        ]);

        return new DocumentRequestResource($documentRequest);
    }
}
