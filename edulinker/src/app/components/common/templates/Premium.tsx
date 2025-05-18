import React from 'react'
import Carousel from '@/app/components/common/Carousel'
import Gallery from '@/app/components/common/Gallery'
import AulaCard from '@/app/components/common/AulaCard'
import ProfessorCard from '@/app/components/common/ProfessorCard'
import DepoimentoCard from '@/app/components/common/DepoimentoCard'
import ContatoSection from '@/app/components/common/ContatoSection'
import { SiteConfig } from '@/types/site'

export default function Premium({ config }: { config: SiteConfig }) {
  const bgFrom = config.corFundo
  const bgTo = '#ffffff'
  const fg = config.corTexto

 //fontes
  const fontClass = {
    montserrat: 'font-montserrat',
    geist: 'font-geist',
    'geist-mono': 'font-geist-mono',
    roboto: 'font-roboto',
    Poppins: 'font-poppins',
  }[config.fonte || 'montserrat']

  return (
    <div
      style={{
        background: `linear-gradient(90deg, ${bgFrom}, ${bgTo})`,
        color: fg,
      }}
      className={`min-h-screen flex flex-col ${fontClass}`} 
    >
      {/* Cabeçalho */}
      <header className="py-8 text-center">
        {config.logo && (
          <img
            src={config.logo}
            alt="Logo"
            className="mx-auto w-32 h-auto mb-4 rounded-full shadow-lg"
          />
        )}
        <h1 className="text-4xl font-bold">{config.titulo}</h1>
        <p className="mt-2 text-lg">{config.descricao}</p>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow px-4 space-y-12">
        {/* Carrossel */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Carrossel</h2>
          <Carousel items={config.carrossel} />
        </section>

        {/* Sobre */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Sobre</h2>
          <p className="max-w-2xl mx-auto text-center">{config.sobre}</p>
        </section>

        {/* Galeria */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Galeria</h2>
          <Gallery items={config.galerias} />
        </section>

        {/* Aulas */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Aulas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {config.aulas?.map((item, idx) => (
              <AulaCard key={idx} foto={item.foto} titulo={item.titulo} />
            ))}
          </div>
        </section>

        {/* Professores */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Professores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {config.professores?.map((item, idx) => (
              <ProfessorCard key={idx} foto={item.foto} texto={item.texto} />
            ))}
          </div>
        </section>

        {/* Depoimentos */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Depoimentos</h2>
          <div className="space-y-4">
            {config.depoimentos?.map((item, idx) => (
              <DepoimentoCard
                key={idx}
                foto={item.foto}
                nome={item.nome}
                texto={item.texto}
              />
            ))}
          </div>
        </section>

        {/* Contato */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contato</h2>
          <ContatoSection
            texto={config.contato?.texto}
            imagem={config.contato?.imagem}
          />
        </section>
      </main>

      {/* Rodapé */}
      <footer className="py-4 text-center text-sm italic text-gray-400">
        Versão Premium – Edulinker
      </footer>
    </div>
  )
}