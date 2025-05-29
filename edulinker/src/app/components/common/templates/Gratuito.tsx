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
import DepoimentoCardPremium from '../premium/DepoimentoCardPremium'
import Link from 'next/link'
import { Clock, Mail, Phone, MessageCircle, MapPin, FacebookIcon, Instagram, Youtube } from 'lucide-react'

// Imagens padrão
const DEFAULT_LOGO = '/logo/EduLinker.png'
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
  const displayed = isPremium ? allProfessores : allProfessores.slice(0, 4)

  // Depoimentos (até 2)
  const all = Array.isArray(config.depoimentos) ? config.depoimentos : []
  const displayedDepoimentos = isPremium ? all : all.slice(0, 2)

  // se for premium, mostra todas; senão, só 3 primeiras
  const allGalerias = Array.isArray(config.galerias) ? config.galerias : []
  const displayedGalerias = isPremium
    ? allGalerias
    : allGalerias.slice(0, 3)

  // Informações de contato
  const {
    descricaoBreve,
    horarioSemana,
    horarioSabado,
    email,
    telefone,
    whatsapp,
    endereco,
    cidade,
    socialMedia = {},
  } = config.contato || {}

  return (
    <div
      style={{ background: bg, color: fg }}
      className={`min-h-screen flex flex-col ${fontClass}`}
    >
      {/* Header */}
      <header className="py-4 px-6 bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="#home">
            <img
              src={config.logo || DEFAULT_LOGO}
              alt="Logo"
              className="h-12"
            />
          </Link>
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
            href={`https://wa.me/${whatsapp ? whatsapp.replace(/\D/g, '') : ''}`}
            target="_blank"
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
              {displayedGalerias.map((item, idx) => {
                const imagemValida = item.imagem && item.imagem.trim() !== ''
                  ? item.imagem
                  : '/images/fallback.jpg'; // fallback no /public/images/

                return (
                  <div
                    key={idx}
                    className="relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition"
                  >
                    <img
                      src={imagemValida}
                      alt={`Foto ${idx + 1}`}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                      }}
                    />
                  </div>
                );
              })}
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
                  whatsapp={whatsapp}
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
        <section id="depoimentos" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Depoimentos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayedDepoimentos.map((d, i) =>
                isPremium ? (
                  <DepoimentoCardPremium
                    key={i}
                    foto={d.foto}
                    nome={d.nome}
                    texto={d.texto}
                    estrelas={d.estrelas}
                  />
                ) : (
                  <DepoimentoCard
                    key={i}
                    foto={d.foto}
                    nome={d.nome}
                    texto={d.texto}
                  />
                )
              )}
            </div>
            {!isPremium && all.length > 4 && (
              <p className="mt-6 text-center text-sm text-gray-500">
                Você tem {all.length} depoimentos, mas no plano gratuito só são exibidos 4.{' '}
                <a href="/upgrade" className="text-pink-600 underline">
                  Faça upgrade para ver todos
                </a>.
              </p>
            )}
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Contato</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Horários */}
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-pink-600" />
                <div>
                  <p className="font-semibold">Horário de Funcionamento</p>
                  <p className="text-gray-600">{horarioSemana || 'Seg–Sex: 09h–21h'}</p>
                  <p className="text-gray-600">{horarioSabado || 'Sáb: 09h–14h'}</p>
                </div>
              </div>

              {/* E-mail */}
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold">E-mail</p>
                  <p className="text-gray-600">{email || 'contato@seudominio.com'}</p>
                </div>
              </div>

              {/* Telefone */}
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold">Telefone</p>
                  <p className="text-gray-600">{telefone || '(11) 99999-0000'}</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-gray-600">{whatsapp || '(11) 98888-1111'}</p>
                </div>
              </div>

              {/* Endereço */}
              <div className="flex items-start gap-4 sm:col-span-2 lg:col-span-3">
                <MapPin className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-semibold">Endereço</p>
                  <p className="text-gray-600">{endereco || 'Rua Exemplo, 123'}</p>
                  <p className="text-gray-600">{cidade || 'São Paulo - SP'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

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

          {/* Redes Sociais */}
          <div className="flex justify-center md:justify-start space-x-4 mb-4">
            {config.contato?.socialMedia?.facebook && (
              <a
                href={config.contato.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <FacebookIcon className="w-6 h-6" />
              </a>
            )}
            {config.contato?.socialMedia?.instagram && (
              <a
                href={config.contato.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Instagram className="w-6 h-6" />
              </a>
            )}
            {config.contato?.socialMedia?.youtube && (
              <a
                href={config.contato.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Youtube className="w-6 h-6" />
              </a>
            )}
          </div>

          <p className="mb-2 text-center md:text-left">
            © {new Date().getFullYear()} {siteTitle}. Todos os direitos reservados.
          </p>
          <p className="text-sm text-center md:text-left">
            Versão Gratuita – Edulinker
          </p>
        </div>
      </footer>
    </div>
  )
}
