import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import CustomCursor from "./components/CustomCursor";
import PageTransitionProvider from "./components/PageTransitionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Soluciones Migratorias SM | Abogados de Inmigración en EE.UU.",
  description:
    "Firma de abogados especializada en asilo, permisos de trabajo, peticiones familiares y más. Más de 10 años ayudando a la comunidad inmigrante en Estados Unidos.",
  keywords:
    "abogados inmigración, asilo Estados Unidos, permiso de trabajo, visa U, VAWA, petición familiar, Miami",
  openGraph: {
    title: "Soluciones Migratorias SM",
    description:
      "Apoyo legal confiable para tu proceso migratorio en EE.UU.",
    url: "https://solucionesmigratoriassm.com",
    siteName: "Soluciones Migratorias SM",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${playfair.variable} bg-background text-foreground antialiased`}
      >
        <CustomCursor />
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}