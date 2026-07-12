import { supabase } from "@/lib/supabase/client";
import { ItemCarrito } from "@/features/carrito/store";

export type ResultadoPedido =
  | { ok: true; numeroPedido: string }
  | { ok: false; error: string };

// Genera un número de pedido legible y único a partir de la fecha/hora.
// Ej: V-M3K2P9A1
function generarNumeroPedido(): string {
  return `V-${Date.now().toString(36).toUpperCase()}`;
}

// Inserta el pedido en la tabla "pending_orders" (la misma que consume el
// POS de facturación) para que aparezca ahí automáticamente, listo para
// que el negocio lo cargue al carrito y lo facture.
//
// Forma del arreglo "items" tal como lo espera el POS (ver orders.js):
//   { product_id: number, quantity: number, name: string }
export async function crearPedido(items: ItemCarrito[]): Promise<ResultadoPedido> {
  if (!supabase) {
    return { ok: false, error: "Supabase no está configurado en la tienda." };
  }
  if (items.length === 0) {
    return { ok: false, error: "El carrito está vacío." };
  }

  const numeroPedido = generarNumeroPedido();
  const total = items.reduce((acc, i) => acc + i.cantidad * i.producto.precio, 0);

  const filasItems = items.map((i) => ({
    product_id: Number(i.producto.id),
    quantity: i.cantidad,
    name: i.producto.nombre,
  }));

  const { error } = await supabase.from("pending_orders").insert({
    order_number: numeroPedido,
    items: filasItems,
    total,
    status: "pending",
  });

  if (error) {
    console.error("Error creando pedido en Supabase:", error.message);
    return { ok: false, error: error.message };
  }

  return { ok: true, numeroPedido };
}
