<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\SendMessage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;

class SendMessageTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        // Simula configurações de API do Whats
        Config::set('services.whatsapp.token', 'fake-token');
        Config::set('services.whatsapp.phone_number_id', '123456789');
    }

    public function test_send_successfully_logs_message_and_returns_true()
    {
        Http::fake([
            'https://graph.facebook.com/v17.0/123456789/messages' => Http::response([], 200),
        ]);

        Log::shouldReceive('info')->once();

        $service = new SendMessage();

        $result = $service->send('85988273211', 'Testando!');

        $this->assertTrue($result);
    }

    public function test_send_catches_exception_and_returns_false()
    {
        //Req Inexistente
        Http::fake([
            '*' => fn() => throw new \Exception('Erro de conexão')
        ]);

        //Gera um log de errro
        Log::shouldReceive('error')->once();

        //Instãncia do service para a tentavia de envio
        $service = new SendMessage();
        $result = $service->send('85988273211', 'testando!');

        //Verifica se o result retornou erro/false.
        $this->assertFalse($result);
    }

}
