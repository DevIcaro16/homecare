<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    protected $fillable = [
        'request_date',
        'name',
        'requester_name',
        'priority_level',
        'phone',
        'address',
        'operator_id'
    ];

    /**
     * Get the operator that owns the attendance.
     */
    public function operator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'operator_id');
    }
}
