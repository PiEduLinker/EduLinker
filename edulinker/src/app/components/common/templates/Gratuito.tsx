'use client'

import React from 'react'
import Image from 'next/image'
import { SiteConfig } from '@/types/site'
import AulaCard from '@/app/components/common/gratuito/AulaCard'
import ProfessorCard from '@/app/components/common/gratuito/ProfessorCard'
import DepoimentoCard from '@/app/components/common/gratuito/DepoimentoCard'
import { useSite } from '@/contexts/siteContext'
import CarouselPremium from '../premium/CarouselPremium'
import ProfessorCardPremium from '../premium/ProfessorCardPremium'

// Imagens padrão
const DEFAULT_LOGO = '/Logo/EduLinker.png'
const DEFAULT_HERO_IMAGE = '/templates/free/banner1.jpg'
const DEFAULT_PROFESSOR_IMAGE = '/teachers/teacher1.jpg'
const DEFAULT_DEPOIMENTO_IMAGE = '/teachers/teacher2.jpg'

export default function GratuitoTemplate({ config }: { config: SiteConfig }) {
  const { plano } = useSite()
  const isPremium = plano === 'premium'

  // cores e fonte
  const fg = config.corTexto || '#000000'
  const bg = config.corFundo || '#ffffff'
  const fontClass = {
    montserrat: 'font-montserrat',
    geist: 'font-geist',
    'geist-mono': 'font-geist-mono',
    roboto: 'font-roboto',
    poppins: 'font-poppins',
  }[config.fonte || 'montserrat']

  // Título do site (no header e no rodapé)
  const siteTitle = config.titulo || 'Sua Escola'

  // pega o banner salvo (primeiro item) ou fallback
  const banners = Array.isArray(config.carrossel) && config.carrossel.length > 0
    ? config.carrossel
    : [{ imagem: DEFAULT_HERO_IMAGE }]

  // Sessão "Sobre" (string simples)
  const sobreTexto = config.descricao || 'Conte aqui a história da sua escola.'
  const fotoSobre = config.fotoSobre || '/teachers/teacher1.jpg'

  const destaques = isPremium
    ? (config.destaques?.length
      ? config.destaques
      : [
        { number: '10+', label: 'Anos de experiência' },
        { number: '5.000+', label: 'Alunos formados' },
        { number: '98%', label: 'Satisfação' },
      ])
    : []

  // Aulas (até 4 cards)
  const allAulas = Array.isArray(config.aulas) ? config.aulas : []
  const displayedAulas = isPremium
    ? allAulas
    : allAulas.slice(0, 4)

  // pega todos os professores configurados
  const allProfessores = Array.isArray(config.professores) ? config.professores : []
  const displayed = isPremium ? allProfessores : allProfessores.slice(0,4)

  // Depoimentos (até 2)
  const depoimentosItems = (
    config.depoimentos?.map(d => ({
      ...d,
      foto: d.foto || DEFAULT_DEPOIMENTO_IMAGE,
    })) ?? Array(2).fill({
      foto: DEFAULT_DEPOIMENTO_IMAGE,
      nome: 'Cliente Satisfeito',
      texto: 'Ótima experiência!',
    })
  ).slice(0, 2)

  // se for premium, mostra todas; senão, só 3 primeiras
  const allGalerias = Array.isArray(config.galerias) ? config.galerias : []
  const displayedGalerias = isPremium
    ? allGalerias
    : allGalerias.slice(0, 3)

  // Informações de contato
  const contato = config.contato || {}
  const whatsapp = contato.whatsapp
  const email = contato.email
  const telefone = contato.telefone
  const endereco = contato.endereco
  const cidade = contato.cidade

  return (
    <div
      style={{ background: bg, color: fg }}
      className={`min-h-screen flex flex-col ${fontClass}`}
    >
      {/* Header */}
      <header className="py-4 px-6 bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <img
            src={config.logo || DEFAULT_LOGO}
            alt="Logo"
            className="h-12"
          />
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Sobre', 'Aulas', 'Professores', 'Contato'].map(label => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-gray-800 hover:text-pink-600 font-medium"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#contato"
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full font-medium transition"
          >
            Contato
          </a>
        </div>
      </header>

      {/* Hero / Banner */}
      <section className="relative w-full h-[400px] overflow-hidden">
        {isPremium ? (
          <CarouselPremium
            items={banners}
            autoPlay
            interval={6000}
            className="h-full"
          />
        ) : (
          <Image
            src={banners[0].imagem}
            alt="Banner principal"
            fill
            className="object-cover"
            priority
          />
        )}
      </section>

      <main className="flex-grow space-y-16 container mx-auto px-4 py-8">
        {/* Sobre Nós */}
        <section id="sobre" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Sobre Nós</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
              {/* Texto */}
              <div>
                <p className="h-full text-lg leading-relaxed break-words">
                  {sobreTexto}
                </p>
              </div>

              {/* Imagem */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={config.fotoSobre || '/templates/free/woman.jpg'}
                  alt="Sobre Nós"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Destaques (premium apenas) */}
            {isPremium && (
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {destaques.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-lg shadow-md border-l-4 border-black-500"
                  >
                    <p className="text-2xl font-bold text-gray-900">{item.number}</p>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Galeria */}
        <section id="galeria" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Galeria de Fotos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {displayedGalerias.map((item, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={item.imagem}
                    alt={`Foto ${idx + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>

            {/* dica de upgrade se tiver mais de 3 imagens e for free */}
            {!isPremium && allGalerias.length > 3 && (
              <p className="mt-6 text-center text-sm text-gray-500">
                Você tem {allGalerias.length} fotos, mas conta gratuita exibe só 3.{' '}
                <a href="/upgrade" className="text-pink-600 underline">
                  Faça upgrade para ver todas
                </a>.
              </p>
            )}
          </div>
        </section>

        {/* Aulas */}
        <section id="aulas" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Nossas Aulas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayedAulas.map((item, idx) => (
                <AulaCard
                  key={idx}
                  foto={item.foto}
                  titulo={item.titulo}
                  descricao={item.descricao}
                  nivel={item.nivel}
                  duracao={item.duracao}
                />
              ))}
            </div>
            {!isPremium && allAulas.length > 4 && (
              <p className="mt-6 text-center text-sm text-gray-500">
                Você tem {allAulas.length} aulas, mas no plano gratuito só são exibidas 4.{' '}
                <a href="/upgrade" className="text-pink-600 underline">
                  Faça upgrade para ver todas
                </a>.
              </p>
            )}
          </div>
        </section>

        {/* Professores */}
          <section id="professores" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Nossa Equipe</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayed.map((prof, idx) =>
            isPremium ? (
              <ProfessorCardPremium
                key={idx}
                foto={prof.imagem}
                nome={prof.nome}
                texto={prof.descricao}
              />
            ) : (
              <ProfessorCard
                key={idx}
                foto={prof.imagem}
                nome={prof.nome}
                descricao={prof.descricao}
              />
            )
          )}
        </div>

        {!isPremium && allProfessores.length > 4 && (
          <p className="mt-6 text-center text-sm text-gray-500">
            Você cadastrou {allProfessores.length} professores, mas no plano gratuito
            só mostramos 4.{' '}
            <a href="/upgrade" className="text-pink-600 underline">
              Faça upgrade para ver todos
            </a>.
          </p>
        )}
      </div>
    </section>

        {/* Depoimentos */}
        <section id="depoimentos">
          <h2 className="text-4xl font-bold text-center mb-8">Depoimentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {depoimentosItems.map((d, i) => (
              <DepoimentoCard
                key={i}
                foto={d.foto}
                nome={d.nome}
                texto={d.texto}
              />
            ))}
          </div>
        </section>

        {/* Contato */}
        <section id="contato">
          <h2 className="text-4xl font-bold text-center mb-8">Contato</h2>
          <div className="max-w-2xl mx-auto space-y-4 text-center">
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                className="block text-lg text-pink-600 hover:underline"
              >
                WhatsApp: {whatsapp}
              </a>
            )}
            {email && <p>Email: {email}</p>}
            {telefone && <p>Telefone: {telefone}</p>}
            {(endereco || cidade) && (
              <p>
                {endereco} {cidade && `— ${cidade}`}
              </p>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <img
              src={config.logo || DEFAULT_LOGO}
              alt="Logo"
              className="h-10 mb-6 md:mb-0"
            />
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">
                Termos
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                FAQ
              </a>
            </div>
          </div>
          <p className="mb-2">© {new Date().getFullYear()} {siteTitle}. Todos os direitos reservados.</p>
          <p className="text-sm">Versão Gratuita – Edulinker</p>
        </div>
      </footer>
    </div>
  )
}
