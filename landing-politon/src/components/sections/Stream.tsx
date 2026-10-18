/**
 * Stream.tsx — POLITÓN 2026 (ref: React Bits "Scroll Expand")
 *
 * Sección pineada: la foto del stream arranca en un recuadro con borde cartoon
 * y, con el scroll, crece hasta ocupar toda la pantalla. El título se va y
 * aparece encima el resumen de la transmisión.
 */
import React, { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import streamImg from '../../assets/stream/stream.webp'

const CONTENT = ['Cámara en vivo', 'Entrevistas', 'Móviles', 'Secciones especiales']

/* Tamaño inicial del recuadro, en % de la pantalla */
const START = {
  desktop: { w: 44, h: 52 },
  mobile: { w: 86, h: 34 },
}
/* Zoom de la foto al arrancar: se "aleja" mientras crece el recuadro */
const MEDIA_ZOOM = 1.3
/* Scroll de la expansión y de la pausa final, en altos de viewport */
const EXPAND_VH = 1.3
const HOLD_VH = 0.6

const smoothstep = (a: number, b: number, x: number) => {
  const t = gsap.utils.clamp(0, 1, (x - a) / (b - a))
  return t * t * (3 - 2 * t)
}

const Stream: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLImageElement>(null)
  const tintRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const frame = frameRef.current
    const border = borderRef.current
    const media = mediaRef.current
    const tint = tintRef.current
    const title = titleRef.current
    const overlay = overlayRef.current
    if (!section || !frame || !border || !media || !tint || !title || !overlay) return

    const mm = gsap.matchMedia()

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 768px)',
      },
      (ctx) => {
        const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean }
        if (!motion) return

        const start = mobile ? START.mobile : START.desktop
        const chips = Array.from(overlay.querySelectorAll<HTMLElement>('.stream-chip'))

        const render = (p: number) => {
          const e = smoothstep(0, 1, p)
          const w = start.w + (100 - start.w) * e
          const h = start.h + (100 - start.h) * e
          const ix = (100 - w) / 2
          const iy = (100 - h) / 2
          const r = 24 * (1 - e)

          frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`
          /* El borde sigue al recuadro y se desvanece cuando llega a pantalla completa */
          gsap.set(border, {
            top: `${iy}%`,
            bottom: `${iy}%`,
            left: `${ix}%`,
            right: `${ix}%`,
            borderRadius: r,
            opacity: 1 - smoothstep(0.85, 1, p),
          })
          gsap.set(media, { scale: MEDIA_ZOOM + (1 - MEDIA_ZOOM) * e })
          gsap.set(tint, { opacity: 0.62 * smoothstep(0.55, 1, p) })

          const out = smoothstep(0.3, 0.75, p)
          gsap.set(title, { opacity: 1 - out, y: -36 * out, scale: 1 + 0.06 * out })

          const inn = smoothstep(0.72, 1, p)
          gsap.set(overlay, { opacity: inn, y: 24 * (1 - inn) })
          chips.forEach((chip, i) => {
            const c = smoothstep(0.78 + i * 0.04, 0.88 + i * 0.04, p)
            gsap.set(chip, { opacity: c, y: 16 * (1 - c), rotate: (i % 2 ? 2 : -2) * c })
          })
        }

        const state = { p: 0 }
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            anticipatePin: 1,
            start: 'top top',
            end: () => `+=${window.innerHeight * (EXPAND_VH + HOLD_VH)}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        tl.to(state, {
          p: 1,
          ease: 'none',
          duration: EXPAND_VH,
          onUpdate: () => render(state.p),
        })
        /* Pausa con la foto a pantalla completa para leer el texto */
        tl.to({}, { duration: HOLD_VH })
        render(0)

        return () => {
          frame.style.clipPath = ''
          gsap.set([border, media, tint, title, overlay, ...chips], {
            clearProps: 'top,bottom,left,right,borderRadius,opacity,transform',
          })
        }
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} id="stream" className="stream-section" aria-labelledby="stream-title">
      <div className="stream-grain" aria-hidden="true" />

      <div ref={frameRef} className="stream-frame">
        <img
          ref={mediaRef}
          className="stream-media"
          src={streamImg}
          alt="Alumnos del IPM conduciendo el stream del Politón desde cuatro cámaras"
          width={1915}
          height={1031}
          loading="lazy"
          decoding="async"
        />
        <div ref={tintRef} className="stream-tint" aria-hidden="true" />
      </div>
      <div ref={borderRef} className="stream-border" aria-hidden="true" />

      <div ref={titleRef} className="stream-title-wrap">
        <p className="stream-eyebrow">
          <span>✦</span> #POLITÓN2026 <span>✦</span>
        </p>
        <h2 id="stream-title" className="stream-title">
          En vivo
        </h2>
      </div>

      <div ref={overlayRef} className="stream-overlay">
        <p className="stream-kicker">Stream oficial</p>
        <h3 className="stream-heading">Vivimos la hackatón completa online</h3>
        <p className="stream-text">
          La producción estuvo a cargo de los propios alumnos del IPM, los 24, 25 y 26 de junio.
        </p>
        <ul className="stream-chips" aria-label="Qué se transmitió">
          {CONTENT.map((item) => (
            <li key={item} className="stream-chip">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Stream
