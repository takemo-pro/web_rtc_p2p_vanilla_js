<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OfferSdp implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $roomId;
    public $offerUserId;
    public $targetUserId;
    public $sdp;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($roomId,$offerUserId,$targetUserId,$sdp)
    {
        $this->roomId = $roomId;
        $this->offerUserId = $offerUserId;
        $this->targetUserId = $targetUserId;
        $this->sdp = $sdp;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel("room.{$this->roomId}.{$this->targetUserId}");
    }
}
