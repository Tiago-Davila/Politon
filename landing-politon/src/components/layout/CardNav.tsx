/**
 * CardNav.tsx — POLITÓN 2026
 * Basado en el componente CardNav de React Bits.
 * Adaptado a TypeScript + estética vintage Cuphead.
 */
import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import './CardNav.css'

/* ——— Tipos ——— */
export interface CardNavLink {
  label: string
  ariaLabel?: string
  href?: string
}

export interface CardNavItem {
  label: string
  bgColor: string
  textColor: string
  links: CardNavLink[]
}

interface CardNavProps {
  logo?: string
  logoAlt?: string
  items: CardNavItem[]
  className?: string
  ease?: string
  baseColor?: string
  menuColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
  buttonLabel?: string
  buttonHref?: string
}

/* ——— Icono flecha diagonal (reemplaza GoArrowUpRight de react-icons) ——— */
const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
)

/* ——— Componente principal ——— */
const CardNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#FDFAF2',
  menuColor,
  buttonBgColor = '#C94C2E',
  buttonTextColor = '#FDFAF2',
  buttonLabel = '¡Inscribite!',
  buttonHref = '#registro',
}: CardNavProps) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const calculateHeight = (): number => {
    const navEl = navRef.current
    if (!navEl) return 260

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) {
      const contentEl = navEl.querySelector<HTMLElement>('.card-nav-content')
      if (contentEl) {
        const prev = {
          visibility: contentEl.style.visibility,
          pointerEvents: contentEl.style.pointerEvents,
          position: contentEl.style.position,
          height: contentEl.style.height,
        }

        contentEl.style.visibility = 'visible'
        contentEl.style.pointerEvents = 'auto'
        contentEl.style.position = 'static'
        contentEl.style.height = 'auto'
        contentEl.offsetHeight // force reflow

        const contentHeight = contentEl.scrollHeight
        Object.assign(contentEl.style, prev)

        return 90 + contentHeight + 16
      }
    }

    return 260
  }

  const createTimeline = (): gsap.core.Timeline | null => {
    const navEl = navRef.current
    if (!navEl) return null

    gsap.set(navEl, { height: 76, overflow: 'hidden' })
    gsap.set(cardsRef.current, { y: 50, opacity: 0 })

    const tl = gsap.timeline({ paused: true })

    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease })
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      '-=0.1'
    )

    return tl
  }

  useLayoutEffect(() => {
    const tl = createTimeline()
    tlRef.current = tl

    return () => {
      tl?.kill()
      tlRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items])

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return

      if (isExpanded) {
        const newHeight = calculateHeight()
        gsap.set(navRef.current, { height: newHeight })
        tlRef.current.kill()
        const newTl = createTimeline()
        if (newTl) {
          newTl.progress(1)
          tlRef.current = newTl
        }
      } else {
        tlRef.current.kill()
        const newTl = createTimeline()
        if (newTl) tlRef.current = newTl
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded])

  const toggleMenu = () => {
    const tl = tlRef.current
    if (!tl) return

    if (!isExpanded) {
      setIsHamburgerOpen(true)
      setIsExpanded(true)
      tl.play(0)
    } else {
      setIsHamburgerOpen(false)
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false))
      tl.reverse()
    }
  }

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el
  }

  return (
    <div className={`card-nav-container ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''}`}
        style={{ backgroundColor: baseColor }}
      >
        {/* ——— Barra superior ——— */}
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Cerrar menú' : 'Abrir menú'}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
            style={{ color: menuColor || 'var(--polyton-ink)' }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div className="logo-container">
            {logo && (
              <img src={logo} alt={logoAlt} className="card-nav-logo" />
            )}
          </div>

          <a
            href={buttonHref}
            className="card-nav-cta-button btn-cuphead"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            {buttonLabel}
          </a>
        </div>

        {/* ——— Cards expandibles ——— */}
        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link"
                    href={lnk.href ?? '#'}
                    aria-label={lnk.ariaLabel}
                  >
                    <ArrowUpRight className="nav-card-link-icon" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default CardNav
