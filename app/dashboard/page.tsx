'use client'

import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calculator, Package, FileText, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <Header title="Início" />
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-[#3A5A40] mb-2">
              Bem-vinda, Lúcia!
            </h1>
            <p className="text-[#666666]">
              Gerencie seu ateliê com precisão e eficiência
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Peças Calculadas
                </CardTitle>
                <FileText className="h-4 w-4 text-[#3A5A40]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#3A5A40]">12</div>
                <p className="text-xs text-[#666666]">Este mês</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Materiais em Estoque
                </CardTitle>
                <Package className="h-4 w-4 text-[#3A5A40]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#3A5A40]">45</div>
                <p className="text-xs text-[#666666]">Itens cadastrados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Lucro Médio
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-[#22c55e]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#22c55e]">35%</div>
                <p className="text-xs text-[#666666]">Margem de lucro</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Estoque Baixo
                </CardTitle>
                <Package className="h-4 w-4 text-[#BC6C25]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#BC6C25]">3</div>
                <p className="text-xs text-[#666666]">Necessitam reposição</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-[#3A5A40]" />
                  Calcular Nova Peça
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#666666] mb-4">
                  Crie uma nova ficha técnica com precificação precisa
                </p>
                <Link href="/dashboard/calculator">
                  <Button className="w-full">Iniciar Cálculo</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-[#3A5A40]" />
                  Adicionar Material
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#666666] mb-4">
                  Cadastre novos materiais no seu estoque
                </p>
                <Link href="/dashboard/inventory">
                  <Button variant="outline" className="w-full">
                    Gerenciar Estoque
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#3A5A40]" />
                  Ver Minhas Peças
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#666666] mb-4">
                  Acesse seu catálogo de fichas técnicas salvas
                </p>
                <Link href="/dashboard/pieces">
                  <Button variant="outline" className="w-full">
                    Ver Catálogo
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
