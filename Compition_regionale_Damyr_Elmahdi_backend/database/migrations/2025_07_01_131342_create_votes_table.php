<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('anecdote_id')->constrained()->onDelete('cascade');
            $table->enum('vote_type', ['bof', 'excellent', 'technique', 'wow']);
            $table->timestamps();
            
            // Ensure one vote per user per anecdote
            $table->unique(['user_id', 'anecdote_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('votes');
    }
};