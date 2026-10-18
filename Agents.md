# AGENTS.md — Politón 2026 Website

## Contexto del proyecto

Sitio web oficial de **Politón 2026**, la hackathon oficial del **Instituto Politécnico Modelo (IPM)**, Buenos Aires, Argentina. Un evento de 48 horas donde equipos de 4 estudiantes del ciclo superior (4to, 5to y 6to año) de las orientaciones **Computación y Mecánica** trabajan juntos para entender un problema real, generar ideas y presentar una solución concreta mediante un pitch y un reel.

La metodología es **Design Thinking + Design Sprint**: comprender el problema → detectar oportunidades → generar ideas → validar propuestas → comunicarlas.

El sitio debe funcionar como una landing page de alto impacto visual. No es un sitio corporativo. Es una experiencia que tiene que hacer que alguien quiera participar apenas entra.

---

## Datos del evento

```
Nombre:         POLITÓN 2026
Edición:        Fase 01 — primera edición con continuidad futura
Institución:    Instituto Politécnico Modelo (IPM)
Fechas:         24, 25 y 26 de junio de 2026
Duración:       48 horas
Hashtag:        #POLITÓN2026
Inscripción:    forms.office.com/[link a completar]
Lugar:          [dirección a completar]
Especialidades: Computación y Mecánica — 4to, 5to y 6to año
Equipos:        4 integrantes, mixtos (inter-orientación)
```

---

## Mascota — Polito

Polito es un **zeppelin con cara estilo Rubber Hose Cartoon de los años 30** (referencia directa: Cuphead). Es el símbolo central de toda la marca — viene del mural histórico del colegio, lo que le da historia real y peso institucional.

| Elemento | Descripción | Color HEX |
|---|---|---|
| Cuerpo | Blimp ovalado con líneas de globo terráqueo, textura grain | `#D4C9A8` Arena |
| Cara | Ojos grandes cartoon, sonrisa amplia, mejilla durazno | `#E8836A` Durazno |
| Letras "IPM" | En azul marino sobre el cuerpo del zeppelin | `#2C3A6B` Azul IPM |
| Brazos | Rubber hose negros con guantes crema redondeados | `#EDE0BC` Crema |
| Piernas | Tubulares negras con zapatos marrones redondeados | `#7A4E2D` Cuero |
| Contorno | Negro grueso cartoon en todos los elementos | `#1A1A1A` Tinta |

**Poses:** Polito siempre aparece en poses dinámicas y expresivas — corriendo, apuntando, celebrando. **Nunca estático. Siempre con energía y actitud.**

Los archivos de Polito están en `src/assets/mascot/`.

---

## Logo

Dos versiones — se usan por separado o combinadas:

- **Versión A** (`logo-completo-01.png`): Logo completo — Polito flotando encima del wordmark. Para header web y materiales oficiales.
- **Versión B** (`logo-completo-02.png`): Solo wordmark — el cartel tipográfico sin la mascota. Para usar cuando Polito ya está presente como elemento compositivo.

**Descripción del wordmark:** placa/cartel vintage con forma de letrero de calle. Fondo azul marino profundo (`#1E2D5C`). Texto "POLITÓN" en tipografía serif bold con alto contraste, color crema. Borde exterior crema con doble filo. Contorno general negro grueso. Pequeño engranaje centrado en la parte inferior — referencia a la orientación mecánica.

Todos los archivos de logo tienen **fondo negro — recortar en diseño**.

---

## Paleta de colores

Construida directamente desde los colores de Polito y el logo. Sin colores inventados.

| Token | Nombre | HEX |
|---|---|---|
| `polyton-night` | Azul Noche | `#1E2D5C` |
| `polyton-blue` | Azul IPM | `#2C3A6B` |
| `polyton-gold` | Dorado Politón | `#E8A020` |
| `polyton-cream` | Crema Politón | `#EDE0BC` |
| `polyton-sand` | Arena Borde | `#C8B98A` |
| `polyton-red` | Rojo Polito | `#C94C2E` |
| `polyton-leather` | Cuero | `#7A4E2D` |
| `polyton-ink` | Tinta | `#1A1A1A` |
| `polyton-paper` | Blanco Papel | `#FDFAF2` |
| `polyton-vintage` | Crema Vintage | `#F5EDCF` |

**Uso en web / digital:**
- Fondo: `polyton-paper`
- Títulos / Logo: `polyton-night`
- CTAs: `polyton-red`
- Texto cuerpo: `polyton-ink`
- Acentos: `polyton-gold`

Definir **todos** estos como tokens en `tailwind.config.ts` bajo `theme.extend.colors`. Nunca hardcodear colores.

---

## Tipografía

