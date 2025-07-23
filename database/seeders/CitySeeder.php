<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\City;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
   
{
    $list = ['Jagodina', 'Kragujevac', 'Beograd','Niš', 'Novi Sad'];

    foreach ($list as $a) {
        City::create([
            'name' => $a
        ]);
    }
}
}
