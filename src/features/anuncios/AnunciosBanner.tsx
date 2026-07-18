"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Anuncio } from "@/lib/supabase/types";
import { obtenerImagenCategoria } from "@/features/categorias/imagenes";

const SEGUNDOS_POR_SLIDE = 5000;

function Slide({ anuncio }: { anuncio: Anuncio }) {
  const contenido =
    anuncio.tipo === "video" ? (
      <video
        src={anuncio.media_url}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={anuncio.media_url}
        alt="Anuncio"
        className="h-full w-full object-cover"
      />
    );

  if (!anuncio.link_url) return contenido;

  return (
    <a href={anuncio.link_url} className="block h-full w-full">
      {contenido}
    </a>
  );
}

// Carrusel de círculos de categoría, anclado al pie del banner (por dentro,
// sin salirse). El primero ("Todas") quita cualquier filtro; los demás
// enlazan al catálogo ya filtrado por esa categoría.
function CategoriasEnBanner({ categorias }: { categorias: string[] }) {
  if (categorias.length === 0) return null;

  return (
    <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-3 pt-6">
      <div className="flex max-w-full gap-3 overflow-x-auto px-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <Link href="/#catalogo" className="flex shrink-0 flex-col items-center gap-1">
          <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-papel bg-tomate text-papel shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor" />
            </svg>
          </span>
          <span className="rounded-full bg-carbon/40 px-1.5 py-0.5 font-body text-[10px] leading-none text-papel">
            Todas
          </span>
        </Link>

        {categorias.map((c) => (
          <Link
            key={c}
            href={`/?categoria=${encodeURIComponent(c)}#catalogo`}
            className="flex shrink-0 flex-col items-center gap-1"
          >
            <span className="relative block h-12 w-12 overflow-hidden rounded-full border-2 border-papel bg-crema shadow-sm">
              <Image
                src={obtenerImagenCategoria(c)}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <span className="rounded-full bg-carbon/40 px-1.5 py-0.5 font-body text-[10px] leading-none text-papel">
              {c}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function AnunciosBanner({
  anuncios,
  categorias,
}: {
  anuncios: Anuncio[];
  categorias: string[];
}) {
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    if (anuncios.length < 2) return;
    const intervalo = setInterval(() => {
      setActivo((i) => (i + 1) % anuncios.length);
    }, SEGUNDOS_POR_SLIDE);
    return () => clearInterval(intervalo);
  }, [anuncios.length]);

  if (anuncios.length === 0) {
    // Sin anuncios cargados: se deja el espacio marcado, igual que antes,
    // pero las categorías igual aparecen al pie.
    return (
      <div className="relative aspect-[16/7] max-h-[280px] min-h-[180px] w-full border-2 border-dashed border-arena/40 bg-crema">
        <p className="flex h-full items-center justify-center pb-14 font-mono text-xs uppercase tracking-wider text-arena">
          Espacio para anuncio / oferta destacada
        </p>
        <CategoriasEnBanner categorias={categorias} />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/7] max-h-[280px] min-h-[180px] w-full overflow-hidden bg-crema">
      {anuncios.map((anuncio, i) => (
        <div
          key={anuncio.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === activo ? 1 : 0 }}
        >
          <Slide anuncio={anuncio} />
        </div>
      ))}

      {anuncios.length > 1 && (
        <div className="absolute left-1/2 top-3 z-10 flex -translate-x-1/2 gap-2">
          {anuncios.map((anuncio, i) => (
            <button
              key={anuncio.id}
              onClick={() => setActivo(i)}
              aria-label={`Ver anuncio ${i + 1}`}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                i === activo ? "w-4 bg-papel" : "bg-papel/50"
              }`}
            />
          ))}
        </div>
      )}

      <CategoriasEnBanner categorias={categorias} />
    </div>
  );
}
