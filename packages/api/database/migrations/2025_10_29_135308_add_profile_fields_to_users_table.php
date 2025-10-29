<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('user_type')->default('PF');


            $table->string('cpf')->nullable()->unique();
            $table->string('rg')->nullable();
            $table->text('address')->nullable();
            $table->string('phone')->nullable();

            $table->string('cnpj')->nullable()->unique();
            $table->string('company_name')->nullable();
            $table->string('website')->nullable();
            $table->string('junta_comercial')->nullable();
            $table->string('registration_number')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'user_type',
                'cpf',
                'rg',
                'address',
                'phone',
                'cnpj',
                'company_name',
                'website',
                'junta_comercial',
                'registration_number'
            ]);
        });
    }
};
