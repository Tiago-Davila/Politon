import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'

const SPEAKERS = [
  {
    name: 'Paloma Conde',
    topic: 'La Paradoja de la Conexión: vínculos y ansiedad en la era digital',
    photoUrl: '/speakers/paloma-conde.webp',
    tags: ['Salud mental', 'Redes sociales', 'Vínculos', 'Ansiedad digital'],
    accent: '#C94C6E',
    sectionBg: '#2D1B4E',
  },
  {
    name: 'Lucas Saclier',
    topic: 'IA, Empleo y Profesiones del Futuro',
    photoUrl: '/speakers/lucas-saclier.webp',
    tags: ['Inteligencia artificial', 'Empleo', 'Futuro del trabajo', 'Tecnología'],
    accent: '#E8A020',
    sectionBg: '#1A4A5C',
  },
  {
    name: 'Micaela Brahim',
    topic: 'Pequeñas Acciones, Grandes Cambios: El Impacto Ambiental y la Sustentabilidad',
    photoUrl: '/speakers/micaela-brahim.webp',
    tags: ['Ambiente', 'Sustentabilidad', 'Impacto local', 'Acción colectiva'],
    accent: '#D4A040',
    sectionBg: '#2D4A2E',
  },
  {
    name: 'Marco Pontoriero',
    topic: 'Diseño web',
    photoUrl: '/speakers/marco-pontoriero.webp',
    tags: ['UX/UI', 'Diseño web', 'Prototipado', 'Identidad visual'],
    accent: '#C94C2E',
    sectionBg: '#4A2C1C',
  },
]

const DESKTOP_QUERY = '(min-width: 901px) and (prefers-reduced-motion: no-preference)'
/* Duración de cada pausa (card quieta mientras seguís scrolleando) */
const HOLD = 0.9
/* Duración del pase de una card a la siguiente (más alto = transición más lenta) */
const MOVE = 5
/* Scroll (en altos de viewport) por cada unidad de timeline */
const VH_PER_UNIT = 0.2

/**
 * Carrusel horizontal pineado (ref: agencefoudre.com — "Nous les rendons sociaux").
 * Texto a la izquierda, espacio libre en el medio y cards a la derecha:
 * cards verticales altas, se ve una card y parte de la siguiente.
 * Todo el carril se desplaza con el scroll; las cards que salen se recortan en el
 * borde izquierdo del carril. La card activa despliega sus etiquetas.
 */
const Talks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  /* Desktop: pin + scrub */
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const mm = gsap.matchMedia()

    mm.add(DESKTOP_QUERY, () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>('.talk-slide'))
      const N = cards.length
      let step = 0
      let current = -1

      const measure = () => {
        step = N > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 0
      }
      measure()

      const setActiveIndex = (i: number) => {
        if (i === current) return
        current = i
        setActive(i)
        gsap.to(section, {
          backgroundColor: SPEAKERS[i].sectionBg,
          duration: 0.8,
          ease: 'power2.inOut',
          overwrite: 'auto',
        })
      }

      const render = (p: number) => {
        /* Todo el carril se desplaza junto: las cards nunca se superponen */
        const shift = p * step * (N - 1)
        cards.forEach((card, i) => {
          /* Cuánto salió la card por la izquierda del carril (0 → 1) */
          const out = step ? gsap.utils.clamp(0, 1, (shift - i * step) / step) : 0
          gsap.set(card, {
            x: -shift,
            scale: 1 - out * 0.08,
            opacity: 1 - gsap.utils.clamp(0, 1, out * 2.2),
            transformOrigin: 'right center',
          })
        })
        setActiveIndex(Math.min(N - 1, Math.round(p * (N - 1))))
      }

      const state = { p: 0 }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: 'top top',
          /* Pausas + desplazamientos: HOLD + (N - 1) * (MOVE + HOLD) unidades */
          end: () => `+=${window.innerHeight * VH_PER_UNIT * (HOLD + (N - 1) * (MOVE + HOLD))}`,
          scrub: 2.2,
          invalidateOnRefresh: true,
          onRefresh: measure,
        },
      })
      /* Pausa (card quieta) → desplazamiento → pausa ... : en cada card el scroll
         sigue pero el carril no avanza, así se puede leer */
      tl.to({}, { duration: HOLD })
      for (let i = 1; i < N; i++) {
        tl.to(state, {
          p: i / (N - 1),
          ease: 'sine.inOut',
          duration: MOVE,
          onUpdate: () => render(state.p),
        })
        tl.to({}, { duration: HOLD })
      }

      render(0)

      return () => {
        cards.forEach((card) => {
          gsap.set(card, { clearProps: 'transform,opacity' })
        })
        section.style.backgroundColor = SPEAKERS[0].sectionBg
      }
    })

    return () => mm.revert()
  }, [])

  /* Mobile / reduced motion: scroll horizontal nativo con snap */
  useEffect(() => {
    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    const onScroll = () => {
      if (window.matchMedia(DESKTOP_QUERY).matches) return
      const cards = track.querySelectorAll<HTMLElement>('.talk-slide')
      if (cards.length < 2) return
      const step = cards[1].offsetLeft - cards[0].offsetLeft
      const i = Math.max(0, Math.min(cards.length - 1, Math.round(track.scrollLeft / step)))
      setActive(i)
      section.style.backgroundColor = SPEAKERS[i].sectionBg
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="charlas"
      className="talks-carousel-section"
      style={{ backgroundColor: SPEAKERS[0].sectionBg }}
    >
      <div className="talks-carousel-grain" aria-hidden="true" />

      <div className="talks-carousel-intro">
        <p className="talks-carousel-eyebrow">
          <span>✦</span> Inspiración <span>✦</span>
        </p>
        <h2 className="talks-carousel-title">Charlas</h2>

        <p className="talks-carousel-desc">
          Conocé a las personas que van a exponer las problemáticas con las que los equipos
          trabajarán.
        </p>
      </div>

      <div ref={trackRef} className="talks-carousel-track">
        {SPEAKERS.map((s, i) => (
          <article
            key={s.name}
            className={`talk-slide${i === active ? ' -active' : ''}`}
            style={{ zIndex: i + 1, '--card-accent': s.accent } as React.CSSProperties}
          >
            <img className="talk-slide-img" src={s.photoUrl} alt="" loading="lazy" />
            <div className="talk-slide-tint" aria-hidden="true" />

            <div className="talk-slide-content">
              <h3 className="talk-slide-name">{s.name}</h3>
              <p className="talk-slide-topic">{s.topic}</p>

              <ul className="talk-slide-tags" aria-label="Temas de la charla">
                {s.tags.map((tag, t) => (
                  <li
                    key={tag}
                    className="talk-slide-tag"
                    style={{ '--delay': `${120 + t * 90}ms` } as React.CSSProperties}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

          </article>
        ))}
      </div>
    </section>
  )
}

export default Talks
