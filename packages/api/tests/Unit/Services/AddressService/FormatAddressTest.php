<?php

namespace Tests\Feature\Unit\Services;

use Tests\TestCase;
use Illuminate\Support\Facades\Http;
use App\Services\Fetchify\AddressService;

class FormatAddressTest extends TestCase
{
    public AddressService $addressService;

    public function setup(): void
    {
        parent::setUp();

        /** @var AddressService */
        $this->addressService = $this->app->make(AddressService::class);
    }

    public function test_format_address_returns_formatted_address(): void
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

        $response = $this->addressService->format($mockResponse);

        $this->assertEquals($response, [
            0 => [
                'line_1' => $mockResponse['delivery_points'][0]['line_1'],
                'line_2' => $mockResponse['delivery_points'][0]['line_2'],
                'town_or_city' => $mockResponse['town'],
                'county' => $mockResponse['postal_county'],
                'country' => 'United Kingdom',
                'postcode' => $mockResponse['postcode'],
            ],
        ]);
    }

    public function test_format_address_returns_empty_array_when_no_address_is_passed(): void
    {
        $mockResponse = [
            'delivery_points' => [],
            'delivery_point_count' => 0,
            "postal_county" =>  "POSTAL COUNTY",
            "traditional_county" => "TRADITIONAL COUNTY",
            "town" => "BIG CITY",
            "postcode" => "AA1 1AA",
        ];

        Http::fake([
            config('fetchify.address.url') => Http::response($mockResponse),
        ], 200);

        $response = $this->addressService->format($mockResponse);

        $this->assertEquals($response, []);
    }
}
