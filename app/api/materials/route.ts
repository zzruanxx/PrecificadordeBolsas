import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all materials
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching materials:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new material
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, cost, unit, stock, minStock } = body

    // Validate required fields
    if (!name || cost === undefined || !unit) {
      return NextResponse.json(
        { error: 'Missing required fields: name, cost, unit' },
        { status: 400 }
      )
    }

    // TODO: Get authenticated user ID from Supabase Auth
    // const { data: { user } } = await supabase.auth.getUser()
    // if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('materials')
      .insert([
        {
          name,
          cost,
          unit,
          stock: stock || 0,
          min_stock: minStock || 0,
          // user_id: user.id, // TODO: Add when auth is implemented
        },
      ])
      .select()

    if (error) {
      console.error('Error creating material:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data[0] }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
