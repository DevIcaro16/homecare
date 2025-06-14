import React, { useState, useEffect } from 'react';
import { Dialog as HeadlessDialog } from '@headlessui/react';
import { router } from '@inertiajs/react';

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

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    selectedAttendance: Attendance | null;
    onUpdate: (attendance: Attendance) => void;
    onDelete: () => void;
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (value: boolean) => void;
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (value: boolean) => void;
}

const Dialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    selectedAttendance,
    onUpdate,
    onDelete,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isUpdateModalOpen,
    setIsUpdateModalOpen
}) => {

    const [localAttendance, setLocalAttendance] = useState<Attendance | null>(selectedAttendance);
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        setLocalAttendance(selectedAttendance);
    }, [selectedAttendance]);

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

        if (localAttendance) {
            onUpdate(localAttendance);
        }
    };

    if (!localAttendance) return null;

    return (
        <>
            <HeadlessDialog
                open={isOpen}
                onClose={onClose}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <HeadlessDialog.Panel className="mx-auto max-w-2xl rounded bg-white p-6 w-96">

                        <div className="flex flex-row justify-between">
                            <HeadlessDialog.Title className="text-lg font-medium mb-4">
                                Editar Atendimento
                            </HeadlessDialog.Title>

                            <HeadlessDialog.Title className="text-lg font-medium mb-4">
                                {formatTime(timeLeft)}
                            </HeadlessDialog.Title>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={localAttendance.name}
                                    onChange={(e) => setLocalAttendance({ ...localAttendance, name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Nome do paciente"
                                />
                            </div>

                            <div>
                                <label htmlFor="requester" className="block text-sm font-medium text-gray-700">Solicitante</label>
                                <input
                                    id="requester"
                                    type="text"
                                    value={localAttendance.requester_name}
                                    onChange={(e) => setLocalAttendance({ ...localAttendance, requester_name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Nome do solicitante"
                                />
                            </div>

                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Prioridade</label>
                                <select
                                    id="priority"
                                    value={localAttendance.priority_level}
                                    onChange={(e) => setLocalAttendance({ ...localAttendance, priority_level: e.target.value as '01' | '02' | '03' | '04' })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    aria-label="Nível de prioridade"
                                >
                                    <option value="01">Baixa</option>
                                    <option value="02">Média</option>
                                    <option value="03">Alta</option>
                                    <option value="04">Urgente</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
                                <input
                                    id="phone"
                                    type="text"
                                    value={localAttendance.phone}
                                    onChange={(e) => setLocalAttendance({ ...localAttendance, phone: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="(00) 00000-0000"
                                />
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço</label>
                                <input
                                    id="address"
                                    type="text"
                                    value={localAttendance.address}
                                    onChange={(e) => setLocalAttendance({ ...localAttendance, address: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Endereço completo"
                                />
                            </div>

                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Excluir
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsUpdateModalOpen(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </HeadlessDialog.Panel>
                </div>
            </HeadlessDialog>

            {/* Modal de Confirmação de Exclusão */}
            <HeadlessDialog
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <HeadlessDialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
                        <HeadlessDialog.Title className="text-lg font-medium mb-4">
                            Confirmar Exclusão
                        </HeadlessDialog.Title>
                        <p className="mb-4">
                            Tem certeza que deseja excluir este atendimento? Esta ação não pode ser desfeita.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    onDelete();
                                    setIsDeleteModalOpen(false);
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Confirmar Exclusão
                            </button>
                        </div>
                    </HeadlessDialog.Panel>
                </div>
            </HeadlessDialog>


            <HeadlessDialog
                open={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <HeadlessDialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
                        <HeadlessDialog.Title className="text-lg font-medium mb-4">
                            Atualização
                        </HeadlessDialog.Title>
                        <p className="mb-4">
                            Tem certeza que deseja atualizar este atendimento?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsUpdateModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    onUpdate(localAttendance);
                                    setIsUpdateModalOpen(false);
                                }}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Confirmar Atualização
                            </button>
                        </div>
                    </HeadlessDialog.Panel>
                </div>
            </HeadlessDialog>
        </>
    );
};

export default Dialog;