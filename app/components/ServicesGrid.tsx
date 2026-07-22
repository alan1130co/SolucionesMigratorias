"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Shield,
  FileText,
  Home as HomeIcon,
  Heart,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./motion/Reveal";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const services: Service[] = [
  {
    icon: Shield,
    title: "Asilo Político",
    desc: "Protección legal para quienes enfrentan persecución en su país de origen.",
  },
  {
    icon: FileText,
    title: "Permiso de Trabajo",
    desc: "Autorización de empleo para residentes, solicitantes de asilo y más.",
  },
  {
    icon: HomeIcon,
    title: "Peticiones Familiares",
    desc: "Reunificación familiar mediante peticiones de inmigración en EE.UU.",
  },
  {
    icon: Heart,
    title: "Visa U & VAWA",
    desc: "Protección especial para víctimas de crímenes y violencia doméstica.",
  },
  {
    icon: Globe,
    title: "Naturalización",
    desc: "Acompañamiento integral en tu proceso para obtener la ciudadanía.",
  },
  {
    icon: Phone,
    title: "Consulta Gratuita",
    desc: "Evaluamos tu caso sin costo para orientarte desde el primer paso.",
  },
];

export default function ServicesGrid() {
  return (
    <section id="servicios" className="bg-background px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Áreas de Práctica
          </span>
          <h2 className="mt-3 font-serif text-4xl text-foreground">
            Nuestros Servicios
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/60">
            Representación legal especializada en todas las áreas del derecho
            migratorio en Estados Unidos.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <motion.div
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 40px rgba(197, 160, 89, 0.12)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group h-full rounded-2xl border border-gold/10 bg-surface p-8 transition-colors duration-300 hover:border-gold/30"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 transition-colors group-hover:bg-gold/20">
                  <Icon size={22} className="text-gold" />
                </div>
                <h3 className="mb-2 font-serif text-lg text-foreground">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/60">
                  {desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
