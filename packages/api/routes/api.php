<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuctionController;
use App\Http\Controllers\Api\LotController;
use App\Http\Controllers\Api\Admin\AdminUserController;
use App\Http\Controllers\Api\Admin\AdminAuctionController;
use App\Http\Controllers\Api\Admin\AdminLotController;

require __DIR__ . '/auth.php';

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user()->load('categories');
    });

    Route::apiResource('auctions', AuctionController::class);
    Route::apiResource('auctions.lots', LotController::class)
        ->shallow();

    Route::prefix('admin')->name('admin.')->group(function () {

        Route::apiResource('users', AdminUserController::class);

        Route::apiResource('auctions', AdminAuctionController::class);

        Route::apiResource('lots', AdminLotController::class);
    });
});
