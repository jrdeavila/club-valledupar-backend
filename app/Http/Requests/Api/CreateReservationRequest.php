<?php

namespace App\Http\Requests\Api;

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
            'reservation_date' => 'required|date',
            'reservation_time' => 'required|date_format:H:i',
            'partner' => 'required|exists:users,id',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'reservation_date.required' => 'La fecha de la reservación es requerida',
            'reservation_date.date' => 'La fecha de la reservación debe ser una fecha válida',
            'reservation_time.required' => 'La hora de la reservación es requerida',
            'reservation_time.date_format' => 'La hora de la reservación debe ser una hora válida',
            'partner.required' => 'El socio es requerido',
            'partner.exists' => 'El socio no existe',
        ];
    }
}
