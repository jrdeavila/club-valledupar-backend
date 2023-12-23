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
        $chef =  Role::create(['name' => 'chef']);
        $mesero = Role::create(['name' => 'mesero']);
        $recepsionista = Role::create(['name' => 'recepcionista']);
        $domi = Role::create(['name' => 'domiciliario']);
        $eventos = Role::create(['name' => 'eventos']);
        $atencion = Role::create(['name' => 'atencion']);
        $callcenter = Role::create(['name' => 'callcenter']);
        $barman = Role::create(['name' => 'barman']);


        // ------------------- Permissions -------------------

        // -------------- Permission to manage employees --------------

        Permission::create(['name' => 'manage employees']);

        // -------------- Permission to manage partners --------------

        Permission::create(['name' => 'manage partners']);

        // -------------- Permission to manage products --------------

        Permission::create(['name' => 'manage products']);

        // -------------- Permission to manage orders --------------

        Permission::create(['name' => 'manage orders']);

        // -------------- Permission to manage reservations --------------

        Permission::create(['name' => 'manage reservations']);

        // -------------- Permission to manage documents --------------

        Permission::create(['name' => 'manage documents']);


        // ------------------- Assign permissions -------------------


        $mesero->givePermissionTo([
            'manage orders',
        ]);


        $chef->givePermissionTo([
            'manage orders',
        ]);


        $recepsionista->givePermissionTo([
            'manage reservations',
        ]);

        $domi->givePermissionTo([
            'manage orders',
        ]);

        $atencion->givePermissionTo([
            'manage partners',
            'manage documents',
        ]);

        $eventos->givePermissionTo([
            'manage reservations',
            'manage orders',
        ]);

        $callcenter->givePermissionTo([
            'manage orders',
        ]);

        $barman->givePermissionTo([
            'manage orders',
        ]);

        // --------------------- Admin ---------------------

        $admin = Employee::create([
            'name' => 'admin',
            'email' => 'super-admin@gmail.com',
            'phone' => '123456789',
            'address' => 'Calle 123',
            'dni' => '123456789',
            'password' => bcrypt('password'),
        ]);

        $admin->assignRole('admin');
    }
}
