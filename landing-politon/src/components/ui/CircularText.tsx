/**
 * CircularText.tsx — POLITÓN 2026 (ref: React Bits "Circular Text")
 *
 * Texto en anillo que gira sin parar, estilo sello vintage. Al pasar el mouse
 * acelera. Con prefers-reduced-motion queda quieto.
 */
import React, { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import './CircularText.css'

interface CircularTextProps {
  text: string
  className?: string
  /* Segundos por vuelta */
  duration?: number
  children?: React.ReactNode
}

const CircularText: React.FC<CircularTextProps> = ({ text, className = '', duration = 18, children }) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const ring = ringRef.current
    if (!root || !ring) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const spin = gsap.to(ring, { rotation: 360, duration, repeat: -1, ease: 'none' })
    const fast = () => gsap.to(spin, { timeScale: 4, duration: 0.5, ease: 'power2.out' })
    const slow = () => gsap.to(spin, { timeScale: 1, duration: 0.9, ease: 'power2.out' })
    root.addEventListener('pointerenter', fast)
    root.addEventListener('pointerleave', slow)

    return () => {
      root.removeEventListener('pointerenter', fast)
      root.removeEventListener('pointerleave', slow)
      gsap.killTweensOf(spin)
      spin.kill()
    }
  }, [duration])

  const chars = [...text]
  const step = 360 / chars.length

  return (
    <div ref={rootRef} className={`circular-text ${className}`}>
      <div ref={ringRef} className="circular-text-ring" aria-hidden="true">
        {chars.map((char, i) => (
          <span key={i} style={{ transform: `rotate(${step * i}deg)` }}>{char}</span>
        ))}
      </div>
      {children ? <div className="circular-text-center">{children}</div> : null}
    </div>
  )
}

export default CircularText
