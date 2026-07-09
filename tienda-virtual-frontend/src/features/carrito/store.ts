import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Producto } from "@/lib/supabase/types";

export type ItemCarrito = {
  producto: Producto;
  cantidad: number;
};

type EstadoCarrito = {
  items: ItemCarrito[];
  agregar: (producto: Producto, cantidad?: number) => void;
  quitar: (productoId: string) => void;
  actualizarCantidad: (productoId: string, cantidad: number) => void;
  vaciar: () => void;
  totalItems: () => number;
  totalPrecio: () => number;
};

export const useCarritoStore = create<EstadoCarrito>()(
  persist(
    (set, get) => ({
      items: [],

      agregar: (producto, cantidad = 1) => {
        set((estado) => {
          const existente = estado.items.find((i) => i.producto.id === producto.id);
          if (existente) {
            return {
              items: estado.items.map((i) =>
                i.producto.id === producto.id
                  ? { ...i, cantidad: i.cantidad + cantidad }
                  : i
              ),
            };
          }
          return { items: [...estado.items, { producto, cantidad }] };
        });
      },

      quitar: (productoId) => {
        set((estado) => ({
          items: estado.items.filter((i) => i.producto.id !== productoId),
        }));
      },

      actualizarCantidad: (productoId, cantidad) => {
        if (cantidad <= 0) {
          get().quitar(productoId);
          return;
        }
        set((estado) => ({
          items: estado.items.map((i) =>
            i.producto.id === productoId ? { ...i, cantidad } : i
          ),
        }));
      },

      vaciar: () => set({ items: [] }),

      totalItems: () => get().items.reduce((acc, i) => acc + i.cantidad, 0),

      totalPrecio: () =>
        get().items.reduce((acc, i) => acc + i.cantidad * i.producto.precio, 0),
    }),
    { name: "tienda-virtual-carrito" }
  )
);
