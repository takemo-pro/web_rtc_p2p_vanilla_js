<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * @property string $id
 * @property string $created_at
 * @property string $updated_at
 * @property string $room_id
 * @property Room $room
 */
class ConnectionUnit extends Model
{
    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * @var array
     */
    protected $fillable = ['created_at', 'updated_at', 'room_id'];

    protected static function boot()
    {
        parent::boot();
        static::creating(function(self $room){
            $room->id = Str::orderedUuid();
        });
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

}
