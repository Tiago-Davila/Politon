/**
 * Challenges.tsx — POLITÓN 2026
 *
 * Sección de Problemáticas con scroll horizontal hijack.
 * GSAP ScrollTrigger pina la sección y convierte el scroll vertical
 * en movimiento horizontal del carrusel.
 */
import React, { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { splitText } from '../../lib/textSplit'

const CHALLENGES = [
  {
    id: 'futuro-laboral',
    number: '01',
    title: 'Futuro Laboral',
    subtitle: '¿Qué trabajo vas a tener en 10 años?',
    description:
      'La automatización, la IA y los nuevos modelos de trabajo están redefiniendo qué habilidades se necesitan y qué empleos van a existir. Los equipos deben investigar cómo el mercado laboral está cambiando para los jóvenes de hoy, detectar oportunidades reales y proponer soluciones que preparen a las personas para ese futuro.',
    tags: ['Computación', 'Mecánica', 'Interdisciplinario'],
    accent: 'var(--polyton-red)',
    bg: '#1a0f0a',
    cardBg: '#2a1208',
    textPrimary: 'var(--polyton-cream)',
    textSecondary: 'var(--polyton-sand)',
    accentLight: '#ff8a6a',
    icon: '⚙',
  },
  {
    id: 'gamificacion',
    number: '02',
    title: 'Gamificación de la Economía',
    subtitle: '¿Y si la economía fuera un juego?',
    description:
      'Las apps de inversión, las criptomonedas y los sistemas de recompensas digitales están convirtiendo las decisiones financieras en mecánicas de juego. ¿Eso es bueno o malo? Los equipos deben analizar cómo la gamificación está cambiando la relación de los jóvenes con el dinero, el ahorro y el consumo.',
    tags: ['Computación', 'Interdisciplinario'],
    accent: 'var(--polyton-gold)',
    bg: '#0d1108',
    cardBg: '#131a08',
    textPrimary: 'var(--polyton-cream)',
    textSecondary: 'var(--polyton-sand)',
    accentLight: '#f0c84a',
    icon: '◈',
  },
  {
    id: 'vinculos',
    number: '03',
    title: 'Vínculos y Relaciones',
    subtitle: 'Ansiedad social en la era digital',
    description:
      'Las redes sociales y la hiperconectividad están transformando cómo nos relacionamos — y a veces, desconectando más de lo que conectan. La ansiedad social en jóvenes está en aumento. Los equipos deben identificar qué está fallando en los vínculos interpersonales actuales y diseñar propuestas que ayuden.',
    tags: ['Computación', 'Mecánica', 'Psicología Social'],
    accent: '#7C6BC4',
    bg: '#080c1a',
    cardBg: '#0d1228',
    textPrimary: 'var(--polyton-cream)',
    textSecondary: 'var(--polyton-sand)',
    accentLight: '#a99de0',
    icon: '◬',
  },
]

/* ──────────────────────────────────────── */

const Challenges: React.FC = () => {
  const sectionRef     = useRef<HTMLElement>(null)
  const trackRef       = useRef<HTMLDivElement>(null)
  const headerTitleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    /* Split del título */
    if (headerTitleRef.current) {
      const { chars } = splitText(headerTitleRef.current)
      gsap.fromTo(
        chars,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.55,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        }
      )
    }

    /* ── Horizontal scroll hijack ──
     * Cada card ocupa 72.5vw → 1 card + ~1/3 del siguiente.
     * Desplazamos el track: totalWidth − viewportWidth.
     */
    const cards     = track.querySelectorAll<HTMLElement>('.challenge-card')
    const cardWidth = cards[0]?.offsetWidth ?? 0
    const totalW    = cardWidth * cards.length
    const maxScroll = Math.max(0, totalW - window.innerWidth)

    /* Cards parten invisibles — se revelan al entrar */
    gsap.set(cards, { opacity: 0, x: 24 })

    const st = ScrollTrigger.create({
      trigger: section,
      pin: true,
      pinSpacing: true,
      start: 'top top',
      end: () => `+=${maxScroll + 80}`,
      scrub: 1.2,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        })
      },
      onUpdate: (self) => {
        gsap.set(track, { x: -self.progress * maxScroll })
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="problematicas"
      className="challenges-section"
    >
      {/* Header */}
      <div className="challenges-header">
        <p className="challenges-eyebrow">
          <span style={{ color: 'var(--polyton-gold)' }}>✦</span>
          {' '}Elige tu batalla{' '}
          <span style={{ color: 'var(--polyton-gold)' }}>✦</span>
        </p>
        <div style={{ overflow: 'hidden' }}>
          <h2 ref={headerTitleRef} className="challenges-title">
            Problemáticas
          </h2>
        </div>
        <p className="challenges-hint">
          <span className="hint-arrow">→</span>
          &nbsp;Deslizá para explorar
        </p>
      </div>

      {/* Carrusel */}
      <div className="challenges-track-wrap">
        <div ref={trackRef} className="challenges-track">
          {CHALLENGES.map((ch) => (
            <ChallengeCard key={ch.id} data={ch} />
          ))}
          <div className="challenges-track-spacer" aria-hidden="true" />
        </div>
      </div>

      <ProgressDots total={CHALLENGES.length} />
    </section>
  )
}

