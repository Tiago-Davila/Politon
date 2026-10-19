/**
 * Hero.tsx — POLITÓN 2026
 *
 * Bloque de texto en la parte alta sobre fondo Dither (React Bits) en modo
 * halftone, con la paleta de la marca + grain vintage encima.
 */
import React, { useEffect, useMemo, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import { splitText } from '../../lib/textSplit'
import { useLoader } from '../../contexts/LoaderContext'
import Dither from '../ui/Dither'
import CircularText from '../ui/CircularText'
import { scrollToSection } from '../../lib/scrollToSection'

/* El shader necesita los HEX reales: se leen de los tokens de globals.css */
const readToken = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()

const DITHER_TOKENS = ['--polyton-night', '--polyton-blue', '--polyton-gold']

const Hero: React.FC = () => {
  const { setIsLoading } = useLoader()
  /* Se lee en render: en dev el CSS se inyecta después de evaluar este módulo */
  const ditherPalette = useMemo(() => DITHER_TOKENS.map(readToken), [])

  /* —— REFS —— */
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const specialRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const fase2Ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    setIsLoading(false)
  }, [setIsLoading])

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 1 — Título: char-by-char stagger */
      if (titleRef.current) {
        const { chars } = splitText(titleRef.current)
        gsap.fromTo(
          chars,
          { y: '110%', opacity: 0, rotateZ: 6 },
          {
            y: '0%',
            opacity: 1,
            rotateZ: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.04,
            delay: 0.2,
          }
        )
      }

      /* 2 — Eyebrow / subtítulo mini */
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.5 }
      )

      /* 3 — Especialidades chips */
      gsap.fromTo(
        specialRef.current?.querySelectorAll('.chip') ?? [],
        { opacity: 0, scale: 0.7, y: 12 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: 'back.out(2)',
          stagger: 0.1,
          delay: 0.65,
        }
      )

      /* 4 — Fecha */
      gsap.fromTo(
        dateRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.75 }
      )

      /* 5 — Sticker "Mirá la fase 2": entra girando y queda saludando */
      const fase2 = fase2Ref.current
      if (fase2) {
        gsap.fromTo(
          fase2.querySelector('.hero-fase2-seal'),
          { scale: 0, rotate: -120 },
          { scale: 1, rotate: 0, duration: 0.9, ease: 'back.out(1.8)', delay: 1 }
        )
        gsap.fromTo(
          fase2.querySelector('.hero-fase2-label'),
          { opacity: 0, x: 40, rotate: 8 },
          { opacity: 1, x: 0, rotate: -3, duration: 0.7, ease: 'back.out(2)', delay: 1.2 }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--polyton-night)',
        /* top: aire arriba del bloque de texto */
        padding: 'clamp(7.5rem, 17vh, 10rem) 1.25rem 3rem',
      }}
    >
      {/* ═══════════════════════════════════════
          FONDO — Dither halftone + grain
          ═══════════════════════════════════════ */}
      <div className="hero-bg" aria-hidden="true">
        <Dither
          ditherMode="halftone"
          palette={ditherPalette}
          pixelSize={5}
          brightness={-0.18}
          waveSpeed={0.04}
          waveFrequency={2.5}
          waveAmplitude={0.35}
          mouseEffect="ripple"
          mouseRadius={0.6}
        />
      </div>
      <div className="hero-grain" aria-hidden="true" />

      {/* ═══════════════════════════════════════
          CONTENIDO — bloque de texto centrado
          ═══════════════════════════════════════ */}
      <div
        className="hero-content"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.4rem',
        }}
      >
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: '0.95rem',
            color: 'var(--polyton-cream)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            opacity: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ color: 'var(--polyton-gold)' }}>✦</span>
          IPM · Hackatón 2026
          <span style={{ color: 'var(--polyton-gold)' }}>✦</span>
        </p>

        {/* Título principal */}
        <div style={{ overflow: 'visible', lineHeight: 1.05, paddingTop: '0.12em' }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 9vw, 8.5rem)',
              color: 'var(--polyton-cream)',
              textTransform: 'uppercase',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              /* Sombra estilo cartoon */
              textShadow: '6px 6px 0px var(--polyton-ink)',
              WebkitTextStroke: '3px var(--polyton-ink)',
              paintOrder: 'stroke fill',
            }}
          >
            POLITÓN
          </h1>
        </div>

        {/* Especialidades — chips */}
        <div
          ref={specialRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          {['Computación', 'Mecánica', '4to · 5to · 6to Año'].map((tag) => (
            <span
              key={tag}
              className="chip"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-subtitle)',
                fontSize: '0.9rem',
                color: 'var(--polyton-night)',
                background: 'var(--polyton-gold)',
                border: '2px solid var(--polyton-ink)',
                boxShadow: '3px 3px 0 var(--polyton-ink)',
                padding: '0.25rem 0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                opacity: 0, /* GSAP anima */
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Fecha */}
        <div
          ref={dateRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            opacity: 0,
          }}
        >
          {/* Separadores ornamentales */}
          <span className="hero-date-rule" aria-hidden="true" />
          <p
            style={{
              fontFamily: 'var(--font-subtitle)',
              fontSize: '1.4rem',
              color: 'var(--polyton-cream)',
              letterSpacing: '0.06em',
              textShadow: '2px 2px 0 var(--polyton-ink)',
            }}
          >
            24 · 25 · 26 de junio 2026
          </p>
          <span className="hero-date-rule" aria-hidden="true" />
        </div>
      </div>

      {/* ═══════════════════════════════════════
          FASE 02 — acceso a los finalistas
          ═══════════════════════════════════════ */}
      <a
        ref={fase2Ref}
        href="#equipos"
        className="hero-fase2"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          scrollToSection('#equipos')
        }}
      >
        <span className="hero-fase2-label">¡Mirá la fase 2!</span>
        <CircularText className="hero-fase2-seal" text="FASE 02 ✦ FINALISTAS ✦ " duration={14}>
          <ArrowDown size={26} strokeWidth={2.8} aria-hidden="true" />
        </CircularText>
      </a>
    </section>
  )
}

export default Hero
