import { ItemCarrito } from "@/features/carrito/store";
import { formatearPrecio } from "@/features/catalogo/data";
import { WHATSAPP_NUMERO } from "./config";

export function construirMensajePedido(items: ItemCarrito[], numeroPedido?: string): string {
  const lineas = items.map(
    (i) =>
      `• ${i.cantidad}x ${i.producto.nombre} — ${formatearPrecio(
        i.producto.precio * i.cantidad
      )}`
  );

  const total = items.reduce((acc, i) => acc + i.cantidad * i.producto.precio, 0);

  const mensaje = [
    "¡Hola! Quiero hacer este pedido:",
    ...(numeroPedido ? ["", `Pedido: ${numeroPedido}`] : []),
    "",
    ...lineas,
    "",
    `Total: ${formatearPrecio(total)}`,
    "",
    "Mi nombre:",
    "Mi dirección:",
  ].join("\n");

  return mensaje;
}

export function construirEnlaceWhatsApp(items: ItemCarrito[], numeroPedido?: string): string {
  const mensaje = construirMensajePedido(items, numeroPedido);
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}
