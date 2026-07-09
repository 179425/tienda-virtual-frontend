"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCarritoStore } from "./store";
import { formatearPrecio } from "@/features/catalogo/data";
import { EnlaceBoton } from "@/components/ui/Boton";
import { construirEnlaceWhatsApp } from "@/features/checkout/whatsapp";

export function CarritoCliente() {
  const [montado, setMontado] = useState(false);
  const items = useCarritoStore((s) => s.items);
  const actualizarCantidad = useCarritoStore((s) => s.actualizarCantidad);
  const quitar = useCarritoStore((s) => s.quitar);
  const totalPrecio = useCarritoStore((s) => s.totalPrecio());

  useEffect(() => setMontado(true), []);

  if (!montado) return null;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-moss/40 py-20 text-center">
        <p className="font-display text-2xl text-forest">Tu carrito está vacío</p>
        <p className="mt-2 font-body text-sm text-ink/60">
          Explora el catálogo y agrega tus plantas favoritas.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-forest px-6 py-3 font-body text-sm text-paper hover:bg-ink transition-colors"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <ul className="flex flex-col gap-4">
        {items.map(({ producto, cantidad }) => (
          <li
            key={producto.id}
            className="flex gap-4 rounded-2xl bg-white/60 p-4 ring-1 ring-moss/20"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-moss50">
              <Image
                src={producto.imagen}
                alt={producto.nombre}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link
                    href={`/producto/${producto.slug}`}
                    className="font-display text-lg text-forest hover:text-clay"
                  >
                    {producto.nombre}
                  </Link>
                  <p className="font-mono text-sm text-ink/60">
                    {formatearPrecio(producto.precio)}
                  </p>
                </div>
                <button
                  onClick={() => quitar(producto.id)}
                  aria-label={`Quitar ${producto.nombre} del carrito`}
                  className="font-body text-xs text-clay hover:underline"
                >
                  Quitar
                </button>
              </div>

              <div className="flex items-center rounded-full border border-moss/40 w-fit">
                <button
                  aria-label="Reducir cantidad"
                  onClick={() => actualizarCantidad(producto.id, cantidad - 1)}
                  className="px-3 py-1 font-body text-base text-forest hover:text-clay"
                >
                  −
                </button>
                <span className="w-8 text-center font-mono text-sm">{cantidad}</span>
                <button
                  aria-label="Aumentar cantidad"
                  onClick={() => actualizarCantidad(producto.id, cantidad + 1)}
                  className="px-3 py-1 font-body text-base text-forest hover:text-clay"
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-2xl bg-forest p-6 text-paper">
        <p className="font-display text-xl">Resumen</p>
        <div className="mt-4 flex justify-between font-body text-sm text-moss50/80">
          <span>Total</span>
          <span className="font-mono text-lg text-paper">
            {formatearPrecio(totalPrecio)}
          </span>
        </div>
        <p className="mt-2 font-body text-xs text-moss50/60">
          El pago se coordina directamente por WhatsApp.
        </p>
        <EnlaceBoton
          href={construirEnlaceWhatsApp(items)}
          target="_blank"
          rel="noopener noreferrer"
          variante="secundario"
          className="mt-6 w-full"
        >
          Confirmar pedido por WhatsApp
        </EnlaceBoton>
      </aside>
    </div>
  );
}
