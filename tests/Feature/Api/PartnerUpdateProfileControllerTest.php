<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class PartnerUpdateProfileControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_updates_the_partner_profile()
    {
        $role = Role::create(['name' => 'socio']);
        $user = User::factory()->create();
        $user->assignRole($role);

        $response = $this->actingAs($user, 'api')->json('PUT', route('api.profile.update'), [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Perfil actualizado correctamente',
        ]);
    }

    /** @test */
    public function it_fails_if_the_user_is_not_authenticated()
    {
        $response = $this->json('PUT', route('api.profile.update'), [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
        ]);

        $response->assertStatus(403);
    }


    /** @test */
    public function it_fails_if_the_user_is_not_a_partner()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'api')->json('PUT', route('api.profile.update'), [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
        ]);

        $response->assertStatus(403);
    }

    /** @test */
    public function it_requires_a_name()
    {
        $role = Role::create(['name' => 'socio']);
        $user = User::factory()->create();
        $user->assignRole($role);

        $response = $this->actingAs($user, 'api')->json('PUT', route('api.profile.update'), [
            'name' => '',
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
        ]);

        $response->assertJsonValidationErrors(['name']);
    }

    /** @test */
    public function it_requires_a_email()
    {
        $role = Role::create(['name' => 'socio']);
        $user = User::factory()->create();
        $user->assignRole($role);

        $response = $this->actingAs($user, 'api')->json('PUT', route('api.profile.update'), [
            'name' => $this->faker->name,
            'email' => '',
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
        ]);

        $response->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function it_requires_a_valid_email()
    {
        $role = Role::create(['name' => 'socio']);
        $user = User::factory()->create();
        $user->assignRole($role);

        $response = $this->actingAs($user, 'api')->json('PUT', route('api.profile.update'), [
            'name' => $this->faker->name,
            'email' => 'invalid email',
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
        ]);

        $response->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function it_requires_a_unique_email()
    {
        $role = Role::create(['name' => 'socio']);
        $user = User::factory()->create();
        $user->assignRole($role);
        $user2 = User::factory()->create();

        $response = $this->actingAs($user, 'api')->json('PUT', route('api.profile.update'), [
            'name' => $this->faker->name,
            'email' => $user2->email,
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
        ]);

        $response->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function it_requires_a_phone()
    {
        $role = Role::create(['name' => 'socio']);
        $user = User::factory()->create();
        $user->assignRole($role);

        $response = $this->actingAs($user, 'api')->json('PUT', route('api.profile.update'), [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'phone' => '',
            'address' => $this->faker->address,
        ]);

        $response->assertJsonValidationErrors(['phone']);
    }

    /** @test */
    public function it_requires_a_address()
    {
        $role = Role::create(['name' => 'socio']);
        $user = User::factory()->create();
        $user->assignRole($role);

        $response = $this->actingAs($user, 'api')->json('PUT', route('api.profile.update'), [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'address' => '',
        ]);

        $response->assertJsonValidationErrors(['address']);
    }

    /** @test */
    public function it_requires_a_string_name()
    {
        $role = Role::create(['name' => 'socio']);
        $user = User::factory()->create();
        $user->assignRole($role);

        $response = $this->actingAs($user, 'api')->json('PUT', route('api.profile.update'), [
            'name' => 1234,
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
        ]);

        $response->assertJsonValidationErrors(['name']);
    }

    /** @test */
    public function it_requires_a_string_phone()
    {
        $role = Role::create(['name' => 'socio']);
        $user = User::factory()->create();
        $user->assignRole($role);

        $response = $this->actingAs($user, 'api')->json('PUT', route('api.profile.update'), [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'phone' => 1234,
            'address' => $this->faker->address,
        ]);

        $response->assertJsonValidationErrors(['phone']);
    }

    /** @test */
    public function it_requires_a_string_address()
    {
        $role = Role::create(['name' => 'socio']);
        $user = User::factory()->create();
        $user->assignRole($role);

        $response = $this->actingAs($user, 'api')->json('PUT', route('api.profile.update'), [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'address' => 1234,
        ]);

        $response->assertJsonValidationErrors(['address']);
    }
}
