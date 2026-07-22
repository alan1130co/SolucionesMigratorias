import Header from "./components/Header";
import HeroSection from "./components/sections/HeroSection";
import ServicesGrid from "./components/ServicesGrid";
import LawyerCard from "./components/LawyerCard";
import ReviewsGrid, { ReviewImage } from "./components/ReviewsGrid";
import CollaboratorValidator from "./components/CollaboratorValidator";
import ShortsSection from "./components/ShortsSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import { Reveal } from "./components/motion/Reveal";
import { GlowButton } from "./components/ui/GlowButton";
import { Phone, ArrowRight } from "lucide-react";

const reviews: ReviewImage[] = [];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] text-slate-800">
      {/* Header / Navbar */}
      <Header />

      {/* Hero Principal con Video Original */}
      <HeroSection />

      {/* Secciones de Contenido */}
      <div className="bg-[#FAF9F6]">
        <ServicesGrid />
        <LawyerCard />
        <CollaboratorValidator />
        <ShortsSection />
        <ReviewsGrid reviews={reviews} />
        <FAQSection />
      </div>

      {/* ── Contacto / CTA ────────────────────────────────────── */}
      <section id="contacto" className="bg-white px-4 py-24 border-t border-slate-200">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Contáctanos
          </span>
          <h2 className="mt-3 mb-6 font-serif text-4xl text-slate-900">
            ¿Listo para Comenzar tu Proceso?
          </h2>
          <p className="mb-10 text-base leading-relaxed text-slate-600">
            Agenda tu consulta hoy. Nuestro equipo de profesionales está listo para evaluar tu caso y brindarte una hoja de ruta clara.
          </p>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <GlowButton
              href="https://wa.me/+13054984470"
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
            >
              Consultar tu caso gratis
              <ArrowRight size={18} />
            </GlowButton>
            <a
              href="tel:+13054984470"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-8 py-4 text-base font-semibold text-slate-800 transition-colors hover:border-gold hover:text-gold"
            >
              <Phone size={16} />
              +1 (305) 498-4470
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}