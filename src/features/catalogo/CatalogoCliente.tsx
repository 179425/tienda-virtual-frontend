"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Producto } from "@/lib/supabase/types";
import { ProductGrid } from "./ProductGrid";

export function CatalogoCliente({
  productos,
  categorias,
}: {
  productos: Producto[];
  categorias: string[];
}) {
  const searchParams = useSearchParams();
  const [busqueda, setBusqueda] = useState(searchParams.get("buscar") ?? "");
  const [categoria, setCategoria] = useState<string | null>(searchParams.get("categoria"));

  // El buscador vive en el encabezado (visible en toda la tienda) y manda
  // el texto por la URL (?buscar=...). Aquí lo sincronizamos con el filtro local.
  useEffect(() => {
    setBusqueda(searchParams.get("buscar") ?? "");
  }, [searchParams]);

  // Los círculos de categoría del banner enlazan con ?categoria=..., así que
  // al llegar (o volver) con ese parámetro en la URL, el filtro se aplica solo.
  useEffect(() => {
    setCategoria(searchParams.get("categoria"));
  }, [searchParams]);

  const productosFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return productos.filter((p) => {
      const coincideTexto =
        !q ||
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion_corta.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q);
      const coincideCategoria = !categoria || p.categoria === categoria;
      return coincideTexto && coincideCategoria;
    });
  }, [productos, busqueda, categoria]);

  return (
    <div>
      <ProductGrid productos={productosFiltrados} />
    </div>
  );
}
