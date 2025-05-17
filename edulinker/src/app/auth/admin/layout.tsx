// src/app/auth/admin/layout.tsx
import { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/auth'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token || !verifyToken(token)) {
    redirect(`/?from=/auth/admin`)
  }

  return <>{children}</>
}
