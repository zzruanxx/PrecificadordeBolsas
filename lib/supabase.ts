import { createClient } from '@supabase/supabase-js'

// Use placeholder values to allow build to succeed without credentials
// At runtime, these will fail gracefully and return errors from API endpoints
// In production, these must be replaced with real credentials via environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
