<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateCartaRequest extends FormRequest
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
            "nombre" => [
                "required",
                "string",
                "max:255",
                Rule::unique("Carta", "nombre")->ignore($this->route("carta")),
            ],
            "descripcion" => "required|string",
            'is_accompaniment' => 'required|boolean',
            'accompanying' => 'required|boolean'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */

    public function messages(): array
    {
        return [
            "nombre.required" => "El nombre es obligatorio",
            "nombre.string" => "El nombre debe ser una cadena de caracteres",
            "nombre.max" => "El nombre no puede tener más de 255 caracteres",
            "nombre.unique" => "El nombre ya existe",
            "descripcion.required" => "La descripción es obligatoria",
            "descripcion.string" => "La descripción debe ser una cadena de caracteres",
            "is_accompaniment.required" => "Debe especificar si es un menu de acompañamiento",
            "is_accompaniment.boolean" => "El campo acompañamiento debe ser un booleano",
            "accompanying.required" => "Debe especificar si la carta es un menu acompañable",
            "accompanying.boolean" => "El campo acompañable debe ser un booleano"
        ];
    }


    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->is_accompaniment && $this->accompanying) {
                $validator->errors()->add('is_accompaniment', 'No puede ser un menu de acompañamiento y acompañable a la vez');
                $validator->errors()->add('accompanying', 'No puede ser un menu de acompañamiento y acompañable a la vez');
            }
        });
    }
}
