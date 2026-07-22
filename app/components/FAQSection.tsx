"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./motion/Reveal";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "¿Puedo viajar fuera de EE.UU. después de haber solicitado asilo?",
    answer:
      "En general, salir de Estados Unidos mientras tu solicitud de asilo está pendiente puede considerarse un abandono de tu caso. Antes de viajar, es indispensable consultar con tu asesor legal para evaluar tu situación específica.",
  },
  {
    question: "¿En qué consiste el permiso de trabajo?",
    answer:
      "El permiso de trabajo (EAD) es una autorización que te permite trabajar legalmente en Estados Unidos mientras tu proceso migratorio está en trámite, según la categoría bajo la que aplicaste.",
  },
  {
    question: "¿Qué es la Visa U y quién puede solicitarla?",
    answer:
      "La Visa U protege a víctimas de ciertos delitos que han colaborado con las autoridades en la investigación o enjuiciamiento del caso. Otorga estatus legal temporal y, eventualmente, puede abrir camino a la residencia.",
  },
  {
    question: "¿Cuánto tiempo toma un proceso de naturalización?",
    answer:
      "El tiempo varía según el centro de servicio y la carga de casos, pero en promedio el proceso de naturalización toma entre 8 y 14 meses desde la presentación de la solicitud.",
  },
  {
    question: "¿Qué documentos necesito para una petición familiar?",
    answer:
      "Generalmente se requiere prueba de la relación familiar, estatus migratorio del peticionario, actas civiles apostilladas y evidencia de solvencia económica. Tu asesor te dará la lista exacta según tu caso.",
  },
  {
    question: "¿Qué pasa si mi caso de asilo es negado?",
    answer:
      "Dependiendo de cómo se presentó el caso, existen opciones como apelación ante la Junta de Apelaciones de Inmigración (BIA) o revisión judicial. Es importante actuar dentro de los plazos legales establecidos.",
  },
];

function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {faqs.map((item, i) => (
            <Reveal key={item.question} delay={(i % 2) * 0.08}>
              <AccordionItem
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
