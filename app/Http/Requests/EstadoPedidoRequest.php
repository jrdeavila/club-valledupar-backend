<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class EstadoPedidoRequest extends FormRequest
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
            'estado' => 'required|in:enviado,comandado,entregado,cancelado',
        ];
    }

    public function withValidator(Validator $validator)
    {
        return $validator->after(function (Validator $validator) {
            if ($this->input('estado') === 'cancelado' && ($this->pedido->estado !== 'pendiente')) {
                $validator->errors()->add('estado', 'No puede cancelar una reservacion que ha sido enviada, entregada o cancelada');
            }
        });
    }
}
