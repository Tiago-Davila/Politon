/**
 * PolitoFlying.tsx — Polito en pose de vuelo "Superman"
 *
 * SVG dibujado a mano, separado por partes para poder editarlo:
 * piernas → brazo trasero → aletas → cuerpo → cara → brazo delantero.
 *
 * Todo se dibuja en coordenadas "locales" con el zeppelin horizontal
 * (la nariz apunta a +x) y al final se inclina el grupo entero con
 * FLIGHT_TILT. Para cambiar la inclinación del vuelo, tocar solo eso.
 *
 * Colores: tokens de la paleta vía CSS vars — nunca HEX sueltos.
 */
import React from 'react'

const INK = 'var(--polyton-ink)'
const OUTLINE = 9
const FLIGHT_TILT = -18 /* grados: negativo = sube hacia la derecha */

/* Silueta del zeppelin: cola afinada a la izquierda, frente redondo a la derecha */
const BODY_PATH =
  'M -470 0 C -455 -115 -260 -240 60 -248 C 335 -255 485 -140 485 10 C 485 152 325 250 60 242 C -255 232 -455 112 -470 0 Z'

type Props = {
  className?: string
  style?: React.CSSProperties
}

const PolitoFlying: React.FC<Props> = ({ className, style }) => (
  <svg
    viewBox="0 0 1536 1024"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    role="img"
    aria-label="Polito, el zeppelin mascota del IPM, volando"
  >
    <defs>
      <clipPath id="polito-body-clip">
        <path d={BODY_PATH} />
      </clipPath>

      {/* Grain vintage sobre el cuerpo */}
      <filter id="polito-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0" />
      </filter>
    </defs>

    <g
      transform={`translate(740 480) rotate(${FLIGHT_TILT}) scale(0.78)`}
      stroke={INK}
      strokeWidth={OUTLINE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* ═══════════ PIERNAS (detrás de todo) ═══════════ */}
      <g id="piernas">
        <Leg from={[-170, 200]} ctrl={[-300, 290]} to={[-500, 285]} />
        <Leg from={[-50, 225]} ctrl={[-200, 380]} to={[-420, 400]} />
      </g>

      {/* ═══════════ MANGUERAS DE LOS BRAZOS (salen de atrás del cuerpo) ═══════════ */}
      <Hose d="M -60 150 C -70 300 40 320 80 240" />
      <Hose d="M 380 -40 C 500 -120 600 -130 700 -120" />

      {/* ═══════════ ALETAS DE COLA ═══════════ */}
      <g id="aletas-traseras" fill="var(--polyton-sand)">
        {/* Superior */}
        <path d="M -300 -150 C -340 -230 -420 -270 -490 -265 C -470 -200 -440 -120 -400 -80 Z" />
        {/* Inferior */}
        <path d="M -300 150 C -340 230 -420 270 -490 265 C -470 200 -440 120 -400 80 Z" />
      </g>

      {/* ═══════════ CUERPO ═══════════ */}
      <g id="cuerpo">
        <path d={BODY_PATH} fill="var(--polyton-cream)" />

        <g clipPath="url(#polito-body-clip)" stroke="none">
          {/* Sombra inferior plana (cel shading, sin degradados) */}
          <path
            d="M -520 60 C -300 150 100 170 520 40 L 520 260 L -520 260 Z"
            fill="var(--polyton-sand)"
          />
          {/* Brillo superior */}
          <path
            d="M -330 -120 C -200 -175 20 -190 160 -170 C 40 -150 -180 -125 -300 -95 Z"
            fill="var(--polyton-paper)"
          />

          {/* Líneas de globo terráqueo */}
          <g fill="none" stroke={INK} strokeWidth={3} strokeOpacity={0.35}>
            <ellipse cx="-330" cy="0" rx="45" ry="250" />
            <ellipse cx="-150" cy="0" rx="75" ry="260" />
            <ellipse cx="60" cy="0" rx="90" ry="260" />
            <ellipse cx="280" cy="0" rx="80" ry="255" />
            <path d="M -480 -70 C -250 -150 200 -160 470 -70" />
            <path d="M -480 70 C -250 150 200 160 470 70" />
            <path d="M -480 0 L 480 0" />
          </g>

          {/* Grain */}
          <rect x="-520" y="-260" width="1040" height="520" filter="url(#polito-grain)" opacity={0.35} />
        </g>

        {/* Re-trazo del contorno por encima del relleno */}
        <path d={BODY_PATH} fill="none" />

        {/* Letras IPM */}
        <text
          x="-290"
          y="85"
          transform="skewX(-6)"
          fontFamily="var(--font-display)"
          fontSize="215"
          letterSpacing="4"
          fill="var(--polyton-blue)"
          stroke="var(--polyton-paper)"
          strokeWidth={14}
          paintOrder="stroke fill"
        >
          IPM
        </text>
      </g>

      {/* ═══════════ CARA — mirando hacia el espectador ═══════════ */}
      <g id="cara">
        {/* Cejas */}
        <path d="M 190 -185 C 220 -225 275 -225 300 -195" fill="none" strokeWidth={13} />
        <path d="M 350 -192 C 378 -220 420 -212 438 -180" fill="none" strokeWidth={13} />

        {/* Ojos: pupilas centradas y algo hacia abajo = mira a la cámara */}
        <Eye cx={248} cy={-95} rx={64} ry={86} />
        <Eye cx={392} cy={-92} rx={56} ry={78} />

        {/* Mejillas */}
        <g stroke="none" fill="var(--polyton-red)" opacity={0.45}>
          <ellipse cx="185" cy="48" rx="34" ry="20" />
          <ellipse cx="452" cy="36" rx="24" ry="17" />
        </g>

        {/* Nariz — una sola: el engranaje-hélice del zeppelin */}
        <g id="nariz">
          <circle cx="322" cy="8" r="44" fill="var(--polyton-sand)" />
          <circle cx="322" cy="8" r="30" fill="var(--polyton-blue)" strokeWidth={6} />
          <g stroke="var(--polyton-cream)" strokeWidth={8}>
            <path d="M 322 8 L 322 -16" />
            <path d="M 322 8 L 343 20" />
            <path d="M 322 8 L 301 20" />
          </g>
          <circle cx="309" cy="-5" r="6" fill="var(--polyton-paper)" stroke="none" />
        </g>

        {/* Boca abierta sonriendo */}
        <g id="boca">
          <path d="M 225 75 C 260 92 370 95 415 70 C 405 150 350 185 310 182 C 260 180 225 135 225 75 Z" fill={INK} />
          <path
            d="M 262 150 C 285 128 335 125 365 150 C 345 175 290 178 262 150 Z"
            fill="var(--polyton-red)"
            strokeWidth={0}
          />
          {/* Dientes superiores */}
          <path d="M 240 84 C 290 98 360 99 402 80 L 398 100 C 355 115 290 114 245 100 Z" fill="var(--polyton-paper)" strokeWidth={0} />
        </g>
      </g>

      {/* ═══════════ GUANTES ═══════════ */}
      {/* Mano trasera: agarra la panza */}
      <Fist x={95} y={225} rotate={-70} scale={1} />
      {/* Mano delantera: puño al frente, estilo Superman */}
      <Fist x={750} y={-122} rotate={-4} scale={1.15} />
    </g>
  </svg>
)

