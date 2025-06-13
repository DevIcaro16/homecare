import { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';

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
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
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
            {/* Timer Section */}
            <div className="mb-6 text-center">
                <div className="text-2xl font-bold text-gray-800">
                    Tempo: {formatTime(timeLeft)}
                </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="request_date" className="block text-sm font-medium text-gray-700">
                            Data do Atendimento
                        </label>
                        <input
                            type="date"
                            id="request_date"
                            name="request_date"
                            value={formData.request_date}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="priority_level" className="block text-sm font-medium text-gray-700">
                            Nível de Prioridade
                        </label>
                        <select
                            id="priority_level"
                            name="priority_level"
                            value={formData.priority_level}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            {priorityOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nome do Paciente
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="requester_name" className="block text-sm font-medium text-gray-700">
                            Nome do Solicitante
                        </label>
                        <input
                            type="text"
                            id="requester_name"
                            name="requester_name"
                            value={formData.requester_name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Telefone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />

                    </div>

                    <div className="">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Endereço
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Criar Atendimento
                    </button>
                </div>
            </form>
        </div>
    );
} 