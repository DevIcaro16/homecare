interface User {
    id: number;
    name: string;
    email: string;
}

interface Attendance {
    id: string;
    request_date: string;
    name: string;
    requester_name: string;
    priority_level: '01' | '02' | '03' | '04';
    phone: string;
    address: string;
    operator: User;
}

interface TableProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    filteredAttendances: Attendance[];
    onRowClick: (attendance: Attendance) => void;
}

const Table = ({ searchTerm, setSearchTerm, filteredAttendances, onRowClick }: TableProps) => {
    return (
        <div className="bg-white shadow-sm rounded-lg">
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
                </div>
            </div>

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
                                <tr
                                    key={attendance.id}
                                    className="hover:bg-gray-50 cursor-pointer"
                                    onClick={() => onRowClick(attendance)}
                                >
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
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${attendance.priority_level === '01' ? 'bg-green-100 text-green-800' :
                                            attendance.priority_level === '02' ? 'bg-yellow-100 text-yellow-800' :
                                                attendance.priority_level === '03' ? 'bg-orange-100 text-orange-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {attendance.priority_level === '01' ? 'Baixa' :
                                                attendance.priority_level === '02' ? 'Média' :
                                                    attendance.priority_level === '03' ? 'Alta' :
                                                        'Urgente'}
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

export default Table;