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
    const isTouchOrMobile = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 768px)').matches
    if (prefersReducedMotion || isTouchOrMobile) {
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      /* Zonas con su propio Lenis (p. ej. la página de cada equipo) */
      prevent: (node: HTMLElement) => node.hasAttribute('data-lenis-scope'),
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

    // Interceptar clicks en links internos para scroll smooth
    const handleClickLink = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!target) return

      const href = target.getAttribute('href')
      if (!href || href === '#') return

      const element = document.querySelector(href) as HTMLElement
      if (!element) return

      e.preventDefault()
      lenis.scrollTo(element, { offset: 0, duration: 1.2 })
    }

    document.addEventListener('click', handleClickLink)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('click', handleClickLink)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
