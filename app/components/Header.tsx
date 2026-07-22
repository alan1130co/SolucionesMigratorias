"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Casos", href: "#casos" },
  { label: "Nosotros", href: "#abogado" },
  { label: "Contacto", href: "#contacto" },
];

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
          ? "border-b border-slate-200 bg-white/85 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          : "bg-transparent border-none shadow-none"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 sm:h-28">

        {/* ── Logo + Título flotante único ── */}
        <a href="#inicio" className="group flex items-center gap-3">
          <span
            className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 transition-all duration-300 group-hover:ring-gold sm:h-18 sm:w-18 ${
              scrolled ? "bg-white ring-slate-200" : "bg-neutral-900/80 ring-white/20"
            }`}
          >
            <Image
              src="/images/logo_SM.png"
              alt="Soluciones Migratorias"
              width={72}
              height={72}
              priority
              className="h-14 w-14 object-contain sm:h-16 sm:w-16"
            />
          </span>
          <span
            className={`font-serif text-xl font-bold tracking-tight transition-colors group-hover:text-gold sm:text-2xl ${
              scrolled ? "text-slate-900" : "text-white"
            }`}
          >
            Soluciones Migratorias
          </span>
        </a>

        {/* ── Navegación Desktop ── */}
        <nav className="hidden items-center gap-8 lg:gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`group relative text-base font-semibold tracking-wide transition-colors hover:text-gold lg:text-lg ${
                scrolled ? "text-slate-700" : "text-gray-200"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* ── Toggle Móvil ── */}
        <button
          className={`p-2 transition-colors hover:text-gold md:hidden ${
            scrolled ? "text-slate-900" : "text-white"
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir menú"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ── Menú Móvil ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-200 bg-white/95 px-6 py-6 shadow-xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium tracking-wide text-slate-700 transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}