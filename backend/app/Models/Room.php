<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

/**
 * @property string $id
 * @property integer $host_user_id
 * @property string $created_at
 * @property string $updated_at
 * @property string $name
 * @property integer $max_user_count
 * @property boolean $is_private
 * @property ConnectionUnit $hostConnectionUnit
 * @property ConnectionUnit[] $connectionUnits
 */
class Room extends Model
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
    protected $fillable = [
        'host_connection_user_id',
        'created_at',
        'updated_at',
        'name',
        'max_user_count',
        'is_private'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function(self $room){
            $room->id = Str::orderedUuid();
        });
    }

    /**
     * @return BelongsTo
     */
    public function hostConnectionUnit()
    {
        return $this->belongsTo(ConnectionUnit::class, 'host_connection_unit_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function connectionUnits()
    {
        return $this->hasMany(ConnectionUnit::class);
    }
}
