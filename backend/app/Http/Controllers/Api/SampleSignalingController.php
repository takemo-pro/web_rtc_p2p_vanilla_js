<?php

namespace App\Http\Controllers\Api;

use App\Events\ReceivedSdpMessage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SampleSignalingController extends Controller
{
    public function __invoke(Request $request): \Illuminate\Http\Response
    {
        ReceivedSdpMessage::dispatch(
            'room_id_fixed',
            $request->json('sdp'),
            $request->json('user_id')
        );
        return response()->noContent();
    }
}
