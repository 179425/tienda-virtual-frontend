// Imágenes para el carrusel de categorías que aparece al pie del banner.
//
// La tabla "products" de Supabase solo tiene una columna de texto para la
// categoría (p. ej. "Aseo", "Mascotas"), no una imagen asociada. Mientras no
// exista una tabla de categorías propia, este mapa se llena a mano:
//
//   1. Sube la foto a /public/categorias/ (por ejemplo /public/categorias/aseo.jpg)
//   2. Agrega la línea correspondiente abajo, con el nombre EXACTO de la
//      categoría tal como aparece en Supabase (columna "category").
//
// Cualquier categoría que no esté en este mapa usa la imagen de reserva.

const IMAGEN_RESERVA = "/placeholder-producto.svg";

const IMAGENES_POR_CATEGORIA: Record<string, string> = {
  // "Aseo": "/categorias/aseo.jpg",
  // "Alimentos": "/categorias/alimentos.jpg",
  // "Mascotas": "/categorias/mascotas.jpg",
  // "Bebidas": "/categorias/bebidas.jpg",
};

export function obtenerImagenCategoria(nombre: string): string {
  return IMAGENES_POR_CATEGORIA[nombre] ?? IMAGEN_RESERVA;
}
