"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";

function WavingFlag() {
  const cantonHeight = (7 * 100) / 13;
  const rowSpacing = cantonHeight / 9;
  const colSpacingEven = 76 / 6;
  const colSpacingOdd = 76 / 5;

  return (
    <svg
      viewBox="0 0 190 100"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full drop-shadow-lg"
    >
      <defs>
        <filter id="flagWave" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" numOctaves="2" seed="7" result="noise">
            <animate
              attributeName="baseFrequency"
              dur="7s"
              values="0.01 0.04;0.016 0.055;0.01 0.04"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="9"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <g filter="url(#flagWave)">
        {Array.from({ length: 13 }).map((_, i) => (
          <rect
            key={i}
            x="0"
            y={(i * 100) / 13}
            width="190"
            height={100 / 13 + 0.6}
            fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
          />
        ))}

        <rect x="0" y="0" width="76" height={cantonHeight} fill="#3C3B6E" />

        {Array.from({ length: 9 }).map((_, row) => {
          const isEven = row % 2 === 0;
          const count = isEven ? 6 : 5;
          const spacing = isEven ? colSpacingEven : colSpacingOdd;
          const offset = isEven ? spacing / 2 : colSpacingEven;
          const y = rowSpacing * row + rowSpacing / 2;

          return Array.from({ length: count }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={offset + col * spacing * (isEven ? 1 : colSpacingEven / spacing)}
              cy={y}
              r="1.15"
              fill="#FFFFFF"
            />
          ));
        })}
      </g>
    </svg>
  );
}

export default function TransitionCTA() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-navy-900 px-6 py-28">
      {/* Aurora sutil — eco visual del Hero */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{
          duration: 26,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/15 blur-3xl"
      />

      <SectionWrapper className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <div className="mb-8 w-28 sm:w-32 md:w-36">
          <WavingFlag />
        </div>

        <p className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
          Tu nuevo capítulo en Estados Unidos{" "}
          <span className="font-extrabold text-gold">empieza hoy</span>.
        </p>
      </SectionWrapper>
    </section>
  );
}
