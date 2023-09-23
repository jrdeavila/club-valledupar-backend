<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreatePlatoRequest extends FormRequest
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
            'nombre' => [
                'required',
                'string',
                'max:255',
                Rule::unique('Plato')->ignore($this->plato?->nombre, "nombre"),
            ],
            'descripcion' => 'required|string|max:255',
            'precio' => 'required|numeric|not_in:0',
            'carta_id' => 'required|exists:Carta,id',
            'imagen' => 'required|image|max:2048',
            "disponibilidad" => "required|boolean", // 
        ];
    }
}
