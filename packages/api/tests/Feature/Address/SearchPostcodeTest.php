<?php

namespace Tests\Feature\Address;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Http;

class SearchPostcodeTest extends TestCase
{
    public string $query;
    public User $authUser;

    public function setup(): void
    {
        parent::setUp();

        $this->authUser = User::factory()->create();

        $this->query = '
            query SearchPostcode($postcode: String!) {
                searchPostcode(postcode: $postcode) {
                    line_1
                    line_2
                    town_or_city
                    county
                    country
                    postcode
                }
            }
        ';
    }

    public function test_user_searching_with_valid_postcode_receives_address(): void
    {
        $mockResponse = [
            'delivery_points' => [
                0 => [
                    'line_1' => 'TEST STREET',
                    'line_2' => 'TEST VALLEY'
                ],
            ],
            'delivery_point_count' => 1,
            "postal_county" =>  "POSTAL COUNTY",
            "traditional_county" => "TRADITIONAL COUNTY",
            "town" => "BIG TOWN",
            "postcode" => "AA1 1AA",
        ];

        Http::fake([
            config('fetchify.address.url') => Http::response($mockResponse),
        ], 200);

        $postcode = 'SW1A 1AA';

        $response = $this
            ->actingAs($this->authUser)
            ->graphQL($this->query, ['postcode' => $postcode]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'searchPostcode' => [
                    '*' => [
                        'line_1',
                        'line_2',
                        'town_or_city',
                        'county',
                        'country',
                        'postcode',
                    ],
                ],
            ],
        ]);
    }

    public function test_user_searching_with_invalid_postcode_receives_exception(): void
    {
        $mockResponse = [
            'error_code' => '0001',
            'error_message' => 'Address not found for postcode',
        ];

        Http::fake([
            config('fetchify.address.url') => Http::response($mockResponse),
        ], 200);

        $postcode = 'SW1A 1AA';

        $response = $this
            ->actingAs($this->authUser)
            ->graphQL($this->query, ['postcode' => $postcode]);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'message' => 'Address not found for postcode',
        ]);
    }

    public function test_user_postcode_search_throws_internal_server_exception_receives_generic_response()
    {
        Http::fake([
            config('fetchify.address.url') => Http::response([], 500),
        ], 200);

        $postcode = 'SW1A 1AA';

        $response = $this
            ->actingAs($this->authUser)
            ->graphQL($this->query, ['postcode' => $postcode]);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'message' => 'Internal server error',
            'reason' => 'Unable to fetch postcode address'
        ]);
    }

    public function test_unauthenticated_user_cannot_search_for_postcode()
    {
        $postcode = 'SW1A 1AA';

        $response = $this->graphQL($this->query, ['postcode' => $postcode]);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'message' => 'Unauthenticated.',
        ]);
    }
}
