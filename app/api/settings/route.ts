import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET settings
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('atelier_settings')
      .select('*')
      .single()

    if (error) {
      // If no settings exist yet, return default values
      if (error.code === 'PGRST116') {
        return NextResponse.json({
          data: {
            pro_labore: 3000,
            hours_per_month: 160,
            fixed_costs: 800,
            depreciation: 200,
          },
        })
      }
      console.error('Error fetching settings:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST/PUT settings (upsert)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { proLabore, hoursPerMonth, fixedCosts, depreciation } = body

    // Validate required fields
    if (
      proLabore === undefined ||
      hoursPerMonth === undefined ||
      fixedCosts === undefined ||
      depreciation === undefined
    ) {
      return NextResponse.json(
        { error: 'Missing required fields: proLabore, hoursPerMonth, fixedCosts, depreciation' },
        { status: 400 }
      )
    }

    // Upsert settings
    const { data, error } = await supabase
      .from('atelier_settings')
      .upsert(
        {
          pro_labore: proLabore,
          hours_per_month: hoursPerMonth,
          fixed_costs: fixedCosts,
          depreciation: depreciation,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id',
        }
      )
      .select()

    if (error) {
      console.error('Error saving settings:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data[0] })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
