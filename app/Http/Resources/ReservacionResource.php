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
            'title' => $this->typeReservation->name,
            'desc' => $this->insumeArea->name,
            'end_date' => $this->end_date,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'color' => $this->insumeArea->color,
        ];
    }
}
