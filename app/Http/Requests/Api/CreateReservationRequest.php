<?php

namespace App\Http\Requests\Api;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class CreateReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'insume_area_id' => 'required|exists:insume_areas,id',
            'is_ever' => 'required|boolean',
            'type_reservation_id' => 'required|exists:type_reservations,id',
            'observations' => 'nullable|array',
            'observations.*' => 'string',
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
            $current_date = Carbon::now();

            if ($start_date > $end_date) {
                $validator->errors()->add('end_date', 'La fecha de fin debe ser mayor a la fecha de inicio');
            }

            if ($start_date < $current_date) {
                $validator->errors()->add('start_date', 'La fecha de reservacion debe ser mayor a la fecha actual');
            }
        });
    }



    /**
     * @return array<string, string>
     */

    public function messages(): array
    {
        return [
            'start_date.required' => 'La fecha de inicio es requerida',
            'start_date.date' => 'La fecha de inicio debe ser una fecha valida',
            'end_date.required' => 'La fecha de fin es requerida',
            'end_date.date' => 'La fecha de fin debe ser una fecha valida',
            'end_date.after' => 'La fecha de fin debe ser mayor a la fecha de inicio',
            'insume_area_id.required' => 'El insumo es requerido',
            'insume_area_id.exists' => 'El insumo no existe',
            'is_ever.required' => 'El tipo de reserva es requerido',
            'is_ever.boolean' => 'El tipo de reserva debe ser un booleano',
            'type_reservation_id.required' => 'El tipo de reserva es requerido',
            'type_reservation_id.exists' => 'El tipo de reserva no existe',
            'observations.array' => 'Las observaciones deben ser un arreglo',
            'observations.*.string' => 'Las observaciones deben ser un arreglo de cadenas',

        ];
    }
}