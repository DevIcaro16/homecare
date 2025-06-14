import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import AttendanceForm from '@/Components/AttendanceForm';

interface User {
    id: number;
    name: string;
    email: string;
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

interface Props {
    user: User;
}

export default function CreateAttendance({ user }: Props) {

    const handleSubmit = (data: AttendanceFormData) => {
        router.post(route('attendances.store'), data);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className='flex flex-row justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Criação de Atendimento
                    </h2>
                </div>
            }
            user={user}
        >
            <Head title="Criação de Atendimento" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <AttendanceForm onSubmit={handleSubmit} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
