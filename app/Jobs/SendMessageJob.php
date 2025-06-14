<?php

namespace App\Jobs;

use App\Services\SendMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class SendMessageJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $phone;
    protected $protocol;
    protected $requestDate;

    /**
     * Create a new job instance.
     */
    public function __construct(string $phone, string $protocol, string $requestDate)
    {
        $this->phone = $phone;
        $this->protocol = $protocol;
        $this->requestDate = $requestDate;
    }

    /**
     * Execute the job.
     */
    public function handle(SendMessage $sendMessage): void
    {
        $lastChar = substr($this->protocol, -1);
        $isSuccess = is_numeric($lastChar) && $lastChar % 2 === 0;
        $formattedDate = Carbon::parse($this->requestDate)->format('d/m/Y H:i:s');

        if ($isSuccess) {
            $messageText = "Atendimento Realizado com Sucesso na HomeCare." . PHP_EOL;
            $messageText .= "Número do Protocolo: {$this->protocol}" . PHP_EOL;
            $messageText .= "Data de realização do Atendimento: {$formattedDate}";

            $sendMessage->send($this->phone, $messageText);

            echo "Mensagem enviada com sucesso para {$this->phone}" . PHP_EOL;
            Log::info('Mensagem enviada com sucesso', [
                'protocol' => $this->protocol,
                'phone' => $this->phone
            ]);
        } else {
            echo "Erro no envio da mensagem para {$this->phone}" . PHP_EOL;
            Log::error('Erro no envio da mensagem', [
                'protocol' => $this->protocol,
                'phone' => $this->phone,
                'reason' => 'Último dígito do protocolo é ímpar'
            ]);
        }
    }
}
