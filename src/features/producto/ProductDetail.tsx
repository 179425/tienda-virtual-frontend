"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Producto } from "@/lib/supabase/types";
import { formatearPrecio } from "@/features/catalogo/data";
import { useCarritoStore } from "@/features/carrito/store";
import { Boton } from "@/components/ui/Boton";

export function ProductDetail({ producto }: { producto: Producto }) {
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const agregar = useCarritoStore((s) => s.agregar);

  function manejarAgregar() {
    agregar(producto, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  }

  return (
    // Móvil: imagen a todo el ancho arriba, info debajo (estilo Temu/Shein).
    // Escritorio (md+): vuelve a dos columnas contenidas, con la imagen en su
    // proporción normal, para que no se vea estirada en pantallas anchas.
    <div className="md:mx-auto md:max-w-6xl md:grid md:grid-cols-2 md:gap-16 md:px-5 md:py-12">
      <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden bg-fondoSuave md:h-auto md:aspect-[4/5] md:rounded-2xl">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        <Link
          href="/"
          aria-label="Volver al catálogo"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-blanco/90 text-textoPrincipal shadow-sm backdrop-blur hover:bg-blanco md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M14 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {/* Información del producto: debajo de la imagen en móvil, al lado en escritorio */}
      <div className="mx-auto max-w-3xl px-5 py-8 md:mx-0 md:max-w-none md:px-0 md:py-0 md:flex md:flex-col md:justify-center">
        <Link
          href="/"
          className="hidden font-body text-sm text-textoEtiqueta hover:text-textoSubtitulo md:mb-6 md:inline-block"
        >
          ← Volver al catálogo
        </Link>

        <p className="font-mono text-xs uppercase tracking-wider text-textoEtiqueta">
          {producto.categoria}
        </p>
        <h1 className="mt-2 font-display text-3xl text-textoSubtitulo md:text-4xl">
          {producto.nombre}
        </h1>
        <p className="mt-3 font-mono text-2xl text-textoSubtitulo">
          {formatearPrecio(producto.precio)}
        </p>

        <p className="mt-6 font-body text-base leading-relaxed text-textoPrincipal/80">
          {producto.descripcion}
        </p>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center rounded-full border border-bordeSuave/40">
            <button
              aria-label="Reducir cantidad"
              onClick={() => setCantidad((c) => Math.max(1, c - 1))}
              className="px-4 py-2 font-body text-lg text-textoSubtitulo hover:text-textoPrincipal"
            >
              −
            </button>
            <span className="w-8 text-center font-mono text-sm">{cantidad}</span>
            <button
              aria-label="Aumentar cantidad"
              onClick={() => setCantidad((c) => Math.min(producto.stock, c + 1))}
              className="px-4 py-2 font-body text-lg text-textoSubtitulo hover:text-textoPrincipal"
            >
              +
            </button>
          </div>

          <Boton onClick={manejarAgregar} disabled={producto.stock === 0} className="flex-1">
            {agregado ? "Agregado ✓" : "Agregar al carrito"}
          </Boton>
        </div>

        {producto.stock === 0 ? (
          <p className="mt-3 font-body text-sm text-textoAlerta">Sin stock por ahora.</p>
        ) : (
          <p className="mt-3 font-body text-sm text-textoPrincipal/50">
            {producto.stock} disponibles
          </p>
        )}
      </div>
    </div>
  );
}
