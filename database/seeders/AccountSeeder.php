<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'socio', 'guard_name' => 'web']);
        Role::create(['name' => 'chef']);
        Role::create(['name' => 'mesero']);
        Role::create(['name' => 'recepcionista']);





        $employee = Employee::create([
            'name' => 'Super Admin',
            'email' => 'super@admin.com',
            'phone' => '1234567890',
            'dni' => '1234567890',
            'address' => 'Cra A # 20B - 42, Valledupar',
            'password' => bcrypt('password'),
        ]);


        $employee->assignRole('admin');
    }
}
