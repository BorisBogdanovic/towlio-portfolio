<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Boris',
            'last_name' => 'Bogdanovic',
            'email' => 'admin@gmail.com',  
            'password' => Hash::make('B0li$ta2025!'),  
            'is_admin' => true,  
            'phone' => '+381 63 1234567',  
          'profile_image' => 'https://rkxgxhniyyxsdxniswfk.supabase.co/storage/v1/object/public/images//profile.png',
            'status_id' => 1, 
            'city_id'=> 1
        ]);
    }
}
