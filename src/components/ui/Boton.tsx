import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variante = "primario" | "secundario" | "ghost";

const estilos: Record<Variante, string> = {
  primario:
    "bg-tomate text-papel hover:bg-carbon transition-colors",
  secundario:
    "bg-mandarina text-carbon hover:brightness-95 transition-all",
  ghost:
    "bg-transparent text-cereza border border-arena hover:bg-crema transition-colors",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body font-medium text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed";

type BotonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: Variante;
  children: ReactNode;
};

export function Boton({ variante = "primario", className = "", children, ...props }: BotonProps) {
  return (
    <button className={`${base} ${estilos[variante]} ${className}`} {...props}>
      {children}
    </button>
  );
}

type EnlaceBotonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variante?: Variante;
  children: ReactNode;
};

export function EnlaceBoton({ variante = "primario", className = "", children, ...props }: EnlaceBotonProps) {
  return (
    <a className={`${base} ${estilos[variante]} ${className}`} {...props}>
      {children}
    </a>
  );
}
