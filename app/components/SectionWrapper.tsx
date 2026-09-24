"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section";
  initialX?: number;
}

// Wrapper de animación de entrada al hacer scroll, reutilizable en todas las
// secciones de la home según la convención de CLAUDE.md.
//
// Usa useInView + animate (imperativo) en vez de whileInView (declarativo):
// en este proyecto whileInView nunca llegaba a aplicar su variante "hidden"
// -- el contenido fuera de pantalla quedaba en opacity:1 desde el montaje y
// jamas se veia la transicion al hacer scroll. Con useInView controlamos el
// estado nosotros mismos, así que el "hidden" inicial se aplica siempre de
// forma determinista. Solo afecta a contenido fuera del primer viewport
// (todo lo que usa este wrapper vive debajo del Hero) — nunca al LCP.
export function SectionWrapper({
  children,
  delay = 0,
  className,
  as = "div",
  initialX,
}: SectionWrapperProps) {
  const MotionTag = as === "section" ? motion.section : motion.div;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const hidden =
    initialX !== undefined ? { opacity: 0, x: initialX } : { opacity: 0, y: 32 };
  const shown = { opacity: 1, x: 0, y: 0 };

  return (
    <MotionTag
      ref={ref}
      initial={hidden}
      animate={isInView ? shown : hidden}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
