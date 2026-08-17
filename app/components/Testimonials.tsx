"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";

export interface ReviewImage {
  id: number;
  src: string;
  alt: string;
}

interface TestimonialsProps {
  reviews: ReviewImage[];
}

const placeholderTestimonials = [
  {
    name: "María G.",
    caseType: "Permiso de Trabajo (EAD)",
    text: "Gracias a Soluciones Migratorias SM obtuve mi permiso de trabajo en tiempo récord. El equipo fue muy profesional y siempre me mantuvo informada durante todo el proceso. ¡100% recomendados!",
  },
  {
    name: "Carlos R.",
    caseType: "Asilo Político",
    text: "Llevaba años sin poder regularizar mi estatus. Con su ayuda, mi solicitud de asilo fue aprobada. Son honestos, dedicados y conocen muy bien las leyes de inmigración en EE.UU.",
  },
  {
    name: "Luisa M.",
    caseType: "VAWA",
    text: "El abogado me explicó todo el proceso con mucha paciencia. Presentaron mi caso de VAWA con gran profesionalismo y ganamos. Estoy muy agradecida con todo su equipo.",
  },
];

const cardContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function StarRating() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="fill-gold text-gold" />
      ))}
    </div>
  );
}

export default function Testimonials({ reviews }: TestimonialsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const hasImages = reviews.length > 0;

  const scrollByAmount = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section
      id="casos"
      className="flex min-h-[90vh] w-full flex-col justify-center bg-surface px-6 py-28 sm:min-h-screen md:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionWrapper className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Testimonios
            </span>
            <h2 className="mt-4 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
              Historias que {" "}
              <span className="font-extrabold text-gold">Cambiaron un Destino</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-foreground/60">
              Historias reales de familias que confiaron en nosotros para sus
              procesos migratorios.
            </p>
          </div>

          {/* Flechas de navegación del carrusel */}
          <div className="flex shrink-0 gap-3">
            <button
              onClick={() => scrollByAmount(-1)}
              aria-label="Anterior"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollByAmount(1)}
              aria-label="Siguiente"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </SectionWrapper>

        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          ref={scrollerRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
        >
          {hasImages
            ? reviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={cardItem}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-72 shrink-0 snap-center overflow-hidden rounded-2xl border border-gold/10 sm:w-96"
                >
                  <Image
                    src={review.src}
                    alt={review.alt}
                    width={600}
                    height={800}
                    className="h-auto w-full object-cover"
                  />
                </motion.div>
              ))
            : placeholderTestimonials.map((t) => (
                <motion.div
                  key={t.name}
                  variants={cardItem}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex w-80 shrink-0 snap-center flex-col gap-4 rounded-2xl border border-gold/10 bg-background p-8 sm:w-96"
                >
                  <StarRating />
                  <p className="flex-1 text-sm leading-relaxed text-foreground/70">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 border-t border-gold/10 pt-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-gold">
                      {getInitials(t.name)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {t.name}
                      </p>
                      <p className="mt-0.5 text-xs text-foreground/50">
                        {t.caseType}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
}
