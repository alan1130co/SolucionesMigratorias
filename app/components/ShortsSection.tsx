"use client";

import { useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Reveal } from "./motion/Reveal";

interface Short {
  id: string;
  title: string;
  video: string;
  poster?: string;
  featured?: boolean;
}

const shorts: Short[] = [
  {
    id: "entrevista-oficial",
    title: "Entrevista con un Oficial",
    video: "/videos/shorts/entrevista-oficial.mp4",
  },
  {
    id: "pierdes-asilo-pregunta",
    title: "Puedes Perder tu Asilo por una Pregunta",
    video: "/videos/shorts/pierdes-asilo-pregunta.mp4",
  },
  {
    id: "corte-migracion",
    title: "Vas a Entrar Solo a la Corte de Migración",
    video: "/videos/shorts/corte-migracion.mp4",
  },
  {
    id: "testimonio",
    title: "Testimonio",
    video: "/videos/shorts/testimonio.mp4",
    featured: true,
  },
  {
    id: "10-errores-asilo",
    title: "10 Errores que Destruyen Casos de Asilo",
    video: "/videos/shorts/10-errores-asilo.mp4",
  },
];

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function ShortCard({ short }: { short: Short }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // El short siempre está en loop silencioso (estilo Reels/TikTok); el único
  // control manual que necesita el usuario es activar o no el audio.
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    if (!next) {
      video.volume = 1;
      video.play().catch(() => {});
    }
    setIsMuted(next);
  };

  const handleHoverStart = () => {
    videoRef.current?.play().catch(() => {});
  };

  // En móvil no existe "hover": el short debe reproducirse solo por estar
  // visible en pantalla. El autoplay real solo lo permiten los navegadores
  // si el video está silenciado, por eso el atributo `muted` nunca se quita
  // automáticamente — solo lo cambia el usuario con el botón de audio.
  const handleViewportEnter = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleViewportLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.muted = true;
    setIsMuted(true);
  };

  return (
    <motion.div
      variants={cardVariants}
      onHoverStart={handleHoverStart}
      onViewportEnter={handleViewportEnter}
      onViewportLeave={handleViewportLeave}
      viewport={{ amount: 0.6 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.18)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative aspect-9/16 w-full overflow-hidden rounded-xl border border-gray-200 bg-slate-900 shadow-md"
    >
      <video
        ref={videoRef}
        src={short.video}
        poster={short.poster}
        preload="metadata"
        autoPlay
        muted
        loop
        playsInline
        aria-label={short.title}
        onClick={toggleMute}
        className="h-full w-full cursor-pointer object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Overlay de degradado sutil para que el botón resalte */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />

      {/* Botón flotante de silencio/audio, estilo Reels/TikTok */}
      <motion.button
        onClick={toggleMute}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        aria-label={isMuted ? "Activar sonido" : "Silenciar"}
        className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md ring-1 ring-white/30 transition-colors duration-300 group-hover:ring-white/70"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </motion.button>
    </motion.div>
  );
}

export default function ShortsSection() {
  return (
    <section
      id="shorts"
      className="flex min-h-[90vh] w-full flex-col justify-center bg-white px-4 py-24 sm:min-h-screen sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-screen-2xl">
        <Reveal className="mb-16 text-center">
          <h2 className="mt-3 text-5xl font-extrabold text-slate-900 sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="font-serif italic text-gold">Shorts</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Videos cortos con explicaciones claras sobre procesos migratorios,
            directamente de nuestro equipo legal.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-8"
        >
          {shorts.map((short) => (
            <ShortCard key={short.id} short={short} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
