import type { Config } from "tailwindcss";

// Cada color tiene su propio nombre según DÓNDE se usa (no según el tono).
// Aunque hoy varios compartan el mismo código hexadecimal, cambiar uno solo
// afecta a ESE elemento — nunca se mueve a otro sitio por accidente.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // ===== BLANCO GENÉRICO =====
        // Detalles decorativos puntuales: bordes de avatares, puntos del
        // carrusel de anuncios, fondo del botón flotante "volver" en el producto.
        blanco: "#ffffff",

        // ===== ENCABEZADO (Header, arriba de todo) =====
        encabezadoFondo: "#6086d9", // Fondo de la barra superior
        encabezadoTexto: "#ffffff", // Logo, menú y el ícono del carrito

        // ===== BUSCADOR (dentro del encabezado) =====
        // Independiente del encabezado: el buscador siempre debe verse
        // blanco/claro, sin importar qué color tenga el resto del header.
        buscadorFondo: "#ffffff", // Fondo de la caja de búsqueda
        buscadorTexto: "#241A14", // Texto que se escribe y el ícono de lupa

        // ===== BOTÓN PRIMARIO (Agregar al carrito, Ver catálogo) =====
        botonPrimarioFondo: "#ffc3fd",
        botonPrimarioFondoHover: "#241A14",
        botonPrimarioTexto: "#ffffff",

        // ===== BOTÓN SECUNDARIO (Confirmar pedido por WhatsApp) =====
        botonSecundarioFondo: "#57f51f",
        botonSecundarioTexto: "#241A14",

        // ===== BOTÓN TERCIARIO (contorno, ej. dentro del carrito) =====
        botonTercerioTexto: "#B92A1C",

        // ===== BURBUJA CONTADOR DEL CARRITO (sobre el ícono del header) =====
        notificacionFondo: "#57f51f",
        notificacionTexto: "#241A14",

        // ===== PIE DE PÁGINA (Footer) =====
        piePaginaFondo: "#241A14",
        piePaginaTexto: "#F5E8DA",

        // ===== TARJETA "RESUMEN" DEL CARRITO =====
        // Independiente del Footer: aunque hoy se vean parecidos, son
        // dos colores separados y se pueden cambiar por separado.
        resumenCarritoFondo: "#241A14",
        resumenCarritoTexto: "#ffffff",
        resumenCarritoTextoSecundario: "#F5E8DA",

        // ===== SUBTÍTULOS =====
        // H1/H2 de cada página (Tu carrito, Sigue explorando, ¿Por qué
        // comprar en SeArys?) y el nombre + precio del producto/tarjetas.
        textoSubtitulo: "#B92A1C",

        // ===== ETIQUETAS PEQUEÑAS =====
        // Categoría, "Precios"/"Variedad"/"Entrega", "Volver al catálogo".
        textoEtiqueta: "#8C7566",

        // ===== TEXTO PRINCIPAL =====
        // Párrafos y textos normales (descripciones, nombres de producto
        // dentro de tarjetas, textos del carrito). Independiente del
        // buscador y de los textos del footer/resumen.
        textoPrincipal: "#241A14",

        // ===== ALERTAS =====
        // Mensajes de error, "sin stock" y "carrito vacío". Independiente
        // de los subtítulos, aunque hoy compartan tono.
        textoAlerta: "#B92A1C",

        // ===== INSIGNIA SOBRE PRODUCTO (ej. oferta destacada) =====
        insigniaOfertaFondo: "#B92A1C",

        // ===== BORDES SUTILES =====
        // Separadores y contornos suaves en tarjetas y botones.
        bordeSuave: "#8C7566",

        // ===== FONDOS NEUTROS =====
        // Placeholders de imagen, banner de anuncios, tarjetas claras.
        fondoSuave: "#F5E8DA",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-worksans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
