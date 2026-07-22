"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { Reveal } from "./motion/Reveal";

interface Short {
  id: string;
  title: string;
  video: string;
  poster: string;
}

// Reemplazar por los clips verticales reales en public/videos/shorts/
const shorts: Short[] = [
  {
    id: "asilo",
    title: "¿Qué es el Asilo Político?",
    video: "/videos/shorts/short-asilo.mp4",
    poster: "/images/shorts/short-asilo.jpg",
  },
  {
    id: "permiso-trabajo",
    title: "Permiso de Trabajo en 5 Pasos",
    video: "/videos/shorts/short-permiso-trabajo.mp4",
    poster: "/images/shorts/short-permiso-trabajo.jpg",
  },
  {
    id: "visa-u",
    title: "Visa U: Protección para Víctimas",
    video: "/videos/shorts/short-visa-u.mp4",
    poster: "/images/shorts/short-visa-u.jpg",
  },
  {
    id: "naturalizacion",
    title: "Camino a la Ciudadanía",
    video: "/videos/shorts/short-naturalizacion.mp4",
    poster: "/images/shorts/short-naturalizacion.jpg",
  },
];

function ShortCard({ short }: { short: Short }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative aspect-9/16 w-full overflow-hidden rounded-2xl border border-gold/10 bg-slate-900 shadow-sm"
    >
      <video
        ref={videoRef}
        src={short.video}
        poster={short.poster}
        loop
        muted
        playsInline
        onClick={togglePlay}
        className="h-full w-full cursor-pointer object-cover"
      />

      {/* Overlay de degradado para legibilidad */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/40" />

      {/* Título superpuesto */}
      <p className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-sm font-semibold leading-snug text-white">
        {short.title}
      </p>

      {/* Botón de reproducción */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
        className={`absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md ring-1 ring-white/30 transition-opacity duration-300 ${
          isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
      </button>
    </motion.div>
  );
}

export default function ShortsSection() {
  return (
    <section id="shorts" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Contenido Institucional
          </span>
          <h2 className="mt-3 font-serif text-4xl text-slate-900">
            Shorts
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
            Videos cortos con explicaciones claras sobre procesos migratorios,
            directamente de nuestro equipo legal.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shorts.map((short, i) => (
            <Reveal key={short.id} delay={i * 0.08}>
              <ShortCard short={short} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
