import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import InputDate from './InputDate';
import InputText from './InputText';
import InputSelect from './InputSelect';
import ButtonForm from './ButtonForm';

interface Props {
    onSubmit: (data: AttendanceFormData) => void;
}

interface AttendanceFormData {
    request_date: string;
    name: string;
    requester_name: string;
    priority_level: '01' | '02' | '03' | '04';
    phone: string;
    address: string;
}

const priorityOptions = [
    { value: '01', label: 'Baixa' },
    { value: '02', label: 'Média' },
    { value: '03', label: 'Alta' },
    { value: '04', label: 'Urgente' },
];

export default function AttendanceForm({ onSubmit }: Props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AttendanceFormData>({
        defaultValues: {
            request_date: new Date().toISOString().split('T')[0],
            priority_level: '01',
        }
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState(120);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Error handling effect
    useEffect(() => {

        const errorsCount = Object.keys(errors).length;
        if (errorsCount > 0) {
            const timer = setTimeout(() => {
                // setShowErrors(false);
                reset();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors, reset]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const onSubmitForm: SubmitHandler<AttendanceFormData> = (data) => {
        onSubmit(data);
        setLoading(true);
    };

    return (
        <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="mb-6 text-center">
                <div className="text-2xl font-bold text-gray-800">
                    Tempo: {formatTime(timeLeft)}
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6 max-w-2xl mx-auto h-80">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <InputDate
                            labelMessage='Data do Atendimento'
                            register={register('request_date', { required: true })}
                        />
                        {errors.request_date && (
                            <p className="text-red-500 text-xs mt-1">Informe a data do atendimento</p>
                        )}
                    </div>

                    <div>
                        <InputSelect
                            labelMessage='Nível de Prioridade'
                            register={register('priority_level', { required: true })}
                            options={priorityOptions}
                        />
                        {errors.priority_level && (
                            <p className="text-red-500 text-xs mt-1">Selecione o nível de prioridade</p>
                        )}
                    </div>

                    <div>
                        <InputText
                            labelMessage='Nome do Paciente'
                            register={register('name', { required: true })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">Informe o nome do Paciente</p>
                        )}
                    </div>

                    <div>
                        <InputText
                            labelMessage='Nome do Solicitante'
                            register={register('requester_name', { required: true })}
                        />
                        {errors.requester_name && (
                            <p className="text-red-500 text-xs mt-1">Informe o nome do Solicitante</p>
                        )}
                    </div>

                    <div>
                        <InputText
                            labelMessage='Telefone'
                            register={register('phone', {
                                required: true,
                                pattern: {
                                    value: /^\d{11}$/,
                                    message: 'Telefone deve conter 11 dígitos'
                                }
                            })}
                            type="tel"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.phone.type === 'pattern'
                                    ? 'Telefone deve conter 11 dígitos'
                                    : 'Informe o telefone'}
                            </p>
                        )}
                    </div>

                    <div>
                        <InputText
                            labelMessage='Endereço'
                            register={register('address', { required: true })}
                        />
                        {errors.address && (
                            <p className="text-red-500 text-xs mt-1">Informe o endereço</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end">

                    {
                        loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <ButtonForm
                                    message="Carregando...."
                                />
                            </>
                        ) : (
                            <ButtonForm
                                message="Criar Agendamento"
                            />
                        )
                    }
                </div>
            </form>
        </div>
    );
} 