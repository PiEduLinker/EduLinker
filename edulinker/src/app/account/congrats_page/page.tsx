'use client'

import Image from "next/image";
import CreateAccountLayout from "@/components/Layouts/CreateAccountLayout";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CongratsPage() {
    const router = useRouter();
    const params = useSearchParams();
    const siteId = params.get('siteId');
    const [currentStatus, setCurrentStatus] = useState<'BASIC_INFO' | 'PLAN_SELECTION' | 'TEMPLATE_SELECTION' | 'COMPLETED'>('COMPLETED');
    const [loading, setLoading] = useState(true);
    const [publicLink, setPublicLink] = useState('');

    useEffect(() => {
        if (!siteId) {
            setLoading(false);
            return;
        }

        async function loadSiteData() {
            try {
                const response = await fetch(`/api/site/${siteId}`, {
                    credentials: 'include',
                });
                
                if (!response.ok) throw new Error('Falha ao verificar status do site');
                
                const siteData = await response.json();
                
                if (siteData.status) {
                    setCurrentStatus(siteData.status);
                }

                // Obtém o slug do site para construir o link público
                if (siteData.slug) {
                    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
                    setPublicLink(`${baseUrl}/site/${siteData.slug}`);
                }
            } catch (error) {
                console.error('Erro ao carregar status:', error);
            } finally {
                setLoading(false);
            }
        }

        loadSiteData();
    }, [siteId]);

    const handleContinue = () => {
        router.push('/auth/admin');
    };

    const handleViewSite = () => {
        if (publicLink) {
            window.open(publicLink, '_blank');
        } else {
            alert('O site ainda não está disponível publicamente');
        }
    };

    if (loading) {
        return (
            <CreateAccountLayout status={currentStatus}>
                <div className="flex flex-col items-center justify-center gap-6 text-center w-full max-w-md">
                    <p>Carregando...</p>
                </div>
            </CreateAccountLayout>
        );
    }

    return (
        <CreateAccountLayout status={currentStatus}>
            <div className="flex flex-col items-center justify-center gap-6 text-center w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800">PARABÉNS!!!</h1>
                <p className="text-gray-600 text-lg">
                    O link do site da sua escola já está disponível!
                </p>

                <div className="w-64 aspect-[4/5] relative">
                    <Image
                        src="backgrounds/happySmartPhone.png"
                        alt="Celular comemorando"
                        fill
                        className="object-contain"
                        priority
                        sizes="(max-width: 768px) 50vw, 256px"
                    />
                </div>

                {/* Container para os botões lado a lado */}
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button 
                        onClick={handleContinue}
                        className="mt-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-full cursor-pointer transition flex-1 max-w-xs"
                    >
                        Painel Administrativo
                    </button>

                    <button 
                        onClick={handleViewSite}
                        className="mt-2 bg-[#F6339A] hover:bg-[#c41a74] text-white font-semibold py-3 px-6 rounded-full  cursor-pointer transition flex-1 max-w-xs"
                    >
                        Ver Site Publicado
                    </button>
                </div>

                {/* Mostra o link se disponível */}
                {publicLink && (
                    <p className="text-sm text-gray-600 mt-2">
                        Ou acesse: <a 
                            href={publicLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:underline"
                        >
                            {publicLink.replace(/^https?:\/\//, '')}
                        </a>
                    </p>
                )}
            </div>
        </CreateAccountLayout>
    );
}