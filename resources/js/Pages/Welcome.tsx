import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useState } from 'react';

export default function Welcome({
    auth,
}: PageProps) {

    const [data, setData] = useState<number>(new Date().getFullYear());

    return (
        <>
            <Head title="Home Care - Cuidados em Casa" />
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
                <div className="relative flex min-h-screen flex-col items-center justify-center">
                    <div className="relative w-full max-w-4xl px-6">
                        <header className="flex flex-col items-center justify-center py-10">
                            <div className="mb-8">
                                <ApplicationLogo className="h-24 w-24 fill-current text-indigo-600" />
                            </div>
                            <h1 className="text-center text-4xl font-bold text-gray-900">
                                Home Care
                            </h1>

                            <p className="mt-4 text-center text-lg text-gray-600">
                                Cuidados profissionais no conforto do seu lar
                            </p>

                            <div className="mt-12 flex justify-center">
                                {auth?.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Acessar Painel
                                    </Link>
                                ) : (
                                    <div className="flex gap-4">
                                        <Link
                                            href={route('login')}
                                            className="rounded-md bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Entrar
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md bg-white px-6 py-3 text-center text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-indigo-50"
                                        >
                                            Cadastrar
                                        </Link>
                                    </div>
                                )}
                            </div>

                        </header>

                        <main className="mt-6">
                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="rounded-lg bg-white p-8 shadow-lg">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900">
                                        Cuidadores Qualificados
                                    </h2>
                                    <p className="text-gray-600">
                                        Nossa equipe é composta por profissionais altamente qualificados e experientes em cuidados domiciliares.
                                    </p>
                                </div>

                                <div className="rounded-lg bg-white p-8 shadow-lg">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900">
                                        Agendamento Flexível
                                    </h2>
                                    <p className="text-gray-600">
                                        Agende os cuidados de acordo com sua necessidade, com horários flexíveis e personalizados.
                                    </p>
                                </div>

                                <div className="rounded-lg bg-white p-8 shadow-lg">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900">
                                        Cuidados Personalizados
                                    </h2>
                                    <p className="text-gray-600">
                                        Oferecemos um plano de cuidados personalizado, adaptado às necessidades específicas de cada paciente.
                                    </p>
                                </div>

                                <div className="rounded-lg bg-white p-8 shadow-lg">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900">
                                        Segurança e Confiança
                                    </h2>
                                    <p className="text-gray-600">
                                        Garantimos a segurança e o bem-estar do paciente com monitoramento constante e acompanhamento profissional.
                                    </p>
                                </div>
                            </div>

                        </main>

                        <footer className="mt-16 text-center text-sm text-gray-500">
                            © {data} Home Care. Todos os direitos reservados.
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
