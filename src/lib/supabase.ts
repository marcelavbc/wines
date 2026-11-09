import { createClient } from "@supabase/supabase-js";

function requireEnv(value: string | undefined, name: string): string {
	if (!value) {
		throw new Error(`Falta ${name} en .env.local`);
	}
	return value;
}

const supabaseUrl = requireEnv(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	"NEXT_PUBLIC_SUPABASE_URL",
);
const supabaseKey = requireEnv(
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
	"NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
);

export const supabase = createClient(supabaseUrl, supabaseKey);
