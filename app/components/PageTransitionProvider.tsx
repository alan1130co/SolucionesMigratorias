"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PageTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    // initial={false}: el HTML del primer render (SSR y primer paint del
    // cliente) sale directo en el estado "animate" (opacity:1), sin pasar
    // por opacity:0 — Chrome descarta como candidato LCP cualquier elemento
    // que empiece en opacity:0, y este wrapper envuelve TODA la pagina
    // (Hero incluido), asi que ese opacity:0 inicial causaba NO_LCP en el
    // sitio completo. La transicion si se sigue viendo en navegaciones
    // posteriores entre rutas, que es cuando AnimatePresence monta un
    // motion.div nuevo con una key distinta (no es "el primer render").
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
