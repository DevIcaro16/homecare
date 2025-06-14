<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Jobs\SendMessageJob;
use App\Models\Attendance;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Queue;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SendMessageControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_cria_registro_e_dispara_job_quando_protocolo_eh_par()
    {

        //Não realiza o processo de fila/JOB
        Queue::fake();
        Log::spy();

        //Cria um novo usuário autenticado
        $user = User::factory()->create();

        $data = [
            'name' => 'icaro',
            'phone' => '85988293210',
            'address' => 'Rua da Rua, 1198',
            'priority_level' => '01',
            'requester_name' => 'icaro',
            'request_date' => now()->toDateTimeString(),
        ];

        //Req
        $response = $this
            ->actingAs($user)
            ->post(route('attendances.store'), $data);

        //Confere o redirecionamento
        $response->assertRedirect(route('dashboard'));

        //Confere se o registro existe no BD
        $this->assertDatabaseHas('attendances', [
            'name' => 'icaro',
            'phone' => '85988293210',
        ]);

        //Retorna o ultimo registro criado logo antes
        $attendance = Attendance::latest()->first();

        //Resgata ultimo Registro
        $lastChar = substr($attendance->protocol, -1);
        $isPar = is_numeric($lastChar) && $lastChar % 2 === 0;

        if ($isPar) { //Se o ultimo digito do protocolo é par
            Queue::assertPushed(SendMessageJob::class, function ($job) use ($attendance) {
                return $job->phone === $attendance->phone &&
                    $job->protocol === $attendance->protocol &&
                    $job->requestDate == $attendance->request_date;
            });
        } else {
            Log::shouldHaveReceived('info')->with('Erro ao enviar Mensagem ao Paciente!');
        }
    }
}
