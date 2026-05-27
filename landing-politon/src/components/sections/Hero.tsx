/**
 * Hero.tsx — POLITÓN 2026
 *
 * Layout: dos columnas
 * · Izquierda: título, info, CTA — animado con GSAP
 * · Derecha:   espacio reservado (Polito vuela via Three.js)
 *
 * Fondo: split diagonal — azul noche / papel vintage
 */
import React, { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { splitText } from '../../lib/textSplit'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import PolitoScene from '../three/PolitoScene'
import { useCountdown } from './Countdown'
import { REGISTRATION_FORM_URL } from '../../lib/registration'

const Hero: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 769px)')
  const time = useCountdown()

  /* —— REFS —— */
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const specialRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

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
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: 0.5 }
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

      /* 5 — Tagline "¿Te animás?" */
      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.85 }
      )

      /* 6 — CTA */
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 24, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.8)', delay: 1.0 }
      )

      /* 7 — Contador compacto */
      gsap.fromTo(
        badgeRef.current,
        { scale: 0, rotate: -8, opacity: 0 },
        {
          scale: 1,
          rotate: 2,
          opacity: 1,
          duration: 0.7,
          ease: 'back.out(3)',
          delay: 1.2,
        }
      )

      /* 8 — Estrellas decorativas animadas con GSAP */
      const stars = sectionRef.current?.querySelectorAll('.hero-star')
      if (stars?.length) {
        stars.forEach((star, i) => {
          gsap.to(star, {
            y: `random(-8, 8)`,
            x: `random(-6, 6)`,
            rotation: `random(-15, 15)`,
            opacity: `random(0.5, 1)`,
            duration: `random(2, 4)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.15,
          })
        })
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
        alignItems: 'stretch',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ═══════════════════════════════════════
          FONDO SPLIT diagonal
          ═══════════════════════════════════════ */}
      <HeroBackground />

      {/* ═══════════════════════════════════════
          POLITO — Three.js sprite animado por scroll
          Solo en desktop para rendimiento
          ═══════════════════════════════════════ */}
      {isDesktop && <PolitoScene heroRef={sectionRef} />}

      {/* ═══════════════════════════════════════
          CONTENIDO — grid de dos columnas
          ═══════════════════════════════════════ */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '7rem 3rem 3rem 3rem', /* top: clearance for floating CardNav */
          gap: '2rem',
        }}
      >
        {/* ——— COLUMNA IZQUIERDA ——— */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem',
            paddingTop: '2rem',
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
            IPM · Hackathon 2026
            <span style={{ color: 'var(--polyton-gold)' }}>✦</span>
          </p>

          {/* Título principal */}
          <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
            <h1
              ref={titleRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 7.5vw, 7.5rem)',
                color: 'var(--polyton-cream)',
                textTransform: 'uppercase',
                lineHeight: 0.92,
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                /* Sombra estilo cartoon */
                textShadow: '5px 5px 0px var(--polyton-ink)',
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
            {/* Separador ornamental */}
            <div
              style={{
                width: '3rem',
                height: '3px',
                background: 'var(--polyton-gold)',
                border: '1px solid var(--polyton-ink)',
              }}
            />
            <p
              style={{
                fontFamily: 'var(--font-subtitle)',
                fontSize: '1.4rem',
                color: 'var(--polyton-cream)',
                letterSpacing: '0.06em',
              }}
            >
              24 · 25 · 26 de Junio 2026
            </p>
          </div>

          {/* Tagline */}
          <p
            ref={taglineRef}
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              color: 'var(--polyton-gold)',
              opacity: 0,
              fontStyle: 'italic',
            }}
          >
            ¿Te animás?
          </p>

          {/* CTA */}
          <div
            ref={ctaRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              opacity: 0,
            }}
          >
            <a
              href={REGISTRATION_FORM_URL}
              id="hero-cta"
              className="btn-cuphead"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}
            >
              ¡Inscribite ya! →
            </a>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--polyton-sand)',
              }}
            >
              La inscripción dura poco
            </span>
          </div>
        </div>

        {/* ——— COLUMNA DERECHA: espacio — Polito vuela en el canvas Three.js ——— */}
        <div style={{ minHeight: '520px' }} aria-hidden="true" />

        <div
          ref={badgeRef}
          className="badge-vintage"
          aria-label="Cuenta regresiva para Politón 2026"
          style={{
            position: 'absolute',
            bottom: '8%',
            right: '5%',
            width: 'min(360px, 34vw)',
            minWidth: '280px',
            minHeight: '112px',
            background: 'var(--polyton-gold)',
            color: 'var(--polyton-night)',
            alignItems: 'stretch',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '0.45rem',
            opacity: 0,
            transform: 'rotate(2deg)',
            zIndex: 3,
            padding: '1rem',
            borderRadius: '0.55rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-subtitle)',
              fontSize: '0.82rem',
              color: 'var(--polyton-night)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            Empieza en
          </span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.35rem',
            }}
          >
            {[
              { value: time.days, label: 'Días' },
              { value: time.hours, label: 'Hs' },
              { value: time.minutes, label: 'Min' },
              { value: time.seconds, label: 'Seg' },
            ].map((unit) => (
              <span
                key={unit.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.08rem',
                  minWidth: 0,
                }}
              >
                <strong
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.55rem, 2.7vw, 2.45rem)',
                    fontWeight: 400,
                    lineHeight: 0.9,
                    textShadow: '2px 2px 0 var(--polyton-cream)',
                  }}
                >
                  {String(unit.value).padStart(2, '0')}
                </strong>
                <small
                  style={{
                    fontFamily: 'var(--font-subtitle)',
                    fontSize: '0.68rem',
                    color: 'var(--polyton-night)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {unit.label}
                </small>
              </span>
            ))}
          </div>
        </div>
      </div>


    </section>
  )
}

/* ——— Fondo del Hero ——— */
const HeroBackground: React.FC = () => (
  <>
    {/* Mitad izquierda — azul noche profundo */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        /* Fondo degradado: azul noche con leve variación hacia arriba */
        background: `
          linear-gradient(
            170deg,
            #1a2850 0%,
            var(--polyton-night) 45%,
            #253468 100%
          )
        `,
      }}
    />

    {/* Diagonal que parte el hero — papel vintage en la derecha */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: `
          linear-gradient(
            108deg,
            transparent 0%,
            transparent 50%,
            var(--polyton-vintage) 50%,
            var(--polyton-vintage) 100%
          )
        `,
      }}
    />

    {/* Puntos halftone sutiles en zona oscura */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        backgroundImage: `radial-gradient(circle, rgba(232,160,32,0.08) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
        backgroundPosition: '0 0',
        /* Solo visible en la mitad izquierda */
        clipPath: 'polygon(0 0, 52% 0, 48% 100%, 0 100%)',
      }}
    />

    {/* Estrellas de 4 puntas decorativas — animadas con GSAP */}
    {STAR_POSITIONS.map((s, i) => (
      <span
        key={i}
        className="hero-star"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: s.top,
          left: s.left,
          color: s.color,
          fontSize: s.size,
          opacity: s.opacity,
          zIndex: 1,
          pointerEvents: 'none',
          textShadow: s.glow ? '0 0 8px rgba(232,160,32,0.5)' : 'none',
        }}
      >
        {s.char}
      </span>
    ))}
  </>
)

/* Posiciones de estrellas decorativas */
const STAR_POSITIONS = [
  { char: '✦', top: '8%', left: '5%', size: '1.8rem', opacity: 0.8, color: 'var(--polyton-gold)', glow: true },
  { char: '✦', top: '18%', left: '22%', size: '1rem', opacity: 0.7, color: 'var(--polyton-gold)', glow: false },
  { char: '✦', top: '35%', left: '3%', size: '2.2rem', opacity: 0.9, color: 'var(--polyton-cream)', glow: true },
  { char: '✦', top: '65%', left: '12%', size: '1.4rem', opacity: 0.75, color: 'var(--polyton-gold)', glow: false },
  { char: '✦', top: '82%', left: '6%', size: '1rem', opacity: 0.6, color: 'var(--polyton-cream)', glow: false },
  { char: '✦', top: '50%', left: '40%', size: '1.6rem', opacity: 0.85, color: 'var(--polyton-gold)', glow: true },
  { char: '✦', top: '15%', left: '42%', size: '0.9rem', opacity: 0.65, color: 'var(--polyton-gold)', glow: false },
  { char: '✦', top: '72%', left: '44%', size: '1.1rem', opacity: 0.7, color: 'var(--polyton-cream)', glow: false },
  { char: '✦', top: '5%', left: '36%', size: '1.3rem', opacity: 0.8, color: 'var(--polyton-gold)', glow: true },
  { char: '✦', top: '90%', left: '35%', size: '0.8rem', opacity: 0.6, color: 'var(--polyton-gold)', glow: false },
]

/* ——— Scroll hint ——— */


export default Hero
