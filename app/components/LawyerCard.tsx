"use client";

import { motion } from "framer-motion";
import { Scale, Star, Users } from "lucide-react";
import { Reveal } from "./motion/Reveal";

const credentials = [
  { icon: Scale, text: "Especialista en Derecho Migratorio en EE.UU." },
  { icon: Star, text: "Más de 10 años de experiencia en inmigración" },
  { icon: Users, text: "Cientos de familias han confiado en nosotros" },
];

const areas = [
  "Asilo Político",
  "Permiso de Trabajo",
  "Peticiones Familiares",
  "Visa U & VAWA",
  "Naturalización",
  "TPS",
];

export default function LawyerCard() {
  return (
    <section id="abogado" className="bg-background px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Quiénes Somos
          </span>
          <h2 className="mt-3 font-serif text-4xl text-foreground">
            Nuestro Abogado Principal
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            whileHover={{
              scale: 1.01,
              boxShadow: "0 0 50px rgba(197, 160, 89, 0.1)",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col overflow-hidden rounded-3xl border border-gold/10 bg-surface md:flex-row"
          >
            {/* Panel de video del abogado */}
            <div className="relative min-h-[350px] w-full overflow-hidden bg-black/20 md:w-2/5">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                <source
                  src="/videos/abogado_principal_soluciones_migratorias.mp4"
                  type="video/mp4"
                />
                Tu navegador no soporta el formato de video.
              </video>
            </div>

            <div className="flex flex-col justify-center p-10 md:w-3/5">
              <span className="mb-4 w-fit rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                Abogado de Inmigración · Miami, FL
              </span>
              <h3 className="mb-4 font-serif text-2xl text-foreground">
                Soluciones Migratorias SM
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-foreground/60">
                Brindamos representación legal experta y personalizada para cada
                etapa de tu proceso migratorio. Nuestro compromiso es
                acompañarte con transparencia, dedicación y resultados
                comprobados.
              </p>

              <div className="mb-8 flex flex-col gap-3">
                {credentials.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <Icon size={15} className="text-gold" />
                    </div>
                    <span className="text-sm text-foreground/70">{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {areas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-gold/10 px-3 py-1.5 text-xs font-medium text-foreground/70"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}