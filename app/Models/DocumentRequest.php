<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_request_type_id',
        'user_id',
        'status',
    ];


    public function documentRequestType()
    {
        return $this->belongsTo(DocumentRequestType::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
