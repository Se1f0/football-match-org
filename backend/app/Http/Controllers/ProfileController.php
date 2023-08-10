<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
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
