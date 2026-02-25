'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calculator, CheckCircle2 } from 'lucide-react'
import { useSettingsStore } from '@/lib/store'

export default function SettingsPage() {
  const settings = useSettingsStore()
  const [proLabore, setProLabore] = useState(settings.proLabore)
  const [hoursPerMonth, setHoursPerMonth] = useState(settings.hoursPerMonth)
  const [fixedCosts, setFixedCosts] = useState(settings.fixedCosts)
  const [depreciation, setDepreciation] = useState(settings.depreciation)
  const [saved, setSaved] = useState(false)

  const hourlyRate = proLabore / hoursPerMonth
  const fixedCostPerHour = (fixedCosts + depreciation) / hoursPerMonth

  const handleSave = () => {
    settings.setProLabore(proLabore)
    settings.setHoursPerMonth(hoursPerMonth)
    settings.setFixedCosts(fixedCosts)
    settings.setDepreciation(depreciation)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex flex-col">
      <Header title="Configurações do Ateliê" />
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl font-serif font-bold text-[#3A5A40]">
              Configurações do Ateliê
            </h1>
            <p className="text-sm text-[#666666]">
              Configure os custos base do seu negócio
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mão de Obra</CardTitle>
                <CardDescription>
                  Defina quanto você deseja ganhar mensalmente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#333333]">
                    Pró-labore Mensal (R$)
                  </label>
                  <Input
                    type="number"
                    value={proLabore || ''}
                    onChange={(e) => setProLabore(parseFloat(e.target.value) || 0)}
                    placeholder="3000"
                  />
                  <p className="mt-1 text-xs text-[#666666]">
                    Quanto você deseja receber por mês pelo seu trabalho
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#333333]">
                    Horas Trabalhadas por Mês
                  </label>
                  <Input
                    type="number"
                    value={hoursPerMonth || ''}
                    onChange={(e) => setHoursPerMonth(parseFloat(e.target.value) || 0)}
                    placeholder="160"
                  />
                  <p className="mt-1 text-xs text-[#666666]">
                    Média de horas dedicadas ao ateliê por mês
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custos Fixos Mensais</CardTitle>
                <CardDescription>
                  Despesas recorrentes do ateliê
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#333333]">
                    Custos Fixos (R$)
                  </label>
                  <Input
                    type="number"
                    value={fixedCosts || ''}
                    onChange={(e) => setFixedCosts(parseFloat(e.target.value) || 0)}
                    placeholder="800"
                  />
                  <p className="mt-1 text-xs text-[#666666]">
                    Aluguel, luz, internet, telefone, etc.
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#333333]">
                    Depreciação de Equipamentos (R$)
                  </label>
                  <Input
                    type="number"
                    value={depreciation || ''}
                    onChange={(e) => setDepreciation(parseFloat(e.target.value) || 0)}
                    placeholder="200"
                  />
                  <p className="mt-1 text-xs text-[#666666]">
                    Desgaste de máquinas, ferramentas, móveis
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#3A5A40] to-[#556B2F] text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Calculator className="h-5 w-5" />
                  Valores Calculados
                </CardTitle>
                <CardDescription className="text-white/80">
                  Esses valores são usados na calculadora de preços
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-white/10 p-4">
                  <p className="text-sm text-white/80">Valor da Hora de Trabalho</p>
                  <p className="text-3xl font-bold">
                    R$ {hourlyRate.toFixed(2)}/h
                  </p>
                </div>
                <div className="rounded-lg bg-white/10 p-4">
                  <p className="text-sm text-white/80">Custo Fixo por Hora</p>
                  <p className="text-3xl font-bold">
                    R$ {fixedCostPerHour.toFixed(2)}/h
                  </p>
                </div>
                <div className="rounded-lg bg-white/10 p-4">
                  <p className="text-sm text-white/80">Custo Total por Hora</p>
                  <p className="text-3xl font-bold">
                    R$ {(hourlyRate + fixedCostPerHour).toFixed(2)}/h
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    Este é o custo real da sua hora de trabalho
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button size="lg" onClick={handleSave}>
                {saved ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Salvo!
                  </>
                ) : (
                  'Salvar Configurações'
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
