# POLITON 2026

Landing page oficial de Politon 2026, la hackathon del Instituto Politecnico Modelo (IPM). El sitio presenta una experiencia visual inspirada en rubber hose cartoon y afiches vintage, con Polito como mascota central, animaciones de scroll, modelo 3D en el hero y secciones informativas para estudiantes.

Politon es un evento de 48 horas para equipos de estudiantes de 4to, 5to y 6to ano de Computacion y Mecanica. La propuesta combina Design Thinking y Design Sprint para entender un problema real, idear soluciones, validarlas y comunicarlas en un pitch.

## App Principal

La aplicacion web esta dentro de:

```bash
landing-politon/
```

El README de esta carpeta raiz funciona como guia general del proyecto. Para desarrollar o buildear, entrar siempre a `landing-politon`.

## Stack

- React 19 + TypeScript
- Vite 5
- Tailwind CSS v4
- GSAP + ScrollTrigger para animaciones
- Lenis para smooth scroll
- Three.js para Polito 3D en el hero
- Splitting/text split propio para reveals de texto
- Radix UI, shadcn/ui, lucide-react y utilidades de UI
- Vercel Analytics y Speed Insights

## Requisitos

- Node.js 20 o superior
- npm

El workflow de GitHub Actions usa Node 20, asi que conviene mantener la misma version localmente.

## Instalacion

```bash
cd landing-politon
npm install
npm run dev
```

Servidor local por defecto:

```text
http://localhost:5173
```

## Scripts

Ejecutar desde `landing-politon/`.

```bash
npm run dev
```

Levanta Vite con hot reload.

```bash
npm run build
```

Ejecuta `tsc -b` y despues genera el build de produccion con Vite en `dist/`.

```bash
npm run preview
```

Sirve localmente el build de produccion.

```bash
npm run lint
```

Corre ESLint sobre el proyecto.

## Estructura

```text
landing-politon/
  public/
    favicon.svg
    icons.svg
    stream/
      arranque.html
      LogoCompleto.png
  src/
    assets/              Imagenes, videos, logos y modelos GLB
    components/
      layout/            Navbar y navegacion
      sections/          Secciones principales de la landing
      three/             Escena Three.js de Polito
      ui/                Componentes visuales reutilizables
    contexts/            Loader global
    hooks/               Lenis, GSAP y media queries
    lib/                 Configuracion GSAP, helpers y constants
    styles/
      globals.css        Tokens de marca, reset y estilos globales
    App.tsx              Orden de secciones
    main.tsx             Bootstrap React + Vercel Analytics
```

## Secciones

El orden actual de la landing se define en `landing-politon/src/App.tsx`:

1. Navbar
2. Hero
3. Que es una hackathon
4. Proceso / como se desarrolla
5. Informacion de inscripcion
6. Resumen de dias del evento
7. Desafios
8. Charlas
9. Registro, redes y stream

## Identidad Visual

La marca usa una estetica vintage inspirada en caricatura rubber hose de los anos 30. Los tokens principales estan definidos en `landing-politon/src/styles/globals.css` con variables CSS y tokens de Tailwind v4.

Paleta base:

- `polyton-night`: `#1E2D5C`
- `polyton-blue`: `#2C3A6B`
- `polyton-gold`: `#E8A020`
- `polyton-cream`: `#EDE0BC`
- `polyton-sand`: `#C8B98A`
- `polyton-red`: `#C94C2E`
- `polyton-leather`: `#7A4E2D`
- `polyton-ink`: `#1A1A1A`
- `polyton-paper`: `#FDFAF2`
- `polyton-vintage`: `#F5EDCF`

Tipografias esperadas:

- Display: Lilita One
- Subtitulos y CTAs: Boogaloo
- Cuerpo: Nunito
- Acento decorativo: Special Elite

## Animaciones y 3D

- `src/lib/gsap.ts` registra GSAP, ScrollTrigger y ScrollToPlugin.
- `src/hooks/useLenis.ts` inicializa Lenis e integra el scroll con ScrollTrigger.
- Lenis se desactiva en mobile/touch y cuando el usuario tiene `prefers-reduced-motion`.
- `src/components/three/PolitoScene.tsx` carga `polito3D-web-balanced.glb`, anima el idle, responde al mouse y libera el loader global cuando el modelo esta listo.

## Assets

Los assets principales viven en `landing-politon/src/assets/`:

- Logos e identidad: `logo-completo.png`, `logo-completo (2).png`, `Brief_Marca_POLITON_2026.pdf`
- Polito 2D/3D: `Polito.png`, `polito-hero.png`, `polito-volando-hero.png`, `polito3D*.glb`
- Videos: `stream-preview.mp4`, `transicion.mp4`, `video-simulacion-instagram.mp4`
- Imagenes de secciones: `registration/`, speakers, iconos y recursos de redes

## Inscripcion

La URL del formulario esta centralizada en:

```text
landing-politon/src/lib/registration.ts
```

Actualmente apunta a Microsoft Forms:

```text
https://forms.office.com/r/yAwQ7yHkrp
```

Si se reactivan CTAs o QR de inscripcion, usar esa constante para evitar URLs duplicadas.

## Deploy

El deploy preview esta configurado con GitHub Actions en:

```text
.github/workflows/deploy-vercel-preview.yaml
```

Se dispara con push al branch:

```text
pagina-tiago
```

El workflow:

1. Descarga el repo.
2. Instala Node 20.
3. Instala Vercel CLI.
4. Ejecuta `vercel pull` para preview.
5. Ejecuta `vercel build`.
6. Publica con `vercel deploy --prebuilt`.



## Verificacion Antes De Subir

Desde `landing-politon/`:

```bash
npm run build
npm run lint
```

El build es especialmente importante porque TypeScript esta configurado para fallar con imports o variables sin uso.

## Licencia

Proyecto de uso institucional para el Instituto Politecnico Modelo (IPM).
