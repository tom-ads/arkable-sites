<?php

namespace App\GraphQL\Mutations\Auth;

use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;

final class LoginMutation
{
    public function __invoke($_, array $args)
    {;
        if (!$token = auth()->attempt(['email' => Arr::get($args, 'email'), 'password' => Arr::get($args, 'password')])) {
            return ValidationException::withMessages([
                'input.password' => 'Email or password does not match',
            ]);
        }

        return [
            'user' => auth()->user(),
            'token' => $this->respondWithToken($token),
        ];
    }

    protected function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ];
    }
}
