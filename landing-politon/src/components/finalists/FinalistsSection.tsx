/**
 * FinalistsSection.tsx — Fase 02 en la home
 *
 * Índice de los equipos finalistas. Cada equipo tiene su página en
 * /equipo/<slug>: se abre a pantalla completa encima de la home, se puede
 * compartir el link directo y el botón atrás del navegador la cierra.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { getLenis } from '../../hooks/useLenis'
import { scrollToSection } from '../../lib/scrollToSection'
import { finalists } from '../../data/finalists'
import FinalistsIndex, { type Origin } from './FinalistsIndex'
import CaseStudy from './CaseStudy'
import './finalists.css'

const SITE_TITLE = 'POLITÓN 2026 — Hackatón IPM Buenos Aires'

const teamPath = (slug: string) => `/equipo/${slug}`

function slugFromLocation(): string | null {
  const match = window.location.pathname.match(/^\/equipo\/([^/]+)\/?$/)
  const requested = match ? decodeURIComponent(match[1]) : null
  return finalists.some((team) => team.slug === requested) ? requested : null
}

type OpenState = { slug: string; origin: Origin | null }

interface FinalistsSectionProps {
  /* Título de la pestaña cuando no hay ningún equipo abierto */
  pageTitle?: string
}

const FinalistsSection: React.FC<FinalistsSectionProps> = ({ pageTitle = SITE_TITLE }) => {
  const [open, setOpen] = useState<OpenState | null>(() => {
    const slug = slugFromLocation()
    return slug ? { slug, origin: null } : null
  })
  const [closing, setClosing] = useState(false)
  const openRef = useRef(open)
  /* true si la entrada del historial del equipo la agregamos nosotros */
  const pushedRef = useRef(false)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => { openRef.current = open }, [open])

  const teamIndex = open ? finalists.findIndex((team) => team.slug === open.slug) : -1
  const team = teamIndex >= 0 ? finalists[teamIndex] : null
  const nextTeam = finalists[(teamIndex + 1) % finalists.length]
  const isOpen = team !== null

  useEffect(() => {
    document.title = team ? `${team.name} — Finalistas | POLITÓN 2026` : pageTitle
  }, [team, pageTitle])

  /* Links directos a /#equipos */
  useEffect(() => {
    if (window.location.hash !== '#equipos') return
    const timer = window.setTimeout(() => scrollToSection('#equipos'), 600)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onPopState = () => {
      pushedRef.current = false
      const slug = slugFromLocation()
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

  /* Con un equipo abierto, la home queda quieta e inerte debajo */
  useEffect(() => {
    if (!isOpen) return
    const root = document.getElementById('root')
    const lenis = getLenis()
    lenis?.stop()
    if (root) root.inert = true
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      if (root) root.inert = false
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      lenis?.start()
      returnFocusRef.current?.focus({ preventScroll: true })
      returnFocusRef.current = null
    }
  }, [isOpen])

  const openTeam = useCallback((slug: string, origin: Origin | null, trigger: HTMLElement) => {
    returnFocusRef.current = trigger
    window.history.pushState(null, '', teamPath(slug))
    pushedRef.current = true
    setClosing(false)
    setOpen({ slug, origin })
  }, [])

  const requestClose = useCallback(() => {
    if (pushedRef.current) {
      window.history.back()
      return
    }
    window.history.replaceState(null, '', '/')
    setClosing(true)
  }, [])

  const handleExited = useCallback(() => {
    setOpen(null)
    setClosing(false)
  }, [])

  const showNext = useCallback(() => {
    window.history.replaceState(null, '', teamPath(nextTeam.slug))
    setOpen({ slug: nextTeam.slug, origin: null })
  }, [nextTeam.slug])

  return (
    <>
      <FinalistsIndex onOpen={openTeam} />
      {team
        ? createPortal(
          <CaseStudy
            team={team}
            index={teamIndex}
            next={nextTeam}
            origin={open?.origin ?? null}
            closing={closing}
            onClose={requestClose}
            onExited={handleExited}
            onNext={showNext}
          />,
          document.body,
        )
        : null}
    </>
  )
}

export default FinalistsSection
