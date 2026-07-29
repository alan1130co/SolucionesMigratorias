import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageBanner } from "@/app/components/PageBanner";
import { SectionWrapper } from "@/app/components/SectionWrapper";
import { ContactForm } from "@/app/components/ContactForm";
import { GlowButton } from "@/app/components/ui/GlowButton";

export const metadata: Metadata = {
  title: "Contacto | Soluciones Migratorias SM",
  description:
    "Agenda tu consulta con Soluciones Migratorias SM. Escríbenos por WhatsApp, llama directamente o completa el formulario y te contactamos.",
};

const WHATSAPP_NUMBER = "+13054984470";

const emails = [
  "cartera@solucionesmigratoriassm.com",
  "it@solucionesmigratorias.com",
];

const hours = [
  { day: "Lunes – Viernes", time: "9:00 AM – 6:00 PM" },
  { day: "Sábado", time: "10:00 AM – 2:00 PM" },
  { day: "Domingo", time: "Cerrado" },
];

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageBanner
        kicker="Contacto"
        title={
          <>
            Hablemos de{" "}
            <span className="font-serif italic text-gold">tu proceso</span>{" "}
            migratorio.
          </>
        }
        description="Escríbenos por WhatsApp, llámanos directamente o cuéntanos tu caso por el formulario. Nuestro equipo evalúa cada consulta con la misma atención."
      />

      <section className="flex min-h-[90vh] w-full flex-col justify-center bg-background px-6 py-28 sm:min-h-screen md:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Columna izquierda: información de contacto */}
          <SectionWrapper>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Información de Contacto
            </span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
              Elige el canal que prefieras
            </h2>

            <ul className="mt-8 flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <MapPin size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Dirección
                  </p>
                  <p className="mt-0.5 text-sm text-foreground/60">
                    Miami, Florida · Estados Unidos
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <Phone size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Teléfono
                  </p>
                  <a
                    href={`tel:${WHATSAPP_NUMBER}`}
                    className="mt-0.5 block text-sm text-foreground/60 transition-colors hover:text-gold"
                  >
                    +1 (305) 498-4470
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <Mail size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Correo
                  </p>
                  {emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="mt-0.5 block break-all text-sm text-foreground/60 transition-colors hover:text-gold"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <Clock size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Horario de Atención
                  </p>
                  {hours.map(({ day, time }) => (
                    <p key={day} className="mt-0.5 text-sm text-foreground/60">
                      <span className="text-foreground/80">{day}:</span>{" "}
                      {time}
                    </p>
                  ))}
                </div>
              </li>
            </ul>

            <div className="mt-10">
              <GlowButton
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="solid"
              >
                Escríbenos por WhatsApp
                <MessageCircle size={18} />
              </GlowButton>
            </div>
          </SectionWrapper>

          {/* Columna derecha: mini-formulario */}
          <SectionWrapper delay={0.15}>
            <ContactForm />
          </SectionWrapper>
        </div>
      </section>
    </main>
  );
}
