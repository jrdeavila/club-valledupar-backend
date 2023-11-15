<?php

namespace App\Http\Requests\Api;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('api')->check() && auth('api')->user()->isPartner;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email|unique:users,email,' . auth('api')->user()->id,
            'name' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
        ];
    }

    /**
     *  Custom Message
     */

    public function messages(): array
    {
        return [
            'email.required' => 'El correo electrónico es requerido',
            'email.email' => 'El correo electrónico debe ser un correo válido',
            'email.unique' => 'El correo electrónico ya está en uso',
            'name.required' => 'El nombre es requerido',
            'name.string' => 'El nombre debe ser un texto',
            'phone.required' => 'El teléfono es requerido',
            'phone.string' => 'El teléfono debe ser un texto',
            'address.required' => 'La dirección es requerida',
            'address.string' => 'La dirección debe ser un texto',
        ];
    }

    public function updateProfile()
    {
        $authenticated = auth('api')->user();
        $user = User::findOrFail($authenticated->id);
        $user->email = $this->email;
        $user->name = $this->name;
        $user->phone = $this->phone;
        $user->address = $this->address;
        $user->first_access = false;
        $user->save();
    }
}
