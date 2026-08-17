"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { GlowButton } from "./ui/GlowButton";

const links = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Casos", href: "/#casos" },
  { label: "Nosotros", href: "/#footer" },
  { label: "Contacto", href: "/contacto" },
];

const WHATSAPP_NUMBER = "+13054984470";

const mobileMenu: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const mobileLink: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-navy-100 bg-white/85 backdrop-blur-md shadow-[0_4px_20px_rgba(27,45,91,0.08)]"
          : "bg-transparent border-none shadow-none"
      }`}
    >
      {/* ── Scrim fijo para garantizar contraste sobre la foto del Hero ── */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 z-0 h-32.5 transition-opacity duration-300 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,12,18,0.75) 0%, rgba(10,12,18,0.35) 70%, transparent 100%)",
        }}
      />

      <div
        className={`relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "h-24" : "h-28 sm:h-32"
        }`}
      >

        {/* ── Logo + Título flotante único ── */}
        {/* Por debajo de `sm` solo se muestra el ícono: con el wordmark completo
            el bloque no dejaba espacio para el botón de menú en pantallas de 320-360px. */}
        <Link href="/#inicio" className="group flex min-w-0 shrink items-center gap-3 sm:shrink-0 sm:gap-5">
          <Image
            src="/images/logo_SM_icon_transparente.png"
            alt="SM Soluciones Migratorias"
            width={382}
            height={208}
            priority
            className="h-12 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-14 lg:h-16"
          />
          <span
            className={`hidden h-10 w-px shrink-0 transition-colors duration-300 sm:block sm:h-12 ${
              scrolled ? "bg-navy-900/15" : "bg-white/15"
            }`}
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="whitespace-nowrap text-[16px] font-semibold uppercase tracking-[0.12em] text-gold sm:text-[18px]">
              Soluciones
            </span>
            <span className="whitespace-nowrap text-[16px] font-semibold uppercase tracking-[0.12em] text-gold sm:text-[18px]">
              Migratorias
            </span>
          </span>
        </Link>

        {/* ── Navegación Desktop ── */}
        <nav className="hidden items-center gap-8 lg:gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative text-base font-semibold tracking-wide transition-colors hover:text-gold lg:text-lg ${
                scrolled ? "text-navy-700" : "text-gray-200"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* ── Toggle Móvil ── */}
        <div className="flex items-center">
          <button
            className={`p-2 transition-colors hover:text-gold md:hidden ${
              scrolled ? "text-navy-900" : "text-white"
            }`}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ── Menú Móvil: overlay full-screen con stagger ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="show"
            exit="exit"
            variants={mobileMenu}
            className="fixed inset-0 top-0 left-0 z-40 flex h-dvh w-full flex-col items-center justify-center gap-8 bg-navy-900 md:hidden"
          >
            {links.map((link) => (
              <motion.div key={link.href} variants={mobileLink}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-serif font-bold tracking-tight text-white transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div variants={mobileLink} className="mt-4">
              <GlowButton
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="solid"
              >
                Agendar Consulta
                <MessageCircle size={18} />
              </GlowButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}