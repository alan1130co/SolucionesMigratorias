"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, animate } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";

interface PracticeArea {
  title: string;
  desc: string;
  slug: string;
  image: string;
}

export const practiceAreas: PracticeArea[] = [
  {
    title: "Asilo Político",
    desc: "Preparamos tu solicitud y tu testimonio con evidencia sólida, para presentarte ante el juez o el oficial de asilo con un caso verdaderamente defendible.",
    slug: "asilo",
    image: "/images/services/img-asilo_politico.png",
  },
  {
    title: "Representación en Corte de Inmigración",
    desc: "Te representamos en cada audiencia frente al Tribunal de Inmigración (EOIR), sin dejarte enfrentar al juez sin preparación.",
    slug: "representacion-en-corte",
    image: "/images/services/img-representacion_en_corte.png",
  },
  {
    title: "Permiso de Trabajo (EAD)",
    desc: "Gestionamos y corregimos tu solicitud de autorización de empleo para que puedas trabajar legalmente mientras tu caso avanza.",
    slug: "permiso-de-trabajo",
    image: "/images/services/img-permiso_de_trabajo.png",
  },
  {
    title: "Cancelación de Remoción",
    desc: "Evaluamos si calificas para detener tu proceso de deportación por tiempo de residencia y dificultad extrema a tu familia.",
    slug: "cancelacion-de-remocion",
    image: "/images/services/img-cancelacion_de_remocion.png",
  },
  {
    title: "Peticiones Familiares",
    desc: "Reunificación familiar mediante peticiones de inmigración en EE. UU.",
    slug: "peticiones-familiares",
    image: "/images/services/img-peticion_familiar.png",
  },
  {
    title: "Visa U y VAWA",
    desc: "Protección legal para víctimas de crímenes o abuso, con procesos que exigen evidencia cuidadosamente documentada.",
    slug: "visa-u-vawa",
    image: "/images/services/img-visa_vawa.png",
  },
  {
    title: "Naturalización y Ciudadanía",
    desc: "Acompañamiento integral en tu proceso para obtener la ciudadanía estadounidense.",
    slug: "naturalizacion-y-ciudadania",
    image: "/images/services/img-naturalizacion_y_ciudadania.png",
  },
  {
    title: "Fianza de Inmigración",
    desc: "Te ayudamos a solicitar la liberación bajo fianza mientras tu proceso migratorio continúa.",
    slug: "fianza-de-inmigracion",
    image: "/images/services/img_fianza.png",
  },
];

const VISIBLE_DESKTOP = 4;
const GAP = 24;
const SLIDE_TRANSITION = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

function AreaCard({ area, width }: { area: PracticeArea; width?: number }) {
  return (
    <Link
      href={`/areas-de-practica/${area.slug}`}
      draggable={false}
      style={width ? { width, flex: `0 0 ${width}px` } : undefined}
      className="group relative block aspect-[3/4] w-full shrink-0 select-none overflow-hidden rounded-3xl border-0 bg-navy-900 outline-none"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={area.image}
          alt={area.title}
          fill
          draggable={false}
          sizes="(min-width: 768px) 25vw, 88vw"
          className="pointer-events-none object-cover transition-transform duration-1200 ease-out group-hover:scale-110"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-navy-900/92 via-navy-900/15 to-navy-900/75" />

      <div className="absolute left-7 top-7 h-0.5 w-10 bg-gold opacity-70 transition-all duration-500 group-hover:w-16 group-hover:opacity-100" />

      <div className="absolute inset-x-0 top-0 p-7 pt-12">
        <h3 className="text-xl font-bold leading-tight text-white md:text-2xl">
          {area.title}
        </h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/90">
          {area.desc}
        </p>
      </div>

      <div className="absolute bottom-6 right-6 text-white transition-transform duration-300 ease-out group-hover:translate-x-1">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </Link>
  );
}

