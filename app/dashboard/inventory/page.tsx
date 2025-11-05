'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit, Trash2, AlertCircle } from 'lucide-react'

interface Material {
  id: number
  name: string
  cost: number
  unit: string
  stock: number
  minStock: number
}

const mockMaterials: Material[] = [
  { id: 1, name: 'Linha de Crochê 100g', cost: 12.5, unit: 'un', stock: 25, minStock: 10 },
  { id: 2, name: 'Tecido de Algodão (metro)', cost: 28.0, unit: 'm', stock: 15, minStock: 5 },
  { id: 3, name: 'Zíper 30cm', cost: 3.5, unit: 'un', stock: 8, minStock: 15 },
  { id: 4, name: 'Botões Decorativos', cost: 0.8, unit: 'un', stock: 120, minStock: 50 },
  { id: 5, name: 'Fita de Cetim 1cm', cost: 5.2, unit: 'm', stock: 3, minStock: 10 },
]

export default function InventoryPage() {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials)
  const [showAddForm, setShowAddForm] = useState(false)

  const lowStockMaterials = materials.filter(m => m.stock < m.minStock)

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
                  <Input placeholder="Nome do Material" />
                  <Input type="number" placeholder="Preço de Custo (R$)" />
                  <Input placeholder="Unidade (ex: un, m, kg)" />
                  <Input type="number" placeholder="Quantidade em Estoque" />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button>Salvar</Button>
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
