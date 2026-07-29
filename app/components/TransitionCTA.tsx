"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";

export default function TransitionCTA() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-navy-900 px-6 py-28">
      {/* Aurora sutil — eco visual del Hero */}
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

      <SectionWrapper className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
          Tu nuevo capítulo en Estados Unidos{" "}
          <span className="font-extrabold text-gold">empieza hoy</span>.
        </p>
      </SectionWrapper>
    </section>
  );
}
