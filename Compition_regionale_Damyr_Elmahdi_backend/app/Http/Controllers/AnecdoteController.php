<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Anecdote;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnecdoteController extends Controller
{
    public function index(Request $request)
    {
        $query = Anecdote::with(['user', 'votes'])
            ->orderBy('created_at', 'desc');

        // Filter by category if provided
        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        // Search by title or content
        if ($request->has('search') && $request->search) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        $anecdotes = $query->paginate(10);

        // Add vote counts and user vote for each anecdote
        $anecdotes->getCollection()->transform(function ($anecdote) {
            $anecdote->vote_counts = $anecdote->vote_counts;
            $anecdote->user_vote = $anecdote->user_vote;
            return $anecdote;
        });

        return response()->json($anecdotes);
    }

    public function store(Request $request)
    {
        // Check if user can add anecdotes
        if (!Auth::user()->canAddAnecdotes()) {
            return response()->json([
                'message' => 'Vous n\'avez pas l\'autorisation d\'ajouter des anecdotes'
            ], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|in:Histoire,Humeur,Vie quotidienne,Echec,Succes',
            'content' => 'required|string|min:10'
        ]);

        $anecdote = Auth::user()->anecdotes()->create($validated);
        $anecdote->load(['user', 'votes']);

        return response()->json([
            'message' => 'Anecdote créée avec succès',
            'anecdote' => $anecdote
        ], 201);
    }

    public function show(Anecdote $anecdote)
    {
        $anecdote->load(['user', 'votes']);
        $anecdote->vote_counts = $anecdote->vote_counts;
        $anecdote->user_vote = $anecdote->user_vote;

        return response()->json($anecdote);
    }

    public function update(Request $request, Anecdote $anecdote)
    {
        // Only admin can update anecdotes
        if (!Auth::user()->canModerateAnecdotes()) {
            return response()->json([
                'message' => 'Vous n\'avez pas l\'autorisation de modifier cette anecdote'
            ], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|in:Histoire,Humeur,Vie quotidienne,Echec,Succes',
            'content' => 'sometimes|required|string|min:10'
        ]);

        $anecdote->update($validated);
        $anecdote->load(['user', 'votes']);

        return response()->json([
            'message' => 'Anecdote mise à jour avec succès',
            'anecdote' => $anecdote
        ]);
    }

    public function destroy(Anecdote $anecdote)
    {
        // Only admin can delete anecdotes
        if (!Auth::user()->canModerateAnecdotes()) {
            return response()->json([
                'message' => 'Vous n\'avez pas l\'autorisation de supprimer cette anecdote'
            ], 403);
        }

        $anecdote->delete();

        return response()->json([
            'message' => 'Anecdote supprimée avec succès'
        ]);
    }

    public function vote(Request $request, Anecdote $anecdote)
    {
        // Check if user can vote
        if (!Auth::user()->canVote()) {
            return response()->json([
                'message' => 'Vous n\'avez pas l\'autorisation de voter'
            ], 403);
        }

        $validated = $request->validate([
            'vote_type' => 'required|in:bof,excellent,technique,wow'
        ]);

        // Check if user already voted for this anecdote
        $existingVote = Vote::where('user_id', Auth::id())
                           ->where('anecdote_id', $anecdote->id)
                           ->first();

        if ($existingVote) {
            // Update existing vote
            $existingVote->update(['vote_type' => $validated['vote_type']]);
            $message = 'Vote mis à jour avec succès';
        } else {
            // Create new vote
            Vote::create([
                'user_id' => Auth::id(),
                'anecdote_id' => $anecdote->id,
                'vote_type' => $validated['vote_type']
            ]);
            $message = 'Vote enregistré avec succès';
        }

        // Return updated anecdote with vote counts
        $anecdote->load(['user', 'votes']);
        $anecdote->vote_counts = $anecdote->vote_counts;
        $anecdote->user_vote = $anecdote->user_vote;

        return response()->json([
            'message' => $message,
            'anecdote' => $anecdote
        ]);
    }

    public function removeVote(Anecdote $anecdote)
    {
        // Check if user can vote
        if (!Auth::user()->canVote()) {
            return response()->json([
                'message' => 'Vous n\'avez pas l\'autorisation de voter'
            ], 403);
        }

        $vote = Vote::where('user_id', Auth::id())
                   ->where('anecdote_id', $anecdote->id)
                   ->first();

        if ($vote) {
            $vote->delete();
            $message = 'Vote supprimé avec succès';
        } else {
            $message = 'Aucun vote trouvé';
        }

        // Return updated anecdote with vote counts
        $anecdote->load(['user', 'votes']);
        $anecdote->vote_counts = $anecdote->vote_counts;
        $anecdote->user_vote = $anecdote->user_vote;

        return response()->json([
            'message' => $message,
            'anecdote' => $anecdote
        ]);
    }

    public function getCategories()
    {
        return response()->json([
            'categories' => ['Histoire', 'Humeur', 'Vie quotidienne', 'Echec', 'Succes']
        ]);
    }
}