/* ──── Card individual ──── */
interface ChallengeData {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  accent: string
  bg: string
  cardBg: string
  textPrimary: string
  textSecondary: string
  accentLight: string
  icon: string
}

const ChallengeCard: React.FC<{ data: ChallengeData }> = ({ data: ch }) => (
  <article
    className="challenge-card"
    id={`challenge-${ch.id}`}
    style={{
      background: ch.bg,
      '--card-accent': ch.accent,
      '--card-accent-light': ch.accentLight,
    } as React.CSSProperties}
  >
    <div className="challenge-card-inner" style={{ background: ch.cardBg }}>
      {/* Barra de color superior */}
      <div className="challenge-card-top-bar" style={{ background: ch.accent }} />

      {/* Número */}
      <div className="challenge-number-wrap">
        <span className="challenge-number" style={{ color: ch.accent }}>
          MISIÓN {ch.number}
        </span>
        <span className="challenge-icon" style={{ color: ch.accent }} aria-hidden="true">
          {ch.icon}
        </span>
      </div>

      {/* Título */}
      <h3 className="challenge-card-title" style={{ color: ch.textPrimary }}>
        {ch.title}
      </h3>

      {/* Subtítulo */}
      <p className="challenge-subtitle" style={{ color: ch.accentLight }}>
        {ch.subtitle}
      </p>

      {/* Separador */}
      <div className="challenge-divider" style={{ borderColor: ch.accent }} aria-hidden="true">
        <span style={{ background: ch.accent }} />
        <span className="challenge-divider-diamond" style={{ color: ch.accent }}>◆</span>
        <span style={{ background: ch.accent }} />
      </div>

      {/* Descripción */}
      <p className="challenge-description" style={{ color: ch.textSecondary }}>
        {ch.description}
      </p>

      {/* Tags */}
      <div className="challenge-tags">
        {ch.tags.map((tag) => (
          <span
            key={tag}
            className="challenge-tag"
            style={{ borderColor: ch.accent, color: ch.accentLight }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Zona del villano */}
      <div className="challenge-villain-zone" style={{ borderColor: ch.accent + '33' }}>
        <div className="challenge-villain-placeholder">
          <div
            className="villain-silhouette"
            style={{ background: ch.accent + '22', borderColor: ch.accent + '55' }}
          >
            <span className="villain-question" style={{ color: ch.accent }}>?</span>
          </div>
          <p className="villain-label" style={{ color: ch.accent + 'aa' }}>
            VILLANO · PRÓXIMAMENTE
          </p>
        </div>
      </div>

      {/* Speed lines decorativas */}
      <SpeedLinesCorner color={ch.accent} />

      {/* Grain overlay */}
      <div className="challenge-grain" aria-hidden="true" />
    </div>
  </article>
)

/* ──── Speed lines SVG ──── */
const SpeedLinesCorner: React.FC<{ color: string }> = ({ color }) => (
  <svg
    className="challenge-speedlines"
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * 60 - 30
      const rad   = (angle * Math.PI) / 180
      const len   = i % 2 === 0 ? 100 : 70
      const x2    = Math.cos(rad) * len
      const y2    = Math.sin(rad) * len
      return (
        <line
          key={i}
          x1="0" y1="0"
          x2={x2} y2={y2}
          stroke={color}
          strokeWidth={i % 2 === 0 ? 2 : 1}
          opacity={i % 2 === 0 ? 0.35 : 0.18}
          strokeLinecap="round"
        />
      )
    })}
  </svg>
)

/* ──── Dots de progreso ──── */
const ProgressDots: React.FC<{ total: number }> = ({ total }) => (
  <div className="challenges-progress" aria-hidden="true">
    {Array.from({ length: total }, (_, i) => (
      <span key={i} className="progress-dot" />
    ))}
  </div>
)

export default Challenges
