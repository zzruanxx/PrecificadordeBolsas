'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Calculator, 
  FileText, 
  Package, 
  ShoppingCart, 
  Settings 
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Início', href: '/dashboard', icon: Home },
  { name: 'Calculadora', href: '/dashboard/calculator', icon: Calculator },
  { name: 'Minhas Peças', href: '/dashboard/pieces', icon: FileText },
  { name: 'Estoque', href: '/dashboard/inventory', icon: Package },
  { name: 'Canais de Venda', href: '/dashboard/channels', icon: ShoppingCart },
  { name: 'Configurações', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-[#3A5A40] text-white">
      <div className="flex h-16 items-center justify-center border-b border-[#556B2F]">
        <h1 className="text-xl font-serif font-semibold">Ateliê Lúcia</h1>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[#556B2F] text-white'
                  : 'text-[#d1d5db] hover:bg-[#556B2F] hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
