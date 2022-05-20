<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Room\CreateRequest;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function currentUser()
    {
        $user = Auth::guard('web')->check() ? Auth::guard('web')->user() : null;
        return response()->success($user);
    }

}
