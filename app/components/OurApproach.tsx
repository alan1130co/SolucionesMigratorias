"use client";

import { motion, type Variants } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";

const stepsContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const stepsItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

interface Step {
  number: string;
  title: string;
  desc: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Te asignamos tu abogado y tu equipo de apoyo",
    desc: "Desde el primer día sabes quién es tu abogado, quién prepara tu caso y quién te acompaña. Tienes un grupo de WhatsApp donde estamos siempre disponibles para tus dudas e inquietudes.",
  },
  {
    number: "02",
    title: "Preparamos y fortalecemos tu caso ",
    desc: "Revisamos tu asilo, detectamos errores y lo fortalecemos con evidencia. Todos tus documentos se traducen — no tienes que preocuparte por el idioma.",
  },
  {
    number: "03",
    title: "Las audiencias preliminares: tu abogado habla por ti",
    desc: "En las audiencias previas no tienes que hablar. Tu abogado es quien se dirige al juez.",
  },
  {
    number: "04",
    title: "La audiencia final: preparación completa ",
    desc: "Para la audiencia donde sí tienes que hablar frente al juez, te preparamos a fondo. Practicamos tu historia, revisamos tus respuestas y te damos indicaciones precisas para que entres con claridad y sin miedo.",
  },
];

export default function OurApproach() {
  return (
    <section className="flex min-h-[90vh] w-full flex-col justify-center bg-navy-900 px-6 py-28 sm:min-h-screen md:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Columna izquierda: headline + filosofía */}
        <SectionWrapper>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
        
          </span>
          <h2 className="mt-4 text-5xl font-extrabold leading-tight tracking-tight  text-gold  sm:text-6xl md:text-7xl lg:text-8xl">
            ¿MIEDO A IR SOLO A LA CORTE?{" "}
            <span className="font-extrabold text-white">Nunca mas solo.</span>{" "}
            
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            El miedo más grande no es la corte, es enfrentarla solo. Desde el día uno tienes un abogado que habla por ti en las audiencias previas, y un equipo que te prepara a fondo para el día en que sí te toca hablar.
          </p>
          
        
        </SectionWrapper>

        {/* Columna derecha: proceso numerado */}
        <motion.div
          variants={stepsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-10"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={stepsItem}
              className="group -mx-4 flex gap-6 rounded-xl p-4 transition-colors duration-300 hover:bg-white/5"
            >
              <span className="font-serif text-3xl text-gold/50 transition-colors duration-300 group-hover:text-gold">
                {step.number}
              </span>
              <div className="transition-transform duration-300 group-hover:translate-x-1">
                <h3 className="font-serif text-lg text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
