<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Invite;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\ForgotPasswordRequest;
use Illuminate\Support\Facades\Password;


class AuthController extends Controller
{
/////////////////////////////////////////////////////////////////////LOGIN
public function login(LoginUserRequest $request){
if (Auth::attempt($request->only('email', 'password'))) {
$user = User::where('email', $request->email)->first();
           

        if ($user->status_id === 1) {  
            return response()->json([
                'status' => true,
                'message' => 'Welcome ' . $user->name . ' ' . $user->last_name,
                'data' => $user,
                'token' =>  $user->createToken('API token')->plainTextToken,
            ], 200);
        }
        return response()->json([
            'message' => 'Your account is not active. Please contact support.',
        ], 403);  
    } else {
       return response()->json([
            'message' => 'The provided credentials are incorrect.',
        ], 401);  
    }
}
/////////////////////////////////////////////////////////////////////LOGOUT
public function logout()
{
Auth::user()->currentAccessToken()->delete();

    return response()->json([
        'Message' => 'The user has been successfully logged out'
    ], 200);

}
/////////////////////////////////////////////////////////////////////REGISTER
public function register(RegisterUserRequest $request, $token)
{
    $invite = Invite::where('token', $token)->first();

    if (!$invite) {
        return response()->json(['error' => 'Token expired'], 404);
    }
    
    $user = User::where('email', $invite->email)->first();

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    $user->update([
        'password' => Hash::make($request->password),
        'status_id' => 1, 
        'profile_image' => 'https://rkxgxhniyyxsdxniswfk.supabase.co/storage/v1/object/public/images/profile.png',
        'city_id' => $request->city
    ]);
    $invite->delete();
    return response()->json([
        'message' => 'Registration successful',
        'user' => $user
    ], 200);
}
/////////////////////////////////////////////////////////////////////FORGOT PASSWORD
public function forgot(ForgotPasswordRequest $request)
{
    $status = Password::sendResetLink($request->only('email'));

    if ($status == Password::RESET_LINK_SENT) {
        return response()->json([
            'status' => 'We have emailed your password reset link!'
        ], 200);
    }

   return response()->json([
    'status' => 'Unable to send reset link. Please check the email.',
    'error_code' => $status,  // <-- Ovaj red pravi problem
], 422);
}
/////////////////////////////////////////////////////////////////////RESET PASSWORD
    public function reset(ResetPasswordRequst $request)
    {

        $status = Password::reset($request->only('email', 'password', 'token'),
            function ($user) use ($request) {
            $user->update([
                'password' => Hash::make($request->password),

            ]);
        });
        if ($status == Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Password reset successfully'
            ]);
        }
    }
}
