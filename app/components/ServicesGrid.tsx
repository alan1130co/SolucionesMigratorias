"use client";

import Image from "next/image";
import {
  Phone,
  Shield,
  FileText,
  Home as HomeIcon,
  Heart,
  Globe,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./motion/Reveal";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  // Imágenes de prueba (Unsplash) — reemplazar por fotografía institucional real.
  image: string;
}

const services: Service[] = [
  {
    icon: Shield,
    title: "Asilo Político",
    desc: "Protección legal para quienes enfrentan persecución en su país de origen.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    icon: FileText,
    title: "Permiso de Trabajo",
    desc: "Autorización de empleo para residentes, solicitantes de asilo y más.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
  },
  {
    icon: HomeIcon,
    title: "Peticiones Familiares",
    desc: "Reunificación familiar mediante peticiones de inmigración en EE.UU.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    icon: Heart,
    title: "Visa U & VAWA",
    desc: "Protección especial para víctimas de crímenes y violencia doméstica.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop",
  },
  {
    icon: Globe,
    title: "Naturalización",
    desc: "Acompañamiento integral en tu proceso para obtener la ciudadanía.",
    image:
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1600&auto=format&fit=crop",
  },
  {
    icon: Phone,
    title: "Consulta Gratuita",
    desc: "Evaluamos tu caso sin costo para orientarte desde el primer paso.",
    image:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function ServicesGrid() {
  return (
    <section id="servicios" className="w-full bg-white px-6 py-28 md:px-16">
      <div className="mx-auto max-w-400">
        <Reveal className="mb-16 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Áreas de Práctica
          </span>
          <h2 className="mt-4 text-6xl font-extrabold leading-none tracking-tight text-slate-900 sm:text-7xl lg:text-8xl">
            Nuestros{" "}
            <span className="font-serif italic text-gold">Servicios</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
            Representación legal especializada en todas las áreas del derecho
            migratorio en Estados Unidos.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map(({ icon: Icon, title, desc, image }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <a
                href="#contacto"
                className="group relative flex h-112.5 w-full overflow-hidden rounded-2xl lg:h-137.5"
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Overlay de degradado para legibilidad */}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

                {/* Contenido superpuesto */}
                <div className="relative z-10 flex h-full w-full flex-col justify-between p-8 sm:p-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                    <Icon size={24} className="text-gold" />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      {title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70 sm:text-base">
                      {desc}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gold">
                      Conocer más
                      <ArrowUpRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
