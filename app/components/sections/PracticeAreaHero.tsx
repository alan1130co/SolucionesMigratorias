"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
      className="relative flex h-[70vh] min-h-[520px] w-full items-end overflow-hidden border-b border-gold/10 bg-background"
    >
      {/* LCP element — único responsable del Largest Contentful Paint */}
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

      {/* Overlay de legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

      <Reveal className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold">
          Áreas de Práctica
        </span>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/70">
          {description}
        </p>
      </Reveal>
    </section>
  );
}
