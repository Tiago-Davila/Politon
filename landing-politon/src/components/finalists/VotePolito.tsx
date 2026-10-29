/**
 * VotePolito.tsx — Polito para votar a un equipo desde su página.
 *
 * Cada toque manda un voto a /api/votos; los totales no se muestran ni llegan
 * al navegador. Si alguien aprieta 10 veces seguidas, deja de sumar hasta que
 * suelte 5 segundos (el servidor aplica el mismo límite).
 */
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import polito from '../../assets/polito-hero.webp'

const STREAK_LIMIT = 10
const STREAK_PAUSE_MS = 5000
const VOTER_KEY = 'politon:votante'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Id anónimo del navegador: el servidor lo usa para contar las rachas */
let sessionVoter = ''
const getVoterId = () => {
  try {
    const saved = window.localStorage.getItem(VOTER_KEY)
    if (saved) return saved
    const id = crypto.randomUUID()
    window.localStorage.setItem(VOTER_KEY, id)
    return id
  } catch {
    sessionVoter ||= crypto.randomUUID()
    return sessionVoter
  }
}

const sendVote = (slug: string) => {
  fetch('/api/votos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug, votante: getVoterId() }),
    keepalive: true,
  }).catch(() => {
    /* Sin conexión: el voto se pierde, la página sigue igual */
  })
}

interface VotePolitoProps {
  slug: string
  name: string
}

const VotePolito: React.FC<VotePolitoProps> = ({ slug, name }) => {
  const politoRef = useRef<HTMLImageElement>(null)
  /* Los "+1" se agregan a mano: React no renderiza hijos en este contenedor */
  const popsRef = useRef<HTMLSpanElement>(null)
  const streakRef = useRef(0)
  const pauseTimerRef = useRef(0)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => () => window.clearTimeout(pauseTimerRef.current), [])

  const handleClick = () => {
    /* Cada toque reinicia la espera: la racha se corta solo si deja de apretar */
    window.clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = window.setTimeout(() => {
      streakRef.current = 0
      setBlocked(false)
    }, STREAK_PAUSE_MS)

    if (streakRef.current >= STREAK_LIMIT) {
      if (!prefersReducedMotion()) {
        gsap.fromTo(politoRef.current, { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1.2, 0.2)', overwrite: true })
      }
      return
    }

    streakRef.current += 1
    if (streakRef.current >= STREAK_LIMIT) setBlocked(true)
    sendVote(slug)
    if (prefersReducedMotion()) return

    /* Polito se aplasta y rebota */
    gsap.fromTo(
      politoRef.current,
      { scaleX: 1.14, scaleY: 0.84, rotate: -7 },
      { scaleX: 1, scaleY: 1, rotate: 0, duration: 0.6, ease: 'elastic.out(1, 0.35)', overwrite: true }
    )

    const pop = document.createElement('span')
    pop.className = 'fin-vote-pop'
    pop.textContent = '+1'
    pop.style.setProperty('--drift', `${Math.round(Math.random() * 60 - 30)}px`)
    pop.addEventListener('animationend', () => pop.remove())
    popsRef.current?.appendChild(pop)
  }

  return (
    <button
      type="button"
      className={`fin-cs-intro fin-vote${blocked ? ' is-blocked' : ''}`}
      onClick={handleClick}
      aria-label={`Votar a ${name}`}
      aria-disabled={blocked}
    >
      <span className="fin-vote-art">
        <img ref={politoRef} src={polito} alt="" draggable={false} width={900} height={900} />
        <span ref={popsRef} className="fin-vote-pops" aria-hidden="true" />
      </span>
      <span className="fin-vote-hint" aria-live="polite">
        {blocked ? '¡Pará un toque!' : '¡Apretá para votar!'}
      </span>
    </button>
  )
}

export default VotePolito
