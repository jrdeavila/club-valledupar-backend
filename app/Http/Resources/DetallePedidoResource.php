<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetallePedidoResource extends JsonResource
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
            'plato' => $this->plato->nombre,
            'precio' => $this->plato->precio,
            'cantidad' => $this->cantidad,
            'observation' => $this->observation?->observation ?? null,
            'total' => $this->total(),
        ];
    }
}
