<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Listing extends Model
{
    use HasFactory;

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'check_in' => 'datetime',
        'check_out' => 'datetime',
    ];

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
