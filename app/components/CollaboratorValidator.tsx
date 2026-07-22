"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, XCircle } from "lucide-react";
import { Reveal } from "./motion/Reveal";

interface Collaborator {
  id: string;
  name: string;
  role: string;
}

// Directorio simulado — reemplazar por una consulta real (API/DB) cuando esté disponible.
const collaborators: Collaborator[] = [
  { id: "SM-AC-01", name: "Alan Coneo", role: "Asesor Migratorio Senior" },
  { id: "SM-JR-02", name: "Julia Ramírez", role: "Asesora Legal" },
  { id: "SM-CP-03", name: "Carlos Pérez", role: "Especialista en Asilo" },
  { id: "SM-LM-04", name: "Luisa Martínez", role: "Asesora de Peticiones Familiares" },
];

type Result =
  | { status: "success"; collaborator: Collaborator }
  | { status: "error"; query: string }
  | null;

export default function CollaboratorValidator() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<Result>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = value.trim().toUpperCase();
    if (!query) return;

    const match = collaborators.find((c) => c.id === query);
    setResult(
      match ? { status: "success", collaborator: match } : { status: "error", query }
    );
  };

  return (
    <section id="validador" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
            <ShieldCheck size={14} />
            Verificación de Identidad
          </span>
          <h2 className="mt-3 font-serif text-4xl text-slate-900">
            Validador de Colaboradores
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-600">
            Ingresa el Número ID que aparece en el carné de tu asesor:
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-3 rounded-2xl border border-gold/10 bg-[#FAFAFA] p-3 shadow-sm sm:flex-row"
          >
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="EJ: SM-AC-01"
              className="w-full flex-1 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-neutral-900 transition-transform hover:scale-[1.02]"
            >
              Consultar
            </button>
          </form>
        </Reveal>

        <AnimatePresence mode="wait">
          {result?.status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/20 bg-gold/5 p-5"
            >
              <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-gold" />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Colaborador activo de la firma
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {result.collaborator.name} · {result.collaborator.role} · ID{" "}
                  {result.collaborator.id}
                </p>
              </div>
            </motion.div>
          )}

          {result?.status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5"
            >
              <XCircle size={22} className="mt-0.5 shrink-0 text-red-500" />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  ID no registrado
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  El ID &ldquo;{result.query}&rdquo; no se encuentra en nuestro
                  directorio de colaboradores. Verifica el número en el carné o
                  contáctanos si crees que se trata de un error.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
