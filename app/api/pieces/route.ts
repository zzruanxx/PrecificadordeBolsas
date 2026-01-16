import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all pieces
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('pieces')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching pieces:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new piece
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      materials,
      laborHours,
      packagingCost,
      profitMargin,
      productionCost,
      suggestedPrice,
    } = body

    // Validate required fields
    if (!name || !materials || laborHours === undefined || productionCost === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: name, materials, laborHours, productionCost' },
        { status: 400 }
      )
    }

    // TODO: Get authenticated user ID from Supabase Auth
    // const { data: { user } } = await supabase.auth.getUser()
    // if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('pieces')
      .insert([
        {
          name,
          materials,
          labor_hours: laborHours,
          packaging_cost: packagingCost || 0,
          profit_margin: profitMargin || 30,
          production_cost: productionCost,
          suggested_price: suggestedPrice,
          // user_id: user.id, // TODO: Add when auth is implemented
        },
      ])
      .select()

    if (error) {
      console.error('Error creating piece:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data[0] }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
