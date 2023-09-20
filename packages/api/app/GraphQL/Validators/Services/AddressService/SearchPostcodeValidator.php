<?php

namespace App\GraphQL\Validators\Services\AddressService;

use Nuwave\Lighthouse\Validation\Validator;

final class SearchPostcodeValidator extends Validator
{
    /**
     * Return the validation rules.
     *
     * @return array<string, array<mixed>>
     */
    public function rules(): array
    {
        return [
            'postcode' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'postcode.required' => 'Postcode is required',
            'postcode.string' => 'Postcode must be a string',
        ];
    }
}
