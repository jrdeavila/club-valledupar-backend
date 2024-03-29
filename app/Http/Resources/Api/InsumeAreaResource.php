<?php

namespace App\Http\Resources\Api;

use App\Http\Resources\HorarioResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InsumeAreaResource extends JsonResource
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
            'name' => $this->name,
            'desc' => $this->desc,
            'color' => $this->color,
            'schedules' => HorarioResource::collection($this->schedules),
        ];
    }
}
