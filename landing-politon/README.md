# POLITÓN 2026 — Hackatón IPM

Landing page oficial de **Politón 2026**, la hackatón del **Instituto Politécnico Mercedes (IPM)**, Buenos Aires, Argentina.  
48 horas donde equipos de 4 estudiantes del ciclo superior (4to, 5to y 6to año) de Computación y Mecánica resuelven un problema real usando metodología **Design Thinking + Design Sprint**.

**Sitio en vivo:** [politecnico.ipm.edu.ar](https://politecnico.ipm.edu.ar)

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React 19 | ^19.2.6 | UI / componentes |
| TypeScript | ~6.0 | Tipado |
| Vite | ^5.4 | Bundler / dev server |
| Tailwind CSS v4 | ^4.3 | Estilos utilitarios + tokens de marca |
| GSAP | ^3.15 | Animaciones (ScrollTrigger, timeline) |
| Lenis | ^1.3 | Smooth scroll |
| Three.js | ^0.184 | Elementos 3D (Hero) |
| Splitting.js | ^1.1 | Text reveal |
| Radix UI | ^1.4 | Componentes accesibles (headless) |
| Lucide React | ^1.16 | Iconos |
| Shadcn/ui | ^4.8 | Sistema de componentes base |
| Vercel Analytics | ^2.0 | Analytics y speed insights |

### Fuentes (Google Fonts)

| Rol | Familia |
|---|---|
| Display / títulos | **Lilita One** |
| Subtítulos / CTAs | **Boogaloo** |
| Cuerpo | **Nunito** (400, 700, 800) |
| Acento decorativo | **Special Elite** |

---

## Instalación

```bash
# 1. Clonar el repo
git clone https://github.com/tuusuario/landing-politon.git
cd landing-politon

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173) en el navegador.

---

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Compila TS + build de producción en `dist/` |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | ESLint sobre todo el proyecto |

---

## Estructura

```
src/
  components/
    sections/     # Hero, Countdown, Challenges, Schedule, etc.
    ui/           # Componentes base (shadcn)
    layout/       # Navbar, Footer
  hooks/          # useLenis, useGSAP
  lib/            # Config de GSAP, Three.js
  assets/
    mascot/       # Sprites de Polito
    logo/         # Versiones del logo
    textures/     # Grain, papel envejecido
  styles/
    globals.css   # Tokens, animaciones, utilidades cartoon
```

---

## Paleta de colores

| Token | HEX | Uso |
|---|---|---|
| `polyton-night` | `#1E2D5C` | Fondos oscuros, títulos |
| `polyton-blue` | `#2C3A6B` | Acento secundario |
| `polyton-gold` | `#E8A020` | Destellos, badges |
| `polyton-cream` | `#EDE0BC` | Texto sobre fondo oscuro |
| `polyton-red` | `#C94C2E` | CTAs, botones principales |
| `polyton-paper` | `#FDFAF2` | Fondo de página |
| `polyton-ink` | `#1A1A1A` | Texto cuerpo, contornos |

---

## Despliegue

El sitio se despliega en **Vercel** con deploy automático desde el branch `main`.  
Apuntado al dominio **politecnico.ipm.edu.ar**.

```bash
npm run build   # Genera carpeta dist/
```

Luego Vercel toma `dist/` como directorio de salida (configuración por defecto).

---

## Licencia

Uso interno — Instituto Politécnico Modelo (IPM).
