<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
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
            'nombre' => $this->firstname,
            'apellido' => $this->lastname,
            'telefono' => $this->phone,
            'email' => $this->email,
            'tipo' => $this->roles->first()->name,
        ];
    }
}
