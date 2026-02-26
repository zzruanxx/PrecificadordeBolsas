'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Edit, Trash2 } from 'lucide-react'
import { usePiecesStore, useCalculatorStore } from '@/lib/store'

export default function PiecesPage() {
  const { pieces, deletePiece } = usePiecesStore()
  const { setPieceName, setMaterials, setLaborHours, setPackagingCost, setProfitMargin } = useCalculatorStore()
  const router = useRouter()

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta ficha técnica?')) {
      deletePiece(id)
    }
  }

  const handleEdit = (piece: typeof pieces[0]) => {
    setPieceName(piece.name)
    setMaterials(piece.materials)
    setLaborHours(piece.laborHours)
    setPackagingCost(piece.packagingCost)
    setProfitMargin(piece.profitMargin)
    router.push('/dashboard/calculator')
  }

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
                {pieces.length} peças cadastradas
              </p>
            </div>
          </div>

          {pieces.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-[#ccc] mb-4" />
                <p className="text-[#666666]">Nenhuma ficha técnica salva ainda.</p>
                <p className="text-sm text-[#999999] mt-1">
                  Use a calculadora para criar e salvar novas fichas.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pieces.map((piece) => (
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
                          R$ {(piece.suggestedPrice - piece.productionCost).toFixed(2)}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-[#e5e7eb]">
                        <span className="text-xs text-[#999999]">
                          Criado em {new Date(piece.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(piece)}>
                        <Edit className="mr-2 h-3 w-3" />
                        Editar
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(piece.id)}>
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
