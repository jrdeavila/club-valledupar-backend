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




        $user = User::create([
            'name' => 'Jose Ricardo De Avila',
            'phone' => '5898575',
            'number_phone' => '300 000 0000',
            'address' => 'Calle 1 # 1 - 1',
            'gender' => 'M',
            'state' => 'A',
            'state_partner' => 'A',
            'action' => '0000',
            'email' => 'jose.deavila1003@gmail.com',
            'password' => bcrypt('@JOseRIcardo1003'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        $user->assignRole('admin');
    }
}
