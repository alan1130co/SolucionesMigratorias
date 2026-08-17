"use client";

import { motion, type Variants } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { CountUpNumber } from "./ui/CountUpNumber";

const statsContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const statsItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Familias Representadas" },
  { value: 98, suffix: "%", label: "Tasa de Éxito en Casos" },
  { value: 10, prefix: "+", label: "Años de Experiencia" },
  { value: 24, suffix: "/7", label: "Disponibilidad para tu Caso" },
];

export default function Manifesto() {
  return (
    <section className="flex min-h-[90vh] w-full flex-col justify-center bg-background px-6 py-28 sm:min-h-screen md:px-16">
      <div className="mx-auto max-w-5xl text-center">
        <SectionWrapper>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Nuestro Compromiso
          </span>
          <h2 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            Detrás de cada expediente hay una{" "}
            <span className="font-extrabold text-gold">historia</span>,
            una familia, un futuro.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/60 sm:text-lg">
            Por eso tratamos cada caso como si fuera el único que importa: con
            transparencia, cercanía y la rigurosidad legal que tu proceso
            migratorio merece.
          </p>
        </SectionWrapper>

        <motion.div
          variants={statsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 grid grid-cols-2 gap-8 border-t border-gold/10 pt-16 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={statsItem}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group cursor-default"
            >
              <p className="font-serif text-4xl text-gold transition-colors duration-300 group-hover:text-gold-600 sm:text-5xl">
                <CountUpNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-foreground/60 sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
