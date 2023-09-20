<?php

namespace App\GraphQL\Queries\Services\AddressService;

use Exception;
use App\Services\Fetchify\AddressService;
use Illuminate\Validation\ValidationException;
use App\Exceptions\GraphQL\InternalServerException;

final class SearchPostcode
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        /** @var AddressService */
        $addressService = app()->make(AddressService::class);

        try {
            $result = $addressService->search($args['postcode']);

            return $addressService->format($result);
        } catch (Exception $e) {
            // If Fetchify responded with a client friendly error message, throw a validation exception
            if ($e->getCode() === 422) {
                return ValidationException::withMessages([
                    'postcode' => $e->getMessage(),
                ]);
            }

            // Otherwise, throw an internal server exception as we don't want to expose the error message
            throw new InternalServerException('Internal server error', 'Unable to fetch postcode address');
        }
    }
}
