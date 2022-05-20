<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Room\CreateRequest;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomsController extends Controller
{
    public function index()
    {
        return response()->json(Room::all());
    }

    public function store(CreateRequest $request)
    {
        $params = $request->validated();
        $newRoom = Room::query()->create([
            'host_user_id' => $params['user_id'],
            'name' => $params['name'],
            //note: 将来仕様が決まったら実装
            'max_user_count' => 5,
            'is_private' => false,
        ]);
        return response()->json($newRoom);
    }

    public function destroy(string $roomId)
    {
        $room = Room::query()->findOrFail($roomId);
        $room->delete();
        return response()->noContent();
    }
}
