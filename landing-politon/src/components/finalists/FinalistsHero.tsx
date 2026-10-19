/**
 * FinalistsHero.tsx — portada de /segunda-fase
 *
 * Título que entra letra por letra, Polito volando con speed lines y un sello
 * giratorio con la cantidad de equipos. El ticker de abajo acelera con el scroll.
 */
import React, { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import polito from '../../assets/mascot/polito-volando.webp'
import CircularText from '../ui/CircularText'
import ScrollVelocity from '../ui/ScrollVelocity'

/* Letras sueltas para animar, agrupadas por palabra para que no se corten al hacer wrap */
const Chars: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(' ').map((word, w) => (
      <React.Fragment key={w}>
        {w > 0 ? ' ' : null}
        <span className="fin-word">
          {[...word].map((char, i) => <span className="fin-char" key={i}>{char}</span>)}
        </span>
      </React.Fragment>
    ))}
  </>
)

const FinalistsHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.fin-hero-title .fin-char', { yPercent: 110, rotate: 8, opacity: 0, duration: 1, stagger: 0.025 })
        .from('.fin-kicker, .fin-hero-text, .fin-hero-cta', { y: 30, opacity: 0, duration: 0.9, stagger: 0.08 }, '-=0.7')
        .from('.fin-hero-flight', { x: -260, y: 220, rotate: -18, scale: 0.5, opacity: 0, duration: 1.4, ease: 'back.out(1.4)' }, 0.15)
        .from('.fin-hero-rays', { scale: 0.3, opacity: 0, duration: 1.4 }, 0.2)
        .from('.fin-hero-seal', { scale: 0, rotate: -120, duration: 1.1, ease: 'back.out(1.8)' }, 0.7)
        .from('.fin-hero-ticker', { yPercent: 100, duration: 1 }, 0.5)

      gsap.to('.fin-hero-bob', { y: -18, rotate: 2.5, duration: 1.7, ease: 'sine.inOut', yoyo: true, repeat: -1 })

      gsap.matchMedia().add('(min-width: 900px)', () => {
        const scrub = { trigger: section, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('.fin-hero-art', { yPercent: -22, ease: 'none', scrollTrigger: scrub })
        gsap.to('.fin-hero-copy', { yPercent: 12, opacity: 0.2, ease: 'none', scrollTrigger: scrub })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="fin-hero" aria-labelledby="fin-hero-title">
      <div className="fin-hero-grid">
        <div className="fin-hero-copy">
          <p className="fin-kicker"><span className="fin-kicker-line" aria-hidden="true" /> POLITÓN 2026 · INSTITUTO POLITÉCNICO MODELO</p>
          <h1 id="fin-hero-title" className="fin-hero-title" aria-label="Las ideas que llegaron a la final">
            <span className="fin-hero-line" aria-hidden="true"><Chars text="LAS IDEAS QUE" /></span>
            <span className="fin-hero-line fin-hero-line-em" aria-hidden="true"><em><Chars text="LLEGARON" /></em></span>
            <span className="fin-hero-line" aria-hidden="true"><Chars text="A LA FINAL" /></span>
          </h1>
          <p className="fin-hero-text">Seis equipos. Seis proyectos. Una final para mostrar lo que construyeron. Conocé las ideas que siguieron en carrera.</p>
          <a className="fin-hero-cta" href="#equipos">Conocé a los equipos <ArrowDown size={20} strokeWidth={2.5} /></a>
        </div>

        <div className="fin-hero-art" aria-hidden="true">
          <div className="fin-hero-rays" />
          <div className="fin-hero-flight">
            <div className="fin-hero-bob">
              <svg className="fin-hero-speed" viewBox="0 0 400 200" fill="none">
                <path d="M10 60 H230" /><path d="M60 100 H280" /><path d="M0 140 H200" /><path d="M90 175 H250" />
              </svg>
              <img className="fin-hero-polito" src={polito} alt="" fetchPriority="high" />
            </div>
          </div>
          <CircularText className="fin-hero-seal" text="EQUIPOS FINALISTAS ✦ EQUIPOS FINALISTAS ✦ " duration={22}>
            <strong>06</strong>
          </CircularText>
        </div>
      </div>

      <div className="fin-hero-ticker">
        <ScrollVelocity className="fin-ticker-track">
          <span>IDEAS QUE SE CONSTRUYEN</span><span className="fin-ticker-star">✦</span>
          <span>POLITÓN 2026</span><span className="fin-ticker-star">✦</span>
        </ScrollVelocity>
      </div>
    </section>
  )
}

export default FinalistsHero
