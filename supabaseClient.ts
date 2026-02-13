import { createClient } from '@supabase/supabase-client'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wzlkkbitespgurpnçamy.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY_HERE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
