/**
 * FinalistsPage.tsx — /segunda-fase
 *
 * Índice de los equipos finalistas con su proyecto a pantalla completa.
 * El equipo abierto se refleja en la URL (?equipo=slug), así se puede
 * compartir el link directo y el botón atrás del navegador lo cierra.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLenis, getLenis } from '../../hooks/useLenis'
import { finalists } from '../../data/finalists'
import logo from '../../assets/logo-completo-nav.webp'
import FinalistsHero from './FinalistsHero'
import FinalistsIndex, { type Origin } from './FinalistsIndex'
import CaseStudy from './CaseStudy'
import './finalists.css'

const PAGE_TITLE = 'Finalistas | POLITÓN 2026'
const SITE_TITLE = 'POLITÓN 2026 — Hackatón IPM Buenos Aires'

function slugFromUrl(): string | null {
  const requested = new URLSearchParams(window.location.search).get('equipo')
  return finalists.some((team) => team.slug === requested) ? requested : null
}

function urlFor(slug: string | null): URL {
  const url = new URL(window.location.href)
  if (slug) url.searchParams.set('equipo', slug)
  else url.searchParams.delete('equipo')
  return url
}

type OpenState = { slug: string; origin: Origin | null }

const FinalistsPage: React.FC = () => {
  useLenis()

  const [open, setOpen] = useState<OpenState | null>(() => {
    const slug = slugFromUrl()
    return slug ? { slug, origin: null } : null
  })
  const [closing, setClosing] = useState(false)
  const openRef = useRef(open)
  /* true si la entrada del historial del proyecto la agregamos nosotros */
  const pushedRef = useRef(false)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => { openRef.current = open }, [open])

  const teamIndex = open ? finalists.findIndex((team) => team.slug === open.slug) : -1
  const team = teamIndex >= 0 ? finalists[teamIndex] : null
  const nextTeam = finalists[(teamIndex + 1) % finalists.length]
  const isOpen = team !== null

  useEffect(() => {
    document.title = team ? `${team.name} — ${PAGE_TITLE}` : PAGE_TITLE
  }, [team])
  useEffect(() => () => { document.title = SITE_TITLE }, [])

  useEffect(() => {
    const onPopState = () => {
      pushedRef.current = false
      const slug = slugFromUrl()
      if (slug) {
        setClosing(false)
        setOpen({ slug, origin: null })
      } else if (openRef.current) {
        setClosing(true)
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  /* Con un proyecto abierto, la página de atrás no scrollea */
  useEffect(() => {
    if (!isOpen) return
    const lenis = getLenis()
    const html = document.documentElement
    lenis?.stop()
    html.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      lenis?.start()
      html.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const openTeam = useCallback((slug: string, origin: Origin | null, trigger: HTMLElement) => {
    returnFocusRef.current = trigger
    window.history.pushState(null, '', urlFor(slug))
    pushedRef.current = true
    setClosing(false)
    setOpen({ slug, origin })
  }, [])

  const requestClose = useCallback(() => {
    if (pushedRef.current) {
      window.history.back()
      return
    }
    window.history.replaceState(null, '', urlFor(null))
    setClosing(true)
  }, [])

  const handleExited = useCallback(() => {
    setOpen(null)
    setClosing(false)
    returnFocusRef.current?.focus({ preventScroll: true })
  }, [])

  const showNext = useCallback(() => {
    window.history.replaceState(null, '', urlFor(nextTeam.slug))
    setOpen({ slug: nextTeam.slug, origin: null })
  }, [nextTeam.slug])

  return (
    <>
      <div className="fin-page" inert={isOpen}>
        <header className="fin-header">
          <a className="fin-logo" href="/" aria-label="Volver al sitio principal de Politón">
            <img src={logo} alt="POLITÓN" />
          </a>
          <span className="fin-header-tag">FASE 02 <span aria-hidden="true">✦</span> LA FINAL</span>
          <a className="fin-back" href="/"><ArrowLeft size={17} strokeWidth={2.5} /> Volver al inicio</a>
        </header>

        <main>
          <FinalistsHero />
          <FinalistsIndex onOpen={openTeam} />
        </main>

        <footer className="fin-footer">
          <div className="fin-footer-inner">
            <span>POLITÓN 2026 <span aria-hidden="true">✦</span> FASE 02</span>
            <p>Instituto Politécnico Modelo · #POLITÓN2026</p>
            <a href="/">Volver al sitio principal <ArrowRight size={16} strokeWidth={2.5} /></a>
          </div>
        </footer>
      </div>

      {team ? (
        <CaseStudy
          team={team}
          index={teamIndex}
          next={nextTeam}
          origin={open?.origin ?? null}
          closing={closing}
          onClose={requestClose}
          onExited={handleExited}
          onNext={showNext}
        />
      ) : null}
    </>
  )
}

export default FinalistsPage
