<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ConnectionUnit;
use App\Models\Room;
use Illuminate\Http\Request;

class ConnectionUnitsController extends Controller
{
    public function index(string $roomId)
    {
        /** @var Room $room */
        $room = Room::findOrFail($roomId);
        return response()->success($room->connectionUnits);
    }

    public function store(string $roomId)
    {
        /** @var Room $room */
        $room = Room::findOrFail($roomId);
        return response()->success($room->connectionUnits()->create());
    }

    public function show(string $roomId,string $connectionUnitId)
    {
        /** @var Room $room */
        $room = Room::findOrFail($roomId);
        return response()->success($room->connectionUnits()->findOrFail($connectionUnitId));
    }

    public function destroy(string $roomId,string $connectionUnitId)
    {
        /** @var Room $room */
        $room = Room::findOrFail($roomId);
        $room->connectionUnits()->findOrFail($connectionUnitId)->delete();
        return response()->noContent();
    }
}
