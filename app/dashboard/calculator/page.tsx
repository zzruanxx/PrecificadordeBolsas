'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'

interface Material {
  id: string
  name: string
  quantity: number
  unit: string
  cost: number
}

export default function CalculatorPage() {
  const [pieceName, setPieceName] = useState('')
  const [materials, setMaterials] = useState<Material[]>([])
  const [laborHours, setLaborHours] = useState(0)
  const [hourlyRate] = useState(25) // From settings
  const [fixedCostPerHour] = useState(5) // From settings
  const [packagingCost, setPackagingCost] = useState(0)
  const [profitMargin, setProfitMargin] = useState(30)

  const addMaterial = () => {
    setMaterials([
      ...materials,
      { id: crypto.randomUUID(), name: '', quantity: 0, unit: 'un', cost: 0 },
    ])
  }

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter((m) => m.id !== id))
  }

  const updateMaterial = (id: string, field: keyof Material, value: string | number) => {
    setMaterials(
      materials.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    )
  }

  // Calculations
  const materialsCost = materials.reduce(
    (sum, m) => sum + m.quantity * m.cost,
    0
  )
  const laborCost = laborHours * hourlyRate
  const fixedCosts = laborHours * fixedCostPerHour
  const totalProductionCost = materialsCost + laborCost + fixedCosts + packagingCost
  const profitAmount = (totalProductionCost * profitMargin) / 100
  const suggestedPrice = totalProductionCost + profitAmount

  // Channel simulation (example with fixed rates)
  const channels = [
    { name: 'Venda Direta', fee: 0, fixedFee: 0 },
    { name: 'Instagram', fee: 0, fixedFee: 0 },
    { name: 'Elo7', fee: 18, fixedFee: 0.4 },
    { name: 'Mercado Livre', fee: 15, fixedFee: 0 },
  ]

  const calculateChannelPrice = (channel: { fee: number; fixedFee: number }) => {
    // Price = (Cost + FixedFee) / (1 - Fee%)
    return (totalProductionCost + channel.fixedFee) / (1 - channel.fee / 100)
  }

  return (
    <div className="flex flex-col">
      <Header title="Calculadora de Preços" />
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column - Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ficha Técnica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#333333]">
                      Nome da Peça
                    </label>
                    <Input
                      value={pieceName}
                      onChange={(e) => setPieceName(e.target.value)}
                      placeholder="Ex: Bolsa de Crochê Média"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Materiais</CardTitle>
                  <Button size="sm" onClick={addMaterial}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {materials.length === 0 ? (
                    <p className="text-sm text-[#666666] text-center py-4">
                      Nenhum material adicionado. Clique em {'"'}Adicionar{'"'} para começar.
                    </p>
                  ) : (
                    materials.map((material) => (
                      <div key={material.id} className="flex gap-2 items-start">
                        <div className="flex-1 grid grid-cols-4 gap-2">
                          <Input
                            placeholder="Nome"
                            value={material.name}
                            onChange={(e) =>
                              updateMaterial(material.id, 'name', e.target.value)
                            }
                            className="col-span-2"
                          />
                          <Input
                            type="number"
                            placeholder="Qtd"
                            value={material.quantity || ''}
                            onChange={(e) =>
                              updateMaterial(
                                material.id,
                                'quantity',
                                parseFloat(e.target.value) || 0
                              )
                            }
                          />
                          <Input
                            type="number"
                            placeholder="R$"
                            value={material.cost || ''}
                            onChange={(e) =>
                              updateMaterial(
                                material.id,
                                'cost',
                                parseFloat(e.target.value) || 0
                              )
                            }
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMaterial(material.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mão de Obra e Custos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#333333]">
                      Horas de Trabalho
                    </label>
                    <Input
                      type="number"
                      value={laborHours || ''}
                      onChange={(e) => setLaborHours(parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#333333]">
                      Custo de Embalagem (R$)
                    </label>
                    <Input
                      type="number"
                      value={packagingCost || ''}
                      onChange={(e) =>
                        setPackagingCost(parseFloat(e.target.value) || 0)
                      }
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#333333]">
                      Margem de Lucro (%)
                    </label>
                    <Input
                      type="number"
                      value={profitMargin || ''}
                      onChange={(e) => setProfitMargin(parseFloat(e.target.value) || 0)}
                      placeholder="30"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
              <Card className="bg-gradient-to-br from-[#3A5A40] to-[#556B2F] text-white">
                <CardHeader>
                  <CardTitle className="text-white">Análise de Preço</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Materiais:</span>
                    <span className="font-semibold">
                      R$ {materialsCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mão de Obra:</span>
                    <span className="font-semibold">R$ {laborCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Custos Fixos:</span>
                    <span className="font-semibold">R$ {fixedCosts.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Embalagem:</span>
                    <span className="font-semibold">
                      R$ {packagingCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between text-lg">
                      <span>Custo Total:</span>
                      <span className="font-bold">
                        R$ {totalProductionCost.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Lucro ({profitMargin}%):</span>
                    <span className="font-bold text-[#a3e635]">
                      R$ {profitAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between text-2xl">
                      <span className="font-serif">Preço Sugerido:</span>
                      <span className="font-bold">
                        R$ {suggestedPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Simulador de Canais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {channels.map((channel) => {
                    const channelPrice = calculateChannelPrice(channel)
                    const netProfit = channelPrice - totalProductionCost
                    const netProfitPercent =
                      (netProfit / totalProductionCost) * 100

                    return (
                      <div
                        key={channel.name}
                        className="rounded-lg border border-[#e5e7eb] p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-[#333333]">
                              {channel.name}
                            </h4>
                            {channel.fee > 0 && (
                              <p className="text-xs text-[#666666]">
                                Taxa: {channel.fee}%
                                {channel.fixedFee > 0 &&
                                  ` + R$ ${channel.fixedFee.toFixed(2)}`}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-[#3A5A40]">
                              R$ {channelPrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#666666]">Lucro Líquido:</span>
                          <span className="font-semibold text-[#22c55e]">
                            R$ {netProfit.toFixed(2)} ({netProfitPercent.toFixed(1)}
                            %)
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <Button className="w-full" size="lg">
                Salvar Ficha Técnica
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
