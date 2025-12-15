'use client'

import { LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function Header({ title }: { title: string }) {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <header className="flex h-16 items-center justify-between border-b-2 border-[#e5e7eb] bg-white px-8 shadow-sm">
      <h2 className="text-2xl font-serif font-semibold text-[#3A5A40]">{title}</h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-[#FDFBF6] transition-colors duration-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#BC6C25] to-[#A05A1E] text-white shadow-md">
            <User className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-[#333333]">Lúcia</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="rounded-full">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
