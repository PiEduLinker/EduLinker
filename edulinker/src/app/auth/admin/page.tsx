import AdminLayout from '@/components/Layouts/AdminLayout'
import CheckList from '@/components/CheckList'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/auth'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'

export default async function AdminPanelPage() {
  // 1) Autenticação
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const payload = token && verifyToken(token)
  if (!payload) {
    redirect('/login?from=/auth/admin')
  }

  // 2) Busca o site mais recente do usuário como um array de length ≤ 1
  await connectToDB()
  const sites = await Site.find({ usuarioId: payload.id })
    .sort({ dataCriacao: -1 })
    .limit(1)
    .lean()
  const site = sites[0]

  // 3) Se não tiver site ou slug, dá fallback
  const slug = site?.slug ?? ''
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const linkPublico = `${baseUrl}/site/${slug}`

  return (
    <AdminLayout>
      <div className="sm:p-6">
        <h1 className="text-2xl font-bold ms-4 my-4 text-center sm:text-start">
          Minha escola
        </h1>
        <div className="p-5 bg-purple-200 rounded-full">
          <p className="text-center sm:text-start">
            Seu site já está disponível no link:{' '}
            {slug ? (
              <a
                href={linkPublico}
                target="_blank"
                rel="noreferrer"
                className="text-purple-700 hover:underline"
              >
                {linkPublico.replace(/^https?:\/\//, '')}
              </a>
            ) : (
              <span className="text-red-600">Nenhum site gerado ainda</span>
            )}
          </p>
        </div>

        <div className="mt-5 mb-5 ps-5">
          <h2 className="font-bold text-center sm:text-start">
            Confira os passos para deixar sua escola do seu jeito!
          </h2>
        </div>

        <div className="w-full">
          <CheckList />
        </div>
      </div>
    </AdminLayout>
  )
}
