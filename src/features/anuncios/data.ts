import { supabase } from "@/lib/supabase/client";
import { Anuncio } from "@/lib/supabase/types";

export async function getAnuncios(): Promise<Anuncio[]> {
  if (!supabase) return [];

  const ahora = new Date().toISOString();

  const { data, error } = await supabase
    .from("anuncios")
    .select("id, tipo, media_url, link_url, orden")
    .eq("activo", true)
    .or(`fecha_inicio.is.null,fecha_inicio.lte.${ahora}`)
    .or(`fecha_fin.is.null,fecha_fin.gte.${ahora}`)
    .order("orden", { ascending: true });

  if (error) {
    console.error("Error consultando anuncios en Supabase:", error.message);
    return [];
  }

  return data as Anuncio[];
}
