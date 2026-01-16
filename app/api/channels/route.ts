import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all channels
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('sales_channels')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching channels:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new channel
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, feePercent, fixedFee } = body

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Missing required field: name' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('sales_channels')
      .insert([
        {
          name,
          fee_percent: feePercent || 0,
          fixed_fee: fixedFee || 0,
        },
      ])
      .select()

    if (error) {
      console.error('Error creating channel:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data[0] }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
