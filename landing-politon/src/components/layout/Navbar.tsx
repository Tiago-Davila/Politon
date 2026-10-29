/**
 * Navbar.tsx — POLITÓN 2026
 *
 * Botón de menú fijo arriba a la izquierda. Al abrir, un panel se despliega
 * desde la izquierda con los
 * links apilados, que entran en cascada.
 */
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { scrollToSection } from '../../lib/scrollToSection'

const NAV_LINKS = [
  { label: 'Inicio', href: '#hero' },
  { label: '¿Qué es?', href: '#que-es' },
  { label: 'Cómo se desarrolla', href: '#como-se-desarrolla' },
  { label: 'Fase 01', href: '#inscripcion-info' },
  { label: 'Días del evento', href: '#dias-del-evento' },
  { label: 'Finalistas', href: '#equipos' },
  { label: 'Charlas', href: '#charlas' },
  { label: 'Stream', href: '#stream' },
  { label: 'Redes', href: '#registro' },
]

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      gsap.set(panel, { xPercent: -100, visibility: 'hidden' })
      tlRef.current = gsap
        .timeline({ paused: true })
        .set(panel, { visibility: 'visible' })
        .to(panel, { xPercent: 0, duration: reduced ? 0 : 0.7, ease: 'power4.inOut' })
        .fromTo(
          '.side-nav-item',
          { xPercent: -30, opacity: 0, rotate: -3 },
          {
            xPercent: 0,
            opacity: 1,
            rotate: 0,
            duration: reduced ? 0 : 0.5,
            ease: 'back.out(1.6)',
            stagger: reduced ? 0 : 0.05,
          },
          reduced ? 0 : '-=0.3'
        )
        .fromTo(
          '.side-nav-panel-foot',
          { opacity: 0 },
          { opacity: 1, duration: reduced ? 0 : 0.4 },
          '<0.2'
        )
    }, panel)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const tl = tlRef.current
    if (!tl) return
    if (open) tl.timeScale(1).play()
    else tl.timeScale(1.6).reverse()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToSection(href)
  }

  return (
    <>
      <header className={`side-nav${open ? ' is-open' : ''}`}>
        <button
          type="button"
          className="side-nav-toggle"
          aria-expanded={open}
          aria-controls="side-nav-panel"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div
        className={`side-nav-backdrop${open ? ' is-open' : ''}`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      <div ref={panelRef} id="side-nav-panel" className="side-nav-panel" aria-hidden={!open}>
        <p className="side-nav-panel-label">Menú</p>
        <nav aria-label="Secciones">
          <ol className="side-nav-list">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} className="side-nav-item">
                <a href={link.href} onClick={go(link.href)} tabIndex={open ? 0 : -1}>
                  <span className="side-nav-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="side-nav-text">{link.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <p className="side-nav-panel-foot">#POLITÓN2026 · IPM</p>
      </div>
    </>
  )
}

export default Navbar
