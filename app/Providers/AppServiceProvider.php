<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton('apiClient', function () {
            $configuration = new \Housemates\ConnectApi\Configuration();
            $configuration->setHost('https://api.dev-housemates.io')
                ->setAccessToken('8|RBvxp9x4yQ2HYT3VVVgANfRF8TipkNlNYCpZmLsz')
                ->setApiPartnerId('01H6NWTD68Z9N3M5N71S1Y92YP');

            return new \Housemates\ConnectApi\ApiClient($configuration);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
