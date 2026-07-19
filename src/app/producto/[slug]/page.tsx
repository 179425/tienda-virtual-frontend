import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductoPorSlug, getProductos } from "@/features/catalogo/data";
import { ProductDetail } from "@/features/producto/ProductDetail";
import { ProductGrid } from "@/features/catalogo/ProductGrid";

// El inventario cambia desde otra app (gestión de inventario/ventas), así que
// esta página se revalida cada 60 segundos en vez de quedar fija desde el build.
export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const producto = await getProductoPorSlug(params.slug);
  if (!producto) return {};
  return {
    title: `${producto.nombre} — SeArys`,
    description: producto.descripcion_corta,
  };
}

export default async function ProductoPage({ params }: Props) {
  const [producto, todosLosProductos] = await Promise.all([
    getProductoPorSlug(params.slug),
    getProductos(),
  ]);
  if (!producto) notFound();

  // El catálogo sigue apareciendo debajo del producto (como en apps tipo
  // Temu), quitando el que ya se está viendo para no repetirlo.
  const otrosProductos = todosLosProductos.filter((p) => p.id !== producto.id);

  return (
    <div>
      <ProductDetail producto={producto} />

      <section className="mx-auto max-w-6xl px-5 pb-20 pt-4">
        <h2 className="mb-6 font-display text-2xl text-textoSubtitulo">Sigue explorando</h2>
        <ProductGrid productos={otrosProductos} />
      </section>
    </div>
  );
}
