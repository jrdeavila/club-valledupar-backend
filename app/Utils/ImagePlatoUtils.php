<?php

namespace App\Utils;

use App\Models\Carta;
use App\Models\Plato;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

abstract class ImagePlatoUtils
{
    public static function putImagen(Carta $carta, UploadedFile $image): string
    {
        $imageName = $carta->id . "-" . $carta->platos->last()->id . "." . $image->extension();
        $image->storeAs('public/platos', $imageName);
        return $imageName;
    }

    public static function deleteImage(Plato $plato)
    {
        $filepath = "public/platos/" . $plato->imagen;
        if (Storage::fileExists($filepath)) {
            Storage::delete($filepath);
        }
    }
}
