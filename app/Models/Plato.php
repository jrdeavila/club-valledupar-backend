<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plato extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'Plato';


    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'imagen',
        'disponibilidad',
        'carta_id'
    ];

    public function carta()
    {
        return $this->belongsTo(Carta::class);
    }

    public function detallePedido()
    {
        return $this->hasMany(DetallePedido::class);
    }
}
