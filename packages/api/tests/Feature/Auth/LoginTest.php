<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Tests\TestCase;

class LoginTest extends TestCase
{
    public function test_user_can_login_to_their_account(): void
    {
        $payload = [
            "email" => "test@example.com",
            "password" => "password",
        ];

        User::factory()->state($payload)->create();

        $response = $this->graphQL('
            mutation Login($input: LoginInput!) {
                login(input: $input) {
                    user {
                        id
                        forename
                        surname
                        email
                    }
                }
            }
        ',  ['input' => $payload]);

        $response->assertJsonStructure([
            'data' => [
                'login' => [
                    'user' => [
                        'id',
                        'email',
                    ]
                ]
            ]
        ]);
    }

    public function test_user_doesnt_exist_throws_authentication_exception(): void
    {
        $payload = [
            "email" => "test@example.com",
            "password" => "password",
        ];

        $response = $this->graphQL('
            mutation Login($input: LoginInput!) {
                login(input: $input) {
                    user {
                        id
                        forename
                        surname
                        email
                    }
                }
            }
        ',  ['input' => $payload]);

        self::assertSame('Email or password does not match', $response->json('errors.0.message'));
    }

    public function test_invalid_payload_returns_validation_exceptions(): void
    {
        $payload = [
            "email" => 'invalid-email',
            'password' => 'password123!'
        ];

        $response = $this->graphQL('
            mutation Login($input: LoginInput!) {
                login(input: $input) {
                    user {
                        id
                        forename
                        surname
                        email
                    }
                }
            }
        ',  ['input' => $payload]);

        self::assertSame(
            ["input.email" => [0 => 'Valid email is required']],
            $response->json('errors.0.extensions.validation')
        );
    }
}
