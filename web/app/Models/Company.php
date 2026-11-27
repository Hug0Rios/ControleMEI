<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Company extends Model
{
    protected $fillable = [
        'cnpj', 'legal_name', 'trade_name', 'registration_status', 'main_cnae',
        'street', 'number', 'district', 'city', 'state', 'opened_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
