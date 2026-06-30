import React, { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

const SPEAKERS = [
  {
    name: 'Paloma Conde',
    topic: 'La Paradoja de la Conexión: vínculos y ansiedad en la era digital',
    photoUrl: '/speakers/paloma-conde.webp',
    accent: '#C94C6E',
    cardBg: '#2D1B4E',
    sectionBg: '#2D1B4E',
    nameColor: '#F0E6D3',
    topicColor: '#C4A6D4',
  },
  {
    name: 'Lucas Saclier',
    topic: 'IA, Empleo y Profesiones del Futuro',
    photoUrl: '/speakers/lucas-saclier.webp',
    accent: '#E8A020',
    cardBg: '#0F3A48',
    sectionBg: '#1A4A5C',
    nameColor: '#EDE0BC',
    topicColor: '#7EC8D4',
  },
  {
    name: 'Micaela Brahim',
    topic: 'Pequeñas Acciones, Grandes Cambios: El Impacto Ambiental y la Sustentabilidad',
    photoUrl: '/speakers/micaela-brahim.webp',
    accent: '#D4A040',
    cardBg: '#1E3A1F',
    sectionBg: '#2D4A2E',
    nameColor: '#EDE0BC',
    topicColor: '#A8C4A0',
  },
]

const Talks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const stack = stackRef.current
    if (!section || !stack) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (reduced || isMobile) return

    const cards = Array.from(stack.querySelectorAll<HTMLElement>('.stack-card'))
    if (!cards.length) return

    const N = cards.length
    const SCROLL_PER_CARD = 140

    /* Set initial section background */
    gsap.set(section, { backgroundColor: SPEAKERS[0].sectionBg })

    /* Stack initial positions */
    cards.forEach((card, i) => {
      const fromTop = N - 1 - i
      gsap.set(card, {
        y: -fromTop * 12,
        scale: 1 - fromTop * 0.03,
        zIndex: fromTop,
      })
    })

    /* Timeline: card stack reveal + color transitions */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: 'top top',
        end: `+=${N * SCROLL_PER_CARD}vh`,
        scrub: 0.1,
        invalidateOnRefresh: true,
      },
    })

    /* Card slide-out animations */
    for (let i = 0; i < N; i++) {
      if (i === N - 1) continue
      const pos = i / N
      tl.to(
        cards[i],
        {
          y: '-120%',
          opacity: 0,
          scale: 0.8,
          rotation: 5,
          ease: 'power2.inOut',
          duration: 1 / N,
        },
        pos
      )
    }

    /* Smooth color transition when card is quiet (after slide-out ends) */
    for (let i = 1; i < N; i++) {
      const pos = i / N
      tl.call(() => {
        gsap.to(section, {
          backgroundColor: SPEAKERS[i].sectionBg,
          duration: 0.5,
          ease: 'power2.inOut',
        })
      }, undefined, pos)
    }

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} id="charlas" className="talks-stack-section">
      <div className="talks-stack-inner">
        <div className="talks-stack-left">
          <p className="talks-stack-eyebrow">
            <span style={{ color: 'var(--polyton-gold)' }}>✦</span>
            {' '}Inspiración{' '}
            <span style={{ color: 'var(--polyton-gold)' }}>✦</span>
          </p>
          <h2 className="talks-stack-title">Charlas</h2>
          <p className="talks-stack-desc">
            Conocé a las personas que van a exponer las problemáticas con las que los equipos trabajarán.
            Cada charla trae una perspectiva única.
          </p>
        </div>

        <div ref={stackRef} className="talks-stack-right">
          <div className="talks-stack-cards">
            {SPEAKERS.map((s, i) => (
              <article
                key={i}
                className="stack-card"
                style={{
                  '--card-accent': s.accent,
                  '--card-bg': s.cardBg,
                  '--card-name-color': s.nameColor,
                  '--card-topic-color': s.topicColor,
                } as React.CSSProperties}
              >
                <div className="stack-card-photo" aria-label={`Foto de ${s.name}`}>
                  <div
                    className="stack-card-photo-bg"
                    style={{
                      background: `linear-gradient(155deg, ${s.accent}55, ${s.cardBg} 60%, #0a0a0a)`,
                    }}
                    aria-hidden="true"
                  />
                  <img
                    src={s.photoUrl}
                    alt={s.name}
                    className="stack-card-photo-img"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none'
                    }}
                  />
                  <div className="stack-card-ghibli-overlay" aria-hidden="true" />
                </div>
                <div className="stack-card-body">
                  <div className="stack-card-tag" style={{ background: s.accent }}>
                    Charla
                  </div>
                  <h3 className="stack-card-name">{s.name}</h3>
                  <p className="stack-card-topic">{s.topic}</p>
                </div>
                <div className="stack-card-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="stack-card-badge" aria-hidden="true" style={{ background: s.accent }}>
                  ★
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Talks
