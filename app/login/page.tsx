'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would authenticate with Supabase
    router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FDFBF6] via-[#F5F3E8] to-[#e8e5db] p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4 text-center pt-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#3A5A40] to-[#556B2F] flex items-center justify-center shadow-lg">
            <span className="text-2xl font-serif font-bold text-white">L</span>
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#3A5A40] mb-2">
              Ateliê Lúcia
            </h1>
            <CardTitle className="text-xl text-[#333333]">Entrar na sua conta</CardTitle>
          </div>
          <CardDescription className="text-[#666666]">
            Gerencie seu ateliê com precisão e eficiência
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#333333]">
                E-mail
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="lucia@exemplo.com"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#333333]">
                Senha
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full mt-6" size="lg">
              Entrar
            </Button>
          </form>
          <div className="mt-6 text-center border-t pt-6">
            <p className="text-sm text-[#666666]">
              Não tem uma conta?{' '}
              <a href="#" className="font-semibold text-[#3A5A40] hover:text-[#556B2F] transition-colors">
                Cadastre-se
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
