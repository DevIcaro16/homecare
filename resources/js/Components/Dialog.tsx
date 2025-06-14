import React, { useState, useEffect } from 'react';
import { Dialog as HeadlessDialog } from '@headlessui/react';
import { router } from '@inertiajs/react';
import InputDate from './InputDate';
import InputText from './InputText';
import InputSelect from './InputSelect';
import { useForm } from 'react-hook-form';

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

const priorityOptions = [
    { value: '01', label: 'Baixa' },
    { value: '02', label: 'Média' },
    { value: '03', label: 'Alta' },
    { value: '04', label: 'Urgente' },
];

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
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Attendance>({
        defaultValues: selectedAttendance || undefined
    });

    const [timeLeft, setTimeLeft] = useState(60);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (selectedAttendance) {
            reset(selectedAttendance);
        }
    }, [selectedAttendance, reset]);

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

    const onSubmit = (data: Attendance) => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 4000);
        onUpdate(data);
        setIsUpdateModalOpen(false);
    };

    if (!selectedAttendance) return null;

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

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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

                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Excluir
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center min-w-[100px]"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span className="ml-2">Salvando...</span>
                                        </>
                                    ) : (
                                        'Salvar'
                                    )}
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
                                    onUpdate(selectedAttendance);
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