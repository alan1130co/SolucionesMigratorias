"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  href: string;
  target?: string;
  rel?: string;
  variant?: "solid" | "outline";
  className?: string;
  hoverScale?: number;
}

const GLOW_COLOR = {
  solid: "rgba(245, 245, 245, 0.35)",
  outline: "rgba(197, 160, 89, 0.4)",
} as const;

export function GlowButton({
  children,
  href,
  target,
  rel,
  variant = "outline",
  className = "",
  hoverScale = 1.03,
}: GlowButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Se escribe directo al DOM (custom properties) para no re-renderizar
  // en cada frame de mousemove y mantener 60/120fps.
  const handleMouseMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  };

  const variantClasses =
    variant === "solid"
      ? "bg-gold text-neutral-900"
      : "border border-gold text-gold";

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-[background-color,opacity,box-shadow] duration-300 ${
        variant === "outline" ? "hover:text-neutral-900" : "hover:opacity-95"
      } ${variantClasses} ${className}`}
    >
      {/* Relleno dorado deslizante (solo variante outline) */}
      {variant === "outline" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
      )}

      {/* Reflejo de luz — sigue la posición exacta del cursor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${GLOW_COLOR[variant]}, transparent 70%)`,
        }}
      />

      {/* Destello automático que recorre el botón cada pocos segundos */}
      <motion.span
        aria-hidden="true"
        initial={{ x: "-150%" }}
        animate={{ x: "150%" }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          repeatDelay: 2.6,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent"
      />

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.a>
  );
}
