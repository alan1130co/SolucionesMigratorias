"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section";
  initialX?: number;
}

// Wrapper de animación de entrada al hacer scroll (whileInView), reutilizable
// en todas las secciones de la home según la convención de CLAUDE.md.
export function SectionWrapper({
  children,
  delay = 0,
  className,
  as = "div",
  initialX,
}: SectionWrapperProps) {
  const MotionTag = as === "section" ? motion.section : motion.div;

  const variants: Variants = {
    hidden:
      initialX !== undefined ? { opacity: 0, x: initialX } : { opacity: 0, y: 32 },
    show: (d: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: d },
    }),
  };

  return (
    <MotionTag
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
