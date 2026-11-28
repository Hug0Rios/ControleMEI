<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Usuário de desenvolvimento (idempotente). A senha passa pelo cast 'hashed' do model e é salva em bcrypt.
        User::firstOrCreate(
            ['email' => 'dev@controlemei.test'],
            ['name' => 'Usuário Dev', 'password' => 'password', 'email_verified_at' => now()],
        );
    }
}
