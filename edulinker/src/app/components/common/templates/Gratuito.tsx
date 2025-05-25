'use client'

import React from 'react'
import Image from 'next/image'
import { SiteConfig } from '@/types/site'
import AulaCard from '@/app/components/common/gratuito/AulaCard'
import ProfessorCard from '@/app/components/common/gratuito/ProfessorCard'
import DepoimentoCard from '@/app/components/common/gratuito/DepoimentoCard'
import { useSite } from '@/contexts/siteContext'
import CarouselPremium from '../premium/CarouselPremium'

// Imagens padrão
const DEFAULT_LOGO = '/Logo/EduLinker.png'
const DEFAULT_HERO_IMAGE = '/templates/free/banner1.jpg'
const DEFAULT_GALLERY_IMAGE = '/Logo/EduLinker.png'
const DEFAULT_AULA_IMAGE = '/teachers/teacher3.jpg'
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
      console.log('CARROSSEL NO TEMPLATE:', banners, 'isPremium=', isPremium)


  // Sessão "Sobre" (string simples)
  const sobreTexto = config.descricao || 'Conte aqui a história da sua escola.'
  const fotoSobre = config.fotoSobre || '/teachers/teacher1.jpg'

  // Aulas (até 4 cards)
  const aulasItems = (
    config.aulas?.map(a => ({
      ...a,
      foto: a.foto || DEFAULT_AULA_IMAGE,
    })) ?? Array(4).fill({
      foto: DEFAULT_AULA_IMAGE,
      titulo: 'Aula Padrão',
      descricao: 'Descrição da aula',
      nivel: 'Iniciante',
    })
  ).slice(0, 4)

  // Professores (até 4)
  const professoresItems = (
    config.professores?.map(p => ({
      ...p,
      imagem: p.imagem || DEFAULT_PROFESSOR_IMAGE,
    })) ?? Array(4).fill({
      nome: 'Professor Experiente',
      descricao: 'Especialista na área',
      imagem: DEFAULT_PROFESSOR_IMAGE,
    })
  ).slice(0, 4)

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

  // Galeria (até 3)
  const galleryItems = (
    config.galerias?.map(g => g) ?? Array(3).fill({ imagem: DEFAULT_GALLERY_IMAGE })
  ).slice(0, 3)

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
      <section className="relative h-[400px] w-full">
        {isPremium ? (
          <CarouselPremium
            items={banners}
            autoPlay
            interval={6000}
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

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <p className="grid md:grid-cols-2 gap-12 items-center">
                {sobreTexto}
              </p>

              <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={fotoSobre}
                  alt="Sobre Nós"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Galeria */}
        <section id="galeria">
          <h2 className="text-4xl font-bold text-center mb-8">Galeria</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {galleryItems.map((item, idx) => (
              <div key={idx} className="relative aspect-square overflow-hidden rounded-lg shadow">
                <Image
                  src={item.imagem}
                  alt={`Galeria ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Aulas */}
        <section id="aulas" className="py-20 bg-white">
          <h2 className="text-4xl font-bold text-center mb-16">Nossas Aulas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {aulasItems.map((a, i) => (
              <AulaCard
                key={i}
                foto={a.foto}
                titulo={a.titulo}
                descricao={a.descricao}
                nivel={a.nivel}
              />
            ))}
          </div>
        </section>

        {/* Professores */}
        <section id="professores" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">
              Nossos Professores
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {professoresItems.map((p, i) => (
                <ProfessorCard
                  key={i}
                  foto={p.imagem}
                  nome={p.nome}
                  descricao={p.descricao}
                />
              ))}
            </div>
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
