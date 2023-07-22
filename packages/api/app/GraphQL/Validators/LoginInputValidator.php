<?php

namespace App\GraphQL\Validators;

use Illuminate\Validation\Rules\Password;
use Nuwave\Lighthouse\Validation\Validator;

final class LoginInputValidator extends Validator
{
    /**
     * Return the validation rules.
     *
     * @return array<string, array<mixed>>
     */
    public function rules(): array
    {
        return [
           'email' => ['required', 'email'],
           'password' => ['required', Password::defaults()]
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => "Email is required",
            'email.email' => 'Valid email is required',
            
            'password.required' => 'Password is required',
            'password.letters' => 'Password requires at least 1 letter',
            'password.numbers' => 'Password requires at least 1 number',
            'password.symbols' => 'Password requries at least 1 symbol'
        ];
    }
}
