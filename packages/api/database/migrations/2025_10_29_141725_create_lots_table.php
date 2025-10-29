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
        Schema::create('lots', function (Blueprint $table) {
            $table->id();

            // Chave estrangeira para o Leilão ao qual o lote pertence
            $table->foreignId('auction_id')->constrained('auctions')->onDelete('cascade');

            // Chave estrangeira para a Categoria do lote (Imóvel, Veículo, etc)
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');

            $table->string('title');
            $table->text('description')->nullable();
            $table->decimal('start_bid', 10, 2); // Valor inicial, ex: 100000.00
            $table->decimal('min_increment', 8, 2)->default(1.00); // Incremento mínimo
            $table->string('status')->default('available'); // Ex: available, sold, withdrawn

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lots');
    }
};
