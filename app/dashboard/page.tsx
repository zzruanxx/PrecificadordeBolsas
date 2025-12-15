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
            <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Peças Calculadas
                </CardTitle>
                <div className="p-2 rounded-lg bg-[#3A5A40]/10">
                  <FileText className="h-5 w-5 text-[#3A5A40]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#3A5A40]">12</div>
                <p className="text-xs text-[#666666] mt-1">Este mês</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Materiais em Estoque
                </CardTitle>
                <div className="p-2 rounded-lg bg-[#3A5A40]/10">
                  <Package className="h-5 w-5 text-[#3A5A40]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#3A5A40]">45</div>
                <p className="text-xs text-[#666666] mt-1">Itens cadastrados</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Lucro Médio
                </CardTitle>
                <div className="p-2 rounded-lg bg-green-100">
                  <TrendingUp className="h-5 w-5 text-[#22c55e]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#22c55e]">35%</div>
                <p className="text-xs text-[#666666] mt-1">Margem de lucro</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Estoque Baixo
                </CardTitle>
                <div className="p-2 rounded-lg bg-orange-100">
                  <Package className="h-5 w-5 text-[#BC6C25]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#BC6C25]">3</div>
                <p className="text-xs text-[#666666] mt-1">Necessitam reposição</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-l-4 border-l-[#3A5A40]">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#3A5A40]/10">
                    <Calculator className="h-5 w-5 text-[#3A5A40]" />
                  </div>
                  Calcular Nova Peça
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#666666] mb-6 leading-relaxed">
                  Crie uma nova ficha técnica com precificação precisa
                </p>
                <Link href="/dashboard/calculator">
                  <Button className="w-full">Iniciar Cálculo</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-l-4 border-l-[#BC6C25]">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#BC6C25]/10">
                    <Package className="h-5 w-5 text-[#BC6C25]" />
                  </div>
                  Adicionar Material
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#666666] mb-6 leading-relaxed">
                  Cadastre novos materiais no seu estoque
                </p>
                <Link href="/dashboard/inventory">
                  <Button variant="outline" className="w-full">
                    Gerenciar Estoque
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-l-4 border-l-[#556B2F]">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#556B2F]/10">
                    <FileText className="h-5 w-5 text-[#556B2F]" />
                  </div>
                  Ver Minhas Peças
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#666666] mb-6 leading-relaxed">
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
