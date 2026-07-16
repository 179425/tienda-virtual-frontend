import { createClient } from "@supabase/supabase-js";

// Este cliente queda listo para cuando el catálogo se conecte a Supabase.
// Por ahora el catálogo usa datos de ejemplo (ver src/features/catalogo/data.ts)
// para poder avanzar en la interfaz sin depender todavía de la base de datos.
//
// Para activarlo:
// 1. Crear un archivo .env.local con:
//      NEXT_PUBLIC_SUPABASE_URL=tu-url
//      NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
// 2. Reemplazar las funciones de src/features/catalogo/data.ts para que
//    consulten la tabla "productos" en vez del arreglo local.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
