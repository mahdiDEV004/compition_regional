<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function anecdotes()
    {
        return $this->hasMany(Anecdote::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function isAdmin()
    {
        return $this->role === 'Admin';
    }

    public function isConnectedUser()
    {
        return $this->role === 'utilisateur connecté';
    }

    public function isVisitor()
    {
        return $this->role === 'visiteur';
    }

    public function canAddAnecdotes()
    {
        return in_array($this->role, ['utilisateur connecté', 'Admin']);
    }

    public function canVote()
    {
        return in_array($this->role, ['utilisateur connecté', 'Admin']);
    }

    public function canModerateAnecdotes()
    {
        return $this->role === 'Admin';
    }
}