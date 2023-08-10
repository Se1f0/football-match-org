<?php

use App\Http\Controllers\Api\MatcheController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// get all matches
Route::get('/matches', [MatcheController::class, 'index']);

// get upcoming matches
Route::get('/matches/upcoming', [MatcheController::class, 'upcomingMatches']);

// create new match
Route::post('/matches/add', [MatcheController::class, 'store']);

//show match details
Route::get('/matches/{id}', [MatcheController::class, 'show']);

//update match details
Route::put('/matches/{id}/edit', [MatcheController::class, 'update']);

//delete match
Route::delete('/matches/{id}/delete', [MatcheController::class, 'destroy']);
