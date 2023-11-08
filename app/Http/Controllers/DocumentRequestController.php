<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangeDocumentRequeststatus;
use App\Http\Requests\SearchPartnerRequest;
use App\Models\DocumentRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentRequestController extends Controller
{
    public function index(SearchPartnerRequest $request)
    {
        if ($request->has('search') && $request->has('filter')) {
            $partners = User::role('socio')->whereRaw("LOWER(" . $request->filter . ") LIKE ?", [
                "%" . strtolower($request->search) . "%",
            ])->get();

            $documents = DocumentRequest::whereIn('user_id', $partners->pluck('id'))->orderBy('created_at', 'desc')->with("user")->with("documentRequestType")->paginate(10);
        } else {

            $documents = DocumentRequest::with("user")->with("documentRequestType")->paginate(10);
        }
        return Inertia::render('DocumentRequest/Index', [
            'documents' => $documents,
        ]);
    }

    public function changeStatus(DocumentRequest $document,  ChangeDocumentRequeststatus $request)
    {
        $document->update([
            'status' => $request->status,
        ]);

        $document->save();

        return redirect()->back();
    }
}
