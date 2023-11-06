<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrderRequest extends FormRequest
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
            'partner' => 'required|numeric|exists:users,id',
            'products' => [
                'required',
                'array',
                'min:1',
            ],
            'products.*.quantity' => 'required|numeric|min:1',
            'products.*.product' => 'required|numeric|exists:Plato,id',
            'status' => 'required|in:pendiente,enviado,cancelado,entregado',
            'type' => 'required|in:domicilio,club,reservacion',
            'address' => 'required_if:type,domicilio',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */

    public function messages(): array
    {
        return [
            'partner.required' => 'La orden debe tener un usuario autenticado',
            'partner.numeric' => 'Debe proveer un id de usuario válido',
            'partner.exists' => 'El usuario debe existir en la base de datos',
            'products.required' => 'Los productos son requeridos',
            'products.array' => 'Los productos deben ser un arreglo',
            'products.min' => 'Debe haber al menos un producto',
            'products.*.quantity.required' => 'Debe especificar la cantidad del producto',
            'products.*.quantity.numeric' => 'La cantidad debe ser un número',
            'products.*.quantity.min' => 'Debe haber al menos un producto',
            'products.*.product_id.required' => 'La referencia del producto es requerida',
            'products.*.product_id.numeric' => 'La referencia del producto debe ser un número',
            'products.*.product_id.exists' => 'La referencia del producto debe existir en la base de datos',
            'status.required' => 'El estado de la orden es requerido',
            'status.in' => 'El estado debe ser uno de los siguientes valores: pendiente, enviado, cancelado, entregado',
            'type.required' => 'El tipo de orden es requerido',
            'address.required_if' => 'El campo dirección es requerido si la orden es un domicilio',
        ];
    }
}
