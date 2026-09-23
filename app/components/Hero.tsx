"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { GlowButton } from "./ui/GlowButton";

// Mismo timing que el stagger de Framer Motion que reemplazan (delayChildren
// 0.2s + staggerChildren 0.15s), pero como animacion CSS: se pinta desde el
// primer render del servidor, sin esperar a la hidratacion de React.
const heroFadeUp = (delaySeconds: number) => ({
  animation: `hero-fade-up 0.7s ease-out ${delaySeconds}s both`,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const shapeGoldY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const shapeWhiteY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  // En conexiones lentas o con "ahorro de datos" activado, nos quedamos con
  // el poster estático en vez de descargar el video de fondo.
  const [canPlayVideo, setCanPlayVideo] = useState(true);

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const connection = nav.connection;
    const isSlow =
      connection?.saveData ||
      ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");
    if (isSlow) setCanPlayVideo(false);
  }, []);

  // El video del hero no se pide hasta despues del evento `load`: asi no
  // compite por ancho de banda con el HTML/CSS/fuentes/JS criticos del
  // primer paint. Hasta entonces solo se ve el poster (siempre presente).
  // En movil (<768px) no se monta video en absoluto: solo la imagen estatica
  // del Hero, asi que este efecto no debe pedir ningun .mp4 ahi.
  useEffect(() => {
    if (!canPlayVideo) return;
    const startVideo = () => {
      const el = videoRef.current;
      if (!el) return;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (isMobile) return;
      el.src = "/videos/video_principal_solcuiones_migratorias.mp4";
      el.load();
      el.play().catch(() => {});
    };

    if (document.readyState === "complete") {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 0));
      const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
      const id = idle(startVideo);
      return () => cancelIdle(id as never);
    }
    window.addEventListener("load", startVideo, { once: true });
    return () => window.removeEventListener("load", startVideo);
  }, [canPlayVideo]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-navy-900 px-6 py-32 text-center"
    >
      {/* Fondo movil (<768px): solo imagen estatica, sin <video> — evita que
          compita por LCP y ahorra el ancho de banda del video en movil.
          Alternamos por CSS (no por JS) para que el HTML del server ya
          traiga la variante correcta sin parpadeo ni salto de hidratacion. */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden md:hidden">
        <Image
          src="/images/hero_poster_movil.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "88% center" }}
        />
      </div>

      {/* Fondo desktop (>=768px): video con parallax sutil, o solo el poster
          en conexiones lentas/saveData — comportamiento sin cambios. */}
      <div className="hidden md:block">
        {canPlayVideo ? (
          <motion.video
            ref={videoRef}
            className="absolute inset-0 z-0 h-[120%] w-full object-cover"
            style={{ y: videoY }}
            poster="/images/hero-poster.jpg"
            preload="none"
            loop
            muted
            playsInline
          />
        ) : (
          <motion.img
            src="/images/hero-poster.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 z-0 h-[120%] w-full object-cover"
            style={{ y: videoY }}
          />
        )}
      </div>

      {/* Formas geométricas decorativas con parallax desacoplado del video/scroll */}
      <motion.div
        aria-hidden="true"
        style={{ y: shapeGoldY }}
        className="pointer-events-none absolute -right-24 top-1/4 z-[1] h-80 w-80 rounded-full bg-gold-500/15 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: shapeWhiteY }}
        className="pointer-events-none absolute -left-32 bottom-1/4 z-[1] h-96 w-96 rounded-full bg-white/5 blur-3xl"
      />

      {/* Contenido: h1/p/boton se pintan de inmediato en el HTML del server
          y se animan con CSS puro (ver hero-fade-up en globals.css), para
          que el LCP no dependa de que React hidrate primero. */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
        <h1
          style={heroFadeUp(0.2)}
          className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Abogados de{" "}
          <span className="font-extrabold leading-tight tracking-tight text-gold">
            Inmigración
          </span>{" "}
        </h1>

        <p
          style={heroFadeUp(0.35)}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
         Preparamos tu caso de asilo con evidencia sólida y estrategia clara, para que llegues a tu audiencia con la mejor oportunidad de quedarte legalmente en EE. UU. — sin improvisar, sin errores que aumenten tu riesgo de deportación
        </p>

        <div style={heroFadeUp(0.5)} className="mt-10 flex justify-center">
          <GlowButton
            href="https://wa.me/+13054984470"
            target="_blank"
            rel="noopener noreferrer"
            variant="solid"
            hoverScale={1.05}
            className="px-12! py-[18px]! text-base! tracking-[0.18em]! shadow-[0_0_0_rgba(201,162,39,0)] hover:shadow-[0_0_45px_rgba(201,162,39,0.55)]"
          >
            Agendar Consulta Gratis
            <MessageCircle size={20} />
          </GlowButton>
        </div>
      </div>

      {/* Indicador de scroll animado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-white/40 p-1.5"
        >
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-gold"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
