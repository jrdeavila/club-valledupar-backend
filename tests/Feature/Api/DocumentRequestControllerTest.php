<?php

namespace Tests\Feature\Api;

use App\Models\DocumentRequest;
use App\Models\DocumentRequestType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class DocumentRequestControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function testIndexReturnsDocumentRequestsForAuthenticatedUser()
    {
        $user = User::factory()->create();
        DocumentRequestType::factory()->count(5)->create();
        DocumentRequest::factory()->count(3)->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user)->getJson(route('api.document-requests.index'));

        $response->assertOk();
        $response->assertJsonCount(3, 'data');
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'document_request_type',
                    'status',
                    'created_at',
                    'updated_at',
                ]
            ]
        ]);
    }

    public function testStoreCreatesNewDocumentRequestForAuthenticatedUser()
    {
        $user = User::factory()->create();
        Role::create(['name' => 'socio']);
        $user->assignRole('socio');
        echo "Es un usuario partner " . ($user->isPartner ? "true" : "false") . "\n";
        $documentRequestType = DocumentRequestType::factory()->create();

        $response = $this->actingAs($user)->postJson(route('api.document-requests.store'), [
            'document_request_type_id' => $documentRequestType->id,
        ]);

        $response->assertCreated();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'document_request_type',
                'created_at',
                'updated_at',
            ]
        ]);

        $this->assertDatabaseHas('document_requests', [
            'user_id' => $user->id,
            'document_request_type_id' => $documentRequestType->id,
        ]);
    }
}
