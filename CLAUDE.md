# REDISEÑO COMPLETO: Soluciones Migratorias
### Especificación maestra — estilo Lusion.co + Squarespace.com

Este documento reemplaza cualquier instrucción anterior. Aplica TODO lo que está aquí a TODAS las secciones del sitio, no solo a Áreas de Práctica. El objetivo es que el sitio deje de sentirse como una plantilla básica y se sienta como un producto digital de primer nivel: grande, cinematográfico, en movimiento constante, con transiciones reales — como lusion.co y squarespace.com/es — pero manteniendo la seriedad y confianza que necesita una firma legal de inmigración.

Antes de escribir código: lee este documento completo, dime qué archivos vas a crear/modificar y en qué orden vas a trabajar (sección por sección). No apliques todo de golpe sin plan.

---

## 1. Filosofía de diseño

No queremos un sitio "corporativo plano" de firma de abogados genérica. Queremos:

- **Tipografía como protagonista**: títulos enormes, que ocupen buena parte de la pantalla, con palabras clave en itálica/acento dorado (como "historia" en dorado dentro de un titular negro).
- **Cada sección es un "capítulo"**: ocupa toda la pantalla, tiene su propia entrada animada, se siente como una diapositiva cinematográfica, no un bloque más de una lista larga.
- **Movimiento constante pero elegante**: nada aparece de golpe. Todo hace fade/slide/stagger al entrar en el viewport. Los fondos tienen parallax sutil. El header cambia con el scroll.
- **Contraste fuerte**: secciones oscuras (navy/negro) alternando con secciones claras (blanco/crema), como en el video de referencia que ya viste — esto ayuda a que cada "capítulo" se sienta distinto.
- **Nada de plantillas genéricas de Bootstrap**: cada sección debe verse diseñada a mano, no como un componente reciclado de UI kit.

---

## 2. Stack técnico (confirmado)

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Framer Motion para TODAS las animaciones
- `next/font` para tipografía (serif editorial para headlines + sans-serif para cuerpo)
- Sin Three.js/WebGL pesado — el efecto "futurista" se logra con tipografía grande + animación de scroll + gradientes sutiles, no con 3D

---

## 3. REGLAS GLOBALES OBLIGATORIAS (aplican a TODAS las secciones, sin excepción)

### 3.1 Full-screen por sección
Cada sección de la home ocupa mínimo `min-h-screen` (100% del alto de pantalla). En mobile puede relajarse a `min-h-[90vh]` si el contenido es largo (grids grandes), pero debe sentirse como un bloque grande, nunca angosto o comprimido.

### 3.2 Ninguna sección puede quedar estática
Todas usan `whileInView` de Framer Motion. Cero excepciones. Si una sección no tiene animación de entrada, está incompleta.

### 3.3 Tipografía grande, siempre
- Headlines de sección: `text-6xl md:text-8xl font-bold leading-tight`
- Frases de impacto/transición (pantalla completa, una sola frase): `text-5xl md:text-7xl`
- Kickers (texto pequeño arriba del headline): `text-xs md:text-sm uppercase tracking-[0.2em]`
- Nunca uses `text-3xl` o menor para un título de sección. Si un título "se ve pequeño" comparado con lusion.co, auméntalo.

### 3.4 Paleta de color
- Base clara: blanco/crema (`#FAF9F6` o similar)
- Base oscura: azul marino profundo (`#0B1220` o similar) — úsala para alternar secciones (hero oscuro, sección de transición oscura, footer oscuro)
- Acento: dorado suave (`#C9A227` o similar) — para CTAs, palabras destacadas en itálica dentro de titulares, iconos de kicker
- Nunca colores saturados tipo azul brillante, morado, o gradientes tipo "SaaS genérico"

### 3.5 Header dinámico (ver código en sección 5.1)
Transparente/grande al inicio → compacto con blur al hacer scroll. Transición suave, nunca brusca.

### 3.6 Parallax sutil en imágenes de fondo
Cualquier sección con imagen de fondo grande (Hero, transición, testimonios) debe tener parallax leve (la imagen se mueve más lento que el scroll).

### 3.7 Micro-interacciones en TODO elemento interactivo
Botones, links, tarjetas: hover con `scale` sutil (1.02–1.05) y transición de 0.2–0.3s. Nunca cambios instantáneos sin transición.

### 3.8 Scroll-snap opcional pero recomendado
Si no rompe el scroll natural en mobile ni la accesibilidad, considera `scroll-snap-type: y mandatory` en el contenedor principal para que cada sección "encaje" al hacer scroll, como en Lusion.

---

## 4. Estructura de la Home (sección por sección, con detalle)

