<?php

namespace Database\Factories;

use App\Models\Listing;
use App\Models\ListingType;
use Illuminate\Database\Eloquent\Factories\Factory;
use ListType;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Listing>
 */
class ListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => ListType::APARTMENT
        ];
    }
}
