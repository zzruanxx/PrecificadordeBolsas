import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET single piece
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabase
      .from('pieces')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching piece:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Piece not found' }, { status: 404 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT update piece
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    const { data, error } = await supabase
      .from('pieces')
      .update({
        name,
        materials,
        labor_hours: laborHours,
        packaging_cost: packagingCost,
        profit_margin: profitMargin,
        production_cost: productionCost,
        suggested_price: suggestedPrice,
      })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating piece:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Piece not found' }, { status: 404 })
    }

    return NextResponse.json({ data: data[0] })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE piece
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { error } = await supabase
      .from('pieces')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting piece:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
