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
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoria(null)}
            className={`rounded-full px-4 py-2 font-body text-xs tracking-wide transition-colors ${
              categoria === null
                ? "bg-tomate text-papel"
                : "bg-white/60 text-carbon/70 ring-1 ring-arena/30 hover:bg-crema"
            }`}
          >
            Todas
          </button>
          {categorias.map((c) => (
            <button
              key={c}
              onClick={() => setCategoria(c)}
              className={`rounded-full px-4 py-2 font-body text-xs tracking-wide transition-colors ${
                categoria === c
                  ? "bg-tomate text-papel"
                  : "bg-white/60 text-carbon/70 ring-1 ring-arena/30 hover:bg-crema"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 font-mono text-xs text-carbon/50">
        {productosFiltrados.length}{" "}
        {productosFiltrados.length === 1 ? "producto" : "productos"}
      </p>

      <div className="mt-6">
        <ProductGrid productos={productosFiltrados} />
      </div>
    </div>
  );
}
