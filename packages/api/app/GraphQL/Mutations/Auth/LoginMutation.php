<?php

namespace App\GraphQL\Mutations\Auth;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

final class LoginMutation
{
    public function __invoke($_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));

        if (!$guard->attempt($args)) {
            return ValidationException::withMessages([
                'input.password' => 'Email or password does not match',
            ]);
        }

        $authUser = $guard->user();

        return ['user' => $authUser];
    }
}
