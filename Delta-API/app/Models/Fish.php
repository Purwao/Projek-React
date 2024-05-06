<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fish extends Model
{
    protected $fillable = [
        'ikan',
        'habitat',
        'gambar',
        'hargaumum',
        'ukuranumum',
        'bestseller',
    ];
}
