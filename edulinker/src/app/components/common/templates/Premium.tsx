'use client';

import React from 'react'
import CarouselPremium from '@/app/components/common/premium/CarouselPremium'
import DepoimentoCardPremium from '@/app/components/common/premium/DepoimentoCardPremium'
import ProfessorCardPremium from '@/app/components/common/premium/ProfessorCardPremium'
import AulaCardPremium from '@/app/components/common/premium/AulaCardPremium'
import GalleryPremium from '@/app/components/common/premium/GalleryPremium'
import { SiteConfig } from '@/types/site'
import { useState } from "react";
import { Clock, FacebookIcon, Instagram, Mail, Phone, Youtube } from 'lucide-react';

// Imagens padrão (você pode importar de seus assets ou usar URLs externas)
const DEFAULT_LOGO = '/default-logo.png'
const DEFAULT_CAROUSEL_IMAGE = '/templates/free/banner1.jpg'
const DEFAULT_PROFESSOR_IMAGE = '/default-professor.jpg'

export default function Premium({ config }: { config: SiteConfig }) {

  const fg = config.corTexto;
  const bg = config.corFundo;
  const [menuOpen, setMenuOpen] = useState(false);

  const slides = config.carrossel && config.carrossel.length > 0
    ? config.carrossel
    : [
      { imagem: DEFAULT_CAROUSEL_IMAGE },
      { imagem: DEFAULT_CAROUSEL_IMAGE }
    ]


  // Mapeia os professores (sem especialidade)
  const professoresItems = config.professores?.length
    ? config.professores.map(prof => ({
      nome: prof.nome,
      texto: prof.descricao,
      foto: prof.imagem || DEFAULT_PROFESSOR_IMAGE,
    }))
    : Array(4).fill({
      nome: 'Professor Experiente',
      texto: 'Especialista com anos de experiência em transformar vidas.',
      foto: DEFAULT_PROFESSOR_IMAGE,
    })

  //fontes
  const fontClass = {
    montserrat: 'font-montserrat',
    geist: 'font-geist',
    'geist-mono': 'font-geist-mono',
    roboto: 'font-roboto',
    poppins: 'font-poppins',
  }[config.fonte || 'montserrat']

  const contato = config.contato || {}
  const {
    descricaoBreve,
    horarioSemana,
    horarioSabado,
    email,
    telefone,
    whatsapp,
    endereco,
    cidade,
    mapEmbedUrl,
    socialMedia = {}
  } = contato

  return (
    <div
      style={{
        background: bg,
        color: fg,
      }}
      className={`min-h-screen flex flex-col ${fontClass}`}
    >
      {/* Cabeçalho */}
      <header id='home' className={`bg-gradient-to-r from-gray-900 to-black text-white shadow-lg`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between relative z-10">
          {/* LOGO */}
          <div className="flex items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-gray-800 rounded-lg px-5 py-3 cursor-pointer">
                <a href="#home">
                  <img
                    src={config.logo || DEFAULT_LOGO}
                    alt="Logo da Escola"
                    className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* DESKTOP MENU - agora só aparece abaixo de 1024px */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* LINKS INDIVIDUAIS PARA DESKTOP */}
            <a
              href="#home" // Link para a seção HOME
              className={`px-4 py-2 rounded-md font-medium hover:bg-gray-800 hover:text-pink-400 transition-all duration-300 flex items-center`}
            >
              HOME
            </a>
            <a
              href="#sobre-nos" // Link para a seção SOBRE NÓS
              className="px-4 py-2 rounded-md font-medium hover:bg-gray-800 hover:text-pink-400 transition-all duration-300 flex items-center"
            >
              SOBRE NÓS
            </a>
            <a
              href="#aulas" // Link para a seção AULAS
              className="px-4 py-2 rounded-md font-medium hover:bg-gray-800 hover:text-pink-400 transition-all duration-300 flex items-center"
            >
              AULAS
            </a>
            <a
              href="#professores" // Link para a seção PROFESSORES
              className="px-4 py-2 rounded-md font-medium hover:bg-gray-800 hover:text-pink-400 transition-all duration-300 flex items-center"
            >
              PROFESSORES
            </a>
            <a
              href="#depoimentos" // Link para a seção DEPOIMENTOS
              className="px-4 py-2 rounded-md font-medium hover:bg-gray-800 hover:text-pink-400 transition-all duration-300 flex items-center"
            >
              DEPOIMENTOS
            </a>
          </nav>

          {/* CONTATO + MENU TOGGLE */}
          <div className="flex items-center gap-3">
            <a
              href="#contato" // Link para a seção CONTATO (já estava correto)
              className="hidden lg:inline-block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-0.5"
            >
              CONTATO
            </a>

            {/* HAMBURGUER - agora aparece a partir de 1024px */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full hover:bg-gray-800 transition-all duration-300 group"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1' : 'mb-1.5'}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : 'mb-1.5'}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* MOBILE MENU - agora aparece a partir de 1024px */}
        <div className={`lg:hidden bg-gradient-to-b from-gray-900 to-black overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-96 py-4' : 'max-h-0'}`}>
          <nav className="px-6 space-y-3">
            {/* LINKS INDIVIDUAIS PARA MOBILE */}
            <a
              href="#home" // Link para a seção HOME
              className="block px-4 py-3 rounded-md font-medium hover:bg-gray-800 hover:text-pink-400 transition-all duration-300 border-l-4 border-transparent hover:border-pink-500"
              onClick={() => setMenuOpen(false)} // Fecha o menu no clique
            >
              HOME
            </a>
            <a
              href="#sobre-nos" // Link para a seção SOBRE NÓS
              className="block px-4 py-3 rounded-md font-medium hover:bg-gray-800 hover:text-pink-400 transition-all duration-300 border-l-4 border-transparent hover:border-pink-500"
              onClick={() => setMenuOpen(false)} // Fecha o menu no clique
            >
              SOBRE NÓS
            </a>
            <a
              href="#aulas" // Link para a seção AULAS
              className="block px-4 py-3 rounded-md font-medium hover:bg-gray-800 hover:text-pink-400 transition-all duration-300 border-l-4 border-transparent hover:border-pink-500"
              onClick={() => setMenuOpen(false)} // Fecha o menu no clique
            >
              AULAS
            </a>
            <a
              href="#professores" // Link para a seção PROFESSORES
              className="block px-4 py-3 rounded-md font-medium hover:bg-gray-800 hover:text-pink-400 transition-all duration-300 border-l-4 border-transparent hover:border-pink-500"
              onClick={() => setMenuOpen(false)} // Fecha o menu no clique
            >
              PROFESSORES
            </a>
            <a
              href="#depoimentos" // Link para a seção DEPOIMENTOS
              className="block px-4 py-3 rounded-md font-medium hover:bg-gray-800 hover:text-pink-400 transition-all duration-300 border-l-4 border-transparent hover:border-pink-500"
              onClick={() => setMenuOpen(false)} // Fecha o menu no clique
            >
              DEPOIMENTOS
            </a>

            {/* CONTATO LINK NO MOBILE */}
            <a
              href="#contato" // Link para a seção CONTATO
              className="mt-4 inline-block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
              onClick={() => setMenuOpen(false)} // Fecha o menu no clique
            >
              CONTATO
            </a>
          </nav>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow space-y-12">
        {/* Carrossel */}
        <section className="w-full">
          <CarouselPremium
            items={slides}
            autoPlay
            interval={6000}
          />
        </section>



        {/* Sobre */}
        <section id='sobre-nos' className="relative py-20 overflow-hidden">

          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Imagem com efeito e moldura */}
              <div className="relative w-full lg:w-1/2 group">
                <div className="absolute rounded-xl opacity-75 blur-lg group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative overflow-hidden rounded-xl shadow-2xl">
                  <img
                    src={config.fotoSobre || 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80'}
                    alt="Sobre nós"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>

              {/* Conteúdo de texto */}
              <div className="w-full lg:w-1/2">
                {/* Título com efeito */}
                <div className="mb-2">
                  <span className="inline-block text-lg font-semibold mb-3 uppercase tracking-wider">
                    Quem somos
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">
                    <span className="relative inline-block">
                      Sobre Nós
                      <span className="absolute bottom-0 left-0 w-1/3 h-1 from-pink-500"></span>
                    </span>
                  </h2>
                </div>

                {/* Texto */}
                <div className="prose prose-lg space-y-4">
                  <p>
                    {config.descricao ?? "Sua Descrição vem aqui"}
                  </p>

                </div>

                {/* -- DESTAQUES DINÂMICOS -- */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(config.destaques && config.destaques.length
                    ? config.destaques
                    : [
                      { number: '10+', label: 'Anos de experiência' },
                      { number: '5.000+', label: 'Alunos formados' },
                      { number: '98%', label: 'Satisfação' },
                    ]
                  ).map((item, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-pink-500"
                    >
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {item.number}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Galeria */}
        <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
          {/* Elementos decorativos de fundo */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-500 filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500 filter blur-3xl opacity-15"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Cabeçalho elegante */}
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold text-pink-500 mb-3 uppercase tracking-wider">
                Momentos Especiais
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                <span className="relative inline-block pb-2">
                  Nossa Galeria
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600"></span>
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                Registros dos momentos que fazem da nossa escola um lugar especial
              </p>
            </div>

            <GalleryPremium items={config.galerias ?? []} />
          </div>
        </section>

        {/* Aulas Premium */}
        <section id="aulas" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Aulas Premium
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(config.aulas?.length
                ? config.aulas
                : []
              ).map((item, idx) => (
                <AulaCardPremium
                  key={idx}
                  foto={item.foto}
                  titulo={item.titulo}
                  descricao={item.descricao}
                  nivel={item.nivel}
                  duracao={item.duracao}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Professores */}
        <section id="professores" className="relative py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
          {/* Elementos decorativos de fundo */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-pink-500 filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-purple-500 filter blur-3xl opacity-15"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Cabeçalho elegante */}
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold text-pink-500 mb-3 uppercase tracking-wider">
                Nossa Equipe
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                <span className="relative inline-block pb-2">
                  Professores
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600"></span>
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                Conheça nosso time de especialistas dedicados à sua evolução
              </p>
            </div>

            {/* Grid de professores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {professoresItems.map((item, idx) => (
                <ProfessorCardPremium
                  key={idx}
                  foto={item.foto}
                  nome={item.nome}
                  texto={item.texto}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section
          id="depoimentos"
          className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
        >
          {/* Elementos decorativos de fundo */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-pink-500 filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-purple-500 filter blur-3xl opacity-15"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Cabeçalho elegante */}
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold text-pink-500 mb-3 uppercase tracking-wider">
                Vozes que inspiram
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                <span className="relative inline-block pb-2">
                  Depoimentos
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600"></span>
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                O que nossos alunos e parceiros dizem sobre a experiência transformadora
              </p>
            </div>

            {/* Grid de depoimentos (até 4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
              {(
                config.depoimentos && config.depoimentos.length > 0
                  ? config.depoimentos.slice(0, 4)
                  : [
                    {
                      foto: '',
                      nome: 'João Silva',
                      texto: '“A experiência foi incrível e mudou minha forma de aprender.”',
                      estrelas: 5,
                    },
                    {
                      foto: '',
                      nome: 'Maria Souza',
                      texto: '“Conteúdo super didático e professores atenciosos!”',
                      estrelas: 4,
                    },
                  ]
              ).map((item, idx) => (
                <DepoimentoCardPremium
                  key={idx}
                  foto={item.foto}
                  nome={item.nome}
                  texto={item.texto}
                  estrelas={item.estrelas}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contato */}
        <section
          id="contato"
          className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
        >
          {/* Elementos decorativos */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-pink-500 filter blur-3xl opacity-30" />
            <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-purple-500 filter blur-3xl opacity-20" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Cabeçalho */}
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold text-pink-500 mb-3 uppercase tracking-wider">
                Conecte-se conosco
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                <span className="relative inline-block pb-2">
                  Contato
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-600" />
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                {descricaoBreve ??
                  'Estamos à disposição para esclarecer dúvidas, receber sugestões ou agendar sua visita.'}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Coluna de informações */}
              <div className="w-full lg:w-1/2 p-10 lg:p-12 xl:p-16 space-y-8">
                {/* Horários */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-gray-700 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-pink-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                      Horário de Funcionamento
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {horarioSemana ?? 'Segunda à Sexta: 09h - 12h | 13h - 21h'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {horarioSabado ?? 'Sábado: 09h - 14h'}
                    </p>
                  </div>
                </div>

                {/* E-mail */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-gray-700 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-pink-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                      E-mail
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 break-all">
                      {email ?? 'contato@seudominio.com'}
                    </p>
                  </div>
                </div>

                {/* Telefone + WhatsApp */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-gray-700 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-pink-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                      Telefone
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {telefone ?? '(11) 99999-0000'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      WhatsApp: {whatsapp ?? '(11) 98888-1111'}
                    </p>
                  </div>
                </div>

                {/* Botão fale conosco (exemplo, link para WhatsApp) */}
                <div className="pt-4">
                  <a
                    href={whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, '')}` : '#'}
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    FALE CONOSCO
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Coluna do mapa */}
              <div className="w-full lg:w-1/2 bg-gray-100 dark:bg-gray-700 p-1">
                <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
                  <iframe
                    src={mapEmbedUrl ?? 'https://maps.google.com/?q=Seu+Endereço'}
                    width="100%"
                    height="100%"
                    className="absolute inset-0"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Mapa de localização"
                  />

                  {/* Endereço flutuante */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-lg text-center">
                    <p className="font-medium text-gray-800 dark:text-white">
                      {endereco ?? 'Rua Exemplo, 123'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {cidade ?? 'São Paulo - SP, 01000-000'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="relative bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-16 pb-12 overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute bottom-20 left-1/4 w-64 h-64 rounded-full bg-pink-500 filter blur-3xl opacity-20"></div>
          <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full bg-purple-500 filter blur-3xl opacity-15"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Grade de conteúdo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Coluna 1 - Logo e descrição */}
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-4">
                <img
                  src={config.logo || DEFAULT_LOGO}
                  alt="Logo da Escola"
                  className="h-12 w-auto opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="text-gray-400 text-sm text-center md:text-left">
                {config.contato?.descricaoBreve ||
                  'Transformando vidas através da educação de excelência.'}
              </p>
            </div>

            {/* Coluna 2 - Links rápidos */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#sobre-nos" className="text-gray-400 hover:text-pink-400 transition-colors">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#aulas" className="text-gray-400 hover:text-pink-400 transition-colors">
                    Aulas
                  </a>
                </li>
                <li>
                  <a href="#contato" className="text-gray-400 hover:text-pink-400 transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna 3 - Contato */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
              <address className="not-italic text-gray-400 space-y-2">
                <p>
                  {config.contato?.endereco || (
                    <span className="italic text-gray-500">ex: Rua Exemplo, 123</span>
                  )}
                </p>
                <p>
                  {config.contato?.cidade || (
                    <span className="italic text-gray-500">ex: São Paulo - SP</span>
                  )}
                </p>
                <p>
                  {config.contato?.email || (
                    <span className="italic text-gray-500">ex: contato@seudominio.com</span>
                  )}
                </p>
                <p>
                  {config.contato?.telefone || (
                    <span className="italic text-gray-500">ex: (11) 99999-0000</span>
                  )}
                </p>
              </address>
            </div>

            {/* Coluna 4 – Redes sociais */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-4">Redes Sociais</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                {/* Facebook */}
                {config.contato?.socialMedia?.facebook && (
                  <a
                    href={config.contato.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 transition-colors"
                  >
                    <FacebookIcon className="w-6 h-6 text-pink-500" />
                  </a>
                )}
                {/* Instagram */}
                {config.contato?.socialMedia?.instagram && (
                  <a
                    href={config.contato.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 transition-colors"
                  >
                    <Instagram className="w-6 h-6 text-pink-500" />
                  </a>
                )}
                {/* YouTube */}
                {config.contato?.socialMedia?.youtube && (
                  <a
                    href={config.contato.socialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 transition-colors"
                  >
                    <Youtube className="w-6 h-6 text-pink-500" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Rodapé inferior */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} {config.titulo || 'Nome da Escola'}. Todos os direitos reservados.
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-pink-400 transition-colors">Política de Privacidade</a>
              <a href="#" className="text-sm text-gray-400 hover:text-pink-400 transition-colors">Termos de Uso</a>
            </div>

            <div className="mt-4 md:mt-0">
              <div className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                <span>Versão Premium</span>
                <span className="ml-1">Edulinker</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}