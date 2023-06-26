<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Listing extends Model
{
    use HasFactory, HasUuids;

    // Relationships

    public function host(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function listingType(): BelongsTo
    {
        return $this->belongsTo(ListingType::class);
    }
}
