import React, { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const SPEAKERS = [
  {
    name: 'Speaker 1',
    topic: 'Tema de la charla',
    image: 'https://placehold.co/400x500/2C3A6B/EDE0BC?text=S1',
    accent: '#C94C2E',
  },
  {
    name: 'Speaker 2',
    topic: 'Tema de la charla',
    image: 'https://placehold.co/400x500/1E2D5C/EDE0BC?text=S2',
    accent: '#E8A020',
  },
  {
    name: 'Speaker 3',
    topic: 'Tema de la charla',
    image: 'https://placehold.co/400x500/7A4E2D/EDE0BC?text=S3',
    accent: '#2C3A6B',
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
    if (reduced) return

    const cards = Array.from(stack.querySelectorAll<HTMLElement>('.stack-card'))
    if (!cards.length) return

    const N = cards.length
    // How many viewport heights the user must scroll per card reveal.
    // Increase this to require more scrolling to reveal the next card.
    const SCROLL_PER_CARD = 140 // in vh

    /* Posiciones iniciales: stack visual con offset y escala */
    cards.forEach((card, i) => {
      const fromTop = N - 1 - i
      gsap.set(card, {
        y: -fromTop * 12,
        scale: 1 - fromTop * 0.03,
        zIndex: fromTop,
      })
    })

    /* Timeline: las cards salen de arriba hacia abajo */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: 'top top',
        end: `+=${N * SCROLL_PER_CARD}vh`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    // Animate cards in DOM order: card 0 (first) should go first, leaving the last card as the base
    for (let i = 0; i < N; i++) {
      if (i === N - 1) continue
      const pos = i / N
      tl.to(
        cards[i],
        {
          y: '-120%',
          opacity: 0,
          scale: 0.8,
          rotation: -5,
          ease: 'power2.inOut',
          duration: 1 / N,
        },
        pos
      )
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
          <h2 className="talks-stack-title">Speakers</h2>
          <p className="talks-stack-desc">
            Conocé a los expertos que van a guiar a los equipos durante las 48 horas.
            Cada speaker trae una perspectiva única sobre la problemática que aborda.
          </p>
          <div className="talks-stack-count">
            <span className="tsc-number">{String(SPEAKERS.length).padStart(2, '0')}</span>
            <span className="tsc-label">speakers<br />confirmados</span>
          </div>
        </div>

        <div ref={stackRef} className="talks-stack-right">
          <div className="talks-stack-cards">
            {SPEAKERS.map((s, i) => (
              <article
                key={i}
                className="stack-card"
                style={{ '--card-accent': s.accent } as React.CSSProperties}
              >
                <div className="stack-card-photo">
                  <img src={s.image} alt={s.name} loading="lazy" />
                </div>
                <div className="stack-card-body">
                  <div className="stack-card-tag" style={{ background: s.accent }}>
                    Speaker
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
