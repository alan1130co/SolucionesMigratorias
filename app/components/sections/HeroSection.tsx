"use client";

import { motion, type Variants } from "framer-motion";
import { GlowButton } from "../ui/GlowButton";

// Assets con las rutas exactas de tu carpeta public/
const POSTER_SRC = "/images/img_soluciones_migratorias.avif";
const VIDEO_DESKTOP_SRC = "/videos/video_principal_solcuiones_migratorias.mp4";
const VIDEO_MOBILE_SRC = "/videos/video_solcuiones_migratorias.mp4";

const metrics = [
  { value: "98%", label: "Casos Exitosos" },
  { value: "+10", label: "Años de Experiencia" },
  { value: "24/7", label: "Asesoría Internacional" },
  { value: "100%", label: "Residencia y Visados" },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex h-screen min-h-175 w-full flex-col justify-between overflow-hidden bg-slate-900"
    >
      {/* Background Video (Desktop) */}
      <video
        className="absolute inset-0 z-0 hidden h-full w-full object-cover md:block"
        autoPlay
        loop
        muted
        playsInline
        poster={POSTER_SRC}
      >
        <source src={VIDEO_DESKTOP_SRC} type="video/mp4" />
      </video>

      {/* Background Video (Mobile) */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover md:hidden"
        autoPlay
        loop
        muted
        playsInline
        poster={POSTER_SRC}
      >
        <source src={VIDEO_MOBILE_SRC} type="video/mp4" />
      </video>

      {/* Contenido Principal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-20 mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center px-6 pt-28 text-center"
      >
        <motion.span
          variants={itemVariants}
          className="mb-4 inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold backdrop-blur-md"
        >
          Abogados de Inmigración
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          Especialistas en{" "}
          <span className="font-serif italic text-gold drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
            Soluciones Migratorias
          </span>{" "}
          de Alto Nivel
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-300 sm:text-lg"
        >
          Asesoría legal migratoria integral y de alto nivel, guiando cada
          paso de tu proceso hacia la residencia, ciudadanía o visado con
          respaldo internacional.
        </motion.p>

        {/* Botones de Acción */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <GlowButton
            href="https://wa.me/+13054984470"
            target="_blank"
            rel="noopener noreferrer"
            variant="solid"
          >
            Agendar Consulta
          </GlowButton>

          <a
            href="#servicios"
            className="inline-flex items-center justify-center rounded-full border border-gold/30 bg-white/5 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-gold/60 hover:bg-gold/10"
          >
            Ver Servicios
          </a>
        </motion.div>
      </motion.div>

      {/* Tarjeta de métricas (Glassmorphism Navy/Gold) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-20 mx-auto mb-8 w-full max-w-5xl px-6 sm:mb-12"
      >
        <div className="grid grid-cols-2 gap-6 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl md:grid-cols-4">
          {metrics.map((metric) => (
            <motion.div
              variants={itemVariants}
              key={metric.label}
              className="text-center"
            >
              <p className="font-serif text-3xl font-bold text-gold sm:text-4xl">
                {metric.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-300 sm:text-sm">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}