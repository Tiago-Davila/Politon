/**
 * Equipos.tsx — POLITÓN 2026
 *
 * Página /equipos: los seis equipos finalistas en una grilla de 3 × 2. Cada uno
 * tiene su Polito para alentarlo: cada toque suma un punto, sin límite.
 * Los puntos se guardan en el navegador de quien los da.
 */
import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { useLenis } from '../hooks/useLenis'
import { finalists, type Finalist } from '../data/finalists'
import polito from '../assets/polito-hero.webp'
import './SegundaFase.css'
import './Equipos.css'

type Points = Record<string, number>

const STORAGE_KEY = 'politon:puntos-equipos'

const loadPoints = (): Points => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
    return saved && typeof saved === 'object' ? saved : {}
  } catch {
    return {}
  }
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

interface TeamCardProps {
  team: Finalist
  index: number
  points: number
  onPoint: (slug: string) => void
}

const TeamCard: React.FC<TeamCardProps> = ({ team, index, points, onPoint }) => {
  const politoRef = useRef<HTMLImageElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  /* Los "+1" se agregan a mano: React no renderiza hijos en este contenedor */
  const popsRef = useRef<HTMLSpanElement>(null)

  const handleClick = () => {
    onPoint(team.slug)
    if (prefersReducedMotion()) return

    /* Polito se aplasta y rebota */
    gsap.fromTo(
      politoRef.current,
      { scaleX: 1.14, scaleY: 0.84, rotate: index % 2 ? 7 : -7 },
      { scaleX: 1, scaleY: 1, rotate: 0, duration: 0.6, ease: 'elastic.out(1, 0.35)', overwrite: true }
    )
    gsap.fromTo(
      countRef.current,
      { scale: 1.3, y: -4 },
      { scale: 1, y: 0, duration: 0.4, ease: 'back.out(3)', overwrite: true }
    )

    const pop = document.createElement('span')
    pop.className = 'eq-pop'
    pop.textContent = '+1'
    pop.style.setProperty('--drift', `${Math.round(Math.random() * 60 - 30)}px`)
    pop.addEventListener('animationend', () => pop.remove())
    popsRef.current?.appendChild(pop)
  }

  return (
    <article className={`eq-card eq-tone-${index % 6}`}>
      <div className="eq-cover">
        <img
          src={team.cover.src}
          alt={`Equipo ${team.name}`}
          decoding="async"
          style={team.cover.portrait ? { objectPosition: 'center 20%' } : undefined}
        />
        <span className="eq-number">{team.number}</span>
      </div>

      <div className="eq-body">
        <div className="eq-info">
          <h2 className="eq-name">{team.name}</h2>
          <p className="eq-points">
            <span ref={countRef} className="eq-count" aria-live="polite">
              {points.toLocaleString('es-AR')}
            </span>{' '}
            {points === 1 ? 'punto' : 'puntos'}
          </p>
        </div>

        <button
          type="button"
          className="eq-polito"
          onClick={handleClick}
          aria-label={`Darle un punto a ${team.name}`}
        >
          <img ref={politoRef} src={polito} alt="" draggable={false} width={900} height={900} />
          <span ref={popsRef} className="eq-pops" aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

const Equipos: React.FC = () => {
  useLenis()
  const [points, setPoints] = useState<Points>(loadPoints)

  useEffect(() => {
    document.title = 'Alentá a los equipos | POLITÓN 2026'
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(points))
    } catch {
      /* Sin storage (modo privado): los puntos viven solo en la pestaña */
    }
  }, [points])

  const addPoint = (slug: string) =>
    setPoints((prev) => ({ ...prev, [slug]: (prev[slug] ?? 0) + 1 }))

  return (
    <>
      <a className="segunda-fase-back" href="/">
        <ArrowLeft size={20} strokeWidth={2.5} aria-hidden="true" /> Volver al inicio
      </a>
      <main className="eq-page">
        <div className="hero-grain" aria-hidden="true" />

        <header className="eq-header">
          <p className="eq-eyebrow">
            <span>✦</span> Fase 02 · Finalistas <span>✦</span>
          </p>
          <h1 className="eq-title">¡Alentá a los equipos!</h1>
          <p className="eq-lead">
            Apretá a Polito todas las veces que quieras: cada toque suma un punto.
          </p>
        </header>

        <div className="eq-grid">
          {finalists.map((team, i) => (
            <TeamCard key={team.slug} team={team} index={i} points={points[team.slug] ?? 0} onPoint={addPoint} />
          ))}
        </div>
      </main>
    </>
  )
}

export default Equipos
