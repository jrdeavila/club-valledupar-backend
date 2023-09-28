<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Jose De Avila',
            'email' => 'jose.deavila1003@gmail.com',
            'password' => bcrypt('@JOseRIcardo1003'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);
    }
}
