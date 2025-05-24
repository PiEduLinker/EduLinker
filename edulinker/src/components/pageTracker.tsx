'use client'
import { useEffect } from 'react'

export default function PageTracker({ slug }: { slug: string }) {
  useEffect(() => {
    fetch('/api/pageView', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, userAgent: navigator.userAgent }),
    })
  }, [slug])

  return null
}