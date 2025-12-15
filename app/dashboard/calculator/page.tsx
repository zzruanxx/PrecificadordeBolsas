'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, X, CheckCircle2, Calculator, Package } from 'lucide-react'
import { type MeasurementUnit, convertMeasurement, getConvertibleUnits } from '@/lib/utils'
import { useCalculatorStore } from '@/lib/store'

interface InventoryMaterial {
  id: number
  name: string
  cost: number
  unit: MeasurementUnit
  stock: number
  minStock: number
}

interface Material {
  id: string
  materialId?: number // Reference to inventory material
  name: string
  quantity: number
  unit: MeasurementUnit
  unitCost: number
  displayUnit: MeasurementUnit // Unit to display (for conversion)
  fromInventory: boolean
}

// Mock inventory materials - in production, this would come from database
const mockInventory: InventoryMaterial[] = [
  { id: 1, name: 'Linha de Crochê 100g', cost: 12.5, unit: 'un', stock: 25, minStock: 10 },
  { id: 2, name: 'Tecido de Algodão', cost: 28.0, unit: 'm', stock: 15, minStock: 5 },
  { id: 3, name: 'Zíper 30cm', cost: 3.5, unit: 'cm', stock: 800, minStock: 150 },
  { id: 4, name: 'Botões Decorativos', cost: 0.8, unit: 'un', stock: 120, minStock: 50 },
  { id: 5, name: 'Fita de Cetim', cost: 5.2, unit: 'm', stock: 3, minStock: 10 },
  { id: 6, name: 'Tecido Especial', cost: 45.0, unit: 'm²', stock: 5, minStock: 2 },
]

