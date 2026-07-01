const SUPABASE_URL = "https://lnqnxqvcxshviwpsdqce.supabase.co";

const SUPABASE_KEY = "sb_publishable_QqVkHVgCq2xZQpsf7UXJNA_Ee-AWFro";

const { createClient } = supabase;

const db = createClient(SUPABASE_URL, SUPABASE_KEY);