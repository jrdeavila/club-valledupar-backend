<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CreateReservationRequest;
use App\Http\Resources\Api\ReservationCollection;
use App\Http\Resources\Api\ReservationResource;
use App\Models\Reservation;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ReservationController extends Controller
{
    public function index(User $user)
    {
        // Order by created at desc
        $reservations = $user->reservations()->orderBy('created_at', 'desc')->get();
        return new ReservationCollection($reservations);
    }


    public function store(CreateReservationRequest $request, User $user)
    {
        DB::beginTransaction();
        $reservation =          $user->reservations()->create($request->validated());
        if (isset($request->observations)) {
            foreach ($request->observations  as $observation) {
                $reservation->observations()->create([
                    'observation' => $observation,
                ]);
            }
        }

        DB::commit();

        return new ReservationResource($reservation);
    }

    public function destroy(Reservation $reservation, User $user)
    {

        $isDone = $this->checkIfReservationDone($reservation);
        if ($isDone)  throw new HttpResponseException(response()->json([
            'message' => 'La reserva ya se realizo, no se puede eliminar',
        ], 400));
        $reservation->delete();
        return response()->json([
            'message' => 'Reservation deleted successfully'
        ]);
    }

    private function checkIfReservationDone($reservation)
    {
        $startDate = Carbon::parse($reservation->start_date);
        $now = Carbon::now();

        if ($now > $startDate) {
            return true;
        }
        return false;
    }
}
