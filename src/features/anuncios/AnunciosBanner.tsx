"use client";

import { useEffect, useState } from "react";
import { Anuncio } from "@/lib/supabase/types";

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

export function AnunciosBanner({ anuncios }: { anuncios: Anuncio[] }) {
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    if (anuncios.length < 2) return;
    const intervalo = setInterval(() => {
      setActivo((i) => (i + 1) % anuncios.length);
    }, SEGUNDOS_POR_SLIDE);
    return () => clearInterval(intervalo);
  }, [anuncios.length]);

  if (anuncios.length === 0) {
    // Sin anuncios cargados: se deja el espacio marcado, igual que antes.
    return (
      <div className="flex aspect-[3/1] max-h-[420px] w-full items-center justify-center border-2 border-dashed border-arena/40 bg-crema">
        <p className="font-mono text-xs uppercase tracking-wider text-arena">
          Espacio para anuncio / oferta destacada
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/1] max-h-[420px] w-full overflow-hidden bg-crema">
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
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
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
    </div>
  );
}
