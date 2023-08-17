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
            $configuration->setHost(config('connect.host_url'))
                ->setAccessToken(config('connect.access_token'))
                ->setApiPartnerId(config('connect.api_partner_id'));

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
