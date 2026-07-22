"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Reveal } from "./motion/Reveal";

export interface ReviewImage {
  id: number;
  src: string;
  alt: string;
}

interface ReviewsGridProps {
  reviews: ReviewImage[];
}

const placeholderTestimonials = [
  {
    name: "María G.",
    location: "Miami, FL",
    text: "Gracias a Soluciones Migratorias SM obtuve mi permiso de trabajo en tiempo récord. El equipo fue muy profesional y siempre me mantuvo informada durante todo el proceso. ¡100% recomendados!",
  },
  {
    name: "Carlos R.",
    location: "Houston, TX",
    text: "Llevaba años sin poder regularizar mi estatus. Con su ayuda, mi solicitud de asilo fue aprobada. Son honestos, dedicados y conocen muy bien las leyes de inmigración en EE.UU.",
  },
  {
    name: "Luisa M.",
    location: "Orlando, FL",
    text: "El abogado me explicó todo el proceso con mucha paciencia. Presentaron mi caso de VAWA con gran profesionalismo y ganamos. Estoy muy agradecida con todo su equipo.",
  },
];

function StarRating() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="fill-gold text-gold" />
      ))}
    </div>
  );
}

function TextTestimonials() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {placeholderTestimonials.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.08}>
          <motion.div
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 40px rgba(197, 160, 89, 0.12)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex h-full flex-col gap-4 rounded-2xl border border-gold/10 bg-surface p-8"
          >
            <StarRating />
            <p className="flex-1 text-sm leading-relaxed text-foreground/70">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="border-t border-gold/10 pt-4">
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="mt-0.5 text-xs text-foreground/50">{t.location}</p>
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>
  );
}

export default function ReviewsGrid({ reviews }: ReviewsGridProps) {
  return (
    <section id="casos" className="bg-background px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Testimonios
          </span>
          <h2 className="mt-3 font-serif text-4xl text-foreground">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/60">
            Historias reales de familias que confiaron en nosotros para sus
            procesos migratorios.
          </p>
        </Reveal>

        {reviews.length === 0 ? (
          <TextTestimonials />
        ) : (
          <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
            {reviews.map((review, i) => (
              <Reveal
                key={review.id}
                delay={i * 0.05}
                className="break-inside-avoid"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden rounded-2xl border border-gold/10"
                >
                  <Image
                    src={review.src}
                    alt={review.alt}
                    width={600}
                    height={800}
                    className="h-auto w-full object-cover"
                  />
                </motion.div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
