<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class CreateHorarioRequest extends FormRequest
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
            'insume' => 'required|json',
            'insume.title' => 'required|string',
            'insume.description' => 'required|string|max:255',
            'schedule' => 'required|json',
            'schedule.fecha_cierre' => 'required|date_format:H:i|after:fecha_apertura',
            'schedule.fecha_apertura' => 'required|date_format:H:i',
            'schedule.lunes' => 'required|boolean',
            'schedule.martes' => 'required|boolean',
            'schedule.miercoles' => 'required|boolean',
            'schedule.jueves' => 'required|boolean',
            'schedule.viernes' => 'required|boolean',
            'schedule.sabado' => 'required|boolean',
            'schedule.domingo' => 'required|boolean',



        ];
    }


    /**
     * Get the error messages for the defined validation rules.
     */

    public function messages(): array
    {
        return [
            'fecha_apertura.required' => 'Debe ingresar una hora de apertura',
            'fecha_apertura.date_format' => 'Debe ingresar una hora de apertura válida',
            'fecha_cierre.required' => 'Debe ingresar una hora de cierre',
            'fecha_cierre.date_format' => 'Debe ingresar una hora de cierre válida',
            'fecha_cierre.after' => 'La hora de cierre debe ser posterior a la hora de apertura',
            'lunes.required' => 'Debe seleccionar si atiende los lunes',
            'martes.required' => 'Debe seleccionar si atiende los martes',
            'miercoles.required' => 'Debe seleccionar si atiende los miércoles',
            'jueves.required' => 'Debe seleccionar si atiende los jueves',
            'viernes.required' => 'Debe seleccionar si atiende los viernes',
            'sabado.required' => 'Debe seleccionar si atiende los sábados',
            'domingo.required' => 'Debe seleccionar si atiende los domingos',
        ];
    }



    public function withValidator(Validator $validator)
    {

        $validator->after(function ($validator) {
            $days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

            $atLeastOneDay = false;

            foreach ($days as $day) {
                if ($this->input($day)) {
                    $atLeastOneDay = true;
                    break;
                }
            }

            if (!$atLeastOneDay) {
                $validator->errors()->add('atLeastOneDay', 'Debe seleccionar al menos un día');
            }
        });
    }
}
