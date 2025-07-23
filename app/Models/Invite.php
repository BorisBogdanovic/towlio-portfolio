<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{
    use HasFactory;

    protected $fillable = ['email', 'token', 'name', 'last_name', 'phone'];


    public $timestamps = false;

    public function getRouteKey()
    {
        return 'token'; 
    }

    public function getRouteKeyName()
    {
        return 'token'; 
    }

}
