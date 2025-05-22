'use client'

import React, { useState, useEffect, useCallback } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { Plus, Trash2 } from 'lucide-react'

// tipo de cada aula
interface Aula {
  foto: string         // base64 ou URL
  titulo: string
  descricao: string
  nivel: string
  duracao: string
}

// helper para converter File → base64
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
  })
}

export default function AdminGradePage() {
  const [siteId, setSiteId] = useState<string|null>(null)
  const [aulas, setAulas] = useState<Aula[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')

  // carrega do /api/site/:id
  useEffect(() => {
    ;(async () => {
      try {
        const st = await fetch('/api/onboarding/status',{ credentials:'include' })
        const { siteId: id } = await st.json()
        if (!id) throw new Error('Nenhum site em andamento')
        setSiteId(id)

        const res = await fetch(`/api/site/${id}`, { credentials:'include' })
        if (!res.ok) throw new Error('Erro ao carregar aulas')
        const { configuracoes } = await res.json()
        setAulas(configuracoes.aulas ?? [])
      } catch(err:any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  },[])

  // adicionar slot
  const handleAdd = useCallback(() => {
    setAulas(a=>[...a,{
      foto: '',
      titulo:'',
      descricao:'',
      nivel:'',
      duracao:''
    }])
  },[])

  // remover
  const handleRemove = useCallback((idx:number)=>{
    setAulas(a=>a.filter((_,i)=>i!==idx))
  },[])

  // upload de imagem
  const handleFile = useCallback(async (idx:number, file:File|null)=>{
    if(!file) return
    const b64 = await fileToBase64(file)
    setAulas(a=>a.map((u,i)=>i===idx?{...u,foto:b64}:u))
  },[])

  // textos
  const handleChange = useCallback((idx:number, field:keyof Aula, v:string)=>{
    setAulas(a=>a.map((u,i)=>i===idx?{...u,[field]:v}:u))
  },[])

  // salvar
  const handleSave = useCallback(async ()=>{
    if (!siteId) return
    setSaving(true); setError('')
    try {
      const res = await fetch(`/api/site/${siteId}`,{
        method:'PUT',
        credentials:'include',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ configuracoes:{ aulas } })
      })
      if(!res.ok){
        const body = await res.json().catch(()=>({}))
        throw new Error(body.erro||'Falha ao salvar')
      }
    } catch(err:any){
      setError(err.message)
    } finally {
      setSaving(false)
    }
  },[siteId,aulas])

  if(loading) return <AdminLayout><p className="p-6 text-center">Carregando…</p></AdminLayout>

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6 sm:p-6">
        {error && <p className="text-red-600 text-center">{error}</p>}

        {aulas.map((u,idx)=>(
          <div key={idx} className="border rounded-lg p-4 relative space-y-4">
            <button onClick={()=>handleRemove(idx)} disabled={saving}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700">
              <Trash2 size={16}/>
            </button>

            <label className="block font-semibold">Imagem da aula #{idx+1}</label>
            <input type="file" accept="image/*"
              onChange={e=>handleFile(idx,e.target.files?.[0]??null)}
            />
            {u.foto && <img src={u.foto} className="mt-2 w-48 h-auto rounded" />}

            <div>
              <label className="block font-semibold">Título</label>
              <input type="text" value={u.titulo}
                onChange={e=>handleChange(idx,'titulo',e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block font-semibold">Descrição</label>
              <textarea rows={3} value={u.descricao}
                onChange={e=>handleChange(idx,'descricao',e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold">Nível</label>
                <input type="text" value={u.nivel}
                  onChange={e=>handleChange(idx,'nivel',e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block font-semibold">Duração</label>
                <input type="text" value={u.duracao}
                  onChange={e=>handleChange(idx,'duracao',e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
            </div>
          </div>
        ))}

        <button onClick={handleAdd}
          disabled={saving}
          className="flex items-center text-blue-500 hover:text-blue-700">
          <Plus size={16} className="mr-1"/> Adicionar aula
        </button>

        <button onClick={handleSave}
          disabled={saving}
          className={`w-full py-3 rounded-full text-white transition ${
            saving?'bg-gray-400':'bg-purple-700 hover:bg-purple-800'
          }`}>
          {saving ? 'Salvando…' : 'Salvar aulas'}
        </button>
      </div>
    </AdminLayout>
  )
}
