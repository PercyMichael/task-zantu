<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/', function (Request $request) {
    // You can return any custom data here.
    return response()->json([
        'message' => 'Welcome to the API!',
        'status' => 'success',
    ]);
});
