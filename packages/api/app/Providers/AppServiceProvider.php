<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Models\Auction;
use App\Models\Lot;
use App\Policies\UserPolicy;
use App\Policies\AuctionPolicy;
use App\Policies\LotPolicy;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url') . "/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        Gate::policy(User::class, UserPolicy::class);
        Gate::policy(Auction::class, AuctionPolicy::class);
        Gate::policy(Lot::class, LotPolicy::class);
    }
}
