import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import CeoSection from "./components/CeoSection";
import LawyerCard from "./components/LawyerCard";
import PracticeAreas from "./components/PracticeAreas";
import OurApproach from "./components/OurApproach";
import ShortsSection from "./components/ShortsSection";
import Testimonials, { ReviewImage } from "./components/Testimonials";
import CollaboratorValidator from "./components/CollaboratorValidator";
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

      {/* Liderazgo: presentación de la CEO y fundadora */}
      <CeoSection />

      {/* Secciones de Contenido */}
      <div className="bg-[#FAF9F6]">
        {/* Abogado principal: credenciales y áreas de práctica */}
        <LawyerCard />

        {/* Áreas de Práctica */}
        <PracticeAreas />

        {/* Nuestro Enfoque: headline + dos columnas de texto */}
        <OurApproach />

        {/* Shorts: contenido educativo en video */}
        <ShortsSection />

        {/* Casos de éxito / testimonios */}
        <Testimonials reviews={reviews} />

        {/* Validador de colaboradores: confianza/anti-fraude */}
        <CollaboratorValidator />

        {/* Preguntas frecuentes */}
        <FAQSection />
      </div>

      {/* CTA de transición a pantalla completa */}
      <TransitionCTA />

      {/* CTA final de contacto + mini-formulario */}
      <FinalCTA />
    </main>
  );
}
