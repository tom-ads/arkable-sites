<?php

namespace App\Exceptions;

use Exception;
use GraphQL\Error\ClientAware;
use GraphQL\Error\ProvidesExtensions;

class AuthenticationException extends Exception implements ClientAware, ProvidesExtensions
{
    public function __construct(string $message)
    {
        parent::__construct($message, 'AUTHENTICATION_ERROR');
    }

    public function isClientSafe(): bool
    {
        return true;
    }

    public function getExtensions(): ?array
    {
        return [];
    }
}
