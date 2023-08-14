<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matche extends Model
{
    use HasFactory;
    protected $table = 'matches';
    protected $fillable = [
        'owner_id',
        'date_time',
        'location',
        'team_size',
        'skill_level',
        'home_team_name',
        'home_team_players',
        'away_team_name',
        'away_team_players'
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
