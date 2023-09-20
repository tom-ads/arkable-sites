<?php

namespace App\Services\Fetchify\Contracts;

interface AddressServiceContract
{
    public function search(string $postcode): array;
    public function format($data): array;
}
