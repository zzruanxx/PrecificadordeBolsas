import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Measurement unit conversion utilities
export type MeasurementUnit = 'cm' | 'm' | 'cm²' | 'm²' | 'un' | 'kg' | 'g' | 'l' | 'ml'

export function convertToCm(value: number, fromUnit: MeasurementUnit): number {
  switch (fromUnit) {
    case 'm':
      return value * 100
    case 'cm':
      return value
    default:
      return value
  }
}

export function convertToCm2(value: number, fromUnit: MeasurementUnit): number {
  switch (fromUnit) {
    case 'm²':
      return value * 10000
    case 'cm²':
      return value
    default:
      return value
  }
}

export function convertMeasurement(value: number, fromUnit: MeasurementUnit, toUnit: MeasurementUnit): number {
  // Linear measurements (cm, m)
  if ((fromUnit === 'cm' || fromUnit === 'm') && (toUnit === 'cm' || toUnit === 'm')) {
    const inCm = convertToCm(value, fromUnit)
    if (toUnit === 'm') {
      return inCm / 100
    }
    return inCm
  }
  
  // Area measurements (cm², m²)
  if ((fromUnit === 'cm²' || fromUnit === 'm²') && (toUnit === 'cm²' || toUnit === 'm²')) {
    const inCm2 = convertToCm2(value, fromUnit)
    if (toUnit === 'm²') {
      return inCm2 / 10000
    }
    return inCm2
  }
  
  // Weight conversions (kg, g)
  if ((fromUnit === 'kg' || fromUnit === 'g') && (toUnit === 'kg' || toUnit === 'g')) {
    const inG = fromUnit === 'kg' ? value * 1000 : value
    return toUnit === 'kg' ? inG / 1000 : inG
  }
  
  // Volume conversions (l, ml)
  if ((fromUnit === 'l' || fromUnit === 'ml') && (toUnit === 'l' || toUnit === 'ml')) {
    const inMl = fromUnit === 'l' ? value * 1000 : value
    return toUnit === 'l' ? inMl / 1000 : inMl
  }
  
  // If no conversion needed or units don't match, return original value
  return value
}

export function getUnitLabel(unit: MeasurementUnit): string {
  const labels: Record<MeasurementUnit, string> = {
    'cm': 'cm (centímetros)',
    'm': 'm (metros)',
    'cm²': 'cm² (centímetros quadrados)',
    'm²': 'cm² (metros quadrados)',
    'un': 'un (unidades)',
    'kg': 'kg (quilogramas)',
    'g': 'g (gramas)',
    'l': 'l (litros)',
    'ml': 'ml (mililitros)'
  }
  return labels[unit] || unit
}

export function getConvertibleUnits(unit: MeasurementUnit): MeasurementUnit[] {
  const conversions: Record<MeasurementUnit, MeasurementUnit[]> = {
    'cm': ['cm', 'm'],
    'm': ['m', 'cm'],
    'cm²': ['cm²', 'm²'],
    'm²': ['m²', 'cm²'],
    'kg': ['kg', 'g'],
    'g': ['g', 'kg'],
    'l': ['l', 'ml'],
    'ml': ['ml', 'l'],
    'un': ['un']
  }
  return conversions[unit] || [unit]
}
