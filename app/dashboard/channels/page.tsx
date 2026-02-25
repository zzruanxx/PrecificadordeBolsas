'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit, Trash2, ShoppingCart } from 'lucide-react'
import { useChannelsStore, type SalesChannel } from '@/lib/store'

export default function ChannelsPage() {
  const { channels, addChannel, updateChannel, deleteChannel } = useChannelsStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newChannel, setNewChannel] = useState({
    name: '',
    feePercent: 0,
    fixedFee: 0
  })

  const handleAddChannel = () => {
    if (newChannel.name) {
      if (editingId) {
        updateChannel(editingId, newChannel)
        setEditingId(null)
      } else {
        addChannel(newChannel)
      }
      setNewChannel({ name: '', feePercent: 0, fixedFee: 0 })
      setShowAddForm(false)
    }
  }

  const handleEditChannel = (channel: SalesChannel) => {
    setNewChannel({
      name: channel.name,
      feePercent: channel.feePercent,
      fixedFee: channel.fixedFee
    })
    setEditingId(channel.id)
    setShowAddForm(true)
  }

  const handleDeleteChannel = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este canal?')) {
      deleteChannel(id)
    }
  }

  const handleCancelEdit = () => {
    setShowAddForm(false)
    setEditingId(null)
    setNewChannel({ name: '', feePercent: 0, fixedFee: 0 })
  }

  return (
    <div className="flex flex-col">
      <Header title="Canais de Venda" />
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#3A5A40]">
                Gerenciar Canais de Venda
              </h1>
              <p className="text-sm text-[#666666]">
                Configure as taxas de cada plataforma de venda
              </p>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Canal
            </Button>
          </div>

          {showAddForm && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-[#3A5A40]">
                  {editingId ? 'Editar Canal' : 'Adicionar Novo Canal'}
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <Input 
                    placeholder="Nome do Canal" 
                    className="col-span-2"
                    value={newChannel.name}
                    onChange={(e) => setNewChannel({...newChannel, name: e.target.value})}
                  />
                  <Input 
                    type="number" 
                    placeholder="Taxa (%)"
                    value={newChannel.feePercent || ''}
                    onChange={(e) => setNewChannel({...newChannel, feePercent: parseFloat(e.target.value) || 0})}
                  />
                  <Input
                    type="number"
                    placeholder="Taxa Fixa (R$)"
                    className="col-span-2"
                    value={newChannel.fixedFee || ''}
                    onChange={(e) => setNewChannel({...newChannel, fixedFee: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleAddChannel}>
                    {editingId ? 'Atualizar' : 'Salvar'}
                  </Button>
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {channels.map((channel) => (
              <Card key={channel.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-[#3A5A40]" />
                      {channel.name}
                    </span>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditChannel(channel)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteChannel(channel.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#666666]">Taxa Percentual:</span>
                    <span className="text-sm font-semibold text-[#3A5A40]">
                      {channel.feePercent}%
                    </span>
                  </div>
                  {channel.fixedFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-[#666666]">Taxa Fixa:</span>
                      <span className="text-sm font-semibold text-[#3A5A40]">
                        R$ {channel.fixedFee.toFixed(2)}
                      </span>
                    </div>
                  )}
                  {channel.feePercent === 0 && channel.fixedFee === 0 && (
                    <p className="text-sm text-[#22c55e]">
                      ✓ Sem taxas - Lucro máximo
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 bg-[#F9FAFB]">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3 text-[#3A5A40]">
                Como as taxas são calculadas?
              </h3>
              <div className="space-y-2 text-sm text-[#666666]">
                <p>
                  • <strong>Taxa Percentual:</strong> Porcentagem do preço de venda
                  cobrada pela plataforma
                </p>
                <p>
                  • <strong>Taxa Fixa:</strong> Valor fixo cobrado por transação
                </p>
                <p className="mt-4 text-[#3A5A40]">
                  O simulador na calculadora ajusta automaticamente o preço de venda
                  para manter sua margem de lucro em cada canal.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
