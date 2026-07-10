# Verdum — Frontend de tienda virtual

Frontend inicial de la tienda, construido según el plan de fases 1–5 del resumen del
proyecto: setup, catálogo, página de producto, carrito y envío de pedido por WhatsApp.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Estructura (por funcionalidad)

```
src/
  app/                    → rutas (Next.js App Router)
    page.tsx              → inicio + catálogo
    producto/[slug]/      → página de producto
    carrito/              → página del carrito
  features/
    catalogo/              → listado, tarjetas, buscador, datos de productos
    producto/               → detalle de producto
    carrito/                → estado global del carrito (Zustand)
    checkout/                → armado del mensaje y enlace de WhatsApp
  components/ui/           → Header, Footer, botones compartidos
  lib/supabase/             → cliente y tipos, listos para conectar la base de datos real
```

Cada funcionalidad vive en su propia carpeta para poder agregar cosas nuevas
(favoritos, reseñas, pagos) sin tocar lo que ya funciona.

## Qué configurar antes de publicar

1. **Número de WhatsApp de la tienda**
   Edita `src/features/checkout/config.ts` y reemplaza `WHATSAPP_NUMERO` por el número
   real, en formato internacional sin "+" ni espacios (ej: `573001234567`).

2. **Productos — ya conectado a Supabase**
   El catálogo consulta la tabla real `public.products` (la misma que usa el
   sistema de inventario/ventas). Ver `src/features/catalogo/data.ts`.
   - `.env.local` ya tiene la URL y la anon key del proyecto.
   - No hay columna `slug`, así que la URL de cada producto (`/producto/algo`)
     se genera automáticamente a partir de `name`.
   - `descripcion_corta` se genera recortando `description`.
   - Si `image_url` viene vacío, se muestra `public/placeholder-producto.svg`.

3. **Importante — seguridad (Row Level Security)**
   La anon key queda incluida en el código del navegador: cualquiera que visite
   la tienda puede usarla para consultar Supabase directamente. Eso está bien
   para `products`, pero esta base de datos también tiene tablas con
   información sensible del negocio: `sales`, `sale_items`, `suppliers`,
   `receptions`, `pending_orders`, `users`.

   Antes de publicar, entra al SQL Editor de Supabase y corre esto para que
   solo `products` sea legible públicamente, y el resto quede bloqueado por
   defecto para la anon key:

   ```sql
   -- Permite leer productos públicamente (lo único que necesita la tienda)
   alter table public.products enable row level security;
   create policy "Lectura publica de productos"
     on public.products for select
     using (true);

   -- Bloquea el resto para la anon key (no se crean políticas públicas)
   alter table public.sales enable row level security;
   alter table public.sale_items enable row level security;
   alter table public.suppliers enable row level security;
   alter table public.receptions enable row level security;
   alter table public.pending_orders enable row level security;
   alter table public.users enable row level security;
   ```

   Si ya usas RLS para tu app de inventario (probablemente con sesión
   autenticada, no la anon key), revisa que esas políticas no le den acceso de
   más a un visitante anónimo.

4. **Si el catálogo aparece vacío**
   Revisa la consola del navegador (F12 → Console). Lo más común es:
   - RLS bloqueando la tabla `products` → aplica el SQL del punto 3.
   - `.env.local` con la URL o la key mal copiadas.
   - Después de cualquier cambio en `.env.local` hay que reiniciar `npm run dev`.

## Publicar en Vercel

```bash
npm install -g vercel   # si no lo tienes
vercel
```

O conectar el repositorio directamente desde vercel.com — con cada push a la rama
principal se publica una nueva versión.

## Próximos pasos (fases futuras del proyecto)

- Optimización de rendimiento y SEO (fase 6)
- Conexión real a Supabase para catálogo y pedidos (parte de la fase 8)
- Pagos en línea, cuentas de usuario y panel de administración (fase 8, a futuro)
