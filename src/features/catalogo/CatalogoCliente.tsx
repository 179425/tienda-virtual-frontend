"use client";

import { useMemo, useState } from "react";
import { Producto } from "@/lib/supabase/types";
import { ProductGrid } from "./ProductGrid";

export function CatalogoCliente({
  productos,
  categorias,
}: {
  productos: Producto[];
  categorias: string[];
}) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState<string | null>(null);

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            className="w-full rounded-full border border-arena/40 bg-white/70 px-5 py-3 font-body text-sm text-carbon placeholder:text-carbon/40 focus:border-mandarina"
          />
        </div>

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
