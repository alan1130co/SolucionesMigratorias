"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { GlowButton } from "./ui/GlowButton";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-navy-900 px-6 py-32 text-center"
    >
      {/* Video de fondo con parallax sutil */}
      <motion.video
        className="absolute inset-0 z-0 h-[120%] w-full object-cover"
        style={{ y: videoY }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="/videos/video_principal_solcuiones_migratorias.mp4"
          type="video/mp4"
        />
      </motion.video>

      {/* Contenido */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center"
      >
        

        <motion.h1
          variants={item}
          className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Abogados de{" "}
          <span className="font-extrabold leading-tight tracking-tight text-gold">
            Inmigración
          </span>{" "}
          
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
         Preparamos tu caso de asilo con evidencia sólida y estrategia clara, para que llegues a tu audiencia con la mejor oportunidad de quedarte legalmente en EE. UU. — sin improvisar, sin errores que aumenten tu riesgo de deportación
        </motion.p>

        <motion.div variants={item} className="mt-10 flex justify-center">
          <GlowButton
            href="https://wa.me/+13054984470"
            target="_blank"
            rel="noopener noreferrer"
            variant="solid"
            hoverScale={1.05}
            className="px-12! py-[18px]! text-base! tracking-[0.18em]! shadow-[0_0_0_rgba(201,162,39,0)] hover:shadow-[0_0_45px_rgba(201,162,39,0.55)]"
          >
            Agendar Consulta
            <MessageCircle size={20} />
          </GlowButton>
        </motion.div>
      </motion.div>

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
