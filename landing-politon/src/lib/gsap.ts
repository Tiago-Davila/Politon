/**
 * GSAP configuration — Politón 2026
 * Registra ScrollTrigger y configura defaults globales.
 * Usar la versión gratuita (core + ScrollTrigger).
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Registrar plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Configuración global
gsap.config({
  nullTargetWarn: false,
})

// Defaults para animaciones de entrada
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
})

// ScrollTrigger defaults
ScrollTrigger.config({
  ignoreMobileResize: true,
})

export { gsap, ScrollTrigger }
