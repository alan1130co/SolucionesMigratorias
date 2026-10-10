"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

/**
 * El panel /admin es una herramienta interna con su propio layout
 * (app/admin/layout.tsx) y no debe llevar el header/footer del sitio
 * público — ambos son fixed/full-width y, de paso, el header interceptaba
 * los clics de los primeros ~120px del panel.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