Tres familias con **roles exclusivos — no se intercambian**. Todas en Google Fonts.

| Rol | Familia | Uso | Ejemplo |
|---|---|---|---|
| 01 · Display | **Lilita One** | Títulos, H1, nombre del evento | "POLITÓN", "48 HORAS" |
| 02 · Subtítulos | **Boogaloo** | Taglines, CTAs, badges, nav | "Inscribite →" |
| 03 · Cuerpo | **Nunito** 400/700/800 | Texto corrido, descripciones, cronograma | Párrafos generales |
| 04 · Acento | **Special Elite** | Citas y elementos decorativos de época. Máximo 1 vez por pieza | "Las ideas se construyen." |

**Regla de jerarquía:** Lilita One primero y más grande → Boogaloo en segundo nivel → Nunito en el cuerpo. No mezclar más de 3 tipografías en un mismo componente.

Cargar via Google Fonts en `index.html` o `globals.css`. Exponer como variables CSS: `--font-display`, `--font-subtitle`, `--font-body`, `--font-accent`.

---

## Estética y Mood

**Referencia visual principal:** Cuphead / Rubber Hose Cartoon (años 1930-1940)  
**Referencia de afiche:** `flyer-politon.pdf` — PATRÓN VISUAL de toda la marca. El sitio web debe sentirse como el flyer: vivo, ruidoso y con actitud.

### Elementos que definen la estética

| Elemento | Descripción |
|---|---|
| Textura grain / ruido | Presente en fondos y elementos — no liso, no digital puro. Siempre vintage. |
| Contornos negros gruesos | En todos los elementos ilustrados, heredado del estilo cartoon de Polito. |
| Speed lines en dorado | Detrás de Polito cuando aparece en acción. Puro Rubber Hose de los 30s. |
| Halftone dots | Sutiles en zonas oscuras — máximo 15% de opacidad. |
| Ornamentos vintage | Estrellas de 4 puntas, flourishes, doble-filo en bordes, engranajes. |
| Franjas anguladas | +/- 1.5° para dinamismo — nunca todo perfectamente horizontal. |
| Badges circulares | Con borde y texto para info destacada. Estilo sticker/sello vintage. |
| Separadores | Con rayos ■ o flourishes curvos. Nunca líneas rectas genéricas. |

### Lo que NO es esta marca

- ✗ No es flat design moderno
- ✗ No es minimalista ni corporativo / institucional frío
- ✗ No usa gradientes lineales ni glassmorphism
- ✗ No usa tipografías sans-serif genéricas (Inter, Roboto, Arial) en títulos
- ✗ No usa colores fuera de la paleta definida

---

## Voz y tono

| Atributo | Valor |
|---|---|
| Personalidad | Directo, entusiasta, juvenil, desafiante pero inclusivo |
| Tratamiento | Tuteo siempre — nunca ustedeo |
| Puntuación | Signos de apertura siempre presentes (¿, ¡) |
| Verbos clave | animás · construí · ideá · pitcheá · apurate · sumate |
| Tono | Urgencia genuina — no marketing vacío, sino invitación real |

**Copy aprobado del flyer — usar como referencia de voz:**
- *"¿Te animás?"* — Challenge directo, activa la adrenalina del alumno
- *"Apurate — la inscripción dura poco"* — Urgencia genuina, tuteo, sin presión falsa
- *"48 horas para resolver un problema real"* — Dimensión de tiempo + realismo = credibilidad
- *"Todos juntos — como ustedes quieran"* — Inclusión y libertad
- *"Busquemos soluciones reales"* — Primera persona plural, docentes y alumnos juntos

---

## Stack tecnológico

```
React + TypeScript
Vite
Tailwind CSS v4
GSAP (GreenSock) + ScrollTrigger
Lenis (smooth scroll)
Three.js (elementos 3D puntuales, no toda la página)
React Bits (componentes animados)
Shadcn/ui (solo componentes funcionales: formularios, modals)
```

### Criterios de uso

**GSAP + ScrollTrigger** — animaciones de entrada de secciones, parallax, pin de secciones, text reveal letra por letra, contador animado

**Lenis** — scroll suave en toda la página. Integrar con ScrollTrigger: `lenis.on('scroll', ScrollTrigger.update)`

**Three.js** — usar con moderación. Idealmente solo en el Hero o fondo de una sección. Deshabilitar en mobile.

**Tailwind** — layout, espaciado, responsive. Todos los colores y fuentes como custom tokens, nunca hardcodeados.

**React Bits** — texto animado, efectos de hover en cards.

---

## Secciones del sitio

Single page con scroll vertical. Cada sección mínimo 100vh con identidad visual propia dentro de la estética global.

