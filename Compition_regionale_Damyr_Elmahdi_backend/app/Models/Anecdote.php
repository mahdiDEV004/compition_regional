<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anecdote extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'category',
        'content'
    ];

    protected $with = ['user', 'votes'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function getVoteCountsAttribute()
    {
        return [
            'bof' => $this->votes->where('vote_type', 'bof')->count(),
            'excellent' => $this->votes->where('vote_type', 'excellent')->count(),
            'technique' => $this->votes->where('vote_type', 'technique')->count(),
            'wow' => $this->votes->where('vote_type', 'wow')->count(),
        ];
    }

    public function getUserVoteAttribute()
    {
        if (auth()->check()) {
            $vote = $this->votes->where('user_id', auth()->id())->first();
            return $vote ? $vote->vote_type : null;
        }
        return null;
    }
}