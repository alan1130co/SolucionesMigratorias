import type { Metadata } from "next";
import {
  Shield,
  Users,
  Briefcase,
  Award,
  FileCheck,
  Gavel,
  type LucideIcon,
} from "lucide-react";
import { PageBanner } from "@/app/components/PageBanner";
import { SectionWrapper } from "@/app/components/SectionWrapper";
import Testimonials, { ReviewImage } from "@/app/components/Testimonials";
import FinalCTA from "@/app/components/FinalCTA";

export const metadata: Metadata = {
  title: "Casos de Éxito | Soluciones Migratorias SM",
  description:
    "Resultados reales por área de práctica y testimonios de familias que confiaron en Soluciones Migratorias SM para sus procesos migratorios en Estados Unidos.",
};

interface CaseResult {
  icon: LucideIcon;
  area: string;
  result: string;
}

// TODO: reemplazar con casos y cifras reales verificadas por la firma.
const caseResults: CaseResult[] = [
  {
    icon: Shield,
    area: "Asilo Político",
    result:
      "Decenas de solicitudes de asilo aprobadas, incluyendo casos complejos con evidencia country-condition documentada a detalle.",
  },
  {
    icon: Users,
    area: "Peticiones Familiares",
    result:
      "Cientos de familias reunificadas mediante peticiones I-130 y ajustes de estatus tramitados con éxito.",
  },
  {
    icon: Briefcase,
    area: "Visas de Trabajo",
    result:
      "Profesionales y empresas acompañados en la obtención de visas H-1B, L-1 y O-1 para talento internacional.",
  },
  {
    icon: Award,
    area: "Naturalización",
    result:
      "Cientos de clientes juramentados como ciudadanos estadounidenses tras un proceso acompañado de principio a fin.",
  },
  {
    icon: FileCheck,
    area: "Perdones y Waivers",
    result:
      "Perdones de inadmisibilidad aprobados que evitaron años de separación familiar.",
  },
  {
    icon: Gavel,
    area: "Defensa en Corte",
    result:
      "Casos de remoción resueltos favorablemente mediante alivios migratorios y apelaciones bien fundamentadas.",
  },
];

const reviews: ReviewImage[] = [];

export default function CasosDeExitoPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageBanner
        kicker="Casos de Éxito"
        title={
          <>
            Resultados que{" "}
            <span className="font-serif italic text-gold">
              hablan por sí solos
            </span>
            .
          </>
        }
        description="Cada proceso migratorio es distinto, pero el compromiso con el resultado es siempre el mismo. Estos son algunos de los logros que respaldan nuestro trabajo, área por área."
      />

      {/* Resultados por área */}
      <section className="flex min-h-[90vh] w-full flex-col justify-center bg-surface px-6 py-28 sm:min-h-screen md:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionWrapper className="mb-16 max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Resultados por Área
            </span>
            <h2 className="mt-4 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
              Un historial que{" "}
              <span className="font-serif italic text-gold">respalda</span>{" "}
              cada nuevo caso.
            </h2>
          </SectionWrapper>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseResults.map(({ icon: Icon, area, result }, i) => (
              <SectionWrapper key={area} delay={(i % 3) * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-gold/10 bg-background p-7 transition-all duration-300 hover:scale-[1.03] hover:border-gold/40">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                    <Icon size={22} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-lg text-foreground">
                    {area}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                    {result}
                  </p>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      <Testimonials reviews={reviews} />
      <FinalCTA />
    </main>
  );
}
