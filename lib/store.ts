import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type MeasurementUnit } from './utils'

export interface Material {
  id: string
  materialId?: number
  name: string
  quantity: number
  unit: MeasurementUnit
  unitCost: number
  displayUnit: MeasurementUnit
  fromInventory: boolean
}

interface CalculatorState {
  pieceName: string
  materials: Material[]
  laborHours: number
  packagingCost: number
  profitMargin: number
  setPieceName: (name: string) => void
  setMaterials: (materials: Material[]) => void
  setLaborHours: (hours: number) => void
  setPackagingCost: (cost: number) => void
  setProfitMargin: (margin: number) => void
  resetCalculator: () => void
}

const initialState = {
  pieceName: '',
  materials: [],
  laborHours: 0,
  packagingCost: 0,
  profitMargin: 30,
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set) => ({
      ...initialState,
      setPieceName: (name) => set({ pieceName: name }),
      setMaterials: (materials) => set({ materials }),
      setLaborHours: (hours) => set({ laborHours: hours }),
      setPackagingCost: (cost) => set({ packagingCost: cost }),
      setProfitMargin: (margin) => set({ profitMargin: margin }),
      resetCalculator: () => set(initialState),
    }),
    {
      name: 'calculator-storage',
    }
  )
)

// ─── Settings Store ────────────────────────────────────────────────────────────

interface SettingsState {
  proLabore: number
  hoursPerMonth: number
  fixedCosts: number
  depreciation: number
  setProLabore: (value: number) => void
  setHoursPerMonth: (value: number) => void
  setFixedCosts: (value: number) => void
  setDepreciation: (value: number) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      proLabore: 3000,
      hoursPerMonth: 160,
      fixedCosts: 800,
      depreciation: 200,
      setProLabore: (value) => set({ proLabore: value }),
      setHoursPerMonth: (value) => set({ hoursPerMonth: value }),
      setFixedCosts: (value) => set({ fixedCosts: value }),
      setDepreciation: (value) => set({ depreciation: value }),
    }),
    { name: 'settings-storage' }
  )
)

// ─── Inventory Store ───────────────────────────────────────────────────────────

export interface InventoryMaterial {
  id: number
  name: string
  cost: number
  unit: MeasurementUnit
  stock: number
  minStock: number
}

const defaultInventory: InventoryMaterial[] = [
  { id: 1, name: 'Linha de Crochê 100g', cost: 12.5, unit: 'un', stock: 25, minStock: 10 },
  { id: 2, name: 'Tecido de Algodão', cost: 28.0, unit: 'm', stock: 15, minStock: 5 },
  { id: 3, name: 'Zíper 30cm', cost: 3.5, unit: 'cm', stock: 800, minStock: 150 },
  { id: 4, name: 'Botões Decorativos', cost: 0.8, unit: 'un', stock: 120, minStock: 50 },
  { id: 5, name: 'Fita de Cetim', cost: 5.2, unit: 'm', stock: 3, minStock: 10 },
  { id: 6, name: 'Tecido Especial', cost: 45.0, unit: 'm²', stock: 5, minStock: 2 },
]

interface InventoryState {
  materials: InventoryMaterial[]
  addMaterial: (material: Omit<InventoryMaterial, 'id'>) => void
  updateMaterial: (id: number, material: Omit<InventoryMaterial, 'id'>) => void
  deleteMaterial: (id: number) => void
  deductStock: (usedMaterials: { materialId: number; quantity: number }[]) => void
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      materials: defaultInventory,
      addMaterial: (material) =>
        set((state) => {
          const newId = Math.max(...state.materials.map((m) => m.id), 0) + 1
          return { materials: [...state.materials, { ...material, id: newId }] }
        }),
      updateMaterial: (id, material) =>
        set((state) => ({
          materials: state.materials.map((m) => (m.id === id ? { ...material, id } : m)),
        })),
      deleteMaterial: (id) =>
        set((state) => ({ materials: state.materials.filter((m) => m.id !== id) })),
      deductStock: (usedMaterials) =>
        set((state) => ({
          materials: state.materials.map((m) => {
            const used = usedMaterials.find((u) => u.materialId === m.id)
            return used ? { ...m, stock: Math.max(0, m.stock - used.quantity) } : m
          }),
        })),
    }),
    { name: 'inventory-storage' }
  )
)

// ─── Channels Store ────────────────────────────────────────────────────────────

export interface SalesChannel {
  id: number
  name: string
  feePercent: number
  fixedFee: number
}

const defaultChannels: SalesChannel[] = [
  { id: 1, name: 'Venda Direta', feePercent: 0, fixedFee: 0 },
  { id: 2, name: 'Instagram', feePercent: 0, fixedFee: 0 },
  { id: 3, name: 'Elo7', feePercent: 18, fixedFee: 0.4 },
  { id: 4, name: 'Mercado Livre', feePercent: 15, fixedFee: 0 },
  { id: 5, name: 'Shopee', feePercent: 12, fixedFee: 0 },
]

interface ChannelsState {
  channels: SalesChannel[]
  addChannel: (channel: Omit<SalesChannel, 'id'>) => void
  updateChannel: (id: number, channel: Omit<SalesChannel, 'id'>) => void
  deleteChannel: (id: number) => void
}

export const useChannelsStore = create<ChannelsState>()(
  persist(
    (set) => ({
      channels: defaultChannels,
      addChannel: (channel) =>
        set((state) => {
          const newId = Math.max(...state.channels.map((c) => c.id), 0) + 1
          return { channels: [...state.channels, { ...channel, id: newId }] }
        }),
      updateChannel: (id, channel) =>
        set((state) => ({
          channels: state.channels.map((c) => (c.id === id ? { ...channel, id } : c)),
        })),
      deleteChannel: (id) =>
        set((state) => ({ channels: state.channels.filter((c) => c.id !== id) })),
    }),
    { name: 'channels-storage' }
  )
)

// ─── Pieces Store ──────────────────────────────────────────────────────────────

export interface SavedPiece {
  id: string
  name: string
  materials: Material[]
  laborHours: number
  packagingCost: number
  profitMargin: number
  productionCost: number
  suggestedPrice: number
  createdAt: string
}

interface PiecesState {
  pieces: SavedPiece[]
  addPiece: (piece: Omit<SavedPiece, 'id' | 'createdAt'>) => void
  deletePiece: (id: string) => void
}

export const usePiecesStore = create<PiecesState>()(
  persist(
    (set) => ({
      pieces: [],
      addPiece: (piece) =>
        set((state) => ({
          pieces: [
            {
              ...piece,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
            ...state.pieces,
          ],
        })),
      deletePiece: (id) =>
        set((state) => ({ pieces: state.pieces.filter((p) => p.id !== id) })),
    }),
    { name: 'pieces-storage' }
  )
)
