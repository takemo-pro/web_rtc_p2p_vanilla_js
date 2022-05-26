<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\Http\InvalidRequestException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Room\CreateRequest;
use App\Models\ConnectionUnit;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Ratchet\Mock\Connection;

class RoomsController extends Controller
{
    public function index()
    {
        $activeRooms = Room::query()->whereNot('host_user_id',Auth::guard('web')->id())->get();
        return response()->success($activeRooms);
    }

    public function show($id)
    {
        $room = Room::query()->with(['hostConnectionUnit','connectionUnits'])->findOrFail($id);
        return response()->success($room);
    }

    public function store(CreateRequest $request)
    {
        $params = $request->validated();
        /** @var Room $newRoom */
        $newRoom = Room::query()->create([
            'name' => $params['name'],
            'max_user_count' => 5,
            'is_private' => false,
        ]);
        //note: Connectionを作成
        /** @var ConnectionUnit $newConnection */
        $newConnection = $newRoom->connectionUnits()->create();
        Log::debug($newConnection);
        $newRoom->hostConnectionUnit()->associate($newConnection)->save();
        Log::debug("New Room ------------------------>>>>>>>>>>>");
        Log::debug($newRoom);
        Log::debug(">>>>>>>>>-----------------------------------");
        return response()->success($newRoom->refresh()->load(['connectionUnits']));
    }

    public function destroy(string $roomId)
    {
        $room = Room::query()->findOrFail($roomId);
        $room->delete();
        return response()->noContent();
    }

    public function join(string $roomId)
    {
        /** @var Room $room */
        $room = Room::query()->with(['connectionUnits','hostConnectionUnit'])->findOrFail($roomId);
        $newConnection = $room->connectionUnits()->create();
        return response()->success($room);
    }
}
