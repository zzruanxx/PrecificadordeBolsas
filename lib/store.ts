import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type MeasurementUnit } from './utils'

interface Material {
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
