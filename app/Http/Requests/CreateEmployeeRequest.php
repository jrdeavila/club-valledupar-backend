<?php

namespace App\Http\Requests;

use App\Models\Employee;
use Illuminate\Foundation\Http\FormRequest;

class CreateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = Employee::find(auth()->user()->id);
        return auth()->check() && $user->isAdmin;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:employees,email',
            'phone' => 'required|string|max:17',
            'dni' => 'required|string|max:15',
            'address' => 'required|string|max:100',
            'role' => [
                'required',
                'string',
                'exists:roles,name',
                'not_in:admin',
            ]
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es requerido',
            'name.string' => 'El nombre debe ser una cadena de caracteres',
            'name.max' => 'El nombre debe tener máximo 100 caracteres',
            'email.required' => 'El correo electrónico es requerido',
            'email.email' => 'El correo electrónico debe ser válido',
            'email.unique' => 'El correo electrónico ya está en uso',
            'phone.required' => 'El teléfono es requerido',
            'phone.string' => 'El teléfono debe ser una cadena de caracteres',
            'phone.max' => 'El teléfono debe tener máximo 17 caracteres',
            'dni.required' => 'El numero de documento es requerido',
            'dni.string' => 'El numero de documento debe ser una cadena de caracteres',
            'dni.max' => 'El numero de documento debe tener máximo 15 caracteres',
            'address.required' => 'La dirección es requerida',
            'address.string' => 'La dirección debe ser una cadena de caracteres',
            'address.max' => 'La dirección debe tener máximo 100 caracteres',
        ];
    }
}
