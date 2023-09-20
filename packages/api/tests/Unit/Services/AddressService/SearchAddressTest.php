<?php

namespace Tests\Feature\Unit\Services;

use Tests\TestCase;
use Illuminate\Support\Facades\Http;
use App\Services\Fetchify\AddressService;

class SearchAddressTest extends TestCase
{
    public AddressService $addressService;

    public function setup(): void
    {
        parent::setUp();

        /** @var AddressService */
        $this->addressService = $this->app->make(AddressService::class);
    }

    public function test_address_search_returns_matching_address(): void
    {
        $mockResponse = [
            'delivery_points' => [
                'thoroughfares' => [
                    0 => [
                        'line_1' => 'TEST STREET',
                        'line_2' => 'TEST VALLEY'
                    ],
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

        $response = $this->addressService->search($mockResponse['postcode']);

        $this->assertCount(1, $response['delivery_points']);
        $this->assertEquals($response, $mockResponse);
    }

    public function test_address_search_returns_empty_array_when_no_address_found(): void
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

        $response = $this->addressService->search($mockResponse['postcode']);

        $this->assertCount(0, $response['delivery_points']);
        $this->assertEquals($response, $mockResponse);
    }

    public function test_address_search_throws_exception_when_fetchify_returns_no_address_error(): void
    {
        $mockResponse = [
            'error_code' => '0001',
            'error_msg' => 'Address not found for postcode',
        ];

        Http::fake([
            config('fetchify.address.url') => Http::response($mockResponse),
        ], 200);

        $this->expectExceptionMessage('Address not found for postcode');

        $this->addressService->search('AA1 1AA');
    }

    public function test_address_search_throws_exception_when_fetchify_returns_invalid_postcode_format_error(): void
    {
        $mockResponse = [
            'error_code' => '0002',
            'error_msg' => 'Postcode is invalid',
        ];

        Http::fake([
            config('fetchify.address.url') => Http::response($mockResponse),
        ], 200);

        $this->expectExceptionMessage('Postcode is invalid');

        $this->addressService->search('AA1 1AA');
    }

    public function test_address_search_throws_exception_when_no_postcode_is_provided(): void
    {
        $mockResponse = [
            'error_code' => '1002',
            'error_msg' => 'Postcode is required',
        ];

        Http::fake([
            config('fetchify.address.url') => Http::response($mockResponse),
        ], 200);

        $this->expectExceptionMessage('Postcode is required');

        $this->addressService->search('');
    }

    public function test_address_search_throws_exception_when_fetchify_returns_unknown_error(): void
    {
        $postcode = 'AA1 1AA';
        $mockResponse = [
            'error_code' => '9999',
            'error_msg' => 'Unknown error',
        ];

        Http::fake([
            config('fetchify.address.url') => Http::response($mockResponse),
        ], 200);

        $this->expectExceptionMessage("Unable to fetch address for postcode: $postcode");

        $this->addressService->search($postcode);
    }

    public function test_address_search_throws_exception_when_fetchify_request_fails(): void
    {
        $postcode = 'AA1 1AA';
        $mockResponse = [
            'error_code' => '9999',
            'error_msg' => 'Unknown error',
        ];

        Http::fake([
            config('fetchify.address.url') => Http::response($mockResponse, 500),
        ], 500);

        $this->expectExceptionMessage("Internal server error");

        $this->addressService->search($postcode);
    }
}
