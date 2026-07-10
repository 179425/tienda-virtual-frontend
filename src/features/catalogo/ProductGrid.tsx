import { Producto } from "@/lib/supabase/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ productos }: { productos: Producto[] }) {
  if (productos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-moss/40 py-16 text-center">
        <p className="font-display text-xl text-forest">No encontramos nada por acá</p>
        <p className="mt-2 font-body text-sm text-ink/60">
          Prueba con otra palabra o revisa el catálogo completo.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {productos.map((p) => (
        <ProductCard key={p.id} producto={p} />
      ))}
    </div>
  );
}
