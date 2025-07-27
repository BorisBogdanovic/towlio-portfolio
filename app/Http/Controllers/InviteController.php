<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Models\Invite;
use App\Models\User;
use App\Mail\InvitationEmail;
use App\Http\Requests\MailInviteRequest;
use App\Http\Requests\ResendInviteRequest;



class InviteController extends Controller
{
    /////////////////////////////////////////////////////////////////////SENDING INVITE
    public function sendInvite(MailInviteRequest $request) {
    $token = Str::random(30);

    $invite = Invite::create([
        'email' => $request->input('email'),
        'name' => $request->input('name'),
        'last_name' => $request->input('last_name'),
        'phone' => $request->input('phone'),
        'token' => $token,
    ]);

    $user = User::create([
        'email' => $invite->email,
        'password' => Hash::make(Str::random(10)),
        'name' => $invite->name,
        'last_name' => $invite->last_name,
        'phone' => (Str::startsWith($invite->phone, '+381') ? '' : '+381') . ltrim(trim($invite->phone), '0'),
        'profile_image' => 'https://rkxgxhniyyxsdxniswfk.supabase.co/storage/v1/object/public/images//profile.png',
        'status_id' => 2,
        'is_admin' => false,
    ]);

    $email = $invite->email;
    $url = 'http://localhost:5173/register/' . $email . '/' . $token . '/' . $user->name . '/' . $user->last_name;

    try {
        Mail::to($invite->email)->send(new InvitationEmail($url, $invite->email, $invite));
    } catch (\Throwable $e) {
        \Log::error('Mail sending failed: ' . $e->getMessage());
        return response()->json([
            'message' => 'Invitation sent, but failed to send email',
            'error' => $e->getMessage(),
            'status' => 'warning',
            'data' => $invite,
            'User' => $user,
            'Token' => $user->createToken('API token')->plainTextToken,
        ], 200);
    }

    return response()->json([
        'message' => 'Invitation sent successfully',
        'status' => 'true',
        'data' => $invite,
        'User' => $user,
        'Token' => $user->createToken('API token')->plainTextToken,
    ]);
}
 /////////////////////////////////////////////////////////////////////RESNEDING INVITE
public function resendUserInvite($email)
{
    $invite = Invite::where('email', $email)->first();

    if (!$invite) {
        return response()->json([
            'message' => 'Invite not found',
        ], 404);
    }
    $token = Str::random(30);
    $invite->update([
        'token' => $token,
    ]);

    $url = 'http://localhost:5173/register/' . $email . '/' . $token . '/' . $invite->name . '/' . $invite->last_name;
    

    Mail::to($invite->email)->send(new InvitationEmail($url, $invite->email, $invite));

    return response()->json([
        'message' => 'Invitation sent',
        'data' => $invite
    ]);
}
 /////////////////////////////////////////////////////////////////////VALIDATE INVITE TOKEN
public function checkInviteToken($token)
{
    $invite = Invite::where('token', $token)->first();
if (!$invite) {
        return response()->json([
            'message' => 'Invalid or expired token',
            'status' => false
        ], 404);
    }
return response()->json([
        'message' => 'Token is valid',
        'status' => true,
        'data' => $invite
    ]);
}

}
