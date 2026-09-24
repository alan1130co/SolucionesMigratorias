"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { GlowButton } from "./ui/GlowButton";
import type { GoogleReview, GoogleReviewsData } from "@/lib/google-reviews";

interface TestimonialsProps {
  data: GoogleReviewsData | null;
  fallbackUrl: string | null;
}

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
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex gap-1" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < filled ? "fill-gold text-gold" : "fill-transparent text-gold/30"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 220;

  return (
    <motion.div
      variants={cardItem}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex w-80 shrink-0 snap-center flex-col gap-4 rounded-2xl border border-gold/10 bg-background p-8 sm:w-96"
    >
      <StarRating rating={review.rating} />

      <p
        className={`flex-1 text-sm leading-relaxed text-foreground/70 ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        &ldquo;{review.text}&rdquo;
      </p>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="self-start text-xs font-semibold text-gold transition-colors hover:text-gold-600"
        >
          {expanded ? "Leer menos" : "Leer más"}
        </button>
      )}

      <a
        href={review.authorProfileUrl ?? undefined}
        target={review.authorProfileUrl ? "_blank" : undefined}
        rel={review.authorProfileUrl ? "noopener noreferrer" : undefined}
        className={`flex min-w-0 items-center gap-3 border-t border-gold/10 pt-4 ${
          review.authorProfileUrl ? "cursor-pointer" : "cursor-default"
        }`}
      >
        {review.authorPhotoUrl ? (
          <Image
            src={review.authorPhotoUrl}
            alt={review.authorName}
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-gold">
            {getInitials(review.authorName)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {review.authorName}
          </p>
          <p className="mt-0.5 text-xs text-foreground/50">
            {review.relativeTime || "Reseña de Google"}
          </p>
        </div>
      </a>
    </motion.div>
  );
}

export default function Testimonials({ data, fallbackUrl }: TestimonialsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  // whileInView nunca llegaba a aplicar su estado "hidden" en este proyecto
  // (ver SectionWrapper) — usamos useInView + animate, con el mismo ref que
  // ya usa el scroller horizontal.
  const isReviewsInView = useInView(scrollerRef, { once: true, amount: 0.2 });
  const hasReviews = !!data && data.reviews.length > 0;

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
              Historias que{" "}
              <span className="font-extrabold text-gold">Cambiaron un Destino</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-foreground/60">
              Historias reales de familias que confiaron en nosotros para sus
              procesos migratorios.
            </p>

            {hasReviews && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-3xl font-bold text-foreground">
                  {data.rating.toFixed(1)}
                </span>
                <StarRating rating={data.rating} size={18} />
                <span className="text-sm text-foreground/50">
                  ({data.userRatingCount} reseñas de Google)
                </span>
              </div>
            )}
          </div>

          {hasReviews && (
            <div className="flex shrink-0 items-center gap-3">
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
          )}
        </SectionWrapper>

        {hasReviews ? (
          <>
            <motion.div
              variants={cardContainer}
              initial="hidden"
              animate={isReviewsInView ? "show" : "hidden"}
              ref={scrollerRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
            >
              {data.reviews.map((review, i) => (
                <ReviewCard key={`${review.authorName}-${i}`} review={review} />
              ))}
            </motion.div>

            {data.googleMapsUri && (
              <SectionWrapper delay={0.1} className="mt-8 flex flex-wrap items-center gap-2 text-sm">
                <a
                  href={data.googleMapsUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-foreground transition-colors hover:text-gold"
                >
                  Ver todas las reseñas en Google
                  <ExternalLink size={14} />
                </a>
                <span className="text-foreground/40">
                  · Reseñas de Google
                </span>
              </SectionWrapper>
            )}
          </>
        ) : (
          <SectionWrapper
            delay={0.1}
            className="flex flex-col items-start gap-5 rounded-2xl border border-gold/10 bg-background p-10"
          >
            <p className="max-w-lg text-sm leading-relaxed text-foreground/60">
              Estamos actualizando nuestras reseñas de Google en este momento.
              Mientras tanto, puedes consultarlas directamente en nuestro
              perfil de negocio.
            </p>
            {fallbackUrl && (
              <GlowButton
                href={fallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                Ver nuestras reseñas en Google
                <ExternalLink size={16} />
              </GlowButton>
            )}
          </SectionWrapper>
        )}
      </div>
    </section>
  );
}
