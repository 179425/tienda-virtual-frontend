import type { Metadata } from "next";
import { Fraunces, Work_Sans, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SeArys — Aseo, mercado y mascotas",
  description:
    "Aseo del hogar, cuidado personal, alimentos, bebidas, mecatos y productos para mascotas. Arma tu carrito y confirma tu pedido por WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${fraunces.variable} ${workSans.variable} ${jetbrainsMono.variable} font-body`}
      >
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
