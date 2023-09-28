<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PedidoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $total = array_sum($this->detallePedido->map(function ($detalle) {
            return $detalle->total();
        })->toArray());
        return [
            'id' => $this->id,
            'usuario' => $this->usuario->nombre . ' ' . $this->usuario->apellido,
            'detalle' => DetallePedidoResource::collection($this->detallePedido),
            'items' => $this->detallePedido->count(),
            'total' => $total,
            'direccion' => $this->direccion,
            'estado' => $this->estado,
            'fecha_creacion' => $this->created_at,
        ];
    }
}
