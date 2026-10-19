/**
 * RegistrationAccordion.tsx — Fase 01 (ref: singlefin.nc, sección "Bien plus qu'un simple restaurant")
 *
 * Sección pineada: fotos tipo polaroid suben a distintas velocidades a los costados
 * mientras en el medio cambian los textos (Premios → Equipos → Soluciones).
 * Las fotos que llegan arriba se desenfocan y se desvanecen.
 */
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'

/* Fotos del evento (webp 640px). El nombre de archivo es la clave en PHOTOS */
const FASE_01 = import.meta.glob<string>('../../assets/fase-01/*.webp', {
  eager: true,
  import: 'default',
})
const photo = (name: string) => FASE_01[`../../assets/fase-01/${name}.webp`]

const REGISTRATION_ITEMS = [
  {
    title: 'Premios',
    kicker: 'Grandes premios',
    text: 'Los equipos que llevaron sus ideas más lejos tuvieron reconocimiento y premios.',
  },
  {
    title: 'Equipos',
    kicker: 'Equipos libres',
    text: 'Participaron estudiantes de 4to, 5to y 6to. Se mezclaron entre años, Computación y Mecánica, como quisieron.',
  },
  {
    title: 'Soluciones',
    kicker: 'Múltiples actividades',
    text: 'En equipo siguieron las actividades propuestas para idear, iterar, validar y llevar a cabo una solución concreta al problema planteado.',
  },
]

/**
 * Cada foto: x = borde izquierdo (% del ancho), w = ancho (vw en desktop),
 * r = rotación, delay = en qué punto del scroll (0 → 1) empieza a subir.
 * Delays negativos: ya están a mitad de pantalla al entrar a la sección.
 * Se reparten por todo el ancho y pueden pasar por detrás del texto del medio.
 * Las verticales (portrait) van más angostas y se recortan a 3:4.
 */
const PHOTOS = [
  { name: 'img-5505', x: 3, w: 22, r: -6, delay: -0.3 },
  { name: 'img-5408', x: 58, w: 15, r: 5, delay: -0.23, portrait: true },
  { name: 'imagen-1', x: 30, w: 21, r: 4, delay: -0.15 },
  { name: 'img-5451', x: 76, w: 22, r: -5, delay: -0.08 },
  { name: 'img-5440', x: 14, w: 15, r: 6, delay: 0, portrait: true },
  { name: 'img-5493', x: 45, w: 22, r: 3, delay: 0.07 },
  { name: 'img-5572', x: 70, w: 21, r: -4, delay: 0.14 },
  { name: 'img-5656', x: 36, w: 15, r: -6, delay: 0.21, portrait: true },
  { name: 'img-5749', x: 2, w: 22, r: 5, delay: 0.28 },
  { name: 'img-6108', x: 62, w: 21, r: -3, delay: 0.35 },
  { name: 'img-5753', x: 24, w: 21, r: -6, delay: 0.42 },
  { name: 'img-5961', x: 84, w: 15, r: 4, delay: 0.49, portrait: true },
  { name: 'img-5758', x: 48, w: 22, r: 3, delay: 0.56 },
  { name: 'img-6292', x: 8, w: 21, r: -5, delay: 0.63 },
  { name: 'img-5804', x: 72, w: 21, r: 6, delay: 0.7 },
].map((p) => ({ ...p, src: photo(p.name) }))

/* Cuánto del progreso tarda una foto en cruzar la pantalla (más bajo = más rápida) */
const SPAN = 0.4
/* Scroll total de la sección pineada, en altos de viewport */
const SCROLL_VH = 3.2

const RegistrationAccordion: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const photos = Array.from(section.querySelectorAll<HTMLElement>('.recap-photo'))
      const slides = Array.from(section.querySelectorAll<HTMLElement>('.recap-slide'))
      let current = 0

      const showSlide = (i: number) => {
        if (i === current) return
        const dir = i > current ? 1 : -1
        gsap.to(slides[current], { y: -40 * dir, opacity: 0, duration: 0.45, ease: 'power2.in', overwrite: true })
        gsap.fromTo(
          slides[i],
          { y: 50 * dir, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.15, overwrite: true }
        )
        current = i
        setActive(i)
      }

      const render = (p: number) => {
        const vh = window.innerHeight
        photos.forEach((photo, i) => {
          /* t: 0 = abajo fuera de pantalla → 1 = arriba fuera de pantalla */
          const t = (p - PHOTOS[i].delay) / SPAN
          const h = photo.offsetHeight
          const y = gsap.utils.interpolate(vh * 1.05, -h * 1.1, gsap.utils.clamp(0, 1, t))
          /* En el último tramo (zona alta) se desenfoca y desvanece */
          const fade = gsap.utils.clamp(0, 1, (t - 0.72) / 0.28)
          gsap.set(photo, {
            y,
            filter: fade > 0 ? `blur(${fade * 7}px)` : 'none',
            opacity: 1 - fade * 0.6,
          })
        })
        showSlide(Math.min(slides.length - 1, Math.floor(p * slides.length)))
      }

      gsap.set(slides, { opacity: 0 })
      gsap.set(slides[0], { opacity: 1, y: 0 })

      const state = { p: 0 }
      gsap.to(state, {
        p: 1,
        ease: 'none',
        onUpdate: () => render(state.p),
        scrollTrigger: {
          trigger: section,
          pin: true,
          anticipatePin: 1,
          start: 'top top',
          end: () => `+=${window.innerHeight * SCROLL_VH}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      render(0)

      return () => {
        /* Solo lo que anima GSAP: 'all' borraría también las CSS vars inline (--x, --w, --r) */
        gsap.set([...photos, ...slides], { clearProps: 'transform,filter,opacity' })
        setActive(0)
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} id="inscripcion-info" className="recap-section">
      <div className="recap-grain" aria-hidden="true" />

      <div className="recap-photos" aria-hidden="true">
        {PHOTOS.map((p) => (
          <figure
            key={p.name}
            className={`recap-photo${p.portrait ? ' -portrait' : ''}`}
            style={{ '--x': `${p.x}%`, '--w': `${p.w}vw`, '--r': `${p.r}deg` } as React.CSSProperties}
          >
            <img src={p.src} alt="" loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>

      <div className="recap-center">
        <div className="recap-slides">
          {REGISTRATION_ITEMS.map((item, i) => (
            <article key={item.title} className="recap-slide" aria-hidden={i !== active}>
              <div className="recap-kicker-row">
                <p className="recap-kicker">{item.kicker}</p>
                <div className="recap-stamp" aria-hidden="true">
                  <span>Fase</span>
                  <strong>01</strong>
                  <span>2026</span>
                </div>
              </div>
              <h2 className="recap-title">{item.title}</h2>
              <p className="recap-text">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RegistrationAccordion
