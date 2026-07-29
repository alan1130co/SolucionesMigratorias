"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "../motion/Reveal";

interface PracticeAreaHeroProps {
  title: string;
  description: string;
  poster: string;
  video: string;
}

export default function PracticeAreaHero({
  title,
  description,
  poster,
  video,
}: PracticeAreaHeroProps) {
  const [videoReady, setVideoReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoReady(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[90vh] w-full items-end overflow-hidden border-b border-gold/10 bg-background sm:min-h-screen"
    >
      {/* Fondo con parallax sutil — imagen (LCP) + video diferido */}
      <motion.div className="absolute inset-0 h-[120%] w-full" style={{ y: bgY }}>
        <Image
          src={poster}
          alt={`${title} — Soluciones Migratorias SM`}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />

        {/* Video diferido — se monta solo tras entrar en viewport, preload=none */}
        {videoReady && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          >
            <source src={video} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Overlay de legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

      <Reveal className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold">
          Áreas de Práctica
        </span>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/70">
          {description}
        </p>
      </Reveal>
    </section>
  );
}