### 4.1 Header (fijo)
- Logo + nombre de firma a la izquierda
- Nav: Inicio / Servicios / Casos / Nosotros / Contacto
- CTA "Agendar Consulta" a la derecha, siempre visible
- Comportamiento: grande y transparente sobre el Hero → compacto con `backdrop-blur` y fondo semitransparente al hacer scroll (código en 5.1)
- Menú mobile: overlay a pantalla completa con stagger en los links al abrir, no un dropdown simple

### 4.2 Hero (pantalla completa, fondo oscuro)
- Imagen/video de fondo con overlay oscuro (navy semitransparente) + parallax
- Kicker pequeño: "ABOGADOS DE INMIGRACIÓN · MIAMI, FL"
- Headline gigante en 2 líneas con palabra en dorado itálica: "Especialistas en *Soluciones Migratorias* de Alto Nivel"
- Subtítulo corto (1-2 líneas), texto claro sobre fondo oscuro
- Dos CTAs: "Agendar Consulta" (dorado, sólido) + "Ver Áreas de Práctica" (outline)
- Indicador de scroll animado (círculo pequeño con rebote infinito) en la parte inferior central
- Todo el texto entra con fade+slide escalonado (kicker → headline → subtítulo → botones) al cargar la página, no al hacer scroll (es lo primero que se ve)

### 4.3 Sección de Confianza / Manifiesto (fondo claro)
- Kicker: "NUESTRO COMPROMISO"
- Headline grande: "Detrás de cada expediente hay una *historia*, una familia, un futuro." (palabra en dorado itálica)
- Párrafo corto debajo
- Fila de 4 estadísticas con count-up animado al entrar en viewport: "500+ Familias Representadas", "98% Tasa de Éxito en Casos", "+10 Años de Experiencia", "24/7 Disponibilidad para tu Caso"
- Cada número debe animarse contando desde 0 hasta su valor final cuando la sección entra en el viewport (ver código 5.3)

### 4.4 Áreas de Práctica (fondo claro, full-width, carrusel horizontal)
- Kicker: "LO QUE HACEMOS" + Headline: "Áreas de *Práctica*"
- Carrusel horizontal a todo el ancho de pantalla (sin max-width), 4 tarjetas visibles en desktop (1 en mobile con swipe)
- Auto-avanza cada ~4 segundos en loop infinito, se pausa con el mouse encima o al hacer drag manual
- Cada tarjeta: imagen de fondo grande, título grande superpuesto con gradiente oscuro abajo para legibilidad, descripción corta
- Hover individual en una tarjeta: esa tarjeta escala ligeramente, no las demás
- 8 áreas en loop: Asilo Político, Peticiones Familiares, Visas de Trabajo, Naturalización, Visa de Prometido K-1, Perdones y Waivers, Defensa en Corte, Permisos de Trabajo
- Ver código completo del componente en sección 5.4

### 4.5 Nuestro Enfoque (fondo oscuro, dos columnas)
- Kicker: "NUESTRO ENFOQUE"
- Headline grande sobre fondo oscuro
- Dos columnas de texto: "Atención Personalizada" y "Proceso Transparente", cada una con su propio ícono/número grande decorativo
- Puede incluir foto del abogado principal con parallax sutil

### 4.6 Testimonios / Casos de Éxito (fondo claro)
- Kicker: "CASOS DE ÉXITO"
- Carrusel o grid de testimonios reales, con foto/iniciales, nombre, tipo de caso
- Animación de entrada con stagger

### 4.7 CTA de transición a pantalla completa (fondo oscuro, full-screen, una sola frase)
- Frase corta e impactante centrada, tipografía gigante (`text-6xl md:text-8xl`): ej. "Tu Familia Merece Estar Junta."
- Fondo con gradiente sutil tipo aurora (radial gradient animado lentamente con Framer Motion o CSS)
- Nada más en esta sección — es una pausa dramática antes del CTA final, como la sección de transición de lusion.co

### 4.8 CTA final de contacto (fondo claro)
- Headline: "¿Listo para dar el siguiente paso?"
- CTA grande "Agendar Consulta" + teléfono directo
- Mini-formulario opcional inline (nombre, teléfono, breve descripción del caso) + botón "Enviar por WhatsApp"

### 4.9 Footer (fondo oscuro)
- Logo + nombre + descripción corta
- Redes sociales
- Enlaces rápidos (Inicio, Servicios, Casos, Nosotros, Contacto)
- Contacto (dirección, teléfono, correos)
- Horario de atención
- Disclaimer legal ("esta información no constituye asesoría legal formal...")
- Copyright

---

## 5. Componentes reutilizables (código de referencia — adaptar a convenciones ya existentes en el proyecto, no pegar literal si rompe algo)

