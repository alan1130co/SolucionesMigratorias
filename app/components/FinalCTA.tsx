"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { GlowButton } from "./ui/GlowButton";
import { ContactForm } from "./ContactForm";

const WHATSAPP_NUMBER = "+13054984470";

export default function FinalCTA() {
  return (
    <section
      id="contacto"
      className="flex min-h-[90vh] w-full flex-col justify-center border-t border-slate-200 bg-background px-6 py-28 sm:min-h-screen md:px-16"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Columna izquierda: headline + contacto directo */}
        <SectionWrapper>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Contáctanos
          </span>
          <h2 className="mt-4 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            ¿Listo para Comenzar{" "}
            <span className="font-extrabold text-gold">tu Proceso?</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/60 sm:text-lg">
            Agenda tu consulta hoy. Nuestro equipo de profesionales está listo
            para evaluar tu caso y brindarte una hoja de ruta clara.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <GlowButton
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
            >
              Consultar tu caso gratis
              <ArrowRight size={18} />
            </GlowButton>
            <motion.a
              href={`tel:${WHATSAPP_NUMBER}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-8 py-4 text-base font-semibold text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <Phone size={16} />
              +1 (305) 498-4470
            </motion.a>
          </div>
        </SectionWrapper>

        {/* Columna derecha: mini-formulario (envía por WhatsApp, sin backend) */}
        <SectionWrapper delay={0.15}>
          <ContactForm />
        </SectionWrapper>
      </div>
    </section>
  );
}
