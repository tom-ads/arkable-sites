<?php

namespace Database\Seeders;

use App\Enums\ListType;
use App\Enums\UserRole as UserRoleEnum;
use App\Models\Listing;
use App\Models\ListingType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    private function createUser(string $email, UserRoleEnum $role = UserRoleEnum::GUEST): User
    {
        $user = User::factory()
            ->state(["email" => $email])
            ->create();

        $user->roles()->create(["role" => $role->getValue()]);

        return $user;
    }

    private function setupHost()
    {
        // Create host
        $hostUser = $this->createUser("host@example.com", UserRoleEnum::HOST);

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
        // Call seeders
        $this->call([
            ListingTypeSeeder::class,
        ]);

        // Create guest user
        $this->createUser("guest@example.com");

        // Create host with listings
        $this->setupHost();
    }
}
