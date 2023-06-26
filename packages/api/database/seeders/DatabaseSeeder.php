<?php

namespace Database\Seeders;

use App\Enums\ListType;
use App\Models\Listing;
use App\Models\ListingType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    private function createUser(string $email, bool $isHost = false): User {
        return User::factory()
            ->state([ "email" => $email, "is_host" => $isHost ])
            ->create();
    }

    private function setupHost() {
        // Create host
        $hostUser = $this->createUser("dev+host@example.com", true);

        // Retrieve listing types
        $apartmentListingType = ListingType::query()
            ->where('name', ListType::APARTMENT)
            ->first();

        // Create associated host listings
        Listing::factory()
            ->state([
                "user_id" => $hostUser->id,
                "listing_type_id" => $apartmentListingType->id
            ])
            ->count(30)
            ->create();
    }

    /**
     * Seed the application's database.
     */
    public function run(): void
    {   
        // Call seeder(s)
        $this->call([
            ListingTypeSeeder::class,
        ]);

        // Create standard user
        $this->createUser("dev+standard@example.com");

        // Create host and associated listings
        $this->setupHost();
    }
}
