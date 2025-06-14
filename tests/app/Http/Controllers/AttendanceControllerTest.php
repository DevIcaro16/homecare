<?php

namespace Tests\App\Http\Controllers;

use App\Http\Controllers\AttendanceController;
use App\Jobs\SendMessageJob;
use App\Models\Attendance;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

class AttendanceControllerTest extends TestCase
{
    use RefreshDatabase; //Banco de dados do Ambiente Test

    public function test_gerar_protocolo()
    {
        //Instâncias do Model e Controller
        $attendance = new Attendance();
        $controller = new AttendanceController($attendance);

        $protocol = $controller->gerarProtocolo();
        $this->assertIsString($protocol, 'Deve retornar uma string de protocolo');
        $this->assertStringStartsWith('ATD-', $protocol, 'O protocolo deve começar com ATD-');
    }

    public function test_index()
    {
        //Desabilita o tratamento padrão de exceções do Laravel
        $this->withoutExceptionHandling();

        //Cria um usuário para autencicação
        $user = User::factory()->create();

        //Cria 2 registros na tabela de agendamentos
        $attendances = Attendance::factory()
            ->count(2)
            ->hasOperator()
            ->create();

        // Act -> requisição autenticada para testar
        $response = $this->actingAs($user)->get(route('attendances.index'));

        // Verifica se retornou status 200 e o componente da página correta com os registros de Attendances
        $response->assertStatus(200)
            ->assertInertia(
                fn(Assert $page) =>
                $page->component('Dashboard')
                    ->has('user')
                    ->has('attendances', 2) // verifica se trouxe 2 registros (2 criados pela de Factory)
            );

    }


    public function test_store()
    {
        $this->withoutExceptionHandling();

        Queue::fake();
        Log::spy();

        $user = User::factory()->create();

        $data = [
            'name' => 'icaro',
            'phone' => '85988293210',
            'address' => 'Rua da Rua, 1198',
            'priority_level' => '01',
            'requester_name' => 'icaro',
            'request_date' => now()->toDateTimeString(),
            'operator_id' => $user->id,
        ];

        $response = $this->actingAs($user)->post(route('attendances.store'), $data);

        $response->assertRedirect(route('dashboard'));

        // Verifica se o attendance foi criado corretamente
        $this->assertDatabaseHas('attendances', [
            'name' => 'icaro',
            'phone' => '85988293210',
            'operator_id' => $user->id,
        ]);

        // Verifica se o job ou log foi chamado dependendo da paridade do protocolo
        $attendance = Attendance::latest()->first();
        $protocol = $attendance->protocol;
        $lastChar = substr($protocol, -1);
        $isPar = is_numeric($lastChar) && $lastChar % 2 === 0;

        if ($isPar) {
            Queue::assertPushed(SendMessageJob::class, function ($job) use ($attendance) {
                return $job->phone === $attendance->phone &&
                    $job->protocol === $attendance->protocol;
            });
        } else {
            Log::shouldHaveReceived('info')->with('Erro ao enviar Mensagem ao Paciente!');
        }
    }

    public function test_update()
    {
        $this->withoutExceptionHandling();

        $user = User::factory()->create();

        $data = [
            'name' => 'icaro',
            'phone' => '85988293210',
            'address' => 'Rua da Rua, 1198',
            'priority_level' => '04',
            'requester_name' => 'icaro',
            'request_date' => now()->toDateTimeString(),
        ];

        //Req para criação do registro
        $storeResponse = $this->actingAs($user)->post(route('attendances.store'), $data);

        //Verifica o redirecionamento
        $storeResponse->assertRedirect(route('dashboard'));

        $attendance = Attendance::latest()->first(); //Resgata o ultimo registro criado
        $this->assertNotNull($attendance); //Verifica se não é nulo

        $this->assertDatabaseHas('attendances', [
            'id' => $attendance->id,
            'name' => 'icaro',
            'phone' => '85988293210',
        ]);

        // Dados de atualização
        $newData = [
            'name' => 'devicaro19',
            'phone' => '85981417455',
            'address' => 'Rua da Rua, 1199',
            'priority_level' => '02',
            'requester_name' => 'pai do icaro',
            'request_date' => now()->toDateTimeString(),
        ];

        // Atualiza o registro
        $updateResponse = $this->actingAs($user)->patch(
            route('attendances.update', $attendance->id),
            $newData
        );

        $updateResponse->assertRedirect(route('dashboard'));

        // Verifica se a atualização foi bem sucedida
        $this->assertDatabaseHas('attendances', [
            'id' => $attendance->id,
            'name' => 'devicaro19',
            'phone' => '85981417455',
        ]);
    }


    public function test_destroy()
    {
        $this->withoutExceptionHandling();

        $user = User::factory()->create();

        $data = [
            'name' => 'icaro',
            'phone' => '85988293210',
            'address' => 'Rua da Rua, 1198',
            'priority_level' => '04',
            'requester_name' => 'icaro',
            'request_date' => now()->toDateTimeString(),
        ];

        //Req para criação do registro
        $storeResponse = $this->actingAs($user)->post(route('attendances.store'), $data);

        //Verifica o redirecionamento
        $storeResponse->assertRedirect(route('dashboard'));

        $attendance = Attendance::latest()->first(); //Resgata o ultimo registro criado
        $this->assertNotNull($attendance); //Verifica se não é nulo

        // Deleta o registro
        $deleteResponse = $this->actingAs($user)->delete(
            route('attendance.destroy', $attendance->id)
        );


        //Confere o redirecionamento
        $deleteResponse->assertStatus(302); // return back() sempre retorna 302
        $deleteResponse->assertSessionHas('message', 'O Agendamento foi removido com sucesso!');

        // Verifica seo registro já não consta no BD
        $this->assertDatabaseMissing('attendances', [
            'id' => $attendance->id,
            'name' => 'icaro',
            'phone' => '85988293210',
        ]);


    }

}

?>