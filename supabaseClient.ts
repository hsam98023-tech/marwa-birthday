import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wzlkkbitespgurpncamy.supabase.co';
// Note: In a real production app, ensure this key is restricted or use a backend proxy if Row Level Security is not sufficient.
// Using the key provided in the prompt.
const supabaseKey = 'sb_publishable_i8oa1sU6vVZCncAv6LlNNA_0UM69X8I';

export const supabase = createClient(supabaseUrl, supabaseKey);