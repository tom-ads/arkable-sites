<?php

namespace App\Enums;

enum UserRole: String
{
    case ADMIN = 'ADMIN';
    case HOST = 'HOST';
    case GUEST = 'GUEST';

    public function getPermissions(): array
    {
        return match ($this) {
            self::ADMIN => [
                'create',
                'read',
                'update',
                'delete',
            ],
            self::HOST => [
                'listing:create',
                'listing:read',
                'listing:update',
                'listing:delete',
            ],
            self::GUEST => [
                'read',
                'create',
                'update',
            ],
        };
    }

    public function getValue()
    {
        return match ($this) {
            self::ADMIN => 'admin',
            self::HOST => 'host',
            self::GUEST => 'guest',
        };
    }
}
