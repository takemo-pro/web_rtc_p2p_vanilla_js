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

class IceCandidate implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $roomId;
    public $sendUserId;
    public $targetUserId;
    public $iceCandidate;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($roomId,$sendUserId,$targetUserId,$iceCandidate)
    {
        $this->roomId = $roomId;
        $this->sendUserId = $sendUserId;
        $this->targetUserId = $targetUserId;
        $this->iceCandidate = $iceCandidate;
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
