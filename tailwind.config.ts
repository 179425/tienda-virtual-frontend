import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Texto claro sobre fondos oscuros o de color (botones, header, footer).
        papel: "#ffffff",

        // Footer y la tarjeta de "Resumen" del carrito (fondo oscuro),
        // además de texto oscuro general en varias partes de la tienda.
        carbon: "#c9b9af",

        // SOLO el encabezado (Header) de arriba, el botón primario
        // ("Agregar al carrito", "Ver catálogo") y el círculo "Todas"
        // del carrusel de categorías. Cambiar esto NO afecta subtítulos
        // ni la tarjeta de resumen del carrito.
        tomate: "#d749ff",

        // Botón secundario: "Confirmar pedido por WhatsApp".
        mandarina: "#57f51f",

        // SOLO subtítulos: los H1/H2 de cada página (Tu carrito, Sigue
        // explorando, ¿Por qué comprar en SeArys?), el nombre y precio
        // en la página de producto, y el precio en las tarjetas del catálogo.
        cereza: "#B92A1C",

        // Texto secundario/etiquetas pequeñas (categoría, "Volver al catálogo").
        arena: "#8C7566",

        // Fondos suaves tipo beige (tarjetas y secciones claras).
        crema: "#F5E8DA",
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
