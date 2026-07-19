import { CarritoCliente } from "@/features/carrito/CarritoCliente";

export const metadata = {
  title: "Tu carrito — SeArys",
};

export default function CarritoPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="mb-8 font-display text-3xl text-textoSubtitulo">Tu carrito</h1>
      <CarritoCliente />
    </div>
  );
}
