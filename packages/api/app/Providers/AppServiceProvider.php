<?php

namespace App\Providers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
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
        // Set global password rules
        Password::defaults(function () {
            $rule = Password::min(8);

            if(Config::get('APP_ENV') === 'production') {
                $rule->mixedCase()->letters()->symbols()->uncompromised();
            }

            return $rule;
        });
    }
}
