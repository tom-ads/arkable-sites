<?php

namespace Database\Factories;

use App\Enums\ListingStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

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
            "title" => fake()->buildingNumber().' '.fake()->streetName(),
            "description" => fake()->text(300),
            "price" => fake()->numberBetween(1000, 1000000),
            "check_in" => '13:00',
            "check_out" => '10:00',
            "min_stay" => fake()->randomNumber(1, 5),
            "max_stay" => fake()->numberBetween(10, 20),
            "max_guests" => fake()->numberBetween(1, 5),
            "future_reservation_limit" => fake()->numberBetween(1, 12),
            "status" => fake()->randomElement([ListingStatus::LISTED, ListingStatus::UNLISTED]),
        ];
    }
}
