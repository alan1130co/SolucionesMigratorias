import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { Reveal } from "@/app/components/motion/Reveal";
import { GlowButton } from "@/app/components/ui/GlowButton";
import PracticeAreaHero from "@/app/components/sections/PracticeAreaHero";

const SITE_URL = "https://solucionesmigratoriassm.com";
const PHONE_DISPLAY = "+1 (305) 498-4470";
const PHONE_TEL = "+13054984470";

interface PracticeArea {
  title: string;
  shortTitle: string;
  description: string;
  serviceType: string;
  content: string[];
  media: {
    poster: string;
    video: string;
  };
}

// TODO: reemplazar por los videos/fotos institucionales reales de cada área.
// Mientras tanto: video de muestra genérico + poster de Unsplash temático.
const PLACEHOLDER_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";

const unsplashPoster = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?q=80&w=1920&auto=format&fit=crop`;

const practiceAreas: Record<string, PracticeArea> = {
  "eb2-niw": {
    title: "Visa EB-2 NIW — Waiver de Interés Nacional",
    shortTitle: "EB-2 NIW",
    description:
      "Representación legal para profesionales excepcionales que buscan la residencia permanente en EE.UU. mediante el waiver de interés nacional (EB-2 NIW), sin necesidad de oferta laboral ni certificación PERM.",
    serviceType: "Employment-Based Immigration Petition",
    content: [
      "El waiver de interés nacional permite a profesionales con capacidad excepcional o grados avanzados solicitar la residencia permanente sin patrocinador laboral, siempre que su trabajo beneficie sustancialmente a los intereses nacionales de Estados Unidos.",
      "Evaluamos tu perfil bajo los tres criterios establecidos por el precedente Dhanasar: mérito e importancia sustancial, buena posición para llevar adelante el proyecto propuesto, y conveniencia de eximir los requisitos de oferta laboral y certificación PERM.",
      "Construimos tu petición con evidencia documental sólida —publicaciones, cartas de recomendación, reconocimientos y proyección de impacto— para maximizar la probabilidad de aprobación ante USCIS.",
    ],
    media: {
      poster: unsplashPoster("1519389950473-47ba0277781c"),
      video: PLACEHOLDER_VIDEO,
    },
  },
  asilo: {
    title: "Asilo Político",
    shortTitle: "Asilo",
    description:
      "Protección legal para quienes enfrentan persecución en su país de origen por motivos de raza, religión, nacionalidad, opinión política o pertenencia a un grupo social determinado.",
    serviceType: "Asylum Representation",
    content: [
      "Acompañamos cada etapa del proceso de asilo: la solicitud afirmativa ante USCIS, la preparación de la declaración jurada y la representación en corte de inmigración cuando el caso es referido a proceso defensivo.",
      "Trabajamos de la mano contigo para documentar tu caso con precisión y sensibilidad, reuniendo evidencia country-condition, testimonios y corroboración que respalden tu solicitud.",
      "El plazo de un año desde tu última entrada a Estados Unidos es crítico. Te orientamos desde el primer momento para proteger tu elegibilidad y evitar errores procesales irreversibles.",
    ],
    media: {
      poster: unsplashPoster("1589829545856-d10d557cf95f"),
      video: PLACEHOLDER_VIDEO,
    },
  },
  "peticiones-familiares": {
    title: "Peticiones Familiares",
    shortTitle: "Peticiones Familiares",
    description:
      "Reunificación familiar mediante peticiones de inmigración para cónyuges, hijos, padres y hermanos de ciudadanos y residentes permanentes en Estados Unidos.",
    serviceType: "Family-Based Immigration Petition",
    content: [
      "Preparamos y presentamos peticiones I-130 y los ajustes de estatus o procesos consulares correspondientes, guiándote a través de cada categoría de preferencia familiar y sus tiempos de espera.",
      "Identificamos la vía más eficiente según tu situación migratoria actual, incluyendo waivers de inadmisibilidad cuando son necesarios para completar el proceso sin separar a tu familia.",
    ],
    media: {
      poster: unsplashPoster("1476703993599-0035a21b17a9"),
      video: PLACEHOLDER_VIDEO,
    },
  },
  "visa-u-vawa": {
    title: "Visa U & VAWA",
    shortTitle: "Visa U / VAWA",
    description:
      "Protección especial para víctimas de crímenes y violencia doméstica que colaboran con las autoridades, incluyendo peticiones bajo la Ley de Violencia Contra la Mujer (VAWA).",
    serviceType: "Humanitarian Immigration Relief",
    content: [
      "La Visa U está disponible para víctimas de ciertos delitos que han sufrido abuso físico o mental sustancial y que colaboran con las autoridades en la investigación o el proceso penal.",
      "Las peticiones VAWA permiten a cónyuges, hijos y padres abusados por un ciudadano o residente permanente autopeticionar su residencia sin depender del agresor, con absoluta confidencialidad.",
    ],
    media: {
      poster: unsplashPoster("1517245386807-bb43f82c33c4"),
      video: PLACEHOLDER_VIDEO,
    },
  },
  corporativo: {
    title: "Inmigración Corporativa",
    shortTitle: "Corporativo",
    description:
      "Asesoría integral para empresas que necesitan transferir, contratar o patrocinar talento internacional mediante visas de trabajo y procesos de certificación laboral.",
    serviceType: "Corporate Immigration Compliance",
    content: [
      "Diseñamos estrategias de movilidad laboral para empresas, cubriendo visas L-1, H-1B, E-2 y procesos PERM, alineadas con los objetivos de crecimiento y cumplimiento de tu organización.",
      "Acompañamos al equipo de recursos humanos en la gestión de expedientes, plazos de renovación y auditorías, minimizando el riesgo de interrupciones en la fuerza laboral internacional.",
    ],
    media: {
      poster: unsplashPoster("1454165804606-c3d57bc86b40"),
      video: PLACEHOLDER_VIDEO,
    },
  },
  "visas-de-trabajo": {
    title: "Visas de Trabajo",
    shortTitle: "Visas de Trabajo",
    description:
      "Patrocinio laboral y visas de empleo para profesionales, trabajadores calificados y talento internacional que buscan trabajar legalmente en Estados Unidos.",
    serviceType: "Employment-Based Visa Sponsorship",
    content: [
      "Evaluamos junto a ti y a tu empleador la categoría de visa más adecuada —H-1B, L-1, TN, O-1, entre otras— según tu perfil profesional y la estructura de la empresa patrocinadora.",
      "Preparamos la documentación y coordinamos con el empleador los pasos de certificación laboral cuando el proceso lo requiere, cuidando los plazos y requisitos específicos de cada categoría.",
      "Damos seguimiento a renovaciones, cambios de estatus y extensiones, para que tu situación migratoria laboral se mantenga siempre en regla.",
    ],
    media: {
      poster: unsplashPoster("1497366754035-f200968a6e72"),
      video: PLACEHOLDER_VIDEO,
    },
  },
  "visa-k1": {
    title: "Visa de Prometido K-1",
    shortTitle: "Visa K-1",
    description:
      "Proceso migratorio para prometidos de ciudadanos estadounidenses que desean ingresar a Estados Unidos para contraer matrimonio y solicitar posteriormente el ajuste de estatus.",
    serviceType: "Fiancé(e) Visa Petition",
    content: [
      "Preparamos la petición I-129F ante USCIS, documentando la relación de buena fe y cumpliendo con los requisitos de elegibilidad del ciudadano peticionario y su prometido(a).",
      "Te orientamos durante todo el proceso consular, la entrevista y los 90 días posteriores a la entrada en Estados Unidos, en los que debe celebrarse el matrimonio.",
      "Una vez casados, te acompañamos en la solicitud de ajuste de estatus para obtener la residencia permanente condicional.",
    ],
    media: {
      poster: unsplashPoster("1519741497674-611481863552"),
      video: PLACEHOLDER_VIDEO,
    },
  },
  "perdones-waivers": {
    title: "Perdones y Waivers",
    shortTitle: "Perdones y Waivers",
    description:
      "Perdones de inadmisibilidad (waivers) para superar obstáculos migratorios como presencia ilegal, entradas previas sin inspección u otras causales que impiden obtener una visa o residencia.",
    serviceType: "Waiver of Inadmissibility Petition",
    content: [
      "Identificamos la causal de inadmisibilidad específica en tu caso y evaluamos si calificas para un perdón provisional (I-601A) o un perdón tradicional (I-601) según tu situación.",
      "Documentamos el estándar de dificultad extrema ('extreme hardship') hacia tu familiar calificado —cónyuge o padres ciudadanos o residentes— con evidencia médica, económica y psicológica sólida.",
      "Te guiamos en la coordinación entre el proceso de perdón y el proceso consular o de ajuste de estatus correspondiente, para minimizar tiempos de separación familiar.",
    ],
    media: {
      poster: unsplashPoster("1450101499163-c8848c66ca85"),
      video: PLACEHOLDER_VIDEO,
    },
  },
  naturalizacion: {
    title: "Naturalización",
    shortTitle: "Naturalización",
    description:
      "Acompañamiento integral en tu proceso para obtener la ciudadanía estadounidense, desde la evaluación de elegibilidad hasta la entrevista y el juramento final.",
    serviceType: "Naturalization Petition",
    content: [
      "Revisamos tu historial migratorio y de residencia para confirmar que cumples los requisitos de tiempo, presencia física y buena conducta moral exigidos para la naturalización.",
      "Te preparamos para el examen cívico y de inglés, y te representamos ante USCIS si surgen complicaciones durante la entrevista.",
    ],
    media: {
      poster: unsplashPoster("1568992687947-868a62a9f521"),
      video: PLACEHOLDER_VIDEO,
    },
  },
  "defensa-en-corte": {
    title: "Defensa en Corte de Inmigración",
    shortTitle: "Defensa en Corte",
    description:
      "Representación legal ante la Corte de Inmigración para quienes enfrentan un proceso de remoción (deportación), incluyendo solicitudes de alivio y apelaciones.",
    serviceType: "Removal Defense Representation",
    content: [
      "Te representamos en cada audiencia ante el juez de inmigración, evaluando todas las formas de alivio disponibles: asilo defensivo, cancelación de remoción, ajuste de estatus y otras protecciones.",
      "Preparamos tu caso con evidencia documental y testimonial sólida, y coordinamos contigo los plazos críticos de cada etapa del proceso para no perder oportunidades procesales.",
      "Si tu caso lo requiere, te asistimos con apelaciones ante la Junta de Apelaciones de Inmigración (BIA) o revisión judicial ante las cortes federales.",
    ],
    media: {
      poster: unsplashPoster("1505664194779-8beaceb93744"),
      video: PLACEHOLDER_VIDEO,
    },
  },
  "permisos-de-trabajo": {
    title: "Permisos de Trabajo",
    shortTitle: "Permisos de Trabajo",
    description:
      "Autorización de empleo (EAD) para residentes en trámite, solicitantes de asilo, beneficiarios de TPS y otras categorías migratorias elegibles.",
    serviceType: "Employment Authorization Petition",
    content: [
      "Determinamos tu elegibilidad para solicitar el permiso de trabajo según tu categoría migratoria —asilo pendiente, ajuste de estatus, TPS, DACA, entre otras— y los plazos de espera aplicables.",
      "Preparamos y presentamos el formulario I-765 con la documentación de soporte necesaria, dando seguimiento al trámite hasta la emisión de tu tarjeta.",
      "Te orientamos también en las renovaciones oportunas, para evitar interrupciones en tu autorización de empleo.",
    ],
    media: {
      poster: unsplashPoster("1521791136064-7986c2920216"),
      video: PLACEHOLDER_VIDEO,
    },
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(practiceAreas).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = practiceAreas[slug];

  if (!area) {
    return { title: "Área de práctica no encontrada | Soluciones Migratorias SM" };
  }

  const url = `${SITE_URL}/areas-de-practica/${slug}`;

  return {
    title: `${area.title} | Soluciones Migratorias SM`,
    description: area.description,
    alternates: { canonical: url },
    openGraph: {
      title: area.title,
      description: area.description,
      url,
      siteName: "Soluciones Migratorias SM",
      locale: "es_ES",
      type: "article",
    },
  };
}

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = practiceAreas[slug];

  if (!area) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Soluciones Migratorias SM",
    description: area.description,
    serviceType: area.serviceType,
    url: `${SITE_URL}/areas-de-practica/${slug}`,
    telephone: PHONE_TEL,
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Miami",
      addressRegion: "FL",
      addressCountry: "US",
    },
  };

  const jsonLdScript = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript }}
      />

      {/* ── Hero cinemático (video en bucle, diferido tras hidratación) ── */}
      <PracticeAreaHero
        title={area.title}
        description={area.description}
        poster={area.media.poster}
        video={area.media.video}
      />

      {/* ── Contenido asimétrico ─────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {area.content.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="mb-6 text-base leading-relaxed text-foreground/70">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <div className="sticky top-32 rounded-2xl border border-gold/10 bg-surface p-8">
                <h2 className="font-serif text-xl text-foreground">
                  ¿Calificas para {area.shortTitle}?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                  Agenda una consulta gratuita y evaluamos tu caso sin costo.
                </p>
                <div className="mt-6 flex flex-col gap-4">
                  <GlowButton
                    href={`https://wa.me/${PHONE_TEL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="solid"
                  >
                    Consultar mi caso
                    <ArrowRight size={16} />
                  </GlowButton>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/30 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:scale-[1.03] hover:border-gold"
                  >
                    <Phone size={14} />
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </main>
  );
}
