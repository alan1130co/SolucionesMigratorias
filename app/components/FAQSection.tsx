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
    question: "¿Puedo viajar fuera de EE. UU. después de haber solicitado asilo?",
    answer:
      "En general, salir de Estados Unidos mientras tu solicitud de asilo está pendiente puede considerarse un abandono de tu caso. Antes de viajar, es indispensable consultar con tu asesor legal para evaluar tu situación específica.",
  },
  {
    question:
      "¿Qué pasa si ingresé a Estados Unidos sin inspección (por la frontera) y quiero arreglar mis papeles?",
    answer:
      "Depende de tus circunstancias particulares y de los lazos familiares que tengas en el país (por ejemplo, estar casado con un ciudadano estadounidense o tener hijos mayores de 21 años). También existen opciones como la Visa U o el asilo defensivo. Te recomendamos una evaluación personalizada con nuestros abogados.",
  },
  {
    question: "¿Cuánto tiempo tarda en aprobarse el permiso de trabajo (EAD)?",
    answer:
      "Los tiempos de procesamiento varían drásticamente según la categoría migratoria (asilo, ajuste de estatus, TPS, etc.) y la carga de trabajo actual de USCIS. Puede tomar desde unos pocos meses hasta más de medio año.",
  },
  {
    question:
      "¿Solicitar ayudas del gobierno o estampillas de comida afecta mi proceso de residencia?",
    answer:
      'La regla de "Carga Pública" evalúa si es probable que dependas principalmente del gobierno para tu subsistencia. Ciertos beneficios de emergencia o recibidos por familiares directos suelen tener tratamientos distintos, pero es fundamental revisarlo caso por caso con un especialista.',
  },
  {
    question: "¿Qué pasa si tengo una orden de deportación o salida voluntaria previa?",
    answer:
      "En muchos casos es posible presentar una Moción para Reabrir ante la Corte de Inmigración si existen nuevas pruebas o cambios en la ley, o solicitar los perdones (waivers) migratorios correspondientes si cumples con los requisitos.",
  },
  {
    question: "¿Un residente permanente (Green Card) puede pedir a sus padres o hermanos?",
    answer:
      "No de manera directa. Los residentes permanentes solo pueden solicitar a sus cónyuges e hijos solteros. Para solicitar a padres o hermanos, el peticionario debe ser obligatoriamente ciudadano estadounidense mayor de 21 años.",
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
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
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
    <section id="faq" className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Resolvemos tus Dudas
          </span>
          <h2 className="mt-3 font-serif text-4xl text-slate-900">
            Preguntas Frecuentes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
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
