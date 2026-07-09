import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductoPorSlug } from "@/features/catalogo/data";
import { ProductDetail } from "@/features/producto/ProductDetail";

// El inventario cambia desde otra app (gestión de inventario/ventas), así que
// esta página se revalida cada 60 segundos en vez de quedar fija desde el build.
export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const producto = await getProductoPorSlug(params.slug);
  if (!producto) return {};
  return {
    title: `${producto.nombre} — Verdum`,
    description: producto.descripcion_corta,
  };
}

export default async function ProductoPage({ params }: Props) {
  const producto = await getProductoPorSlug(params.slug);
  if (!producto) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <ProductDetail producto={producto} />
    </div>
  );
}
