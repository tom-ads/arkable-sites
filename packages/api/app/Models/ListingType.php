<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ListingType extends Model
{
    use HasFactory;

    // Relationships

    public function listings(): HasMany
    {
        return $this->hasMany(Listing::class);
    }
}
