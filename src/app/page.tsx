import { Suspense } from "react";
import { getProductos, getCategorias } from "@/features/catalogo/data";
import { CatalogoCliente } from "@/features/catalogo/CatalogoCliente";
import { getAnuncios } from "@/features/anuncios/data";
import { AnunciosBanner } from "@/features/anuncios/AnunciosBanner";

// El catálogo depende del inventario real en Supabase, así que se revalida
// cada 60 segundos en vez de quedar fijo desde el build.
export const revalidate = 60;

export default async function Home() {
  const [productos, categorias, anuncios] = await Promise.all([
    getProductos(),
    getCategorias(),
    getAnuncios(),
  ]);

  return (
    <div>
      <AnunciosBanner anuncios={anuncios} categorias={categorias} />

      <section id="catalogo" className="mx-auto max-w-6xl px-5 py-10">
        <Suspense fallback={null}>
          <CatalogoCliente productos={productos} categorias={categorias} />
        </Suspense>
      </section>

      <section id="nosotros" className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-2xl bg-fondoSuave p-8 md:p-12">
          <h2 className="font-display text-2xl text-textoSubtitulo">¿Por qué comprar en SeArys?</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-textoEtiqueta">Precios</p>
              <p className="mt-1 font-body text-sm text-textoPrincipal/70">
                Precios de barrio, claros y sin sorpresas al momento de pagar.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-textoEtiqueta">Variedad</p>
              <p className="mt-1 font-body text-sm text-textoPrincipal/70">
                Aseo, alimentos, bebidas, mecatos y mascotas en un solo pedido.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-textoEtiqueta">Entrega</p>
              <p className="mt-1 font-body text-sm text-textoPrincipal/70">
                Cada pedido se confirma por WhatsApp antes de despachar.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
