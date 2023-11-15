<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class NonInertiaRoutes
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->inertia()) {
            return inertia()->location($request->fullUrl());
        }
        return $next($request);
    }
}