### 1. Hero
- Título: **POLITÓN** con Lilita One, entrada SplitText staggered
- Subtítulo: *¿Te animás? Busquemos soluciones reales*
- Fecha: **24 · 25 · 26 de Junio 2026**
- Badge circular vintage: **48 HORAS**
- Polito animado: bounce idle suave, ojos parpadeando, speed lines doradas detrás
- CTA: botón de inscripción estilo sello/cartel
- Fondo: `polyton-night` + textura grain + estrellas de 4 puntas doradas animadas
- Canvas Three.js opcional en background

### 2. ¿Qué es una Hackathon?
- Formato: 48hs, equipos de 4, mixtos, Design Thinking + Design Sprint
- Público: 4to, 5to y 6to año — Computación y Mecánica
- Estilo visual: panel de cómic / historieta, texto en globos de diálogo, Polito en acción

### 3. Contador regresivo
- Cuenta regresiva en tiempo real hacia el 24 de junio de 2026
- Días / Horas / Minutos / Segundos
- Números con estética de cartel de feria: Lilita One, borde grueso, sombra, textura
- Animación flip o roll numérico al cambiar dígito (GSAP)

### 4. Problemáticas
- Desafíos sobre los que trabajan los equipos (contenido a completar)
- Cada una presentada como una "misión" — estética de videojuego retro
- Cards con hover: efecto de revelación o zoom GSAP
- Categorías: Computación / Mecánica / Interdisciplinarias

### 5. Lugar
- Dónde se realiza (dirección a completar)
- Mapa embebido o ilustración estilo retro
- Datos prácticos: cómo llegar, qué traer

### 6. Cronograma
- Timeline visual de los 3 días (24, 25 y 26 de junio)
- Estilo: mapa de ruta o línea de tren antigua
- Cada punto del cronograma: animación pin al hacer scroll (ScrollTrigger)
- Contenido detallado a completar

### 7. Premios
- Premios por puesto (contenido a completar)
- Criterios de evaluación: creatividad 35% · impacto 25% · presentación 20% · técnica 20%
- Estética de podio de circo/feria, badges circulares por puesto

### 8. Charlas
- Speakers confirmados (contenido a completar)
- Cards: foto, nombre, tema
- Hover con efecto vintage (sepia, borde ilustrado)

### 9. Registro y redes
- CTA final grande con Polito en pose de celebración
- Botón inscripción: `forms.office.com/[completar]`
- Hashtag: **#POLITÓN2026**
- Redes sociales (completar)
- QR de inscripción (imagen a proveer)

---

## Estructura de archivos

```
src/
  components/
    sections/
      Hero.tsx
      WhatIsHackathon.tsx
      Countdown.tsx
      Challenges.tsx
      Location.tsx
      Schedule.tsx
      Prizes.tsx
      Talks.tsx
      Register.tsx
    ui/             # shadcn components
    layout/
      Navbar.tsx
      Footer.tsx
  hooks/
    useLenis.ts
    useGSAP.ts
  lib/
    gsap.ts         # config + ScrollTrigger register
    three.ts        # scene setup
  assets/
    fonts/
    textures/       # grain, papel envejecido
    mascot/         # mascota.png y variantes de Polito
    logo/           # logo-completo-01.png, logo-completo-02.png
  styles/
    globals.css
  App.tsx
  main.tsx
```

---

## Notas de implementación

- **Performance**: assets pesados con lazy load. Canvas Three.js solo se monta cuando entra en viewport.
- **Responsive**: mobile-first. En mobile: reducir parallax, deshabilitar Three.js, simplificar animaciones GSAP.
- **Accesibilidad**: respetar `prefers-reduced-motion` — si está activo, desactivar GSAP y Lenis.
- **Fuentes**: Google Fonts vía `<link>` en `index.html`. Variables CSS: `--font-display` (Lilita One), `--font-subtitle` (Boogaloo), `--font-body` (Nunito), `--font-accent` (Special Elite).
- **GSAP**: usar versión gratuita (core + ScrollTrigger). SplitText requiere Club GreenSock — evaluar `splitting.js` como alternativa.
- **Lenis + React**: inicializar en `useLenis.ts`, exponer instancia via context si otras secciones necesitan control programático del scroll.
- **Logos y mascota**: todos los assets tienen fondo negro — usar `mix-blend-mode: multiply` o recortar con CSS/canvas según el contexto.

---

## Referencias de nivel de producción

El estándar no es el promedio — es el piso.

- https://bestiary-mu.vercel.app/ — scroll storytelling, transiciones entre secciones
- https://zajno.com/studio — calidad cinematográfica, tipografía expresiva, uso del espacio
- https://db-longbow.webflow.io/ — interacciones hover, layout editorial
- https://sunty.ae/ — animaciones de entrada, presencia visual