<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Invite;

use App\Http\Requests\EditUserRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\GetUsersRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
class UserController extends Controller
{

/////////////////////////////////////////////////////////////////////GET USERS
public function getAllUsers(GetUsersRequest $request) 
{
$users = User::where('is_admin', 0)  
        ->with('city','status')
        ->orderBy('name', 'ASC');


    if ($request->has('status')) {
        $users->where('status_id', $request->status);
    }

    if ($request->has('city')) {
        $users->where('city_id', $request->city); 
    }

    if ($request->has('search')) {
        $users->where(function($query) use ($request) {
            $query->where('name', 'LIKE', '%' . $request->search . '%')
                  ->orWhere('last_name', 'LIKE', '%' . $request->search . '%');
        });
}
 return response()->json($users->paginate(12));
}

public function deleteUser(User $user)
{
Invite::where('email', $user->email)->delete();
$user->delete();
return response()->json([
        'status' => true,
        'message' => 'User successfully deleted'
    ]);
}

/////////////////////////////////////////////////////////////////////EDIT USER (NAME,LAST NAME,IMAGE,PHONE)
public function editUser(EditUserRequest $request)
{
    $user = auth()->user();

    if ($request->hasFile('profile_image')) {
       if ($user->profile_image && !str_contains($user->profile_image, 'supabase.co')) {
            $previousPath = str_replace('/storage/', '', parse_url($user->profile_image, PHP_URL_PATH));
            
            Storage::disk('public')->delete($previousPath);
        }
        $path = $request->file('profile_image')->store('profile_images', 'public');
       $url = asset(Storage::url($path));
        $user->profile_image = $url;
        $saved = $user->save();
       } 

      $user->fill($request->only(['name', 'last_name', 'phone','city_id']));
    

    $user->save();
        return response()->json([
        'message' => 'Profile updated successfully',
        'user' => $user,
    ]);
}


/////////////////////////////////////////////////////////////////////EDIT USER PASSWORD
public function updatePassword(UpdatePasswordRequest $request)
{
    $user = auth()->user();

    
    $user->password = Hash::make($request->password);
    $user->save();

    return response()->json([
    'status' => true,
    'message' => 'Password updated successfully..'
], 200);
}

}
