import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import AttendanceTable from '@/Components/AttendanceTable';
import { useState, useEffect } from 'react';

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
    user: User;
    attendances: Attendance[];
}

export default function Dashboard({ user, attendances }: Props) {

    console.log(user);
    console.log(attendances);

    return (
        <AuthenticatedLayout
            header={
                <div className='flex flex-row justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Painel de Controle
                    </h2>
                    <Link
                        href={route('createAttendance')}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Novo Atendimento
                    </Link>
                </div>}
            user={user}
        >
            <Head title="Painel de Controle" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <AttendanceTable attendances={attendances} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
