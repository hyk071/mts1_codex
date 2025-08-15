"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Camera, CalendarClock, ListTree } from 'lucide-react'

const links = [
  { href: '/', label: '대시보드', icon: ListTree },
  { href: '/cameras', label: '카메라', icon: Camera },
  { href: '/schedules', label: '점검일정', icon: CalendarClock },
  { href: '/logs', label: '로그 분석', icon: ListTree },
]

export function Nav() {
  const pathname = usePathname()
  return (
    <header className="border-b bg-white">
      <div className="container flex h-14 items-center gap-6">
        <Link href="/" className="font-semibold">무인단속 관리</Link>
        <nav className="flex items-center gap-4 text-sm">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={
                'flex items-center gap-2 rounded-md px-3 py-1.5 hover:bg-muted ' +
                (pathname === href ? 'bg-muted font-medium' : 'text-foreground/80')
              }
            >
              <Icon size={16} /> {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

