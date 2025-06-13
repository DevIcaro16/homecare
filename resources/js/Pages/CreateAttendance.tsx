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
                    {/* <Link
                        href={route('dashboard')}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Painel
                    </Link> */}
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
