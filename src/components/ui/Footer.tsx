export function Footer() {
  return (
    <footer className="mt-24 border-t border-moss/30 bg-forest text-paper">
      <div className="mx-auto max-w-6xl px-5 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-xl">Verdum</p>
          <p className="mt-2 max-w-xs font-body text-sm text-moss50/80">
            
          </p>
        </div>
        <div className="font-body text-sm text-moss50/80">
          <p className="mb-2 font-medium text-paper">Pedidos</p>
          <p>Arma tu carrito y confirma por WhatsApp.</p>
          <p>Sin pagos en línea por ahora.</p>
        </div>
        <div className="font-body text-sm text-moss50/80">
          <p className="mb-2 font-medium text-paper">Cuidado básico</p>
         
        </div>
      </div>
      <div className="border-t border-paper/10 py-4 text-center font-mono text-xs text-moss50/60">
        © {new Date().getFullYear()} 
      </div>
    </footer>
  );
}
