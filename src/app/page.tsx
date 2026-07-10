import Image from "next/image";
import { getProductos, getCategorias } from "@/features/catalogo/data";
import { CatalogoCliente } from "@/features/catalogo/CatalogoCliente";

// El catálogo depende del inventario real en Supabase, así que se revalida
// cada 60 segundos en vez de quedar fijo desde el build.
export const revalidate = 60;

export default async function Home() {
  const [productos, categorias] = await Promise.all([getProductos(), getCategorias()]);

  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-12 md:grid-cols-2 md:items-center md:pt-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-moss">
            Vivero de interior
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-forest md:text-6xl">
            Plantas que se quedan a vivir contigo.
          </h1>
          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-ink/70">
            Seleccionamos cada planta y cada maceta a mano. Arma tu pedido, escríbenos
            por WhatsApp y coordinamos la entrega — sin vueltas.
          </p>
          <a
            href="#catalogo"
            className="mt-8 inline-flex rounded-full bg-forest px-6 py-3 font-body text-sm text-paper hover:bg-ink transition-colors"
          >
            Ver catálogo
          </a>
        </div>

        <div className="torn-leaf-edge relative aspect-[4/5] overflow-hidden rounded-2xl bg-moss50 md:aspect-square">
          <Image
            src="https://images.unsplash.com/photo-1754380629457-b833f6bea68a?q=80&w=1000&auto=format&fit=crop"
            alt="Rincón con plantas de interior sobre un mueble de madera"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5">
        <div className="leaf-vein-divider" />
      </div>

      <section id="catalogo" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-8">
          <h2 className="font-display text-3xl text-forest">Catálogo</h2>
          <p className="mt-1 font-body text-sm text-ink/60">
            {productos.length} productos disponibles ahora mismo
          </p>
        </div>
        <CatalogoCliente productos={productos} categorias={categorias} />
      </section>

      <section id="nosotros" className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-2xl bg-moss50 p-8 md:p-12">
          <h2 className="font-display text-2xl text-forest">Cuidados básicos</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-moss">Luz</p>
              <p className="mt-1 font-body text-sm text-ink/70">
                La mayoría prefiere luz indirecta, lejos del sol directo del mediodía.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-moss">Riego</p>
              <p className="mt-1 font-body text-sm text-ink/70">
                Revisa la tierra antes de regar: mejor de menos que de más.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-moss">Entrega</p>
              <p className="mt-1 font-body text-sm text-ink/70">
                Cada pedido se confirma por WhatsApp antes de despachar.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
