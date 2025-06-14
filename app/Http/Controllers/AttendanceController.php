<?php

namespace App\Http\Controllers;

use App\Jobs\SendMessageJob;
use App\Models\Attendance;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AttendanceController extends Controller
{

    protected $attendance;

    public function __construct(Attendance $attendance)
    {
        $this->attendance = $attendance;
    }

    public function index()
    {
        try {
            $attendances = Attendance::with('operator')->get();
            return Inertia::render('Dashboard', [
                'user' => auth()->user(),
                'attendances' => $attendances
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with("Error", $e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public static function gerarProtocolo(): string
    {
        $data = now()->format('Ymd');
        $contador = Attendance::whereDate('created_at', today())->count() + 1;
        return sprintf('ATD-%s-%05d', $data, $contador);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // dd(auth()->id());
        // dd($request->all());

        try {

            $rules = [
                'request_date' => 'required|date',
                'name' => 'required|string|max:255',
                'requester_name' => 'required|string|max:255',
                'priority_level' => 'required|in:01,02,03,04',
                'phone' => 'required|string|max:20',
                'address' => 'required|string|max:255',
            ];

            $feedbacks = [
                'request_date.required' => 'A data do atendimento é obrigatória',
                'request_date.date' => 'A data do atendimento deve ser uma data válida',
                'name.required' => 'O nome do paciente é obrigatório',
                'name.max' => 'O nome do paciente não pode ter mais de 255 caracteres',
                'requester_name.required' => 'O nome do solicitante é obrigatório',
                'requester_name.max' => 'O nome do solicitante não pode ter mais de 255 caracteres',
                'priority_level.required' => 'O nível de prioridade é obrigatório',
                'priority_level.in' => 'O nível de prioridade deve ser válido',
                'phone.required' => 'O telefone é obrigatório',
                'phone.max' => 'O telefone não pode ter mais de 11 caracteres',
                'address.required' => 'O endereço é obrigatório',
                'address.max' => 'O endereço não pode ter mais de 255 caracteres',
            ];

            $request->validate($rules, $feedbacks);

            $attendance = new Attendance();
            $attendance->name = $request->name;
            $attendance->phone = $request->phone;
            $attendance->address = $request->address;
            $attendance->priority_level = $request->priority_level;
            $attendance->requester_name = $request->requester_name;
            $attendance->request_date = $request->request_date;
            $attendance->operator_id = auth()->id();

            $attendance->protocol = $this->gerarProtocolo();

            $lastChar = substr($attendance->protocol, -1);
            $isPar = is_numeric($lastChar) && $lastChar % 2 === 0;

            $attendance->save();

            if ($isPar) {
                SendMessageJob::dispatch(
                    $attendance->phone,
                    $attendance->protocol,
                    $attendance->request_date
                );
            } else {
                Log::info("Erro ao enviar Mensagem ao Paciente!");
            }

            return redirect()->route('dashboard');

        } catch (Exception $e) {
            return redirect()->back()->with('Error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {

            $attendance = $this->attendance->find($id);

            if ($attendance === null) {
                return response()->json(['erro' => 'Impossível realizar a Atualização. O recurso solicitado não existe'], 404);
            }

            if ($request->method() === 'PATCH') {

                $regrasDinamicas = [];

                //percorrendo todas as regras definidas no Model
                foreach ($attendance->rules() as $input => $regra) {

                    //coletar apenas as regras aplicáveis aos parâmetros parciais da requisição PATCH
                    if (array_key_exists($input, $request->all())) {
                        $regrasDinamicas[$input] = $regra;
                    }
                }

                $request->validate($regrasDinamicas, $attendance->feedbacks());

            } else {
                $request->validate($attendance->rules());
            }

            $attendance->fill($request->all());
            $attendance->save();

            return redirect(route('dashboard'))
                ->with('message', 'O agendamento foi atualizado com Sucesso!');

        } catch (Exception $e) {
            return redirect()->back()->with("Error", $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $attendance = $this->attendance->find($id);

            if ($attendance === null) {
                return response()->json([
                    'message' => 'Impossível realizar a exclusão. O recurso solicitado não existe'
                ], 404);
            }

            $attendance->delete();

            return back()->with([
                'message' => 'O Agendamento foi removido com sucesso!'
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao excluir o agendamento: ' . $e->getMessage()
            ], 500);
        }
    }
}
