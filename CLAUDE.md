# Soluciones Migratorias — Contexto del Proyecto

## Qué es esto
Sitio web de marketing para una firma de abogados especializada en inmigración en EE.UU. (asilo, peticiones familiares, visas, naturalización, defensa en corte de inmigración). Inspirado en la estructura de scroll de lusion.co, pero con un lenguaje visual sobrio y profesional — NO es un estudio creativo, es una firma legal seria.

## Stack
- Next.js (App Router)
- React
- Tailwind CSS
- Framer Motion (todas las animaciones)
- Sin Three.js / WebGL pesado — solo gradiente animado sutil tipo aurora en el Hero

## Regla de layout OBLIGATORIA (nunca romper esto)
- Cada sección de la home ocupa mínimo el 100% del alto de pantalla (`min-h-screen`), como bloques independientes en el scroll.
- En mobile puede relajarse a `min-h-[90vh]` o contenido natural si el grid es largo, pero manteniendo sensación de bloque grande.
- Ninguna sección puede quedar estática: todas llevan animación de entrada al hacer scroll (`whileInView` de Framer Motion — fade/slide/stagger).
- Header con blur/shrink al hacer scroll. Transiciones de página con `AnimatePresence`.

## Paleta y tipografía
- Base: blanco/crema + azul marino profundo o verde oscuro (confianza/institucional) + acento cálido (dorado suave o terracota) para CTAs.
- Nada de colores saturados ni gradientes llamativos.
- Headlines: serif editorial (ej. Fraunces / Playfair Display). Cuerpo: sans-serif limpia (ej. Inter). Usar `next/font`.
- Fotografía real (o placeholders realistas), no ilustraciones 3D.

## Estructura de secciones de la Home
1. Hero (gradiente animado sutil + headline + CTA doble)
2. Confianza/manifiesto (kicker + stats animados con count-up)
3. Áreas de Práctica (grid: Asilo, Peticiones Familiares, Visas de Trabajo, Visa de Prometido K-1, Perdones/Waivers, Naturalización, Defensa en Corte, Permisos de Trabajo)
4. Nuestro Enfoque (headline + dos columnas de texto)
5. Testimonios/Casos de Éxito (carrusel o grid)
6. CTA de transición a pantalla completa (frase corta)
7. CTA final de contacto (+ mini-formulario opcional)
8. Footer (dirección, teléfono, WhatsApp, horarios, redes, disclaimer legal)

## Páginas internas
- `/sobre-nosotros`
- `/areas-de-practica` y `/areas-de-practica/[slug]`
- `/casos-de-exito`
- `/contacto`

## Copywriting
- Tono cercano pero profesional, evitar jerga legal excesiva. Enfatizar empatía, resultados, proceso claro.
- Confirmar si el sitio debe ser bilingüe ES/EN antes de duplicar contenido.

## Comandos
```bash
npm run dev       # servidor de desarrollo
npm run build     # build de producción
npm run lint      # lint
```

## Convenciones de código
- Componentes reutilizables en `app/components`: Header, Footer, Hero, SectionWrapper (wrapper con animación whileInView reutilizable), Card, CTAButton, TestimonialCard.
- TypeScript en todos los archivos nuevos.
- Mobile-first, responsive completo.
- Marcar contenido/imágenes de placeholder claramente con comentarios `// TODO: reemplazar con contenido real`.
