import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import PracticeAreas from "./components/PracticeAreas";
import OurApproach from "./components/OurApproach";
import LawyerCard from "./components/LawyerCard";
import Testimonials, { ReviewImage } from "./components/Testimonials";
import CollaboratorValidator from "./components/CollaboratorValidator";
import ShortsSection from "./components/ShortsSection";
import FAQSection from "./components/FAQSection";
import TransitionCTA from "./components/TransitionCTA";
import FinalCTA from "./components/FinalCTA";

const reviews: ReviewImage[] = [];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] text-slate-800">
      {/* Hero: gradiente aurora + headline + CTA doble */}
      <Hero />

      {/* Confianza/manifiesto: kicker + stats con count-up */}
      <Manifesto />

      {/* Áreas de Práctica */}
      <PracticeAreas />

      {/* Nuestro Enfoque: headline + dos columnas de texto */}
      <OurApproach />

      {/* Secciones de Contenido */}
      <div className="bg-[#FAF9F6]">
        <LawyerCard />
        <CollaboratorValidator />
        <ShortsSection />
        <Testimonials reviews={reviews} />
        <FAQSection />
      </div>

      {/* CTA de transición a pantalla completa */}
      <TransitionCTA />

      {/* CTA final de contacto + mini-formulario */}
      <FinalCTA />
    </main>
  );
}