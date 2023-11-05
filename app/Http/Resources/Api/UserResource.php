<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'action' => $this->action,
            'address' => $this->address,
            'gender' => $this->gender,
            'state' => $this->state,
            'state_partner' => $this->state_partner,
            'email' => $this->email,
            'phone' => $this->phone,
            "number_phone" => $this->number_phone,
        ];
    }
}
