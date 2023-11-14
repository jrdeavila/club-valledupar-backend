<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carta extends Model
{
    use HasFactory;

    protected $table = 'Carta';


    protected $fillable = [
        'nombre',
        'descripcion',
        'is_accompaniment',
        'accompanying'
    ];

    public $timestamps = false;


    public function platos()
    {
        return $this->hasMany(Plato::class, 'carta_id');
    }
}
