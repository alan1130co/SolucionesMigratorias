"use client";

import { motion, useInView, type HTMLMotionProps, type Variants } from "framer-motion";
import { useRef } from "react";

interface StaggerRevealProps
  extends Omit<HTMLMotionProps<"div">, "ref" | "initial" | "animate" | "variants"> {
  variants: Variants;
  amount?: number;
}

// Igual que SectionWrapper, pero para contenedores de grids/listas con
// stagger: useInView + animate en vez de whileInView, porque whileInView
// nunca llegaba a aplicar su variante "hidden" en este proyecto (el
// contenido quedaba en opacity:1 desde el montaje). Los hijos siguen
// heredando "show"/"hidden" del contenedor via variants, igual que antes.
export function StaggerReveal({
  variants,
  amount = 0.3,
  children,
  ...rest
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
