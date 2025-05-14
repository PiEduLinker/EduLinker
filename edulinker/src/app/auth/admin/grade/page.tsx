'use client';

import AdminLayout from '@/components/Layout';
import {
    BookOpen,
    Brain,
    FlaskConical,
    Atom,
    Ruler,
    Globe,
    Languages,
    Palette,
    Dumbbell,
    Landmark,
    History,
    Coffee,
    Pencil,
} from 'lucide-react';
import React, { use } from 'react';

const horarios = ['07:00', '08:00', '09:00', '10:00', '11:00'];
const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

const icones: Record<string, React.ReactNode> = {
    "Matemática": <Ruler size={16} className="inline mr-1" />,
    "Português": <Languages size={16} className="inline mr-1" />,
    "História": <History size={16} className="inline mr-1" />,
    "Geografia": <Globe size={16} className="inline mr-1" />,
    "Inglês": <BookOpen size={16} className="inline mr-1" />,
    "Física": <Atom size={16} className="inline mr-1" />,
    "Educação Física": <Dumbbell size={16} className="inline mr-1" />,
    "Química": <FlaskConical size={16} className="inline mr-1" />,
    "Biologia": <Brain size={16} className="inline mr-1" />,
    "Filosofia": <Landmark size={16} className="inline mr-1" />,
    "Sociologia": <Landmark size={16} className="inline mr-1" />,
    "Artes": <Palette size={16} className="inline mr-1" />,
    "Intervalo": <Coffee size={16} className="inline mr-1" />,
};


const grade: { [hora: string]: { [dia: string]: string } } = {
    '07:00': {
        Segunda: 'Matemática',
        Terça: 'Português',
        Quarta: 'História',
        Quinta: 'Geografia',
        Sexta: 'Inglês',
    },
    '08:00': {
        Segunda: 'Física',
        Terça: 'Matemática',
        Quarta: 'Educação Física',
        Quinta: 'Português',
        Sexta: 'História',
    },
    '09:00': {
        Segunda: 'Química',
        Terça: 'Artes',
        Quarta: 'Matemática',
        Quinta: 'História',
        Sexta: 'Biologia',
    },
    '10:00': {
        Segunda: 'Intervalo',
        Terça: 'Intervalo',
        Quarta: 'Intervalo',
        Quinta: 'Intervalo',
        Sexta: 'Intervalo',
    },
    '11:00': {
        Segunda: 'Biologia',
        Terça: 'Filosofia',
        Quarta: 'Química',
        Quinta: 'Sociologia',
        Sexta: 'Matemática',
    },
};

export default function AdminPanelPage() {
    return (
        <AdminLayout>
            <div className="sm:p-6">
                <h1 className="text-2xl font-bold ms-4 my-4 text-center sm:text-start">Minha escola</h1>

                <div className="flex justify-center">
                    <h2 className="text-2xl font-bold px-8 py-4 rounded-full bg-[#9FFF64]">Grade de Aulas</h2>
                </div>

                <div className="overflow-x-auto mt-10 bg-white rounded-xl shadow">
                    <table className="min-w-full table-fixed border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="w-20 border border-gray-300 p-2">Hora</th>
                                {dias.map((dia) => (
                                    <th key={dia} className="border border-gray-300 p-2">{dia}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {horarios.map((hora) => (
                                <tr key={hora} className="text-center">
                                    <td className="border border-gray-300 font-semibold p-2 bg-gray-100">{hora}</td>
                                    {dias.map((dia) => {
                                        const materia = grade[hora]?.[dia];
                                        return (
                                            <td key={dia} className="border border-gray-300 p-2 relative group">
                                                <div className="flex items-center justify-center gap-1 text-sm text-gray-700">
                                                    {materia ? (
                                                        <>
                                                            {icones[materia] || null}
                                                            {materia}
                                                        </>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </div>
                                                <button
                                                    className="absolute top-1 right-1 text-gray-400 hover:text-[#00A63E] hidden group-hover:block cursor-pointer"
                                                    onClick={() => alert(`Editar ${materia || 'vazio'} em ${dia} às ${hora}`)}
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
