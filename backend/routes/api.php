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

Route::group([
//    'middleware' => 'auth:sanctum',
],function(){
    Route::get('me',[\App\Http\Controllers\Api\UsersController::class,'currentUser'])->name('me');
    Route::group([
        'prefix' => 'room',
        'as' => 'room.',
    ],function(){
        Route::get('',[\App\Http\Controllers\Api\RoomsController::class,'index'])->name('index');
        Route::get('{roomId}',[\App\Http\Controllers\Api\RoomsController::class,'show'])->name('show');
        Route::post('',[\App\Http\Controllers\Api\RoomsController::class,'store'])->name('store');
        Route::delete('{roomId}',[\App\Http\Controllers\Api\RoomsController::class,'destroy'])->name('destroy');

        Route::group([
            'prefix' => '{roomId}'
        ],function(){
//            Route::put('{roomId}/join',[\App\Http\Controllers\Api\RoomsController::class,'join'])->name('join');
            Route::post('offer',[\App\Http\Controllers\Api\SignalingController::class,'offer'])->name('offer');
            Route::post('answer',[\App\Http\Controllers\Api\SignalingController::class,'answer'])->name('answer');
            Route::post('ice_candidate',[\App\Http\Controllers\Api\SignalingController::class,'iceCandidate'])->name('ice_candidate');
        });

        Route::group([
            'prefix' => '{roomId}/connection_unit',
            'as' => 'connection_unit.',
        ],function (){
            Route::get('',[\App\Http\Controllers\Api\ConnectionUnitsController::class,'index'])->name('index');
            Route::get('{connectionUnitId}',[\App\Http\Controllers\Api\ConnectionUnitsController::class,'show'])->name('show');
            Route::post('',[\App\Http\Controllers\Api\ConnectionUnitsController::class,'store'])->name('store');
            Route::delete('{connectionUnitId}',[\App\Http\Controllers\Api\ConnectionUnitsController::class,'destroy'])->name('destroy');
        });
    });
});
