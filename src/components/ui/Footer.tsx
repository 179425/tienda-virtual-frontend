export function Footer() {
  return (
    <footer className="mt-24 bg-piePaginaFondo text-piePaginaTexto">
      <div className="leaf-vein-divider" />
      <div className="mx-auto max-w-6xl px-5 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-xl text-blanco">SeArys</p>
          <p className="mt-2 max-w-xs font-body text-sm text-piePaginaTexto/80">
            Aseo, cuidado personal, alimentos, bebidas, mecatos y productos para mascotas.
          </p>
        </div>
        <div className="font-body text-sm text-piePaginaTexto/80">
          <p className="mb-2 font-medium text-blanco">Pedidos</p>
          <p>Arma tu carrito y confirma por WhatsApp.</p>
          <p>Sin pagos en línea por ahora.</p>
        </div>
        <div className="font-body text-sm text-piePaginaTexto/80">
          <p className="mb-2 font-medium text-blanco">Domicilios</p>
          <p>Coordinamos la entrega directo por WhatsApp al confirmar tu pedido.</p>
        </div>
      </div>
      <div className="border-t border-blanco/10 py-4 text-center font-mono text-xs text-piePaginaTexto/60">
        © {new Date().getFullYear()} SeArys
      </div>
    </footer>
  );
}
