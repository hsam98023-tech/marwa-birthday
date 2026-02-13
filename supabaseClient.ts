import { createClient } from '@supabase/supabase-client'

export const supabase = createClient(
  'https://wzlkkbitespgurpnçamy.supabase.co', 
  'YOUR_ANON_KEY_HERE' // حط هنا الساروت (Anon Key) ديالك
)
