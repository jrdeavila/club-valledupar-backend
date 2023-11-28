<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateEmployeeRequest;
use App\Models\Employee;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class ManagePersonalController extends Controller
{
    public function index()
    {
        $personal = Employee::role([
            'chef',
            'mesero',
            'recepcionista',
        ])->with('roles')->paginate(10);
        $roles = Role::whereNotIn('guard_name', [
            'web',
        ])->whereNotIn('name', [
            'admin',
        ])->get();
        return Inertia::render('Personal/Index', [
            'personal' => $personal,
            'roles' => $roles,
        ]);
    }

    public function toggleActivateEmployee(Employee $employee)
    {
        $employee->active = !$employee->active;
        $employee->save();

        return redirect()->back();
    }

    public function store(CreateEmployeeRequest $request)
    {
        $employee = Employee::make([
            ...$request->validated(),
        ]);
        $employee->password = Hash::make($request->dni);
        $employee->creator_id = auth()->id();
        $employee->save();
        $employee->assignRole($request->role);


        return redirect()->back();
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return redirect()->back();
    }
}
