<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//
//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

//todo: csrf
Route::post('sample_signaling',\App\Http\Controllers\Api\SampleSignalingController::class);

Route::group([
    'middleware' => 'auth:sanctum',
],function(){
    Route::get('me',[\App\Http\Controllers\Api\UsersController::class,'currentUser'])->name('me');
    Route::group([
        'prefix' => 'room',
        'as' => 'room.',
    ],function(){
        Route::get('',[\App\Http\Controllers\Api\RoomsController::class,'index'])->name('index');
        Route::post('',[\App\Http\Controllers\Api\RoomsController::class,'store'])->name('store');
        Route::delete('{roomId}',[\App\Http\Controllers\Api\RoomsController::class,'destroy'])->name('destroy');
    });

});
