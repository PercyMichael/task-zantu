<?php

namespace App\Http\Controllers;

use App\Mail\PasswordResetMail;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\Password as PasswordRules;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;


class UserController extends Controller
{


    public function users(Request $request)
    {
        $users = User::all();
        return ['users' => $users];
    }


    public function register(Request $request)
    {

        // Validate the input request and return errors if validation fails
        $validate = $request->validate([
            'name' => 'required|string|min:3|max:30',
            'email' => 'required|email|string|unique:users',
            'password' => [
                'required',
                'string',
                'confirmed',
                PasswordRules::min(6)->letters()->numbers(),
            ]
        ]);

        // If validation passes, create the user
        $user = User::create([
            'name' => $validate['name'],
            'email' => $validate['email'],
            'password' => Hash::make($validate['password']),
        ]);

        // Create the access token
        $token = $user->createToken($request->name);

        // Return successful response with user data and token
        return response()->json([
            'user' => $user,
            'token' => $token->plainTextToken,
        ]);
    }



    public function login(Request $request)
    {

        $validate = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return ['message' => 'In correct credentials'];
        }

        $token = $user->createToken($user->name);

        return ['token' => $token->plainTextToken];
    }

    public function user(Request $request)
    {
        return $request->user();
    }


    public function logout(Request $request)
    {
        // Invalidate the current token (logout only the token used for the request)
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Successfully logged out']);
    }


    // Send password reset link
    // public function sendResetLinkEmail(Request $request)
    // {
    //     $request->validate(['email' => 'required|email']);

    //     $user = User::where('email', $request->email)->first();

    //     if (!$user) {
    //         return response()->json(['message' => 'User not found'], 404);
    //     }

    //     // Generate a random 6-digit code (you can adjust this to suit your needs)
    //     $resetPasswordToken = random_int(1, 9999); // This will generate a 6-character string.

    //     // Set the expiration time (e.g., 15 minutes from now)
    //     $expiresAt = Carbon::now()->addMinutes(15);
    //     // Store the reset code and expiration time in the database
    //     $user->reset_code = $resetPasswordToken;
    //     $user->reset_code_expires_at = $expiresAt;
    //     $user->save();

    //     // Send the password reset email
    //     try {
    //         Mail::to($request->email)->send(new PasswordResetMail($resetPasswordToken, $user));

    //         return response()->json(['message' => 'Password reset code sent to your email.']);
    //     } catch (Exception $e) {

    //         dump($e);
    //         // Optionally, return a response to inform the client of the issue
    //         return response()->json(['message' => 'Failed to send password reset email. Please try again later.'], 500);
    //     }
    // }


    // function verifyCode(Request $request)
    // {
    //     $request->validate([
    //         'reset_code' => 'required',
    //         'email' => 'required|email',
    //     ]);

    //     // Find the user by email
    //     $user = User::where('email', $request->email)->first();

    //     // Check if the reset code matches and is still valid (has not expired)
    //     if ($user->reset_code !== $request->reset_code) {

    //         return response()->json(['message' => 'Invalid reset code'], 400);
    //     }

    //     if (Carbon::now()->greaterThan($user->reset_code_expires_at)) {
    //         return response()->json(['message' => 'Reset code has expired'], 400);
    //     }

    //     // Return success message
    //     return response()->json(['message' => 'Valid code.']);
    // }


    // Reset password
    // public function resetPassword(Request $request)
    // {

    //     // dd($request->all());
    //     // Validate incoming request
    //     $request->validate([
    //         'reset_code' => 'required',
    //         'email' => 'required|email',
    //         'password' => 'required|min:6|confirmed',
    //     ]);

    //     // Find the user by email
    //     $user = User::where('email', $request->email)->first();

    //     // Check if the reset code matches and is still valid (has not expired)
    //     if ($user->reset_code !== $request->reset_code) {

    //         return response()->json(['message' => 'Invalid reset code'], 400);
    //     }

    //     if (Carbon::now()->greaterThan($user->reset_code_expires_at)) {
    //         return response()->json(['message' => 'Reset code has expired'], 400);
    //     }


    //     // Attempt to reset the password
    //     $user->forceFill([
    //         'password' => Hash::make($request->password),
    //     ])->save();

    //     // Return success message
    //     return response()->json(['message' => 'Password has been reset successfully.']);
    // }
}
