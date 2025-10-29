<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'start_time',
        'end_time',
        'status',
    ];

    /**
     * O leilão pertence a um usuário (Leiloeiro).
     */
    public function auctioneer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * O leilão possui muitos lotes.
     */
    public function lots()
    {
        return $this->hasMany(Lot::class);
    }
}
