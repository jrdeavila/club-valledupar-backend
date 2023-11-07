<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ChangePasswordRequest extends FormRequest
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
            'old_password' => 'required|string|min:8',
            'new_password' => 'required|string|min:8|confirmed',
        ];
    }


    /**
     *  Custom Message
     */

    public function messages(): array
    {
        return [
            'old_password.required' => 'La contraseña actual es requerida',
            'old_password.string' => 'La contraseña actual debe ser un texto',
            'old_password.min' => 'La contraseña actual debe tener al menos 8 caracteres',
            'new_password.required' => 'La nueva contraseña es requerida',
            'new_password.string' => 'La nueva contraseña debe ser un texto',
            'new_password.min' => 'La nueva contraseña debe tener al menos 8 caracteres',
            'new_password.confirmed' => 'La nueva contraseña no coincide',

        ];
    }

    /** 
     *  With Validator
     */

    public function withValidator(Validator $validator)
    {
        $validator->after(function ($validator) {
            // Check if old password is correct
            $credentials = [
                'email' => auth('api')->user()->email,
                'password' => $this->old_password,
            ];

            if (Auth::attempt($credentials) === false) {
                $validator->errors()->add('old_password', 'La contraseña actual es incorrecta');
            } else {
                // Check if new password is different from old password
                if ($this->old_password === $this->new_password) {
                    $validator->errors()->add('new_password', 'La nueva contraseña debe ser diferente a la actual');
                }
            }
        });
    }
}
