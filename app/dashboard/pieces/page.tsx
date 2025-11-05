'use client'

import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Edit, Trash2 } from 'lucide-react'

const mockPieces = [
  {
    id: 1,
    name: 'Bolsa de Crochê Média',
    productionCost: 45.5,
    suggestedPrice: 89.9,
    profit: 44.4,
    createdAt: '2024-10-15',
  },
  {
    id: 2,
    name: 'Sousplat Redondo',
    productionCost: 12.3,
    suggestedPrice: 24.99,
    profit: 12.69,
    createdAt: '2024-10-18',
  },
  {
    id: 3,
    name: 'Capa de Almofada Grande',
    productionCost: 28.9,
    suggestedPrice: 57.8,
    profit: 28.9,
    createdAt: '2024-10-20',
  },
]

export default function PiecesPage() {
  return (
    <div className="flex flex-col">
      <Header title="Minhas Peças" />
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#3A5A40]">
                Fichas Técnicas Salvas
              </h1>
              <p className="text-sm text-[#666666]">
                {mockPieces.length} peças cadastradas
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockPieces.map((piece) => (
              <Card key={piece.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-[#3A5A40]" />
                      {piece.name}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#666666]">Custo de Produção:</span>
                      <span className="font-medium">
                        R$ {piece.productionCost.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666666]">Preço Sugerido:</span>
                      <span className="font-semibold text-[#3A5A40]">
                        R$ {piece.suggestedPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666666]">Lucro:</span>
                      <span className="font-semibold text-[#22c55e]">
                        R$ {piece.profit.toFixed(2)}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-[#e5e7eb]">
                      <span className="text-xs text-[#999999]">
                        Criado em {new Date(piece.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-2 h-3 w-3" />
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
