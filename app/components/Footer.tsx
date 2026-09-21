import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Casos", href: "/#casos" },
  { label: "Contacto", href: "/contacto" },
];

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-navy-700 bg-navy-900 px-6 py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        {/* Marca */}
        <div className="max-w-sm space-y-4">
          <Link href="/#inicio" className="group inline-flex shrink-0 items-center gap-5">
            <Image
              src="/images/logo_footer.png"
              alt="SM Soluciones Migratorias"
              width={382}
              height={208}
              className="h-14 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-16"
            />
            <span className="h-10 w-px shrink-0 bg-white/15 sm:h-12" />
            <span className="flex flex-col leading-tight font-logo">
              <span className="whitespace-nowrap text-[16px] font-bold uppercase tracking-[0.12em] text-gold sm:text-[18px]">
                Soluciones
              </span>
              <span className="whitespace-nowrap text-[16px] font-bold uppercase tracking-[0.12em] text-gold sm:text-[18px]">
                Migratorias
              </span>
            </span>
          </Link>

          <p className="text-sm leading-relaxed text-white/70">
            Asesoría legal migratoria de alto nivel. Guiamos tu camino hacia
            la residencia, ciudadanía y visados en Estados Unidos.
          </p>

          {/* Redes sociales */}
          <div className="flex items-center gap-4 pt-1">
            <a
              href="https://web.facebook.com/solucionesmigratoriassm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-700 bg-navy-700/40 text-white transition-all hover:border-gold hover:text-gold"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/solucionesmigratoriassm/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-700 bg-navy-700/40 text-white transition-all hover:border-gold hover:text-gold"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@solucionesmigratoriassm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-700 bg-navy-700/40 text-white transition-all hover:border-gold hover:text-gold"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.83V7.6a6.34 6.34 0 0 0-5.11 6.17 6.34 6.34 0 0 0 10.79 4.48 6.31 6.31 0 0 0 1.87-4.5V9.01a8.31 8.31 0 0 0 4.56 1.37v-3.7a4.85 4.85 0 0 1-2-.01z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Navegación y contacto esenciales */}
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <nav className="flex flex-col gap-3 text-sm">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href="tel:+13054984470"
              className="text-white/80 transition-colors hover:text-gold"
            >
              +1 (305) 498-4470
            </a>
            <a
              href="mailto:cartera@solucionesmigratoriassm.com"
              className="break-all text-white/80 transition-colors hover:text-gold"
            >
              cartera@solucionesmigratoriassm.com
            </a>
            <span className="text-white/50">Miami, Florida · Estados Unidos</span>
          </div>
        </div>
      </div>

      {/* Aviso legal */}
      <div className="mx-auto mt-10 max-w-7xl border-t border-navy-700 pt-6">
        <p className="text-xs leading-relaxed text-white/50">
          La información de este sitio es de carácter informativo y no
          constituye asesoría legal ni crea una relación abogado-cliente.
          Cada caso es evaluado individualmente y no garantiza resultados
          futuros.
        </p>
      </div>

      {/* Copyright + firma del desarrollador */}
      <div className="mx-auto mt-6 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-navy-700 pt-6 text-center sm:flex-row sm:text-left">
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} ATC USA INVESTMENTS LLC. Todos los
          derechos reservados
        </p>
        <p className="text-xs text-white">
          Desarrollado por{" "}
          <a
            href="https://alan-dev.site"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#3b82f6] transition-colors hover:text-gold"
          >
            alan-dev
          </a>
        </p>
      </div>
    </footer>
  );
}
