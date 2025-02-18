<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


Route::get('/', function (Request $request) {
    // You can return any custom data here.
    return response()->json([
        'message' => 'Welcome to the API!',
        'status' => 'success',
        'name' => 'Bright B',
    ]);
});


Route::get('/login', function (Request $request) {
    // $request->validate([
    //     'email' => 'required|email',
    //     'password' => 'required',
    // ]);

    // $user = User::where('email', $request->email)->first();

    // if (!$user || !Hash::check($request->password, $user->password)) {
    //     return response()->json([
    //         'message' => 'Invalid credentials',
    //         'status' => 'error',
    //     ], 401);
    // }

    // $token = $user->createToken('auth_token')->plainTextToken;

    // return response()->json([
    //     'message' => 'Login successful',
    //     'status' => 'success',
    //     'access_token' => $token,
    //     'token_type' => 'Bearer',
    // ]);

    return response()->json([
        'message' => 'Login successful',
        'status' => 'success',
    ]);
});

// Route::post('/register', function (Request $request) {
//     $request->validate([
//         'name' => 'required|string|max:255',
//         'email' => 'required|string|email|max:255|unique:users',
//         'password' => 'required|string|min:8|confirmed',
//     ]);

//     $user = User::create([
//         'name' => $request->name,
//         'email' => $request->email,
//         'password' => Hash::make($request->password),
//     ]);

//     $token = $user->createToken('auth_token')->plainTextToken;

//     return response()->json([
//         'message' => 'Registration successful',
//         'status' => 'success',
//         'access_token' => $token,
//         'token_type' => 'Bearer',
//     ]);
// });
