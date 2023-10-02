<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUsuarioRequest extends FormRequest
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
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:255',
            "role_id" => "required|exists:roles,id"
        ];
    }


    public function messages()
    {
        return [
            'firstname.required' => 'El nombre es requerido',
            'lastname.required' => 'El apellido es requerido',
            'email.required' => 'El correo es requerido',
            'phone.required' => 'El teléfono es requerido',
            'role_id.required' => 'El rol es requerido',
            'email.unique' => 'El correo ya existe',
            'role_id.exists' => 'El rol no existe',
        ];
    }
}
