<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::apiResource('tasks', TaskController::class)->middleware('auth:sanctum');

//auth
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/user', [UserController::class, 'user'])->middleware('auth:sanctum');
Route::get('/users', [UserController::class, 'users'])->middleware('auth:sanctum');
