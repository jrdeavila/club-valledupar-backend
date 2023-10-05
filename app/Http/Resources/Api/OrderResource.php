<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'partner' => UserResource::make($this->usuario),
            'products' => OrderProductResource::collection($this->detallePedido),
            'status' => $this->estado,
            'is_domicile' => $this->es_domicilio,
            'address' => $this->direccion,
            'created_at' => $this->created_at,
        ];
    }
}
