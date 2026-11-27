<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('cnpj', 14)->index();
            $table->string('legal_name');
            $table->string('trade_name')->nullable();
            $table->string('registration_status', 80);
            $table->text('main_cnae');
            $table->string('street');
            $table->string('number', 40);
            $table->string('district', 120);
            $table->string('city', 120);
            $table->string('state', 2);
            $table->string('opened_at', 20);
            $table->timestamps();

            $table->unique(['user_id', 'cnpj']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
