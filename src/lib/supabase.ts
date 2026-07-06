import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** Null when env vars are missing — the UI falls back gracefully. */
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export async function sendMessage(input: { name: string; email: string; message: string }) {
  if (!supabase) throw new Error("Supabase not configured");
  const { error } = await supabase.from("messages").insert(input);
  if (error) throw error;
}

/** Fire-and-forget page view tracking; never blocks or breaks the UI. */
export function trackView() {
  if (!supabase) return;
  supabase
    .from("page_views")
    .insert({ path: window.location.pathname, user_agent: navigator.userAgent.slice(0, 255) })
    .then(({ error }) => {
      if (error) console.debug("analytics skipped:", error.message);
    });
}
