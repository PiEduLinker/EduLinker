'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'

interface SiteConfig {
  corFundo: string
  corTexto: string
}

export default function AdminStylePage({ config }: { config: SiteConfig }) {
  const [bgColor, setBgColor] = useState('#ffffff')
  const [textColor, setTextColor] = useState('#000000')

  useEffect(() => {
    if (config) {
      setBgColor(config.corFundo || '#ffffff')
      setTextColor(config.corTexto || '#000000')
    }
  }, [config])

  return (
    <AdminLayout>
      <div className="sm:p-6">
        <h1 className="text-2xl font-bold ms-4 my-4 text-center sm:text-start">
          Minha escola
        </h1>

        <div className="flex justify-center">
          <h2 className="text-2xl font-bold px-8 py-4 rounded-full bg-[#9FFF64] shadow-md">
            Estilize seu site
          </h2>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow border flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Cor de fundo
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border shadow-inner"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Cor do texto
              </label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border shadow-inner"
              />
            </div>
          </div>

          <div
            className="flex flex-col items-center justify-center rounded-xl shadow-lg border text-xl font-bold transition-all duration-300 p-6"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <div className="w-full h-48 flex items-center justify-center rounded-md border bg-opacity-70 backdrop-blur-sm">
              Visualização
            </div>
            <p className="mt-4 text-sm font-medium text-center opacity-70">
              Essa é a aparência que seu site terá
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}