<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//APP SEEDERS
Route::get('cities', [\App\Http\Controllers\MasterDataController::class, 'cities']);
Route::get('statuses', [\App\Http\Controllers\MasterDataController::class, 'statuses']);
//AUTH ROUTE
Route::patch('register/{token}', [\App\Http\Controllers\AuthController::class, 'register']);
Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('forgot-password', [\App\Http\Controllers\AuthController::class, 'forgot']);
Route::post('reset-password', [\App\Http\Controllers\AuthController::class, 'reset'])->name('password.reset');
//USER ROUTE
Route::get('users', [\App\Http\Controllers\UserController::class, 'getAllUsers'])->middleware('auth:sanctum');
Route::delete('user/{user}', [\App\Http\Controllers\UserController::class, 'deleteUser'])->middleware('auth:sanctum');
Route::patch('user/settings', [\App\Http\Controllers\UserController::class, 'editUser'])->middleware('auth:sanctum');
Route::patch('user/password', [\App\Http\Controllers\UserController::class, 'updatePassword'])->middleware('auth:sanctum');
//INVITE ROUTE
Route::post('invite-user', [\App\Http\Controllers\InviteController::class, 'sendInvite'])->middleware('auth:sanctum');
Route::get('/check-invite/{token}', [\App\Http\Controllers\InviteController::class, 'checkInviteToken']);
Route::patch('invite-resend/{email}', [\App\Http\Controllers\InviteController::class, 'resendUserInvite'])->middleware('auth:sanctum');