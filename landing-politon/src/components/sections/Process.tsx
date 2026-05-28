import React, { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

const PROCESS_STEPS = [
  {
    title: 'Comprender',
    note: 'Leer el problema real sin saltar directo a la solución.',
  },
  {
    title: 'Oportunidades',
    note: 'Encontrar donde hay algo para mejorar, cambiar o inventar.',
  },
  {
    title: 'Preguntas',
    note: 'Convertir lo observado en desafíos de diseño.',
  },
  {
    title: 'Ideas',
    note: 'Abrir opciones, mezclar enfoques y elegir una dirección.',
  },
  {
    title: 'Validar',
    note: 'Probar rápido si la propuesta tiene sentido.',
  },
  {
    title: 'Soluciones',
    note: 'Bajar la idea a algo concreto y explicable.',
  },
  {
    title: 'Pitch + reel',
    note: 'Comunicar la solución con claridad, energía y evidencia.',
  },
]

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (reduced || isMobile) return

    const travel = () => {
      const sectionWidth = section.getBoundingClientRect().width || window.innerWidth
      return Math.max(0, track.scrollWidth - sectionWidth)
    }

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -travel(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${travel() + window.innerHeight * 0.85}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`
            }
          },
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="como-se-desarrolla" className="process-section">
      <div className="process-copy">
        <p className="process-eyebrow">Dinámica guiada</p>
        <h2 className="process-title">¿Cómo se desarrolla?</h2>
        <p className="process-desc">
          Los equipos avanzan por etapas concretas: entienden, preguntan, prueban y terminan comunicando una idea real.
        </p>
      </div>

      <div className="process-rail" aria-hidden="true">
        <div ref={progressRef} className="process-progress" />
      </div>

      <div ref={trackRef} className="process-track" aria-label="Etapas de la dinámica">
        {PROCESS_STEPS.map((step, index) => (
          <article className="process-step" key={step.title}>
            <span className="process-step-number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Process
