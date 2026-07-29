"use client";

import { SectionWrapper } from "./SectionWrapper";

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
            Nuestro Enfoque
          </span>
          <h2 className="mt-4 text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Legal, sí. Pero{" "}
            <span className="font-extrabold text-gold">humano</span>{" "}
            primero.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            Sabemos que detrás de cada trámite hay una vida en pausa. Por eso
            no manejamos expedientes: acompañamos personas. Nuestro trabajo
            combina rigor legal con una comunicación clara y cercana, para que
            nunca sientas que tu caso es un número más.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            Cada estrategia se construye a partir de tu historia particular,
            no de una plantilla. Esa es la diferencia entre un trámite
            gestionado y un proceso realmente acompañado.
          </p>
        </SectionWrapper>

        {/* Columna derecha: proceso numerado */}
        <SectionWrapper delay={0.15} className="flex flex-col gap-10">
          {steps.map((step) => (
            <div
              key={step.number}
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
            </div>
          ))}
        </SectionWrapper>
      </div>
    </section>
  );
}
