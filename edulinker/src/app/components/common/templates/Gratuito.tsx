import React from 'react'
import { SiteConfig } from '@/types/site'
import Carousel from '@/app/components/common/Carousel'
import Gallery from '@/app/components/common/Gallery'
import AulaCard from '@/app/components/common/AulaCard'
import ProfessorCard from '@/app/components/common/ProfessorCard'
import DepoimentoCard from '@/app/components/common/DepoimentoCard'
import ContatoSection from '@/app/components/common/ContatoSection'

// Imagens padrão (você pode importar de seus assets ou usar URLs externas)
const DEFAULT_LOGO = '/default-logo.png'
const DEFAULT_CAROUSEL_IMAGE = '/templates/free/woman.jpg'
const DEFAULT_GALLERY_IMAGE = '/templates/free/woman2.jpg'
const DEFAULT_AULA_IMAGE = '/default-aula.jpg'
const DEFAULT_PROFESSOR_IMAGE = '/default-professor.jpg'
const DEFAULT_DEPOIMENTO_IMAGE = '/default-avatar.jpg'
const DEFAULT_CONTATO_IMAGE = '/default-contato.jpg'

export default function EscolaTemplate({ config }: { config: SiteConfig }) {
  const bg = config.corFundo || '#ffffff' // Cor de fundo padrão se não for fornecida
  const fg = config.corTexto || '#000000' // Cor de texto padrão se não for fornecida

  // Preenche valores padrão para configurações opcionais
  const carrosselItems = config.carrossel?.length
    ? config.carrossel
    : [{ imagem: DEFAULT_CAROUSEL_IMAGE }]

  const galeriaItems = config.galerias?.length
    ? config.galerias
    : Array(6).fill({ imagem: DEFAULT_GALLERY_IMAGE })

  const aulasItems = config.aulas?.length
    ? config.aulas.map(aula => ({
      ...aula,
      foto: aula.foto || DEFAULT_AULA_IMAGE
    }))
    : Array(4).fill({
      foto: DEFAULT_AULA_IMAGE,
      titulo: 'Aula Padrão'
    })

  const professoresItems = config.professores?.length
    ? config.professores.map(prof => ({
      ...prof,
      foto: prof.foto || DEFAULT_PROFESSOR_IMAGE
    }))
    : Array(4).fill({
      foto: DEFAULT_PROFESSOR_IMAGE,
      texto: 'Professor experiente na área'
    })

  const depoimentosItems = config.depoimentos?.length
    ? config.depoimentos.map(dep => ({
      ...dep,
      foto: dep.foto || DEFAULT_DEPOIMENTO_IMAGE
    }))
    : Array(2).fill({
      foto: DEFAULT_DEPOIMENTO_IMAGE,
      nome: 'Cliente Satisfeito',
      texto: 'Excelente experiência com a escola!'
    })

  const contatoInfo = config.contato || {
    texto: 'Entre em contato conosco para mais informações',
    imagem: DEFAULT_CONTATO_IMAGE
  }

  return (
    <div
      style={{ backgroundColor: bg, color: fg }}
      className="min-h-screen flex flex-col font-sans"
    >
      {/* Cabeçalho com navegação */}
      <header className="py-4 px-6 shadow-md bg-white sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo à esquerda */}
          <img
            src={config.logo || DEFAULT_LOGO}
            alt="Logo da Escola"
            className="h-14 w-auto"
          />

          {/* Resto do componente permanece igual */}
          <nav className="hidden md:flex space-x-8 mx-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition font-medium">Home</a>
            <a href="#sobre" className="text-gray-700 hover:text-blue-600 transition font-medium">Sobre nós</a>
            <a href="#aulas" className="text-gray-700 hover:text-blue-600 transition font-medium">Aulas</a>
            <a href="#professores" className="text-gray-700 hover:text-blue-600 transition font-medium">Professores</a>
            <a href="#depoimentos" className="text-gray-700 hover:text-blue-600 transition font-medium">Depoimentos</a>
          </nav>

          <a
            href="#contato"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium transition shadow-md transform hover:scale-105"
          >
            Contato
          </a>

          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-grow space-y-16">
        {/* Carrossel de destaques - ocupa 100% da largura */}
        <section className="w-full">
          <Carousel
            items={[
              { imagem: "/slide1.jpg", link: "/promo1", alt: "Promoção 1" },
              { imagem: "/slide2.jpg", link: "/promo2", alt: "Promoção 2" }
            ]}
            autoPlay={true}
            interval={6000}
            fallbackImages={[
              '/templates/free/woman.jpg',
              '/templates/free/woman2.jpg'
            ]}
          />
        </section>

        {/* Título e descrição */}
        <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center md:space-x-8 lg:space-x-12">

              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <img
                  src="/templates/free/man.jpg"
                  alt="Sobre Nós - Imagem da Empresa"
                  className="rounded-lg shadow-xl object-cover w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[500px]"
                />
              </div>

              <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Sobre Nós
                </h2>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                  Bem-vindo à nossa empresa! Somos apaixonados por fornecer soluções inovadoras e de alta qualidade que atendam às necessidades dos nossos clientes. Nossa jornada começou com a visão de fazer a diferença e, desde então, temos trabalhado incansavelmente para transformar essa visão em realidade.
                </p>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  Nossa equipe é composta por profissionais dedicados e experientes, comprometidos com a excelência em cada projeto. Valorizamos a colaboração, a criatividade e um forte relacionamento com nossos clientes e parceiros.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* Galeria de fotos */}
        <section id="galeria" className="py-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Nossa Galeria</h2>
          <Gallery items={galeriaItems} />
        </section>

        {/* Aulas oferecidas */}
        <section id="aulas" className="py-12 bg-white"> {/* Added background, adjusted padding */}
          <div className="max-w-6xl mx-auto px-4"> {/* Centering container with horizontal padding */}

            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800">Conheça nossas aulas</h2> {/* Updated title text, adjusted margin */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> {/* Grid layout */}
              {aulasItems && aulasItems.map((item, idx) => ( // Check if aulasItems exists
                <AulaCard
                  key={idx}
                  foto={item.foto}
                  titulo={item.titulo}
                  descricao={item.descricao} // Pass description
                  nivel={item.nivel}       // Pass level
                />
              ))}
            </div>

            {/* "FALE CONOSCO" Button below the grid */}
            <div className="text-center mt-10"> {/* Center the button */}
              <a href="#" className="inline-block px-6 py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 transition duration-300 ease-in-out"> {/* Button styling */}
                FALE CONOSCO
              </a>
            </div>

          </div>
        </section>

        {/* Corpo docente */}
        <section id="professores" className="py-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Nossos Professores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {professoresItems.map((item, idx) => (
              <ProfessorCard
                key={idx}
                foto={item.foto}
                texto={item.texto}
              />
            ))}
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-12 bg-gray-50"> {/* Adjusted background for contrast, added padding */}
          <div className="max-w-6xl mx-auto px-4"> {/* Centering container with horizontal padding */}
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800">O que dizem sobre nós</h2> {/* Adjusted text size and margin */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Grid layout */}
              {depoimentosItems && depoimentosItems.map((item, idx) => ( // Check if depoimentosItems exists
                <DepoimentoCard
                  key={idx}
                  foto={item.foto}
                  nome={item.nome}
                  texto={item.texto}
                />
              ))}
            </div>

            {/* Optional: Add navigation arrows if you later implement a slider */}
            <div className="flex justify-center mt-8">
              <button className="mx-2 p-3 rounded-full bg-gray-200 hover:bg-gray-300">{'<'}</button>
              <button className="mx-2 p-3 rounded-full bg-gray-200 hover:bg-gray-300">{'>'}</button>
            </div>

          </div>
        </section>

        {/* Seção de contato */}
        <section className="bg-gray-100 py-10"> {/* Adjust background and padding as needed */}
          <div className="container mx-auto px-4"> {/* Centering container with padding */}
            <div className="flex flex-wrap lg:flex-nowrap gap-8"> {/* Flex container, wraps on smaller screens, no wrap on large */}

              {/* Contact Info Column */}
              <div className="w-full lg:w-1/2"> {/* Takes full width on small, half on large */}
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">Contato</h2> {/* Adjust text size and weight */}

                <div className="mb-4">
                  <p className="font-bold text-gray-700">Horário de funcionamento:</p>
                  <p className="text-gray-600">Seg à sex: 09h - 12h | 13h - 21h</p> {/* Replace with actual hours */}
                </div>

                <div className="mb-4">
                  <p className="font-bold text-gray-700">E-mail:</p>
                  <p className="text-gray-600 break-words">contato@escoladeyoga.com.br</p> {/* Replace with actual email */}
                </div>

                <div className="mb-4">
                  <p className="font-bold text-gray-700">Telefone para contato:</p>
                  <p className="text-gray-600">(11) 99999-0000</p> {/* Replace with actual phone */}
                </div>

                {/* Button */}
                <a href="#" className="inline-block mt-6 px-6 py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 transition duration-300 ease-in-out"> {/* Adjust button styling */}
                  FALE CONOSCO
                </a>
              </div>

              {/* Map Column */}
              <div className="w-full lg:w-1/2 flex flex-col items-center"> {/* Takes full width on small, half on large, centers content */}
                {/* Map Placeholder - Replace with your actual map embed */}
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center mb-4"> {/* Adjust height */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000!2d-46.633309!3d-23.55052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce043b24771f8b%3A0x4b2b829070260748!2sS%C3%A3o%20Paulo%2C%20State%20of%20S%C3%A3o%20Paulo!5e0!3m2!1sen!2sus!4v1678880000000!5m2!1sen!2sus" // URL de embed para uma área aleatória em São Paulo
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                  ></iframe>                </div>

                {/* Address below the map */}
                <p className="text-center text-gray-600 text-sm"> {/* Adjust text size and color */}
                  Rua Tananã, 105 - Jd. Mandala, São Paulo - SP {/* Replace with actual address */}
                </p>
              </div>

            </div>
          </div>
        </section>


      </main>
      {/* Rodapé */}
      <footer className="bg-gray-800 text-gray-300 pb-12">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} {config.titulo || 'Nome da Escola'}. Todos os direitos reservados.</p>
            <p className="mt-2">Versão Gratuita – Edulinker</p>
          </div>
        </div>
      </footer>
    </div>
  )
}