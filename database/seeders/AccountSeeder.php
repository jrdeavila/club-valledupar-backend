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

        // -------------- Assign permissions to mesero --------------

        $mesero->givePermissionTo([
            'manage orders',
        ]);

        // -------------- Assign permissions to chef --------------

        $chef->givePermissionTo([
            'manage orders',
        ]);

        // -------------- Assign permissions to recepcionista --------------

        $recepsionista->givePermissionTo([
            'manage orders',
            'manage reservations',
            'manage documents',
            'manage partners',
        ]);


        // ------------------- Create employees -------------------


        $admin = Employee::create([
            'name' => 'Super Admin',
            'email' => 'super@admin.com',
            'phone' => '1234567890',
            'dni' => '1234567890',
            'address' => 'Cra A # 20B - 42, Valledupar',
            'password' => bcrypt('password'),
        ]);


        $admin->assignRole('admin');

        $mesero = Employee::create([
            'name' => 'Mesero',
            'email' => 'mesero@gmail.com',
            'phone' => '1234567890',
            'dni' => '1234567890',
            'address' => 'Cra A # 20B - 42, Valledupar',
            'password' => bcrypt('password'),
        ]);

        $mesero->assignRole('mesero');

        $chef = Employee::create([
            'name' => 'Chef',
            'email' => 'chef@gmail.com',
            'phone' => '1234567890',
            'dni' => '1234567890',
            'address' => 'Cra A # 20B - 42, Valledupar',
            'password' => bcrypt('password'),
        ]);

        $chef->assignRole('chef');

        $recepcionista = Employee::create([
            'name' => 'Recepcionista',
            'email' => 'recepsionista@gmail.com',
            'phone' => '1234567890',
            'dni' => '1234567890',
            'address' => 'Cra A # 20B - 42, Valledupar',
            'password' => bcrypt('password'),
        ]);

        $recepcionista->assignRole('recepcionista');
    }
}
