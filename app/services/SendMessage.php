<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SendMessage
{
    protected $token;
    protected $phoneNumberId;
    protected $baseUrl;

    public function __construct()
    {
        $this->token = config('services.whatsapp.token');
        $this->phoneNumberId = config('services.whatsapp.phone_number_id');
        $this->baseUrl = "https://graph.facebook.com/v17.0/{$this->phoneNumberId}/messages";
    }

    public function send(string $to, string $message)
    {
        try {
            $response = Http::withToken($this->token)
                ->post($this->baseUrl, [
                    'messaging_product' => 'whatsapp',
                    'to' => $to,
                    'type' => 'text',
                    'text' => [
                        'body' => $message
                    ]
                ]);

            if ($response->successful()) {
                Log::info('Mensagem enviada com sucesso', [
                    'to' => $to,
                    'message' => $message
                ]);
                return true;
            }

            Log::error('Erro ao enviar mensagem', [
                'to' => $to,
                'message' => $message,
                'error' => $response->json()
            ]);
            return false;

        } catch (\Exception $e) {
            Log::error('Exceção ao enviar mensagem', [
                'to' => $to,
                'message' => $message,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    public function sendTemplate(string $to, string $templateName, array $components = [])
    {
        try {
            $response = Http::withToken($this->token)
                ->post($this->baseUrl, [
                    'messaging_product' => 'whatsapp',
                    'to' => $to,
                    'type' => 'template',
                    'template' => [
                        'name' => $templateName,
                        'language' => [
                            'code' => 'pt_BR'
                        ],
                        'components' => $components
                    ]
                ]);

            if ($response->successful()) {
                Log::info('Template enviado com sucesso', [
                    'to' => $to,
                    'template' => $templateName
                ]);
                return true;
            }

            Log::error('Erro ao enviar template', [
                'to' => $to,
                'template' => $templateName,
                'error' => $response->json()
            ]);
            return false;

        } catch (\Exception $e) {
            Log::error('Exceção ao enviar template', [
                'to' => $to,
                'template' => $templateName,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }
}
