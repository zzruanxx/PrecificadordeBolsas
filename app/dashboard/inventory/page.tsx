'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit, Trash2, AlertCircle } from 'lucide-react'
import { type MeasurementUnit, cn } from '@/lib/utils'
import { useInventoryStore, type InventoryMaterial } from '@/lib/store'

export default function InventoryPage() {
  const { materials, addMaterial, updateMaterial, deleteMaterial } = useInventoryStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
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
      if (editingId) {
        updateMaterial(editingId, newMaterial)
        setEditingId(null)
      } else {
        addMaterial(newMaterial)
      }
      setNewMaterial({ name: '', cost: 0, unit: 'un', stock: 0, minStock: 0 })
      setShowAddForm(false)
    }
  }

  const handleEditMaterial = (material: InventoryMaterial) => {
    setNewMaterial({
      name: material.name,
      cost: material.cost,
      unit: material.unit,
      stock: material.stock,
      minStock: material.minStock
    })
    setEditingId(material.id)
    setShowAddForm(true)
  }

  const handleDeleteMaterial = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este material?')) {
      deleteMaterial(id)
    }
  }

  const handleCancelEdit = () => {
    setShowAddForm(false)
    setEditingId(null)
    setNewMaterial({ name: '', cost: 0, unit: 'un', stock: 0, minStock: 0 })
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
            <Card className="mb-6 border-2 border-[#BC6C25] bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA] shadow-md">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#BC6C25]">
                    <AlertCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#333333]">
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
                  {editingId ? 'Editar Material' : 'Adicionar Novo Material'}
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
                  <Button onClick={handleAddMaterial}>
                    {editingId ? 'Atualizar' : 'Salvar'}
                  </Button>
                  <Button variant="outline" onClick={handleCancelEdit}>
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
                  <thead className="bg-gradient-to-r from-[#3A5A40] to-[#556B2F] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Material
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Preço de Custo
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Unidade
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Estoque
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#e5e7eb]">
                    {materials.map((material, index) => (
                      <tr key={material.id} className={cn(
                        "transition-colors duration-150 hover:bg-[#f5f3ed]",
                        index % 2 === 0 ? "bg-white" : "bg-[#FDFBF6]"
                      )}>
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
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditMaterial(material)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteMaterial(material.id)}
                            >
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
