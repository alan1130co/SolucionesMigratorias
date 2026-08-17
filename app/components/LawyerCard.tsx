"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Scale, Star, Users } from "lucide-react";
import { Reveal } from "./motion/Reveal";

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const credentials = [
  { icon: Scale, text: "Especialista en Casos de Asilo y Representación en Corte." },
  { icon: Star, text: "Más de 10 años defendiendo casos migratorios en EE. UU." },
  { icon: Users, text: "Cientos de familias representadas con éxito" },
];

const areas = [
  "Representación en Corte",
  "Permiso de Trabajo",
  "Peticiones Familiares",
  "Visa U & VAWA",
];

export default function LawyerCard() {
  return (
    <section
      id="abogado"
      className="flex min-h-[90vh] w-full flex-col justify-center bg-background px-4 py-24 sm:min-h-screen"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-20 text-center">
          
          <h2 className="mt-3 text-5xl font-extrabold text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            Nuestro Abogado de <span className="font-extrabold text-gold">Inmigración </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-5 md:items-center md:gap-16">
          {/* Columna izquierda: retrato del abogado */}
          <Reveal
            initialX={-50}
            className="relative md:col-span-2"
          >
            <div className="relative aspect-4/5 w-full">
              <Image
                src="/images/nisael_santos.jpg"
                alt="Nisael Santos Torres, Abogado de Inmigración"
                fill
                className="object-contain object-top drop-shadow-2xl"
                sizes="(min-width: 768px) 40vw, 90vw"
                priority
              />
            </div>
          </Reveal>

          {/* Columna derecha: información del abogado */}
          <Reveal initialX={50} className="md:col-span-3">
            <span className="mb-5 inline-block w-fit rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              Abogado de Inmigración de Soluciones Migratorias SM
            </span>

            <h3 className="mb-6 font-serif text-3xl text-foreground sm:text-4xl">
              Nisael Santos Torres
            </h3>

            <p className="mb-10 max-w-xl text-sm leading-relaxed text-foreground/60 sm:text-base">
              Doctor en Jurisprudencia por la Pontificia Universidad Católica de Puerto Rico. Abogado admitido por la American Bar Association (ABA), especializado en Derecho de Inmigración y registrado en el EOIR eRegistry del Departamento de Justicia de los Estados Unidos, con autorización para ejercer ante el Tribunal de Inmigración.
            </p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-10 flex flex-col gap-3"
            >
              {credentials.map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  variants={staggerItem}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex items-center gap-4 rounded-2xl border border-gold/10 bg-gold/3 px-4 py-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <span className="text-sm text-foreground/70">{text}</span>
                </motion.div>
              ))}
            </motion.div>

            <div>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-foreground/40">
                Áreas de Práctica
              </span>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-wrap gap-2"
              >
                {areas.map((area) => (
                  <motion.span
                    key={area}
                    variants={staggerItem}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="rounded-full border border-gold/15 bg-gold/4 px-4 py-2 text-xs font-medium text-foreground/70"
                  >
                    {area}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
