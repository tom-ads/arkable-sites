<?php

namespace App\Services\Fetchify;

use App\Exceptions\FetchifyAddressException;
use Exception;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Services\Fetchify\Contracts\AddressServiceContract;

class AddressService implements AddressServiceContract
{
    public function __construct(private string $key, private string $url)
    {
        if (App::isProduction()) {
            if (is_null($key)) {
                throw new Exception('[AddressService] API key is required');
            }

            if (is_null($url)) {
                throw new Exception('[AddressService] Base URL is required');
            }
        }
    }

    public function search(string $postcode): array
    {
        $params = [
            'key' => $this->key,
            'postcode' => $postcode,
            'response' => 'data_formatted',
        ];

        try {
            $response = Http::get($this->url, $params);

            // Throw an exception if the response is not 200
            if ($response->failed()) {
                throw new Exception($response->body(), $response->status());
            }

            $decoded = json_decode($response->body(), true);

            // Fetchify returns a 200 response with an error message in the body
            if (array_key_exists('error_code', $decoded)) {
                throw new FetchifyAddressException($response->body());
            }

            return $response->json();
        } catch (FetchifyAddressException $e) {
            $decoded = json_decode($e->getMessage(), true);

            // Try to match a client friendly error message
            $clientErrorMessage = match ($decoded['error_code']) {
                '0001' => 'Address not found for postcode',
                '0002' => 'Postcode is invalid',
                '1002' => 'Postcode is required',
                default => null,
            };

            // Throw an exception if we can match a client friendly error message
            if ($clientErrorMessage) {
                throw new Exception($clientErrorMessage, 422);
            }

            // Log the error if we can't match a client friendly error message
            Log::error('[AddressService] Fetchify address lookup failed', [
                'code' => $decoded['error_code'],
                'message' => $decoded['error_msg'],
                'params' => $postcode ?: null,
            ]);

            throw new Exception("Unable to fetch address for postcode: {$postcode}");
        } catch (Exception $e) {
            Log::error('[AddressService] Fetchify request failed', [
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
                'params' => $postcode ?: null,
            ]);

            throw new Exception('Internal server error', $e->getCode());
        }
    }

    public function format($data): array
    {
        $result = collect($data['delivery_points']);

        $formatted = $result->map(function ($item) use ($data) {
            return [
                'line_1' => $item['line_1'],
                'line_2' => $item['line_2'],
                'town_or_city' => $data['town'],
                'county' => $data['postal_county'],
                'country' => 'United Kingdom',
                'postcode' => $data['postcode'],
            ];
        });

        return $formatted->toArray();
    }
}
