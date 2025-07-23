<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Status;

class UserStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
{
    $list = ['Active', 'Pending'];

    foreach ($list as $a) {
        Status::create([
            'name' => $a
        ]);
    }
}
}
