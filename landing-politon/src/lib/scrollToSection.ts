/**
 * scrollToSection.ts — scroll a una sección de la home
 * Monta las secciones lazy, espera a que ScrollTrigger mida los pines y
 * recién ahí scrollea (con Lenis si está activo).
 */
import { ScrollTrigger } from './gsap'
import { getLenis } from '../hooks/useLenis'

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

/* Las secciones lazy no existen hasta acercarse: se montan todas, se espera a que
   ScrollTrigger cree los pines y recién ahí se mide dónde está la sección. */
const findSection = async (id: string): Promise<HTMLElement | null> => {
  if (document.getElementById(id) && document.querySelectorAll('[style*="min-height: 1px"]').length === 0) {
    return document.getElementById(id)
  }
  window.dispatchEvent(new Event('lazy:mount-all'))
  for (let i = 0; i < 40 && !document.getElementById(id); i++) await wait(50)
  /* Los chunks lazy tardan en llegar: se espera a que cada sección tenga contenido */
  for (let i = 0; i < 60 && document.querySelector('[data-lazy-section]:empty'); i++) await wait(50)
  /* y a que el alto de la página se estabilice con los pines ya creados */
  let last = document.body.scrollHeight
  for (let i = 0, stable = 0; i < 30 && stable < 3; i++) {
    await wait(150)
    ScrollTrigger.refresh()
    const height = document.body.scrollHeight
    stable = height === last ? stable + 1 : 0
    last = height
  }
  return document.getElementById(id)
}

export const scrollToSection = async (href: string) => {
  const el = await findSection(href.slice(1))
  if (!el) return
  /* Si la sección está pineada, el lugar real es el pin-spacer que la envuelve */
  const target = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el
  const y = target.getBoundingClientRect().top + window.scrollY
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(y, { duration: 1.2 })
  else window.scrollTo({ top: y, behavior: 'smooth' })
}
