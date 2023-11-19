<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
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
            'email' => 'required|email|exists:users,email',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */

    public function messages(): array
    {
        return [
            'email.required' => 'El campo email es requerido',
            'email.email' => 'El campo email debe ser un email valido',
            'email.exists' => 'El email no existe en nuestros registros',
        ];
    }
}
