<?php

namespace App\Http\Requests;

use DateTime;
use DateTimeZone;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class EstadoReservacionRequest extends FormRequest
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
            'estado' => 'required|in:pendiente,aceptada,rechazada,cancelada,finalizada',
        ];
    }

    public function withValidator(Validator $validator)
    {
        return $validator->after(function (Validator $validator) {
            if ($this->reservacion->estado == 'finalizada' || $this->reservacion->estado == 'cancelada') {
                $validator->errors()->add('estado', 'No se puede cambiar el estado de una reservación finalizada o cancelada');
            }

            $date = new DateTime($this->reservacion->fecha_reservacion);
            [$hours, $minutes] = explode(':', $this->reservacion->hora_reservacion);
            $date->setTimezone(new DateTimeZone(env('APP_TIMEZONE')));
            $date->setTime($hours, $minutes);

            $currentDate = new DateTime();


            if ($date > $currentDate && $this->input('estado') === 'finalizada') {
                $validator->errors()->add('estado', 'No se puede finalizar una reservación que no ha ocurrido');
            }
        });
    }
}
