/**
 * ScrollVelocity.tsx — POLITÓN 2026 (ref: React Bits "Scroll Velocity")
 *
 * Marquee infinito que acelera con la velocidad del scroll y cambia de
 * sentido según hacia dónde se scrollea. Se mueve con el ticker de GSAP,
 * fuera del ciclo de render de React.
 */
import React, { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import './ScrollVelocity.css'

interface ScrollVelocityProps {
  children: React.ReactNode
  className?: string
  /* Píxeles por segundo sin scroll */
  baseVelocity?: number
  /* Copias del contenido dentro de cada mitad del track */
  copies?: number
}

const ScrollVelocity: React.FC<ScrollVelocityProps> = ({ children, className = '', baseVelocity = 70, copies = 4 }) => {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const setX = gsap.quickSetter(track, 'x', 'px')
    let half = track.scrollWidth / 2
    let x = 0
    let direction = 1
    let boost = 0

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        direction = self.direction
        boost = gsap.utils.clamp(0, 6, Math.abs(self.getVelocity()) / 400)
      },
    })

    const tick = (_time: number, deltaTime: number) => {
      const speed = baseVelocity * (1 + boost) * direction
      x = gsap.utils.wrap(-half, 0, x - (speed * deltaTime) / 1000)
      setX(x)
      boost *= 0.94
    }
    gsap.ticker.add(tick)

    const ro = new ResizeObserver(() => { half = track.scrollWidth / 2 })
    ro.observe(track)

    return () => {
      gsap.ticker.remove(tick)
      st.kill()
      ro.disconnect()
    }
  }, [baseVelocity])

  /* Dos mitades idénticas: al recorrer una entera, el track vuelve a 0 sin salto */
  const renderHalf = (hidden: boolean) => (
    <div className="scroll-velocity-half" aria-hidden={hidden || undefined}>
      {Array.from({ length: copies }, (_, i) => (
        <span className="scroll-velocity-item" key={i} aria-hidden={i > 0 || undefined}>{children}</span>
      ))}
    </div>
  )

  return (
    <div className={`scroll-velocity ${className}`}>
      <div ref={trackRef} className="scroll-velocity-track">
        {renderHalf(false)}
        {renderHalf(true)}
      </div>
    </div>
  )
}

export default ScrollVelocity