/* ——— Piezas ——— */

/** Manguera negra estilo rubber hose: trazo grueso con contorno */
const Hose: React.FC<{ d: string }> = ({ d }) => (
  <>
    <path d={d} fill="none" strokeWidth={50} />
    <path d={d} fill="none" stroke={INK} strokeWidth={34} />
  </>
)

/** Pierna: manguera + zapato redondeado apuntando hacia atrás */
const Leg: React.FC<{ from: [number, number]; ctrl: [number, number]; to: [number, number] }> = ({
  from,
  ctrl,
  to,
}) => (
  <g>
    <Hose d={`M ${from[0]} ${from[1]} Q ${ctrl[0]} ${ctrl[1]} ${to[0]} ${to[1]}`} />
    <g transform={`translate(${to[0]} ${to[1]}) rotate(-15) scale(1.3)`}>
      {/* Puntera */}
      <ellipse cx="-55" cy="18" rx="80" ry="52" fill="var(--polyton-leather)" />
      {/* Taco */}
      <path d="M -10 -45 C 30 -45 40 -10 30 25 L -20 30 Z" fill="var(--polyton-leather)" />
      {/* Brillo */}
      <path d="M -105 -5 C -90 -25 -60 -30 -40 -22" fill="none" stroke="var(--polyton-sand)" strokeWidth={8} />
      {/* Suela */}
      <path d="M -130 45 C -90 75 -20 72 25 50" fill="none" strokeWidth={12} />
    </g>
  </g>
)

/** Guante crema cerrado en puño */
const Fist: React.FC<{ x: number; y: number; rotate: number; scale: number }> = ({ x, y, rotate, scale }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} fill="var(--polyton-cream)">
    {/* Puño del guante (enrollado) */}
    <ellipse cx="-58" cy="0" rx="24" ry="50" />
    {/* Mano cerrada: los nudillos miran hacia +x */}
    <path d="M -45 -50 C 0 -72 62 -64 78 -30 C 94 5 88 46 56 63 C 20 81 -36 72 -50 40 C -62 10 -60 -36 -45 -50 Z" />
    {/* Dedos doblados */}
    <g fill="none" strokeWidth={7}>
      <path d="M 52 -52 C 72 -40 76 -22 66 -10" />
      <path d="M 70 -8 C 90 4 90 24 72 34" />
      <path d="M 66 36 C 80 50 70 62 54 63" />
    </g>
    {/* Pulgar cruzado por arriba */}
    <path d="M -28 -46 C -5 -20 30 -18 50 -40" fill="none" strokeWidth={7} />
    {/* Costuras del guante */}
    <g fill="none" strokeWidth={5} strokeOpacity={0.6}>
      <path d="M -20 -10 C 0 -14 20 -12 34 -6" />
      <path d="M -20 14 C 0 10 20 12 34 18" />
    </g>
  </g>
)

/** Ojo cartoon: blanco ovalado + pupila con corte "pie-cut" de los años 30 */
const Eye: React.FC<{ cx: number; cy: number; rx: number; ry: number }> = ({ cx, cy, rx, ry }) => {
  const pr = rx * 0.48
  const py = cy + ry * 0.18
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="var(--polyton-paper)" />
      <ellipse cx={cx} cy={py} rx={pr} ry={pr * 1.35} fill={INK} stroke="none" />
      {/* Corte en cuña — el sello del rubber hose */}
      <path
        d={`M ${cx} ${py} L ${cx + pr * 0.35} ${py - pr * 1.5} L ${cx + pr * 1.1} ${py - pr * 1.1} Z`}
        fill="var(--polyton-paper)"
        stroke="none"
      />
    </g>
  )
}

export default PolitoFlying
