<?php

namespace App\Http\Controllers;

use App\Services\SendMessage;
use Illuminate\Http\Request;

class SendMessageController extends Controller
{
    protected $sendMessage;

    public function __construct(SendMessage $sendMessage)
    {
        $this->sendMessage = $sendMessage;
    }

    public function send(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'message' => 'required|string'
        ]);

        $success = $this->sendMessage->send(
            $request->phone,
            $request->message
        );

        if ($success) {
            return response()->json([
                'message' => 'Mensagem enviada com sucesso'
            ]);
        }

        return response()->json([
            'message' => 'Erro ao enviar mensagem'
        ], 500);
    }

    public function sendTemplate(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'template' => 'required|string',
            'components' => 'array'
        ]);

        $success = $this->sendMessage->sendTemplate(
            $request->phone,
            $request->template,
            $request->components ?? []
        );

        if ($success) {
            return response()->json([
                'message' => 'Template enviado com sucesso'
            ], 201);
        }

        return response()->json([
            'message' => 'Erro ao enviar template'
        ], 500);
    }
}