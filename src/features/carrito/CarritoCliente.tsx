"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCarritoStore } from "./store";
import { formatearPrecio } from "@/features/catalogo/data";
import { Boton } from "@/components/ui/Boton";
import { construirEnlaceWhatsApp } from "@/features/checkout/whatsapp";
import { crearPedido } from "@/features/checkout/pedidos";

export function CarritoCliente() {
  const [montado, setMontado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const items = useCarritoStore((s) => s.items);
  const actualizarCantidad = useCarritoStore((s) => s.actualizarCantidad);
  const quitar = useCarritoStore((s) => s.quitar);
  const vaciar = useCarritoStore((s) => s.vaciar);
  const totalPrecio = useCarritoStore((s) => s.totalPrecio());

  useEffect(() => setMontado(true), []);

  // Primero registra el pedido en Supabase (para que llegue automáticamente
  // al POS de facturación) y solo después abre WhatsApp para la confirmación
  // con el cliente. Si Supabase falla, igual deja seguir por WhatsApp para
  // no bloquear la venta, pero avisa del error.
  async function manejarConfirmarPedido() {
    setEnviando(true);
    setError(null);

    const resultado = await crearPedido(items);

    if (resultado.ok) {
      window.open(construirEnlaceWhatsApp(items, resultado.numeroPedido), "_blank", "noopener,noreferrer");
      vaciar();
    } else {
      setError(
        "No pudimos registrar el pedido automáticamente, pero puedes continuar por WhatsApp."
      );
      window.open(construirEnlaceWhatsApp(items), "_blank", "noopener,noreferrer");
    }

    setEnviando(false);
  }

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
                  onClick={() =>
                    actualizarCantidad(producto.id, Math.min(producto.stock, cantidad + 1))
                  }
                  disabled={cantidad >= producto.stock}
                  className="px-3 py-1 font-body text-base text-forest hover:text-clay disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-forest"
                >
                  +
                </button>
              </div>
              {cantidad >= producto.stock && (
                <p className="mt-1 font-mono text-[11px] text-ink/40">
                  Máximo disponible: {producto.stock}
                </p>
              )}
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
        <Boton
          onClick={manejarConfirmarPedido}
          disabled={enviando}
          variante="secundario"
          className="mt-6 w-full"
        >
          {enviando ? "Enviando..." : "Confirmar pedido por WhatsApp"}
        </Boton>
        {error && (
          <p className="mt-3 font-body text-xs text-clay">{error}</p>
        )}
      </aside>
    </div>
  );
}
