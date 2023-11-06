<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return  [
            'id' => $this->id,
            'name' => $this->nombre,
            'description' => $this->descripcion,
            'menu_items' => new MenuItemCollection($this->platos()->orderBy('nombre')->get()),
            'is_accompaniment' => $this->is_accompaniment,
            'accompanying' => $this->accompanying,
        ];
    }
}
