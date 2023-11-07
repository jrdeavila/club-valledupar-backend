<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class PartnerChangePasswordControllerTest extends TestCase
{
    use DatabaseTransactions, WithFaker;

    /** @test */
    public function it_changes_the_password_of_the_authenticated_user()
    {
        Role::create(['name' => 'socio']);
        $user = User::factory()->create([
            'password' => Hash::make('old_password'),
        ]);
        $user->assignRole('socio');


        $newPassword = $this->faker->password(8);

        $response = $this->actingAs($user)->postJson(route('api.password.forgot'), [
            'old_password' => 'old_password',
            'new_password' => $newPassword,
            'new_password_confirmation' => $newPassword,
        ]);

        $response->assertOk();

        $this->assertTrue(Hash::check($newPassword, $user->fresh()->password));
    }

    /** @test */
    public function it_requires_the_current_password_to_change_the_password()
    {
        Role::create(['name' => 'socio']);
        $user = User::factory()->create([
            'password' => Hash::make('old_password'),
        ]);
        $user->assignRole('socio');


        $newPassword = $this->faker->password(8);

        $response = $this->actingAs($user)->postJson(route('api.password.forgot'), [
            'old_password' => 'wrong_password',
            'new_password' => $newPassword,
            'new_password_confirmation' => $newPassword,
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('old_password');
    }

    /** @test */
    public function it_requires_the_new_password_to_be_confirmed()
    {
        Role::create(['name' => 'socio']);
        $user = User::factory()->create([
            'password' => Hash::make('old_password'),
        ]);
        $user->assignRole('socio');

        $newPassword = $this->faker->password(8);

        $response = $this->actingAs($user)->postJson(route('api.password.forgot'), [
            'old_password' => 'old_password',
            'new_password' => $newPassword,
            'new_password_confirmation' => 'wrong_confirmation',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('new_password');
    }
}
