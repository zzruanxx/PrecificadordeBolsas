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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FDFBF6] to-[#F5F3E8] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto">
            <h1 className="text-3xl font-serif font-bold text-[#3A5A40]">
              Ateliê Lúcia
            </h1>
          </div>
          <CardTitle className="text-2xl">Entrar na sua conta</CardTitle>
          <CardDescription>
            Gerencie seu ateliê com precisão e eficiência
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#333333]">
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
              <label className="mb-2 block text-sm font-medium text-[#333333]">
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
            <Button type="submit" className="w-full" size="lg">
              Entrar
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-[#666666]">
              Não tem uma conta?{' '}
              <a href="#" className="font-medium text-[#3A5A40] hover:underline">
                Cadastre-se
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
