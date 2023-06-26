<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    private function createUser(string $email, bool $isHost = false): User {
        return User::factory()
            ->state([ "email" => $email, "is_host" => $isHost ])
            ->create();
    }

    /**
     * Seed the application's database.
     */
    public function run(): void
    {   
        // Standard User
        $this->createUser("dev+standard@example.com");

        // Host User
        $this->createUser("dev+host@example.com", true);

        // Call seeder(s)
        $this->call([
            ListTypeSeeder::class,
        ]);
    }
}
