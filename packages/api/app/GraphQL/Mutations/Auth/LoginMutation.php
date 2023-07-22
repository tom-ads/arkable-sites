<?php

namespace App\GraphQL\Mutations\Auth;

use App\Exceptions\AuthenticationException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

final class LoginMutation
{
    public function __invoke($_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));

        if(! $guard->attempt($args)) {
            throw new AuthenticationException('Incorrect email or password');
        }

        $authUser = $guard->user();

        return ['user' => $authUser];
    }
}
