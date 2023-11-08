<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchPartnerRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PartnerController extends Controller
{
    public function index(SearchPartnerRequest $request)
    {

        if ($request->has('search') && $request->has('filter')) {
            $partners = User::role('socio')->whereRaw("LOWER(" . $request->filter . ") LIKE ?", [
                "%" . strtolower($request->search) . "%",
            ])->paginate(10);
        } else {
            $partners = User::role('socio')->paginate(10);
        }
        return Inertia::render("Partner/Index", [
            'partners' => $partners,
        ]);
    }

    public function togglePartner(User $partner)
    {
        $state = $partner->state;
        if ($state == 'A') {
            $partner->state = 'I';
        } else {
            $partner->state = 'A';
        }
        $partner->save();
        return redirect()->back();
    }
}
