<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'action',
        'address',
        'gender',
        'state',
        'state_partner',
        'phone',
        'email',
        'password',
        'relationship',
        'dni',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getIsPartnerAttribute()
    {
        return $this->hasRole('socio');
    }




    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function pedidos()
    {
        return $this->hasMany(Pedido::class, 'user_id', 'id', 'Pedido');
    }

    public function documentRequests()
    {
        return $this->hasMany(DocumentRequest::class);
    }
}
