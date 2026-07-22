import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const quickLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Casos", href: "#casos" },
  { label: "Nosotros", href: "#abogado" },
  { label: "Contacto", href: "#contacto" },
];

const emails = [
  "cartera@solucionesmigratoriassm.com",
  "it@solucionesmigratorias.com",
];

const hours = [
  { day: "Lunes – Viernes", time: "9:00 AM – 6:00 PM" },
  { day: "Sábado", time: "10:00 AM – 2:00 PM" },
  { day: "Domingo", time: "Cerrado" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 px-6 pt-16 pb-8 text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Marca / Descripción */}
        <div className="space-y-5 lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-white/20">
              <Image
                src="/images/logo_SM.png"
                alt="Soluciones Migratorias"
                width={40}
                height={40}
                className="h-8 w-8 object-contain"
              />
            </span>
            <h3 className="font-serif text-lg font-bold text-white">
              Soluciones Migratorias <span className="text-gold">SM</span>
            </h3>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-400">
            Asesoría legal migratoria de alto nivel. Guiamos tu camino hacia
            la residencia, ciudadanía y visados en Estados Unidos.
          </p>

          {/* Redes Sociales */}
          <div className="flex items-center gap-4 pt-1">
            {/* Facebook */}
            <a
              href="https://web.facebook.com/solucionesmigratoriassm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition-all hover:border-gold hover:text-gold"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/solucionesmigratoriassm/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition-all hover:border-gold hover:text-gold"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@solucionesmigratoriassm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition-all hover:border-gold hover:text-gold"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.83V7.6a6.34 6.34 0 0 0-5.11 6.17 6.34 6.34 0 0 0 10.79 4.48 6.31 6.31 0 0 0 1.87-4.5V9.01a8.31 8.31 0 0 0 4.56 1.37v-3.7a4.85 4.85 0 0 1-2-.01z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Enlaces Rápidos */}
        <div className="space-y-4">
          <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-gold">
            Enlaces Rápidos
          </h4>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-slate-300 transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div className="space-y-4">
          <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-gold">
            Contacto
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span className="text-slate-300">
                Miami, Florida · Estados Unidos
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
              <a
                href="tel:+13054984470"
                className="text-slate-300 transition-colors hover:text-gold"
              >
                +1 (305) 498-4470
              </a>
            </li>
            {emails.map((email) => (
              <li key={email} className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
                <a
                  href={`mailto:${email}`}
                  className="break-all text-slate-300 transition-colors hover:text-gold"
                >
                  {email}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Horario de Atención */}
        <div className="space-y-4">
          <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-gold">
            Horario de Atención
          </h4>
          <ul className="space-y-3 text-sm">
            {hours.map(({ day, time }) => (
              <li key={day} className="flex items-start gap-2.5">
                <Clock size={16} className="mt-0.5 shrink-0 text-gold" />
                <span className="text-slate-300">
                  <span className="block text-slate-200">{day}</span>
                  {time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer legal */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-slate-800 pt-6">
        <p className="text-xs leading-relaxed text-slate-500">
          <span className="font-semibold text-slate-400">Aviso Legal:</span>{" "}
          La información contenida en este sitio web tiene fines
          estrictamente informativos y no constituye asesoría legal ni crea
          una relación abogado-cliente. Cada caso migratorio es evaluado de
          forma individual y los resultados obtenidos en casos anteriores no
          garantizan un resultado similar en casos futuros. Se recomienda
          agendar una consulta con nuestro equipo antes de tomar cualquier
          decisión relacionada con su proceso migratorio.
        </p>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-6 flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-slate-800 pt-6 text-center sm:flex-row sm:text-left">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Soluciones Migratorias SM · Todos los
          derechos reservados
        </p>
        <p className="text-xs text-slate-500">Miami, Florida · Estados Unidos</p>
      </div>
    </footer>
  );
}
