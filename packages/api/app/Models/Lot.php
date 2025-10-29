<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lot extends Model
{
    use HasFactory;

    protected $fillable = [
        'auction_id',
        'category_id',
        'title',
        'description',
        'start_bid',
        'min_increment',
        'status',
    ];

    /**
     * O lote pertence a um leilão.
     */
    public function auction()
    {
        return $this->belongsTo(Auction::class);
    }

    /**
     * O lote pertence a uma categoria.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
