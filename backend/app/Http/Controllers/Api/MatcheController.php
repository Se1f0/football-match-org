<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Matche;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class MatcheController extends Controller
{
    public function index()
    {
        $matches = Matche::orderBy('created_at', 'DESC')->get();
        if ($matches->count() > 0) {
            $data = [
                'status' => 200,
                'matches' => $matches
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No records found'
            ];
            return response()->json($data, 404);
        }
    }

    public function upcomingMatches()
    {
        $today = Carbon::now();
        $matches = Matche::where('date_time', '>', $today)->orderBy('date_time')->limit(3)->get();
        if ($matches->count() > 0) {
            $data = [
                'status' => 200,
                'matches' => $matches
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Upcoming Matches',
            ];
            return response()->json($data, 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date_time' => 'required',
            'location' => 'required',
            'team_size' => 'required|numeric',
            'skill_level' => 'required',
            'home_team_name' => 'required|min:5',
            'home_team_players' => 'required',
            'away_team_name' => 'required|min:5',
            'away_team_players' => 'required'
        ]);

        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'errors' => $validator->messages()
            ];
            return response()->json($data, 422);
        } else {
            $matche = Matche::create([
                'date_time' => $request->date_time,
                'location' => $request->location,
                'team_size' => $request->team_size,
                'skill_level' => $request->skill_level,
                'home_team_name' => $request->home_team_name,
                'home_team_players' => $request->home_team_players,
                'away_team_name' => $request->away_team_name,
                'away_team_players' => $request->away_team_players
            ]);

            if ($matche) {
                $data = [
                    'status' => 200,
                    'message' => 'Match Created Successfully!'
                ];
                return response()->json($data, 200);
            } else {
                $data = [
                    'status' => 500,
                    'message' => 'Something Went Wrong!'
                ];
                return response()->json($data, 500);
            }
        }
    }

    public function show($id)
    {
        $matche = Matche::find($id);
        if ($matche) {
            $data = [
                'status' => 200,
                'matche' => $matche
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Such Match Found!'
            ];
            return response()->json($data, 404);
        }
    }

    public function edit($id)
    {
        $matche = Matche::find($id);
        if ($matche) {
            $data = [
                'status' => 200,
                'matche' => $matche
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Such Match Found!'
            ];
            return response()->json($data, 404);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'date_time' => 'required',
            'location' => 'required',
            'team_size' => 'required|numeric',
            'skill_level' => 'required',
            'home_team_name' => 'required|min:5',
            'home_team_players' => 'required',
            'away_team_name' => 'required|min:5',
            'away_team_players' => 'required'
        ]);

        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'errors' => $validator->messages()
            ];
            return response()->json($data, 422);
        } else {
            $matche = Matche::find($id);
            if ($matche) {
                $matche->update([
                    'date_time' => $request->date_time,
                    'location' => $request->location,
                    'team_size' => $request->team_size,
                    'skill_level' => $request->skill_level,
                    'home_team_name' => $request->home_team_name,
                    'home_team_players' => $request->home_team_players,
                    'away_team_name' => $request->away_team_name,
                    'away_team_players' => $request->away_team_players
                ]);
                $data = [
                    'status' => 200,
                    'message' => 'Match Updated Successfully!'
                ];
                return response()->json($data, 200);
            } else {
                $data = [
                    'status' => 404,
                    'message' => 'No Such Match Found!'
                ];
                return response()->json($data, 404);
            }
        }
    }

    public function destroy($id)
    {
        $matche = Matche::find($id);
        if ($matche) {
            $matche->delete();
            $data = [
                'status' => 200,
                'message' => 'Match Deleted Successfully!'
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Such Match Found!'
            ];
            return response()->json($data, 404);
        }
    }
}
