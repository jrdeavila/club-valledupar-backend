<?php

namespace App\Http\Requests\Api;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class LoginRequest extends FormRequest
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
            'password' => 'required|string|min:8',
        ];
    }

    public function authenticate()
    {
        if (!Auth::guard('web')->attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }


    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (!RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->input('email')) . '|' . $this->ip());
    }

    public function messages()
    {
        return [
            'email.required' => 'El email es requerido',
            'email.email' => 'El email debe ser un email valido',
            'email.exists' => 'El email no existe',
            'password.required' => 'La contraseña es requerida',
            'password.string' => 'La contraseña debe ser un string',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres',
        ];
    }

    /**
     * With Validator
     *  @param \Illuminate\Contracts\Validation\Validator $validator
     *  @return void
     */

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            // Validate if password is correct only if email is valid
            if ($validator->errors()->has('email')) {
                return;
            }
            if (auth('web')->attempt(['email' => $this->email, 'password' => $this->password]) === false) {
                $validator->errors()->add('password', 'La contraseña es incorrecta');
                return;
            }

            // Check if user is partner
            if (!auth('web')->user()->isPartner) {
                $validator->errors()->add('email', 'Debe ser un socio para iniciar sesión en esta aplicación');
                return;
            }
        });
    }
}
