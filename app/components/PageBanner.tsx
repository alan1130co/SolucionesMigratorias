"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SectionWrapper } from "./SectionWrapper";

interface PageBannerProps {
  kicker: string;
  title: ReactNode;
  description?: string;
}

// Banner reutilizable para páginas internas (Sobre Nosotros, Casos de Éxito, etc.)
// Mismo lenguaje visual del Hero (navy + aurora sutil) a menor escala.
export function PageBanner({ kicker, title, description }: PageBannerProps) {
  return (
    <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-navy-900 px-6 py-32 text-center sm:min-h-screen">
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{
          duration: 26,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/15 blur-3xl"
      />

      <SectionWrapper className="relative z-10 mx-auto max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {kicker}
        </span>
        <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg">
            {description}
          </p>
        )}
      </SectionWrapper>
    </section>
  );
}
