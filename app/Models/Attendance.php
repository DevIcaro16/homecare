<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'phone',
        'address',
        'priority_level',
        'requester_name',
        'request_date',
        'operator_id'
    ];

    protected $casts = [
        'request_date' => 'date',
    ];

    public function rules()
    {
        return [
            'request_date' => 'required|date',
            'name' => 'required|string|max:255',
            'requester_name' => 'required|string|max:255',
            'priority_level' => 'required|in:01,02,03,04',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
        ];
    }

    public function feedbacks()
    {
        return
            [
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
        ;
    }

    /**
     * Get the operator that owns the attendance.
     */
    public function operator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'operator_id');
    }
}
