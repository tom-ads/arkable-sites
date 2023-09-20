<?php

namespace App\Exceptions\GraphQL;

use Exception;
use GraphQL\Error\ClientAware;
use GraphQL\Error\ProvidesExtensions;

final class InternalServerException extends Exception implements ClientAware, ProvidesExtensions
{
    /** @var @string */
    protected $reason;

    public function __construct(string $message, string $reason)
    {
        parent::__construct($message ?: 'Internal server error');

        $this->reason = $reason;
    }

    /**
     * Returns true when exception message is safe to be displayed to a client.
     */
    public function isClientSafe(): bool
    {
        return true;
    }

    /**
     * Data to include within the "extensions" key of the formatted error.
     *
     * @return array<string, mixed>
     */
    public function getExtensions(): array
    {
        return [
            'reason' => $this->reason,
        ];
    }
}
