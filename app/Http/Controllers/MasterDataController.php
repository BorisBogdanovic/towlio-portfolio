<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\City;
use App\Models\Status;

class MasterDataController extends Controller
{
/////////////////////////////////////////////////////////////////////GET STATUSES
   public function statuses(){
    $countries = Status::all();
        return response()->json([
            'status' => true,
            'message' => 'all statuses',
            'data' => $countries
        ]);
}
/////////////////////////////////////////////////////////////////////GET CITIES
public function cities(){
    $countries = City::all();

        return response()->json([
            'status' => true,
            'message' => 'all cities',
            'data' => $countries
        ]);
}
}
