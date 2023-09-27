<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservacionResource extends JsonResource
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
            'estado' => $this->estado,
            'fecha_reservacion' => $this->fecha_reservacion,
            'hora_reservacion' => $this->hora_reservacion,
            'usuario' => $this->usuario->nombre . " " . $this->usuario->apellido,
            'tipo' => $this->usuario->tipo->nombre,
        ];
    }
}
