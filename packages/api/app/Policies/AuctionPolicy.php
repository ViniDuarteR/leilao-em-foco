<?php

namespace App\Policies;

use App\Models\Auction;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AuctionPolicy
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

    public function view(User $user, Auction $auction): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->user_type === 'Leiloeiro';
    }

    public function update(User $user, Auction $auction): bool
    {
        return $user->id === $auction->user_id;
    }

    public function delete(User $user, Auction $auction): bool
    {
        return $user->id === $auction->user_id;
    }
}
