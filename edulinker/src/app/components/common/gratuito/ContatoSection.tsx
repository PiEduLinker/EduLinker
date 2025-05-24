import React from 'react'

export default function ContatoSection() {
  return (
    <section id="contato" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-xl text-gray-600">
            Tem dúvidas ou quer saber mais? Envie uma mensagem!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-pink-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Telefone</h3>
                <p className="text-gray-600">(11) 9999-9999</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-pink-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Email</h3>
                <p className="text-gray-600">contato@escola.com.br</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-pink-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Endereço</h3>
                <p className="text-gray-600">Rua Exemplo, 123 - São Paulo/SP</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6">Horário de Atendimento</h3>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-gray-600">Segunda a Sexta</span>
                <span className="font-medium">08:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Sábado</span>
                <span className="font-medium">09:00 - 12:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Domingo</span>
                <span className="font-medium">Fechado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 bg-gray-50 rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0754267452926!2d-46.65342658440639!3d-23.565734367638952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1623869104609!5m2!1spt-BR!2sbr"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  )
}