"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Reveal } from "./motion/Reveal";
import { GlowButton } from "./ui/GlowButton";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Una vez que ingreso a Estados Unidos, ¿en cuánto tiempo debo iniciar mi asilo?",
    answer:
      "Tienes hasta 1 año desde tu llegada a EE. UU. para presentar tu solicitud de asilo. Pasado ese plazo puedes perder el derecho a pedirlo, salvo circunstancias excepcionales.",
  },
  {
    question:
      ": Tengo mucho miedo de presentarme a la última audiencia, ¿es normal?",
    answer:
      "Es completamente normal sentir miedo antes de la audiencia final. Por eso te preparamos a fondo: practicamos tu historia, revisamos cada posible pregunta y te acompañamos para que llegues con seguridad.",
  },
  {
    question: "¿Es importante ir con abogado a mi proceso de asilo?",
    answer:
      "Sí. Un caso de asilo mal preparado no se puede repetir dos veces. Un abogado organiza tu evidencia correctamente y evita errores que pueden costarte la aprobación.",
  },
  {
    question:
      "¿Cuáles son las fases por las que pasa una persona al someter su asilo?",
    answer:
      'En general son cuatro: presentar la solicitud (Formulario I-589), la toma de biometrías, la entrevista o audiencias ante el Tribunal de Inmigración, y la decisión final.',
  },
  {
    question: "¿Cuáles son los errores más comunes al someter el asilo?",
    answer:
      "Presentar la solicitud fuera de plazo, entregar evidencia incompleta o inconsistente, no traducir correctamente los documentos, y viajar fuera de EE. UU. mientras el caso está en trámite.",
  },
  {
    question: "¿Cómo saber si el abogado tiene licencia para ejercer? ",
    answer:
      "Puedes verificarlo en el colegio de abogados (Bar Association) del estado donde ejerce y en el EOIR eRegistry del Departamento de Justicia.",
  },
];

const leftFaqs = faqs.slice(0, 3);
const rightFaqs = faqs.slice(3, 6);

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gold/10 bg-white">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 hover:bg-gold/5"
        aria-expanded={isOpen}
      >
        <span className="font-serif text-base text-slate-900 sm:text-lg">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="shrink-0 text-gold"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-slate-600">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggle = (question: string) =>
    setOpenQuestion((current) => (current === question ? null : question));

  return (
    <section
      id="faq"
      className="flex min-h-[90vh] w-full flex-col justify-center bg-surface px-4 py-24 sm:min-h-screen sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Resolvemos tus Dudas
          </span>
          <h2 className="mt-3 text-5xl font-extrabold text-slate-900 sm:text-6xl md:text-7xl lg:text-8xl">
            Preguntas <span className="font-serif italic text-gold">Frecuentes</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Respuestas claras a las consultas más comunes sobre procesos
            migratorios en Estados Unidos.
          </p>
        </Reveal>

        {/* Dos columnas independientes: cada una gestiona su propia altura */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start md:gap-6">
          <div className="flex flex-col gap-4">
            {leftFaqs.map((item, i) => (
              <Reveal key={item.question} delay={i * 0.08}>
                <AccordionItem
                  item={item}
                  isOpen={openQuestion === item.question}
                  onToggle={() => toggle(item.question)}
                />
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {rightFaqs.map((item, i) => (
              <Reveal key={item.question} delay={i * 0.08}>
                <AccordionItem
                  item={item}
                  isOpen={openQuestion === item.question}
                  onToggle={() => toggle(item.question)}
                />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15} className="mt-14 flex justify-center">
          <GlowButton
            href="https://wa.me/+13054984470"
            target="_blank"
            rel="noopener noreferrer"
            variant="solid"
          >
            Solicita tu Consulta Gratis
            <ArrowRight size={18} />
          </GlowButton>
        </Reveal>
      </div>
    </section>
  );
}
