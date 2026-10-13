"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";

export default function TransitionCTA() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-navy-900 px-6 py-28">
      <img
        src="/videos/video_bandera_usa_poster.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 block h-full w-full object-cover md:hidden"
      />

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 z-0 hidden h-full w-full object-cover md:block"
      >
        <source src="/videos/video_bandera_usa.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-[1] bg-black/50" />

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
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/15 blur-3xl"
      />

      <SectionWrapper className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
          Tu nuevo capítulo en Estados Unidos{" "}
          <span className="font-extrabold text-gold">empieza hoy</span>.
        </p>
      </SectionWrapper>
    </section>
  );
}
