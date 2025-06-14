import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import Dialog from './Dialog';
import Table from './Table';

interface PageProps {
    attendances: Attendance[];
}

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

interface Props {
    attendances?: Attendance[];
}

interface DeleteResponse {
    success: boolean;
    message: string;
}

export default function AttendanceTable({ attendances = [] }: Props) {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAttendances, setFilteredAttendances] = useState<Attendance[] | ''>(attendances);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredAttendances(attendances);
            return;
        }

        const filtered = attendances.filter((attendance) => {
            const searchLower = searchTerm.toLowerCase();
            return (
                attendance.name.toLowerCase().includes(searchLower) ||
                attendance.requester_name?.toLowerCase().includes(searchLower) ||
                attendance.request_date?.toLowerCase().includes(searchLower) ||
                attendance.phone.includes(searchTerm) ||
                attendance.address.toLowerCase().includes(searchLower) ||
                attendance.operator?.name.toLowerCase().includes(searchLower)
            );
        });
        setFilteredAttendances(filtered);
    }, [searchTerm]);

    const handleRowClick = (attendance: Attendance) => {
        setSelectedAttendance(attendance);
        setIsModalOpen(true);
    };

    const handleUpdate = (updatedAttendance: Attendance) => {

        if (!selectedAttendance) {
            return;
        }

        router.post(`/attendance/${selectedAttendance.id}`, {

            _method: "patch",

            name: updatedAttendance.name,
            requester_name: updatedAttendance.requester_name,
            priority_level: updatedAttendance.priority_level,
            phone: updatedAttendance.phone,
            address: updatedAttendance.address
        }, {
            onSuccess: () => {
                setIsModalOpen(false);
                setSelectedAttendance(null);

                setFilteredAttendances(prev =>
                    Array.isArray(prev) ? prev.map(a =>
                        a.id === selectedAttendance.id ? updatedAttendance : a
                    ) : prev
                );
            }
        });
    };

    const handleDelete = () => {

        if (!selectedAttendance) {
            return;
        }

        router.post(`/attendance/${selectedAttendance.id}`, {

            _method: "delete",

        }, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setIsModalOpen(false);
                setSelectedAttendance(null);

                setFilteredAttendances(prev =>
                    Array.isArray(prev) ? prev.filter(a => a.id !== selectedAttendance.id) : prev
                );
            },
            onError: (err) => {
                console.error('Erro ao excluir:', err);
                alert('Erro ao excluir o agendamento. Por favor, tente novamente.');
            },
        }
        );
    };

    if (!filteredAttendances) {
        return (
            <div className="bg-white shadow-sm rounded-lg p-4">
                <p className="text-gray-500 text-center">Carregando atendimentos...</p>
            </div>
        );
    }

    return (
        <>
            <Table
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredAttendances={filteredAttendances}
                onRowClick={handleRowClick}
            />

            <Dialog
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedAttendance={selectedAttendance}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
            />
        </>
    );
} 