import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { Nav } from '@/components/nav'

export const metadata: Metadata = {
  title: '무인단속카메라 관리 콘솔',
  description: '카메라 관리 • 점검일정 • 로그 분석',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Nav />
        <main className="container py-6">{children}</main>
      </body>
    </html>
  )
}

