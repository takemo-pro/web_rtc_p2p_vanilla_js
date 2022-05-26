<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $room_id
 * @property string $connection_unit_id
 * @property string $created_at
 * @property string $updated_at
 * @property ConnectionUnit $connectionUnit
 * @property Room $room
 */
class RoomConnectionUnit extends Model
{
    /**
     * The "type" of the auto-incrementing ID.
     * 
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['room_id', 'connection_unit_id', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function connectionUnit()
    {
        return $this->belongsTo('App\Models\ConnectionUnit');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function room()
    {
        return $this->belongsTo('App\Models\Room');
    }
}
