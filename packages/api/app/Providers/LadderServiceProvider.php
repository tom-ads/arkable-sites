<?php

namespace App\Providers;


use Ladder\Ladder;
use App\Enums\UserRole;
use Illuminate\Support\ServiceProvider;

class LadderServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configurePermissions();
    }

    /**
     * Configure the permissions that are available within the application.
     */
    protected function configurePermissions(): void
    {
        // Adm
        Ladder::role(
            UserRole::ADMIN->getValue(),
            'Administrator',
            UserRole::ADMIN->getPermissions(),
        )->description('Administrator users can perform any action.');

        // Host
        Ladder::role(
            UserRole::HOST->getValue(),
            'Host',
            UserRole::HOST->getPermissions(),
        )->description('Host users have the ability to read, create, update and delete their own properties.');

        // Guest
        Ladder::role(
            UserRole::GUEST->getValue(),
            'Guest',
            UserRole::GUEST->getPermissions()
        )->description('Editor users have the ability to read, create, and update their own bookings.');
    }
}
