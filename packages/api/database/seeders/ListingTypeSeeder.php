<?php

namespace Database\Seeders;

use App\Enums\ListType;
use App\Models\ListingType;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ListingTypeSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ListingType::factory()
            ->state(new Sequence(
                ['name' => ListType::APARTMENT],
                ['name' => ListType::CABIN],
                ['name' => ListType::FULL_HOUSE],
                ['name' => ListType::STUDIO],
            ))
            ->count(4)
            ->create();
    }
}
