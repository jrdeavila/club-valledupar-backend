<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'socio']);
        Role::create(['name' => 'turista']);




        $user = User::create([
            'firstname' => 'Jose',
            'lastname' => 'De Avila',
            'phone' => '304 224 3098',
            'email' => 'jose.deavila1003@gmail.com',
            'password' => bcrypt('@JOseRIcardo1003'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        $user->assignRole('admin');


        User::factory(10)->create()->each(function (User $usuario) {
            $usuario->assignRole('socio');
        });

        User::factory(10)->create()->each(function (User $usuario) {
            $usuario->assignRole('turista');
        });
    }
}
