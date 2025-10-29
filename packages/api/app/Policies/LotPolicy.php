<?php

namespace App\Policies;

use App\Models\Auction;
use App\Models\Lot;
use App\Models\User;

class LotPolicy
{
    public function before(User $user, string $ability): bool|null
    {
        if ($user->isAdmin()) {
            return true;
        }
        return null;
    }

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Lot $lot): bool
    {
        return true;
    }

    public function create(User $user, Auction $auction): bool
    {
        return $user->id === $auction->user_id;
    }

    public function update(User $user, Lot $lot): bool
    {
        return $user->id === $lot->auction->user_id;
    }

    public function delete(User $user, Lot $lot): bool
    {
        return $user->id === $lot->auction->user_id;
    }
}
