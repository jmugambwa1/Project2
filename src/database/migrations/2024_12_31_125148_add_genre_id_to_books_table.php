<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->foreignId('genre_id')
                  ->nullable()
                  ->constrained('genres')
                  ->nullOnDelete(); // Makes it nullable and removes reference on genre deletion
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->dropForeign(['genre_id']);
            $table->dropColumn('genre_id');
        });
    }

};
