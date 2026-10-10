"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ShieldCheck } from "lucide-react";
import { Reveal } from "./motion/Reveal";

export default function CollaboratorValidator() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = value.trim();
    if (!query) return;
    router.push(`/validar?codigo=${encodeURIComponent(query)}`);
  };

  return (
    <section
      id="validador"
      className="flex min-h-[70vh] w-full flex-col justify-center bg-white px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
            <ShieldCheck size={14} />
            Verificación de Identidad
          </span>
          <h2 className="mt-3 text-5xl font-extrabold text-slate-900 sm:text-6xl md:text-7xl lg:text-8xl">
            Validador de <span className="font-extrabold text-gold">Colaboradores</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
            Ingresa el código que aparece en el carné de tu asesor:
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-3 rounded-2xl border border-gold/10 bg-surface p-3 shadow-sm sm:flex-row"
          >
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value.toUpperCase())}
              placeholder="EJ: SM AC 01"
              className="w-full flex-1 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-neutral-900 transition-transform hover:scale-[1.02]"
            >
              Verificar
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
