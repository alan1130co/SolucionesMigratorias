"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./motion/Reveal";

const CEO_NAME = "Sasha Moreno";
const CEO_MESSAGE =
  "Sé lo abrumador que puede ser empezar de nuevo en un país desconocido, porque cada trámite lleva detrás el sueño y el esfuerzo de toda una familia. No estás solo en este camino: aquí encontrarás la honestidad, el profesionalismo y el respaldo humano que necesitas para alcanzar una vida segura y tranquila en los Estados Unidos.";

// TODO: colocar la foto de la CEO en public/images/ y actualizar esta ruta.
const CEO_PHOTO = "/images/ceo-fundadora.jpg";

export default function CeoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const shapeGoldY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const shapeWhiteY = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);

  return (
    <section
      ref={sectionRef}
      id="ceo"
      className="relative flex min-h-[90vh] w-full flex-col overflow-hidden bg-navy-900 pt-24 pb-0 sm:min-h-screen"
    >
      {/* Formas geométricas decorativas con parallax sutil, desacopladas del contenido */}
      <motion.div
        aria-hidden="true"
        style={{ y: shapeGoldY }}
        className="pointer-events-none absolute -left-24 top-0 z-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: shapeWhiteY }}
        className="pointer-events-none absolute right-0 bottom-0 z-0 h-72 w-72 rounded-full bg-white/5 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4">
        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-5 md:gap-16">
          {/* Columna izquierda: mensaje de liderazgo, centrada respecto a la foto */}
          <Reveal
            initialX={-50}
            className="md:order-1 md:col-span-3"
          >
            <span className="text-lg font-semibold text-gold sm:text-xl md:text-2xl">
              Bienvenido a Soluciones Migratorias
            </span>

            <h2 className="mt-3 text-5xl font-extrabold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Nuestra <span className="font-serif italic text-gold">CEO</span>{" "}
              y Fundadora
            </h2>

            <h3 className="mt-6 mb-6 font-serif text-4xl text-white sm:text-5xl">
              {CEO_NAME}
            </h3>

            <p className="max-w-xl text-sm leading-relaxed italic text-white/60 sm:text-base">
              {CEO_MESSAGE}
            </p>
          </Reveal>

          {/* Espacio reservado en el grid para que el texto no invada el área de la foto en desktop */}
          <div className="hidden md:order-2 md:col-span-2 md:block" aria-hidden="true" />
        </div>
      </div>

      {/* Foto de presentación: pegada al borde inferior de la sección en desktop */}
      <Reveal
        initialX={50}
        className="relative z-10 mt-4 aspect-4/5 w-full px-4 md:absolute md:inset-y-0 md:top-24 md:right-0 md:mt-0 md:aspect-auto md:w-2/5 md:px-0"
      >
        <Image
          src={CEO_PHOTO}
          alt={`${CEO_NAME}, CEO y Fundadora de Soluciones Migratorias SM`}
          fill
          className="object-contain object-bottom drop-shadow-2xl"
          sizes="(min-width: 768px) 40vw, 90vw"
        />
      </Reveal>
    </section>
  );
}
