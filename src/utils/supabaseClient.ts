import { createClient } from "@supabase/supabase-js";

export const supabaseClient = async (token: string) => {
	const supabase = createClient(process.env.NEXT_PUBLIC_SP_URL!, process.env.NEXT_PUBLIC_SP_ANON_KEY!, {
		global: {
			headers: { Authorization: `Bearer ${token}` },
		},
	});

	return supabase;
}