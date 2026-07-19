import Link from "next/link";
import Image from "next/image";
import { Producto } from "@/lib/supabase/types";
import { formatearPrecio } from "./data";

export function ProductCard({ producto }: { producto: Producto }) {
  return (
    <Link
      href={`/producto/${producto.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white/60 shadow-sm ring-1 ring-bordeSuave/20 transition-transform hover:-translate-y-1"
    >
      <div className="torn-leaf-edge relative aspect-[4/5] overflow-hidden bg-fondoSuave">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {producto.stock <= 5 && (
          <span className="absolute left-3 top-3 rounded-full bg-insigniaOfertaFondo px-3 py-1 font-mono text-[11px] text-blanco">
            Últimas unidades
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-mono text-[11px] uppercase tracking-wider text-textoEtiqueta">
          {producto.categoria}
        </p>
        <h3 className="mt-1 font-display text-lg text-textoPrincipal">{producto.nombre}</h3>
        <p className="mt-1 line-clamp-2 font-body text-sm text-textoPrincipal/70">
          {producto.descripcion_corta}
        </p>
        <p className="mt-3 font-mono text-base font-semibold text-textoSubtitulo">
          {formatearPrecio(producto.precio)}
        </p>
      </div>
    </Link>
  );
}
