'use client';

import AdminLayout from '@/components/Layout';
import { Pencil } from 'lucide-react';

const professores = [
    {
        nome: 'Prof. Euba Tiuma',
        descricao: 'Doutora em Matemática Aplicada com mais de 15 anos de experiência no ensino superior. Apaixonada por educação e tecnologia.',
        imagem: '/images/teachers/teacher1.jpg',
    },
    {
        nome: 'Prof. João da Silva',
        descricao: 'Mestre em Física com foco em ensino inovador. Atua no ensino médio há 10 anos.',
        imagem: '/images/teachers/teacher2.jpg',
    },
    {
        nome: 'Prof. Ana Paula',
        descricao: 'Especialista em Língua Portuguesa e redação, com 20 anos de sala de aula.',
        imagem: '/images/teachers/teacher3.jpg',
    },
];

export default function AdminTeachersPage() {
    return (
        <AdminLayout>
            <div className="sm:p-6">
                <h1 className="text-2xl font-bold ms-4 my-4 text-center sm:text-start">Minha escola</h1>

                <div className="flex justify-center">
                    <h2 className="text-2xl font-bold px-8 py-4 rounded-full bg-[#9FFF64]">Professores</h2>
                </div>

                <div className="mt-10 rounded-2xl p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
                        {professores.map((prof, index) => (
                            <div
                                key={index}
                                className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-sm w-full group"
                            >
                                {/* Botão de edição */}
                                <button
                                    className="absolute top-2 right-2 text-gray-400 hover:text-[#00A63E] hidden group-hover:block z-10 cursor-pointer"
                                    onClick={() => alert(`Editar ${prof.nome}`)}
                                >
                                    <Pencil size={18} />
                                </button>

                                <img
                                    className="w-full h-56 object-cover"
                                    src={prof.imagem}
                                    alt={`Foto do ${prof.nome}`}
                                />
                                <div className="p-5">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{prof.nome}</h2>
                                    <p className="text-gray-600 text-sm">{prof.descricao}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
