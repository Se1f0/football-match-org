<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    // Create a new profile
    public function store()
    {
        $user = Auth::user();
        $profile = $user->profile;

        if (!$profile) {
            $profile = new Profile();
            $profile->user_id = Auth::user()->id;
            $profile->full_name = Auth::user()->name;
            $profile->save();
        }
    }

    // Fetch the authenticated user's profile
    public function showMyProfile()
    {
        $user = Auth::user();
        $profile = $user->profile;

        return response()->json($profile);
    }

    // Edit a profile
    public function update(Request $request)
    {
        $user = Auth::user();
        $profile = $user->profile;

        $validator = Validator::make($request->all(), [
            'full_name' => 'required',
            'age' => 'nullable|numeric',
            'address' => 'nullable',
            'phone_number' => 'nullable',
        ]);

        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'errors' => $validator->messages()
            ];
            return response()->json($data, 422);
        } else {
            $user = User::find(Auth::user()->id);
            $user->name = $request->full_name;
            $user->save();
            $profile->update([
                'full_name' => $request->full_name,
                'age' => $request->age,
                'address' => $request->address,
                'phone_number' => $request->phone_number
            ]);
            $data = [
                'status' => 200,
                'message' => 'Match Updated Successfully!'
            ];
            return response()->json($data, 200);
        }
    }

    // Fetch user's profile by the given id
    public function showAnyProfile()
    {
    }
}