export default function CalculatorPage() {
  const {
    pieceName,
    materials,
    laborHours,
    packagingCost,
    profitMargin,
    setPieceName,
    setMaterials,
    setLaborHours,
    setPackagingCost,
    setProfitMargin,
  } = useCalculatorStore()
  
  const [hourlyRate] = useState(25) // From settings
  const [fixedCostPerHour] = useState(5) // From settings
  const [inventory, setInventory] = useState<InventoryMaterial[]>(mockInventory)
  const [showInventorySelector, setShowInventorySelector] = useState(false)
  const [saved, setSaved] = useState(false)

  const addMaterial = () => {
    setMaterials([
      ...materials,
      { 
        id: crypto.randomUUID(), 
        name: '', 
        quantity: 0, 
        unit: 'un', 
        unitCost: 0, 
        displayUnit: 'un',
        fromInventory: false
      },
    ])
  }

  const addMaterialFromInventory = (invMaterial: InventoryMaterial) => {
    setMaterials([
      ...materials,
      {
        id: crypto.randomUUID(),
        materialId: invMaterial.id,
        name: invMaterial.name,
        quantity: 0,
        unit: invMaterial.unit,
        unitCost: invMaterial.cost,
        displayUnit: invMaterial.unit,
        fromInventory: true
      }
    ])
    setShowInventorySelector(false)
  }

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter((m) => m.id !== id))
  }

  const updateMaterial = (id: string, field: keyof Material, value: string | number | MeasurementUnit) => {
    setMaterials(
      materials.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    )
  }

  const updateMaterialQuantity = (id: string, quantity: number, displayUnit: MeasurementUnit) => {
    setMaterials(
      materials.map((m) => {
        if (m.id === id) {
          // Convert quantity from display unit to storage unit for cost calculation
          const convertedQuantity = m.unit !== displayUnit 
            ? convertMeasurement(quantity, displayUnit, m.unit)
            : quantity
          return { ...m, quantity: convertedQuantity, displayUnit }
        }
        return m
      })
    )
  }

  // Calculations
  const materialsCost = materials.reduce(
    (sum, m) => sum + m.quantity * m.unitCost,
    0
  )

  const handleSaveProduct = () => {
    // Update inventory stock
    const updatedInventory = inventory.map(inv => {
      const usedMaterial = materials.find(m => m.materialId === inv.id)
      if (usedMaterial) {
        return {
          ...inv,
          stock: inv.stock - usedMaterial.quantity
        }
      }
      return inv
    })
    setInventory(updatedInventory)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }
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
              <Card className="border-l-4 border-l-[#3A5A40]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#3A5A40]/10">
                      <Calculator className="h-5 w-5 text-[#3A5A40]" />
                    </div>
                    Ficha Técnica
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#333333]">
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

              <Card className="border-l-4 border-l-[#BC6C25]">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#BC6C25]/10">
                      <Package className="h-5 w-5 text-[#BC6C25]" />
                    </div>
                    Materiais
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setShowInventorySelector(!showInventorySelector)}>
                      <Plus className="h-4 w-4" />
                      Do Estoque
                    </Button>
                    <Button size="sm" onClick={addMaterial}>
                      <Plus className="h-4 w-4" />
                      Manual
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {showInventorySelector && (
                    <div className="mb-4 p-4 bg-[#F9FAFB] rounded-lg border border-[#e5e7eb]">
                      <h4 className="text-sm font-semibold mb-2 text-[#333333]">
                        Selecionar do Estoque
                      </h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {inventory.map((inv) => (
                          <button
                            key={inv.id}
                            onClick={() => addMaterialFromInventory(inv)}
                            className="w-full text-left px-3 py-2 rounded-md border border-[#e5e7eb] hover:bg-white hover:border-[#3A5A40] transition-colors"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm font-medium text-[#333333]">
                                  {inv.name}
                                </p>
                                <p className="text-xs text-[#666666]">
                                  R$ {inv.cost.toFixed(2)}/{inv.unit} • Estoque: {inv.stock}
                                </p>
                              </div>
                              <Plus className="h-4 w-4 text-[#3A5A40]" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {materials.length === 0 ? (
                    <p className="text-sm text-[#666666] text-center py-4">
                      Nenhum material adicionado. Clique em {'"'}Do Estoque{'"'} ou {'"'}Manual{'"'} para começar.
                    </p>
                  ) : (
                    materials.map((material) => (
                      <div key={material.id} className="border border-[#e5e7eb] rounded-lg p-3">
                        <div className="flex gap-2 items-start mb-2">
                          <div className="flex-1">
                            {material.fromInventory ? (
                              <div className="flex items-center gap-2 mb-2">
                                <p className="text-sm font-medium text-[#333333]">
                                  {material.name}
                                </p>
                                <span className="text-xs bg-[#3A5A40] text-white px-2 py-0.5 rounded">
                                  Estoque
                                </span>
                              </div>
                            ) : (
                              <Input
                                placeholder="Nome do Material"
                                value={material.name}
                                onChange={(e) =>
                                  updateMaterial(material.id, 'name', e.target.value)
                                }
                                className="mb-2"
                              />
                            )}
                            
                            <div className="grid grid-cols-3 gap-2">
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="Quantidade"
                                value={material.displayUnit === material.unit 
                                  ? material.quantity || '' 
                                  : convertMeasurement(material.quantity, material.unit, material.displayUnit) || ''}
                                onChange={(e) =>
                                  updateMaterialQuantity(
                                    material.id,
                                    parseFloat(e.target.value) || 0,
                                    material.displayUnit
                                  )
                                }
                              />
                              
                              {material.fromInventory && getConvertibleUnits(material.unit).length > 1 ? (
                                <select
                                  className="rounded-md border border-[#e5e7eb] px-2 py-1.5 text-sm focus:border-[#3A5A40] focus:outline-none"
                                  value={material.displayUnit}
                                  onChange={(e) =>
                                    updateMaterial(material.id, 'displayUnit', e.target.value as MeasurementUnit)
                                  }
                                >
                                  {getConvertibleUnits(material.unit).map(unit => (
                                    <option key={unit} value={unit}>{unit}</option>
                                  ))}
                                </select>
                              ) : (
                                <Input
                                  placeholder="Unidade"
                                  value={material.unit}
                                  onChange={(e) =>
                                    updateMaterial(material.id, 'unit', e.target.value as MeasurementUnit)
                                  }
                                  disabled={material.fromInventory}
                                />
                              )}
                              
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="R$ por unidade"
                                value={material.unitCost || ''}
                                onChange={(e) =>
                                  updateMaterial(
                                    material.id,
                                    'unitCost',
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                disabled={material.fromInventory}
                              />
                            </div>
                            
                            <p className="text-xs text-[#666666] mt-1">
                              Custo: R$ {(material.quantity * material.unitCost).toFixed(2)}
                              {material.displayUnit !== material.unit && (
                                <span className="ml-1">
                                  ({convertMeasurement(material.quantity, material.unit, material.displayUnit).toFixed(2)} {material.displayUnit})
                                </span>
                              )}
                            </p>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMaterial(material.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#556B2F]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#556B2F]/10">
                      <Calculator className="h-5 w-5 text-[#556B2F]" />
                    </div>
                    Mão de Obra e Custos
                  </CardTitle>
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
              <Card className="bg-gradient-to-br from-[#3A5A40] to-[#556B2F] text-white shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Análise de Preço</CardTitle>
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

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">Simulador de Canais</CardTitle>
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

              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleSaveProduct}
                disabled={!pieceName || materials.length === 0}
              >
                {saved ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Salvo com Sucesso!
                  </>
                ) : (
                  'Salvar Ficha Técnica'
                )}
              </Button>
              
              {saved && (
                <div className="bg-[#D1FAE5] border border-[#059669] text-[#059669] px-4 py-3 rounded-lg text-sm">
                  <p className="font-medium">Produto salvo e estoque atualizado!</p>
                  <p className="text-xs mt-1">
                    Os materiais do estoque foram deduzidos automaticamente.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
