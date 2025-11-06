'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit, Trash2, AlertCircle } from 'lucide-react'
import { type MeasurementUnit } from '@/lib/utils'

interface Material {
  id: number
  name: string
  cost: number
  unit: MeasurementUnit
  stock: number
  minStock: number
}

const mockMaterials: Material[] = [
  { id: 1, name: 'Linha de Crochê 100g', cost: 12.5, unit: 'un', stock: 25, minStock: 10 },
  { id: 2, name: 'Tecido de Algodão', cost: 28.0, unit: 'm', stock: 15, minStock: 5 },
  { id: 3, name: 'Zíper 30cm', cost: 3.5, unit: 'cm', stock: 800, minStock: 150 },
  { id: 4, name: 'Botões Decorativos', cost: 0.8, unit: 'un', stock: 120, minStock: 50 },
  { id: 5, name: 'Fita de Cetim', cost: 5.2, unit: 'm', stock: 3, minStock: 10 },
  { id: 6, name: 'Tecido Especial', cost: 45.0, unit: 'm²', stock: 5, minStock: 2 },
]

export default function InventoryPage() {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    cost: 0,
    unit: 'un' as MeasurementUnit,
    stock: 0,
    minStock: 0
  })

  const lowStockMaterials = materials.filter(m => m.stock < m.minStock)

  const handleAddMaterial = () => {
    if (newMaterial.name && newMaterial.cost > 0) {
      const newId = Math.max(...materials.map(m => m.id), 0) + 1
      setMaterials([...materials, { ...newMaterial, id: newId }])
      setNewMaterial({ name: '', cost: 0, unit: 'un', stock: 0, minStock: 0 })
      setShowAddForm(false)
    }
  }

  return (
    <div className="flex flex-col">
      <Header title="Estoque de Materiais" />
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#3A5A40]">
                Gerenciar Estoque
              </h1>
              <p className="text-sm text-[#666666]">
                {materials.length} materiais cadastrados
              </p>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Material
            </Button>
          </div>

          {lowStockMaterials.length > 0 && (
            <Card className="mb-6 border-[#BC6C25] bg-[#FEF3C7]">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-[#BC6C25]" />
                  <div>
                    <p className="font-medium text-[#333333]">
                      {lowStockMaterials.length} material(is) com estoque baixo
                    </p>
                    <p className="text-sm text-[#666666]">
                      {lowStockMaterials.map(m => m.name).join(', ')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {showAddForm && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-[#3A5A40]">
                  Adicionar Novo Material
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    placeholder="Nome do Material" 
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                  />
                  <Input 
                    type="number" 
                    placeholder="Preço de Custo (R$)" 
                    value={newMaterial.cost || ''}
                    onChange={(e) => setNewMaterial({...newMaterial, cost: parseFloat(e.target.value) || 0})}
                  />
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#333333]">
                      Unidade de Medida
                    </label>
                    <select 
                      className="w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm focus:border-[#3A5A40] focus:outline-none"
                      value={newMaterial.unit}
                      onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value as MeasurementUnit})}
                    >
                      <option value="un">un (unidades)</option>
                      <option value="cm">cm (centímetros)</option>
                      <option value="m">m (metros)</option>
                      <option value="cm²">cm² (centímetros quadrados)</option>
                      <option value="m²">m² (metros quadrados)</option>
                      <option value="g">g (gramas)</option>
                      <option value="kg">kg (quilogramas)</option>
                      <option value="ml">ml (mililitros)</option>
                      <option value="l">l (litros)</option>
                    </select>
                  </div>
                  <Input 
                    type="number" 
                    placeholder="Quantidade em Estoque" 
                    value={newMaterial.stock || ''}
                    onChange={(e) => setNewMaterial({...newMaterial, stock: parseFloat(e.target.value) || 0})}
                  />
                  <Input 
                    type="number" 
                    placeholder="Estoque Mínimo" 
                    value={newMaterial.minStock || ''}
                    onChange={(e) => setNewMaterial({...newMaterial, minStock: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleAddMaterial}>Salvar</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F9FAFB] border-b border-[#e5e7eb]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#666666] uppercase tracking-wider">
                        Material
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#666666] uppercase tracking-wider">
                        Preço de Custo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#666666] uppercase tracking-wider">
                        Unidade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#666666] uppercase tracking-wider">
                        Estoque
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#666666] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-[#666666] uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#e5e7eb]">
                    {materials.map((material) => (
                      <tr key={material.id} className="hover:bg-[#FDFBF6]">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-[#333333]">
                            {material.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#666666]">
                            R$ {material.cost.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#666666]">
                            {material.unit}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-[#333333]">
                            {material.stock}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {material.stock < material.minStock ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEE2E2] text-[#DC2626]">
                              Baixo
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D1FAE5] text-[#059669]">
                              OK
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <div className="flex gap-2 justify-end">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
