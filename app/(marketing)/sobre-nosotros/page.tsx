import type { Metadata } from "next";
import { PageBanner } from "@/app/components/PageBanner";
import Manifesto from "@/app/components/Manifesto";
import OurApproach from "@/app/components/OurApproach";
import LawyerCard from "@/app/components/LawyerCard";
import FinalCTA from "@/app/components/FinalCTA";

export const metadata: Metadata = {
  title: "Sobre Nosotros | Soluciones Migratorias SM",
  description:
    "Conoce al equipo detrás de Soluciones Migratorias SM: nuestra historia, nuestro enfoque de trabajo y el compromiso que guía cada caso que representamos en Miami, FL.",
};

export default function SobreNosotrosPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageBanner
        kicker="Sobre Nosotros"
        title={
          <>
            Detrás de cada caso, un equipo{" "}
            <span className="font-serif italic text-gold">comprometido</span>.
          </>
        }
        description="Somos una firma de abogados de inmigración que combina rigor legal con cercanía humana. Esta es nuestra historia, nuestro enfoque de trabajo y los números que respaldan cada caso que representamos."
      />

      <Manifesto />
      <OurApproach />
      <LawyerCard />
      <FinalCTA />
    </main>
  );
}
