<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    use WithoutModelEvents;

    public static function createUser() {
        return User::factory()->create();
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->createUser();
    }
}
