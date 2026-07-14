// Tipo que usa toda la interfaz (catálogo, producto, carrito).
export type Producto = {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  descripcion_corta: string;
  precio: number;
  categoria: string;
  imagen: string;
  stock: number;
};

// Forma real de la tabla "products" en Supabase (proyecto ya existente,
// compartido con un sistema de inventario/ventas).
export type ProductoDB = {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
  image_url: string | null;
  sale_price: number;
  quantity: number;
  barcode: string | null;
  provider: string | null;
  has_iva: boolean | null;
};
