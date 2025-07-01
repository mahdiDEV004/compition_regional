<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AnecdoteController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public anecdote routes (for visitors)
Route::get('/anecdotes', [AnecdoteController::class, 'index']);
Route::get('/anecdotes/{anecdote}', [AnecdoteController::class, 'show']);
Route::get('/anecdotes/categories', [AnecdoteController::class, 'getCategories']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/users/{user}/role', [AuthController::class, 'updateRole']);
    
    // Anecdote routes for authenticated users
    Route::post('/anecdotes', [AnecdoteController::class, 'store']);
    Route::put('/anecdotes/{anecdote}', [AnecdoteController::class, 'update']);
    Route::delete('/anecdotes/{anecdote}', [AnecdoteController::class, 'destroy']);
    
    // Voting routes
    Route::post('/anecdotes/{anecdote}/vote', [AnecdoteController::class, 'vote']);
    Route::delete('/anecdotes/{anecdote}/vote', [AnecdoteController::class, 'removeVote']);
});