function NavButton({
  direction,
  onClick,
  disabled,
  size = "md",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
  size?: "sm" | "md";
}) {
  const dimension = size === "md" ? "h-14 w-14" : "h-12 w-12";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Área de práctica anterior" : "Siguiente área de práctica"}
      className={`flex ${dimension} items-center justify-center rounded-full border border-navy/20 text-navy transition-all duration-300 hover:scale-105 hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-30`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        {direction === "prev" ? <path d="M19 12H5M11 6l-6 6 6 6" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
      </svg>
    </button>
  );
}

export default function PracticeAreas() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const [cardWidth, setCardWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const draggedRef = useRef(false);

  // Se corrigió "areas" por "practiceAreas"
  const maxIndex = Math.max(0, practiceAreas.length - VISIBLE_DESKTOP);
  const step = cardWidth + GAP;
  const maxScroll = maxIndex * step;

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const viewportWidth = viewport.clientWidth;
    const nextCardWidth = Math.max(
      0,
      (viewportWidth - (VISIBLE_DESKTOP - 1) * GAP) / VISIBLE_DESKTOP
    );
    setCardWidth(nextCardWidth);
  }, []);

  useEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => measure());
    if (viewportRef.current) ro.observe(viewportRef.current);

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [measure]);

  const clampedIndex = Math.min(index, maxIndex);

  useEffect(() => {
    animate(x, -clampedIndex * step, SLIDE_TRANSITION);
  }, [clampedIndex, step, x]);

  const dragConstraints = useMemo(() => ({ left: -maxScroll, right: 0 }), [maxScroll]);

  const goPrev = () => setIndex((i) => Math.max(0, Math.min(i, maxIndex) - 1));
  const goNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const handleDragStart = () => {
    draggedRef.current = true;
  };

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    if (step === 0) return;
    const projected = x.get() + info.velocity.x * 0.2;
    const nearestIndex = Math.round(-projected / step);
    setIndex(Math.min(maxIndex, Math.max(0, nearestIndex)));
  };

  const handleTrackClickCapture = (e: React.MouseEvent) => {
    if (draggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      draggedRef.current = false;
    }
  };

  const atStart = clampedIndex <= 0;
  const atEnd = clampedIndex >= maxIndex;

  return (
    <section
      id="servicios"
      className="w-full bg-surface py-20"
    >
      <div className="w-full px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <SectionWrapper>
            <h2 className="text-7xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-8xl">
              Nuestro <span className="text-gold">Servicios</span>
            </h2>
          </SectionWrapper>

          <div className="flex items-start gap-8 md:pt-2">
            <SectionWrapper delay={0.1} className="md:max-w-sm">
              <p className="text-base leading-relaxed text-foreground/60 md:text-lg">
                Una selección de áreas legales pensadas para proteger tu
                futuro migratorio, con la misma atención al detalle en cada
                caso que representamos.
              </p>
            </SectionWrapper>

            <div className="hidden shrink-0 items-center gap-3 md:flex">
              <NavButton direction="prev" onClick={goPrev} disabled={atStart} />
              <NavButton direction="next" onClick={goNext} disabled={atEnd} />
            </div>
          </div>
        </div>
      </div>

      <SectionWrapper delay={0.15} className="mt-16 w-full">
        <div className="hidden md:block">
          <div className="w-full px-6 md:px-10">
            <div ref={viewportRef} className="w-full overflow-hidden">
              <motion.div
                className="flex cursor-grab gap-6 active:cursor-grabbing"
                style={{ x, width: cardWidth ? practiceAreas.length * cardWidth + (practiceAreas.length - 1) * GAP : undefined }}
                drag="x"
                dragConstraints={dragConstraints}
                dragElastic={0.06}
                dragMomentum={false}
                onClickCapture={handleTrackClickCapture}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                {practiceAreas.map((area) => (
                  <AreaCard key={area.slug} area={area} width={cardWidth} />
                ))}
              </motion.div>
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ir a la página ${i + 1} de servicios`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === clampedIndex ? "w-8 bg-gold" : "w-1.5 bg-navy/20 hover:bg-navy/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 no-scrollbar md:hidden">
          {practiceAreas.map((area) => (
            <div key={area.slug} className="w-[88vw] shrink-0 snap-center">
              <AreaCard area={area} />
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}