<?php

namespace App\Http\Requests;

use App\Models\Horario;
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
            'fecha_reservacion' => 'required|date|date_format:Y-m-d',
            'hora_reservacion' => 'required|date_format:H:i',
            'horario_id' => 'required|exists:Horario,id',
            'user_id' => 'required|exists:users,id',
            'estado' => 'required|in:pendiente,aceptada,rechazada,cancelada,finalizada',

        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */

    public function messages(): array

    {
        return [
            'fecha_reservacion.required' => 'La fecha de reservación es requerida',
            'fecha_reservacion.date' => 'La fecha de reservación debe ser una fecha válida',
            'fecha_reservacion.date_format' => 'La fecha de reservación debe ser una fecha válida',
            'hora_reservacion.required' => 'La hora de reservación es requerida',
            'hora_reservacion.date_format' => 'La hora de reservación debe ser una hora válida',
            'id_horario.required' => 'El horario es requerido',
            'id_horario.exists' => 'El horario seleccionado no existe',
            'usuario_id.required' => 'El usuario es requerido',
            'usuario_id.exists' => 'El usuario seleccionado no existe',

        ];
    }


    public function withValidator(Validator $validator)
    {
        return $validator->after(function (Validator $validator) {
            // Check if time is after current


            $currentTime = new DateTime();
            $inputTime = new DateTime($this->input('fecha_reservacion'));
            [$hours, $minutes] = explode(":", strval($this->input('hora_reservacion')));
            $inputTime->setTimezone(new DateTimeZone(env('APP_TIMEZONE')));
            $inputTime->setTime($hours, $minutes);



            if ($currentTime > $inputTime) {
                $validator->errors()->add('hora_reservacion', 'La hora de reservación no puede ser menor a la hora actual');
            }




            $available =  Horario::where(function ($query) {


                $dayName = Carbon::now()->locale('es')->dayName;
                $day = strtr($dayName, [
                    'lunes' => 'lunes',
                    'martes' => 'martes',
                    'miércoles' => 'miercoles',
                    'jueves' => 'jueves',
                    'viernes' => 'viernes',
                    'sábado' => 'sabado',
                    'domingo' => 'domingo',
                ]);

                $query->whereTime('fecha_apertura', '<=', $this->input('hora_reservacion'))
                    ->whereTime('fecha_cierre', '>=', $this->input('hora_reservacion'))
                    ->where($day, '=', true);
            })->exists();
            if (!$available) {
                $validator->errors()->add('hora_reservacion', 'La hora de reservación no está disponible');
            }
        });
    }
}
