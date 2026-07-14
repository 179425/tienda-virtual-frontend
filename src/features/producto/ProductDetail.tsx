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
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div className="torn-leaf-edge relative aspect-[4/5] overflow-hidden rounded-2xl bg-moss50">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col">
        <Link href="/" className="font-body text-sm text-moss hover:text-clay">
          ← Volver al catálogo
        </Link>

        <p className="mt-6 font-mono text-xs uppercase tracking-wider text-moss">
          {producto.categoria}
        </p>
        <h1 className="mt-2 font-display text-4xl text-forest">{producto.nombre}</h1>
        <p className="mt-4 font-mono text-2xl text-forest">
          {formatearPrecio(producto.precio)}
        </p>

        <p className="mt-6 font-body text-base leading-relaxed text-ink/80">
          {producto.descripcion}
        </p>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center rounded-full border border-moss/40">
            <button
              aria-label="Reducir cantidad"
              onClick={() => setCantidad((c) => Math.max(1, c - 1))}
              className="px-4 py-2 font-body text-lg text-forest hover:text-clay"
            >
              −
            </button>
            <span className="w-8 text-center font-mono text-sm">{cantidad}</span>
            <button
              aria-label="Aumentar cantidad"
              onClick={() => setCantidad((c) => Math.min(producto.stock, c + 1))}
              className="px-4 py-2 font-body text-lg text-forest hover:text-clay"
            >
              +
            </button>
          </div>

          <Boton onClick={manejarAgregar} disabled={producto.stock === 0} className="flex-1">
            {agregado ? "Agregado ✓" : "Agregar al carrito"}
          </Boton>
        </div>

        {producto.stock === 0 ? (
          <p className="mt-3 font-body text-sm text-clay">Sin stock por ahora.</p>
        ) : (
          <p className="mt-3 font-body text-sm text-ink/50">
            {producto.stock} disponibles
          </p>
        )}
      </div>
    </div>
  );
}
