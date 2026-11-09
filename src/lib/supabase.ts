import { createClient } from "@supabase/supabase-js";

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta ${name} en .env.local`);
  }
  return value;
}

const supabaseUrl = getEnvVar("NEXT_PUBLIC_SUPABASE_URL");
const supabaseKey = getEnvVar("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

export const supabase = createClient(supabaseUrl, supabaseKey);
