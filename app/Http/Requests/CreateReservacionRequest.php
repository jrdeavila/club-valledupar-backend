<?php

namespace App\Http\Requests;

use App\Models\Horario;
use App\Models\Reservation;
use Carbon\Carbon;
use DateTime;
use DateTimeZone;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class CreateReservacionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'start_date' => 'required|date|after:now',
            'end_date' => 'required|date|after:start_date',
            'insume_area_id' => 'required|exists:insume_areas,id',
            'is_ever' => 'required|boolean',
            'is_all_day' => 'required|boolean',
            'observations' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
        ];
    }

    /**
     * @param array<string, mixed> $data
     */

    public function withValidator(Validator $validator): void
    {
        $validator->after(function ($validator) {
            $data = $this->all();
            $start_date = Carbon::parse($data['start_date']);
            $end_date = Carbon::parse($data['end_date']);

            if ($start_date > $end_date) {
                $validator->errors()->add('end_date', 'La hora de fin debe ser mayor a la hora de inicio');
            }

            if ($data['is_ever'] && $data['is_all_day']) {
                $validator->errors()->add('is_all_day', 'No puede ser todo el dia si es para siempre');
            }

            // Reservaciones para el mismo dia
            $reservations = Reservation::where('insume_area_id', $data['insume_area_id'])
                ->whereDate('start_date', $start_date->format('Y-m-d'))
                ->whereDate('end_date', $end_date->format('Y-m-d'))
                ->get();

            if ($reservations->count() > 0 && $data['is_all_day']) {
                $validator->errors()->add('is_all_day', 'Ya existe una reservacion para este dia');
            }
        });
    }


    /**
     * @return array<string, string>
     */

    public function messages(): array
    {
        return [
            'start_date.required' => 'La hora de inicio es requerida',
            'start_date.date' => 'La hora de inicio debe ser una hora valida',
            'start_date.after' => 'La hora de inicio debe ser mayor a la hora actual',
            'end_date.required' => 'La hora de fin es requerida',
            'end_date.date' => 'La hora de fin debe ser una hora valida',
            'end_date.after' => 'La hora de fin debe ser mayor a la hora de inicio',
            'insume_area_id.required' => 'El insumo es requerido',
            'insume_area_id.exists' => 'El insumo no existe',
            'is_ever.required' => 'El tipo de reserva es requerido',
            'is_ever.boolean' => 'El tipo de reserva debe ser un booleano',
            'is_all_day.required' => 'Debe indicar si es el evento sera todo el dia',
            'type_reservation_id.required' => 'El tipo de reserva es requerido',
            'type_reservation_id.exists' => 'El tipo de reserva no existe',
            'observations.string' => 'Las observaciones deben ser un texto',
        ];
    }
}
