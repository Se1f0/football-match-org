<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    // Fetch user's profile by the given id
    public function showAnyProfile()
    {
    }
}
