'use client';

import React from 'react'
import Carousel from '@/app/components/common/gratuito/Carousel'
import DepoimentoCardPremium from '@/app/components/common/premium/DepoimentoCardPremium'
import ProfessorCardPremium from '@/app/components/common/premium/ProfessorCardPremium'
import AulaCardPremium from '@/app/components/common/premium/AulaCardPremium'
import GalleryPremium from '@/app/components/common/premium/GalleryPremium'
import { SiteConfig } from '@/types/site'
import { useState } from "react";

// Imagens padrão (você pode importar de seus assets ou usar URLs externas)
const DEFAULT_LOGO = '/default-logo.png'
const DEFAULT_CAROUSEL_IMAGE = '/templates/free/banner1.jpg'
const DEFAULT_GALLERY_IMAGE = '/templates/free/banner2.jpg'
const DEFAULT_AULA_IMAGE = '/default-aula.jpg'
const DEFAULT_PROFESSOR_IMAGE = '/default-professor.jpg'
const DEFAULT_DEPOIMENTO_IMAGE = '/default-avatar.jpg'
const DEFAULT_CONTATO_IMAGE = '/default-contato.jpg'


export default function Premium({ config }: { config: SiteConfig }) {

  const bgFrom = config.corFundo
  const bgTo = '#ffffff'
  const fg = config.corTexto
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        background: `linear-gradient(90deg, ${bgFrom}, ${bgTo})`,
        color: fg,
      }}
      className="min-h-screen flex flex-col"
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
          <Carousel
            items={[
              { imagem: "/slide1.jpg", link: "/promo1", alt: "Promoção 1" },
              { imagem: "/slide2.jpg", link: "/promo2", alt: "Promoção 2" }
            ]}
            autoPlay={true}
            interval={6000}
            fallbackImages={[
              '/templates/free/banner1.jpg',
              '/templates/free/banner2.jpg'
            ]}
          />
        </section>


        {/* Sobre */}
        <section id='sobre-nos' className="relative py-20 overflow-hidden">
          {/* Efeito de fundo decorativo */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pink-500 to-purple-600"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Imagem com efeito e moldura */}
              <div className="relative w-full lg:w-1/2 group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-xl opacity-75 blur-lg group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative overflow-hidden rounded-xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
                    alt="Nossa equipe em ação"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>

              {/* Conteúdo de texto */}
              <div className="w-full lg:w-1/2">
                {/* Título com efeito */}
                <div className="mb-2">
                  <span className="inline-block text-lg font-semibold text-pink-500 mb-3 uppercase tracking-wider">
                    Quem somos
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative">
                    <span className="relative inline-block">
                      Sobre Nós
                      <span className="absolute bottom-0 left-0 w-1/3 h-1 from-pink-500"></span>
                    </span>
                  </h2>
                </div>

                {/* Texto */}
                <div className="prose prose-lg space-y-4">
                  <p>
                    {config.sobre ?? "Sua Descrição vem aqui"}

                  </p>

                </div>

                {/* Destaques */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { number: '10+', label: 'Anos de experiência' },
                    { number: '5.000+', label: 'Alunos formados' },
                    { number: '98%', label: 'Satisfação' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-pink-500">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.number}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.label}</p>
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

            <GalleryPremium items={config.galerias} />
          </div>
        </section>

        {/* Aulas */}
        <section id='aulas' className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
          {/* Elementos decorativos de fundo */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-pink-500 filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500 filter blur-3xl opacity-15"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Cabeçalho elegante */}
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold text-pink-500 mb-3 uppercase tracking-wider">
                Nossa Metodologia
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                <span className="relative inline-block pb-2">
                  Aulas Premium
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-600"></span>
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                Descubra nossa variedade de aulas cuidadosamente elaboradas para sua evolução
              </p>
            </div>

            {/* Grid de aulas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {config.aulas?.map((item, idx) => (
                <AulaCardPremium
                  key={idx}
                  foto={item.foto}
                  titulo={item.titulo}
                //descricao={item.descricao}
                //nivel={item.nivel}
                //duracao={item.duracao} // Nova prop opcional
                />
              ))}
            </div>
          </div>
        </section>

        {/* Professores */}
        <section id='professores' className="relative py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
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
              {config.professores?.map((item, idx) => (
                <ProfessorCardPremium
                  key={idx}
                  foto={item.foto}
                  //nome={item.nome}
                  texto={item.texto}
                //especialidade={item.especialidade}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section id='depoimentos' className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
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

            {/* Grid de depoimentos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {config.depoimentos?.map((item, idx) => (
                <DepoimentoCardPremium
                  key={idx}
                  foto={item.foto}
                  nome={item.nome}
                  texto={item.texto}
                //role={item.role} // Adicione esta prop se disponível
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id='contato' className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
          {/* Elementos decorativos de fundo */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-pink-500 filter blur-3xl opacity-30"></div>
            <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-purple-500 filter blur-3xl opacity-20"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Cabeçalho elegante */}
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold text-pink-500 mb-3 uppercase tracking-wider">
                Conecte-se conosco
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                <span className="relative inline-block pb-2">
                  Contato
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-600"></span>
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                Estamos à disposição para esclarecer dúvidas, receber sugestões ou agendar sua visita.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Coluna de informações de contato */}
              <div className="w-full lg:w-1/2 p-10 lg:p-12 xl:p-16">
                <div className="space-y-8">
                  {/* Bloco de horário */}
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-gray-700 flex items-center justify-center">
                        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Horário de Funcionamento</h3>
                      <p className="text-gray-600 dark:text-gray-300">Segunda à Sexta: 09h - 12h | 13h - 21h</p>
                      <p className="text-gray-600 dark:text-gray-300">Sábado: 09h - 14h</p>
                    </div>
                  </div>

                  {/* Bloco de e-mail */}
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-gray-700 flex items-center justify-center">
                        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">E-mail</h3>
                      <p className="text-gray-600 dark:text-gray-300 break-all">contato@escoladeyoga.com.br</p>
                    </div>
                  </div>

                  {/* Bloco de telefone */}
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-gray-700 flex items-center justify-center">
                        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Telefone</h3>
                      <p className="text-gray-600 dark:text-gray-300">(11) 99999-0000</p>
                      <p className="text-gray-600 dark:text-gray-300">WhatsApp: (11) 98888-1111</p>
                    </div>
                  </div>

                  {/* Botão premium */}
                  <div className="pt-4">
                    <a
                      href="#"
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      FALE CONOSCO
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Coluna do mapa */}
              <div className="w-full lg:w-1/2 bg-gray-100 dark:bg-gray-700 p-1">
                <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197584455882!2d-46.65867598440738!3d-23.56134606735893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1629840000000!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    className="absolute inset-0"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    aria-hidden="false"
                    tabIndex={0}
                  ></iframe>

                  {/* Endereço flutuante */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-lg text-center">
                    <p className="font-medium text-gray-800 dark:text-white">Rua Tananã, 105 - Jd. Mandala</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">São Paulo - SP, 04501-000</p>
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
          {/* Grade de conteúdo (opcional) */}
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
                Transformando vidas através da educação de excelência.
              </p>
            </div>

            {/* Coluna 2 - Links rápidos */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Aulas</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Contato</a></li>
              </ul>
            </div>

            {/* Coluna 3 - Contato */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
              <address className="not-italic text-gray-400 space-y-2">
                <p>Rua Exemplo, 123</p>
                <p>São Paulo - SP</p>
                <p>contato@escola.com.br</p>
                <p>(11) 99999-0000</p>
              </address>
            </div>

            {/* Coluna 4 - Redes sociais */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-4">Redes Sociais</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                  <span className="sr-only">YouTube</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
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