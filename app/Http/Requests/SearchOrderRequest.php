<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() &&  auth()->user()->isAdmin;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'filter' => 'sometimes|string|in:name,email,number_phone,action,status',
            'search' => [
                'sometimes',
                'string',
                function ($attr, $value, $fail) {
                    if ($this->filter === 'status') {
                        if (!in_array($value, ['pendiente', 'comandado', 'enviado', 'entregado', 'cancelado'])) {
                            $fail('El estado no es válido');
                        }
                    }
                }
            ],

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
            'filter.in' => 'El filtro no es válido',
            'search.in' => 'El estado no es válido',
        ];
    }
}
