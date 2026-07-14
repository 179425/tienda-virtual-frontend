"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCarritoStore } from "@/features/carrito/store";

export function Header() {
  const totalItems = useCarritoStore((s) => s.totalItems());
  const [montado, setMontado] = useState(false);

  // Evita el desajuste de hidratación: el conteo del carrito
  // solo existe una vez que el localStorage se leyó en el cliente.
  useEffect(() => setMontado(true), []);

  return (
    <header className="sticky top-0 z-40 border-b border-moss/30 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-2xl font-medium tracking-tight text-forest">
          SeArys
        </Link>

        <nav className="hidden gap-8 font-body text-sm text-ink md:flex">
          <Link href="/" className="hover:text-clay transition-colors">
            Catálogo
          </Link>
          <Link href="/#nosotros" className="hover:text-clay transition-colors">
            Cuidados
          </Link>
        </nav>

        <Link
          href="/carrito"
          aria-label="Ver carrito de compras"
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-moss text-forest hover:bg-moss50 transition-colors"
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
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-semibold text-forest">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
