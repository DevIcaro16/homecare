import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Attendance {
    id: number;
    request_date: string;
    name: string;
    requester_name: string;
    priority_level: '01' | '02' | '03' | '04';
    phone: string;
    address: string;
    operator: User;
}

interface Props {
    attendances?: Attendance[];
}

const priorityColors = {
    '01': 'bg-green-100 text-green-800', // Low
    '02': 'bg-blue-100 text-blue-800',   // Medium
    '03': 'bg-yellow-100 text-yellow-800', // High
    '04': 'bg-red-100 text-red-800',     // Urgent
};

const priorityLabels = {
    '01': 'Baixa',
    '02': 'Média',
    '03': 'Alta',
    '04': 'Urgente',
};

export default function AttendanceTable({ attendances = [] }: Props) {

    const [searchTerm, setSearchTerm] = useState('');
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
    const [filteredAttendances, setFilteredAttendances] = useState<Attendance[]>(attendances);

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

    // Search effect
    useEffect(() => {
        if (!attendances) return;

        const filtered = attendances.filter((attendance) => {
            const searchLower = searchTerm.toLowerCase();
            return (
                attendance.name.toLowerCase().includes(searchLower) ||
                attendance.requester_name?.toLowerCase().includes(searchLower) ||
                attendance.phone.includes(searchTerm) ||
                attendance.address.toLowerCase().includes(searchLower) ||
                attendance.operator?.name.toLowerCase().includes(searchLower)
            );
        });
        setFilteredAttendances(filtered);
    }, [searchTerm, attendances]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    if (!attendances) {
        return (
            <div className="bg-white shadow-sm rounded-lg p-4">
                <p className="text-gray-500 text-center">Carregando atendimentos...</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-sm rounded-lg">
            {/* Search and Timer Section */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <div className="flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            className="w-120 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* <div className="ml-4 text-lg font-semibold">
                        Tempo: {formatTime(timeLeft)}
                    </div> */}
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Data
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nome
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Solicitante
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Prioridade
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Telefone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Endereço
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Operador
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAttendances.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-black-500">
                                    Nenhum atendimento encontrado
                                </td>
                            </tr>
                        ) : (
                            filteredAttendances.map((attendance) => (
                                <tr key={attendance.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(attendance.request_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {attendance.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {attendance.requester_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityColors[attendance.priority_level]}`}>
                                            {priorityLabels[attendance.priority_level]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {attendance.phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {attendance.address}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {attendance.operator?.name || 'Não atribuído'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 