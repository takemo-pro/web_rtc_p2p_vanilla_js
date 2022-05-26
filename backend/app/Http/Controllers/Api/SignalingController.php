<?php

namespace App\Http\Controllers\Api;

use App\Events\AnswerSdp;
use App\Events\IceCandidate;
use App\Events\OfferSdp;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Signaling\AnswerRequest;
use App\Http\Requests\Api\Signaling\IceCandidateRequest;
use App\Http\Requests\Api\Signaling\OfferRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

//todo: room offer answerの認証
class SignalingController extends Controller
{
    public function offer($roomId,OfferRequest $request){
        $params = $request->validated();
        OfferSdp::dispatch(
            $roomId,
            $params['local_user_id'],
            $params['remote_user_id'],
            $params['sdp']
        );
        return response()->noContent();
    }

    public function answer($roomId,AnswerRequest $request){
        $params = $request->validated();
        AnswerSdp::dispatch(
            $roomId,
            $params['local_user_id'],
            $params['remote_user_id'],
            $params['sdp']
        );
        return response()->noContent();
    }

    public function iceCandidate($roomId,IceCandidateRequest $request){
        Log::debug('ice candidate send!!!!!');
        $params = $request->validated();
        IceCandidate::dispatch(
            $roomId,
            $params['local_user_id'],
            $params['remote_user_id'],
            $params['ice_candidate'],
        );
        return response()->noContent();
    }
}
