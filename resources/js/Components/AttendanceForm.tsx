import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
    [key: string]: string;
}

const priorityOptions = [
    { value: '01', label: 'Baixa' },
    { value: '02', label: 'Média' },
    { value: '03', label: 'Alta' },
    { value: '04', label: 'Urgente' },
];

export default function AttendanceForm({ onSubmit }: Props) {

    const { register } = useForm();

    const [timeLeft, setTimeLeft] = useState(120);
    const [formData, setFormData] = useState<AttendanceFormData>({
        request_date: new Date().toISOString().split('T')[0],
        name: '',
        requester_name: '',
        priority_level: '01',
        phone: '',
        address: '',
    });

    // Timer effect
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

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="mb-6 text-center">
                <div className="text-2xl font-bold text-gray-800">
                    Tempo: {formatTime(timeLeft)}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputDate
                        labelMessage='Data do Atendimento'
                        request_date={formData.request_date}
                        handleChange={handleChange}
                    />

                    <InputSelect
                        labelMessage='Nível de Prioridade'
                        name="priority_level"
                        value={formData.priority_level}
                        handleChange={handleChange}
                        options={priorityOptions}
                    />

                    <InputText
                        labelMessage='Nome do Paciente'
                        name="name"
                        value={formData.name}
                        handleChange={handleChange}
                    />

                    <InputText
                        labelMessage='Nome do Solicitante'
                        name="requester_name"
                        value={formData.requester_name}
                        handleChange={handleChange}
                    />

                    <InputText
                        labelMessage='Telefone'
                        name="phone"
                        value={formData.phone}
                        handleChange={handleChange}
                        type="tel"
                    />

                    <InputText
                        labelMessage='Endereço'
                        name="address"
                        value={formData.address}
                        handleChange={handleChange}
                    />
                </div>

                <div className="flex justify-end">
                    <ButtonForm
                        message='Criar Atendimento'
                    />
                </div>
            </form>
        </div>
    );
} 