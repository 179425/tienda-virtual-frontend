import { supabase } from "@/lib/supabase/client";
import { Producto, ProductoDB } from "@/lib/supabase/types";

const IMAGEN_RESERVA = "/placeholder-producto.svg";

// Genera un slug legible a partir del nombre (la tabla "products" no tiene
// columna de slug, así que se calcula al vuelo desde "name", que es único).
function slugify(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapearProducto(fila: ProductoDB): Producto {
  const descripcion = fila.description ?? "";
  return {
    id: String(fila.id),
    slug: slugify(fila.name),
    nombre: fila.name,
    categoria: fila.category ?? "Otros",
    precio: Number(fila.sale_price ?? 0),
    descripcion,
    descripcion_corta:
      descripcion.length > 110 ? `${descripcion.slice(0, 110).trim()}…` : descripcion,
    imagen: fila.image_url || IMAGEN_RESERVA,
    stock: fila.quantity ?? 0,
  };
}

async function obtenerFilas(): Promise<ProductoDB[]> {
  if (!supabase) {
    console.error(
      "Supabase no está configurado: revisa NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local"
    );
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, name, description, category, image_url, sale_price, quantity, barcode, provider, has_iva")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error consultando productos en Supabase:", error.message);
    return [];
  }

  return data as ProductoDB[];
}

export async function getProductos(): Promise<Producto[]> {
  const filas = await obtenerFilas();
  return filas.map(mapearProducto);
}

export async function getProductoPorSlug(slug: string): Promise<Producto | undefined> {
  const productos = await getProductos();
  return productos.find((p) => p.slug === slug);
}

export async function getCategorias(): Promise<string[]> {
  const productos = await getProductos();
  return Array.from(new Set(productos.map((p) => p.categoria)));
}

export function formatearPrecio(precio: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(precio);
}
