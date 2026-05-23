/**
 * useGSAP.ts — Custom hook para animaciones GSAP con cleanup automático
 * Patrón: gsap.context() para scope + cleanup en unmount.
 */
import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

type GSAPCallback = (context: gsap.Context) => gsap.Context | void

/**
 * Hook para ejecutar animaciones GSAP con cleanup automático.
 * @param callback - Función que recibe el contexto GSAP y configura animaciones
 * @param deps - Dependencias del efecto
 * @param scope - Elemento de referencia para el scope del contexto
 */
export function useGSAP(
  callback: GSAPCallback,
  deps: React.DependencyList = [],
  scope?: React.RefObject<Element | null>
): void {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context((self) => {
      callback(self)
    }, scope?.current ?? document.documentElement)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/**
 * Hook para obtener una ref tipada para animaciones GSAP
 */
export function useGSAPRef<T extends Element>() {
  return useRef<T>(null)
}
