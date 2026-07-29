"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

interface SectionWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section";
}

// Wrapper de animación de entrada al hacer scroll (whileInView), reutilizable
// en todas las secciones de la home según la convención de CLAUDE.md.
export function SectionWrapper({
  children,
  delay = 0,
  className,
  as = "div",
}: SectionWrapperProps) {
  const MotionTag = as === "section" ? motion.section : motion.div;

  return (
    <MotionTag
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
