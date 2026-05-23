/**
 * useLenis.ts — Smooth scroll con Lenis
 * Integrado con GSAP ScrollTrigger.
 * Respeta prefers-reduced-motion.
 */
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from '../lib/gsap'

let lenisInstance: Lenis | null = null

export function getLenis(): Lenis | null {
  return lenisInstance
}

export function useLenis(): void {
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Respetar prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisInstance = lenis

    // Integrar con GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // RAF loop
    function raf(time: number): void {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    // Sincronizar ScrollTrigger con Lenis
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    ScrollTrigger.addEventListener('refresh', () => lenis.scroll)
    ScrollTrigger.refresh()

    return () => {
      cancelAnimationFrame(rafRef.current)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
