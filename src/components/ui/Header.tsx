"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCarritoStore } from "@/features/carrito/store";

export function Header() {
  const router = useRouter();
  const totalItems = useCarritoStore((s) => s.totalItems());
  const [montado, setMontado] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  // Evita el desajuste de hidratación: el conteo del carrito
  // solo existe una vez que el localStorage se leyó en el cliente.
  useEffect(() => setMontado(true), []);

  function manejarBusqueda(e: React.FormEvent) {
    e.preventDefault();
    const params = busqueda.trim() ? `?buscar=${encodeURIComponent(busqueda.trim())}` : "";
    router.push(`/${params}#catalogo`);
  }

  return (
    <header className="sticky top-0 z-40 bg-encabezadoFondo shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-5 py-4 md:flex-nowrap md:gap-6">
        <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-encabezadoTexto">
          SeArys
        </Link>

        <form onSubmit={manejarBusqueda} className="order-3 w-full md:order-none md:flex-1">
          <div className="relative">
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar productos, marcas y más..."
              aria-label="Buscar productos"
              className="w-full rounded-full border-none bg-buscadorFondo px-5 py-2.5 pr-12 font-body text-sm text-buscadorTexto placeholder:text-buscadorTexto/40 focus:outline-none focus:ring-2 focus:ring-buscadorTexto/20"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-buscadorTexto/60 hover:text-buscadorTexto transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </form>

        <nav className="hidden gap-6 font-body text-sm font-medium text-encabezadoTexto md:flex">
          <Link href="/#nosotros" className="hover:underline underline-offset-4 whitespace-nowrap">
            Domicilios
          </Link>
        </nav>

        <Link
          href="/carrito"
          aria-label="Ver carrito de compras"
          className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-encabezadoTexto/30 text-encabezadoTexto hover:bg-white/10 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="21" r="1.4" fill="currentColor" />
            <circle cx="17" cy="21" r="1.4" fill="currentColor" />
          </svg>
          {montado && totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-notificacionFondo text-[11px] font-semibold text-notificacionTexto">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