### 5.1 Header dinámico

```tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{
        backgroundColor: scrolled ? "rgba(11,18,32,0.85)" : "rgba(11,18,32,0)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        paddingTop: scrolled ? "0.75rem" : "1.5rem",
        paddingBottom: scrolled ? "0.75rem" : "1.5rem",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50"
    >
      {/* logo, nav, CTA */}
    </motion.header>
  );
}
```

### 5.2 AnimatedSection (wrapper universal de animación)

```tsx
"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

Uso con stagger para grids:

```tsx
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

<motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-4 gap-6">
  {items.map((it) => (
    <motion.div key={it.id} variants={item}>{/* tarjeta */}</motion.div>
  ))}
</motion.div>
```

### 5.3 Estadística con count-up

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

export default function StatCounter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.floor(v)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-gold">{display}{suffix}</p>
      <p className="text-xs uppercase tracking-widest mt-2">{label}</p>
    </div>
  );
}
```

### 5.4 Carrusel horizontal de Áreas de Práctica

```tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const practiceAreas = [
  { id: 1, title: "Asilo Político", desc: "Protección para quienes huyen de persecución.", image: "/images/asilo.jpg" },
  { id: 2, title: "Peticiones Familiares", desc: "Reunifica a tu familia en Estados Unidos.", image: "/images/familia.jpg" },
  { id: 3, title: "Visas de Trabajo", desc: "H1-B, L1 y más para tu carrera profesional.", image: "/images/trabajo.jpg" },
  { id: 4, title: "Naturalización", desc: "Acompañamiento en tu camino a la ciudadanía.", image: "/images/ciudadania.jpg" },
  { id: 5, title: "Visa de Prometido K-1", desc: "Únete con tu pareja en EE.UU.", image: "/images/k1.jpg" },
  { id: 6, title: "Perdones y Waivers", desc: "Supera obstáculos de inadmisibilidad.", image: "/images/waivers.jpg" },
  { id: 7, title: "Defensa en Corte", desc: "Representación ante la Corte de Inmigración.", image: "/images/corte.jpg" },
  { id: 8, title: "Permisos de Trabajo", desc: "Autorización de empleo (EAD).", image: "/images/permiso.jpg" },
];

const VISIBLE = 4;

export default function PracticeAreasCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => setIndex((i) => (i + 1) % practiceAreas.length), 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused]);

  const visibleItems = Array.from({ length: VISIBLE }, (_, i) => practiceAreas[(index + i) % practiceAreas.length]);

  return (
    <div className="w-full overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
        <AnimatePresence mode="popLayout">
          {visibleItems.map((area) => (
            <motion.div
              key={area.id}
              layout
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03 }}
              className="relative h-[420px] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img src={area.image} alt={area.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{area.title}</h3>
                <p className="text-sm text-white/80">{area.desc}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

### 5.5 Parallax de imagen de fondo

```tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxImage({ src }: { src: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="overflow-hidden relative h-full w-full">
      <motion.img src={src} style={{ y }} className="w-full h-[120%] object-cover absolute -top-[10%]" />
    </div>
  );
}
```

### 5.6 CTA con micro-interacción

```tsx
<motion.button
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
  className="bg-gold text-navy px-8 py-4 rounded-full font-medium"
>
  Agendar Consulta
</motion.button>
```

### 5.7 Sección de transición con gradiente animado (fondo de la sección 4.7)

```tsx
"use client";
import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(circle at 50% 50%, rgba(201,162,39,0.15), transparent 60%)",
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
```

---

## 6. Checklist de calidad antes de dar por terminada cada sección

Para cada sección que toques, confirma:

- [ ] ¿Ocupa mínimo `min-h-screen`?
- [ ] ¿Tiene animación de entrada con `whileInView`?
- [ ] ¿El headline usa `text-6xl md:text-8xl` o mayor?
- [ ] ¿Los botones/links tienen micro-interacción de hover?
- [ ] ¿Si tiene imagen de fondo, tiene parallax?
- [ ] ¿Se ve distinta a un template genérico de Bootstrap/UI kit?

Si alguna respuesta es "no", la sección no está terminada.

---

## 7. Orden de trabajo sugerido

1. Header dinámico + AnimatedSection (base para todo lo demás)
2. Hero
3. Sección de Confianza/Stats con count-up
4. Áreas de Práctica (carrusel)
5. Nuestro Enfoque
6. Testimonios
7. CTA de transición (Aurora background)
8. CTA final + Footer

Trabaja sección por sección, no todo de golpe. Después de cada sección, corre `npm run dev` y confirma que compila sin errores antes de seguir con la siguiente.
