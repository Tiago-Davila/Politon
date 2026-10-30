/**
 * EquiposPuntos.tsx — POLITÓN 2026
 *
 * Página oculta /resultados-votos: el tablero con los votos de cada equipo.
 * No está linkeada desde ningún lado. Los totales los da GET /api/votos solo
 * con la clave (VOTOS_ADMIN_TOKEN), así que sin ella no se ve ningún número.
 * La clave queda guardada en este navegador para no pedirla cada vez.
 */
import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { finalists } from '../data/finalists'
import './SegundaFase.css'
import './EquiposPuntos.css'

type Totals = Record<string, number>
type Status = 'idle' | 'loading' | 'ok' | 'wrong-key' | 'error'

const KEY_STORAGE = 'politon:clave-votos'
const REFRESH_MS = 5000

const loadKey = () => {
  try {
    return window.localStorage.getItem(KEY_STORAGE) ?? ''
  } catch {
    return ''
  }
}

const saveKey = (key: string) => {
  try {
    if (key) window.localStorage.setItem(KEY_STORAGE, key)
    else window.localStorage.removeItem(KEY_STORAGE)
  } catch {
    /* Sin storage (modo privado): la clave vive solo en la pestaña */
  }
}

const EquiposPuntos: React.FC = () => {
  const [key, setKey] = useState(loadKey)
  const [draft, setDraft] = useState('')
  const [totals, setTotals] = useState<Totals | null>(null)
  const [status, setStatus] = useState<Status>(key ? 'loading' : 'idle')
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)

  useEffect(() => {
    document.title = 'Puntos de los equipos | POLITÓN 2026'
  }, [])

  /* Se actualiza solo cada 5 s mientras la pestaña está visible */
  useEffect(() => {
    if (!key) return
    let cancelled = false

    const load = async () => {
      try {
        const res = await fetch('/api/votos', {
          headers: { Authorization: `Bearer ${key}` },
          cache: 'no-store',
        })
        if (cancelled) return
        if (res.status === 401) {
          saveKey('')
          setKey('')
          setTotals(null)
          setStatus('wrong-key')
          return
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = (await res.json()) as Totals
        if (cancelled) return
        setTotals(data)
        setUpdatedAt(new Date())
        setStatus('ok')
      } catch {
        /* Si falla una actualización se siguen mostrando los últimos totales */
        if (!cancelled) setStatus('error')
      }
    }

    const first = window.setTimeout(load, 0)
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') load()
    }, REFRESH_MS)
    return () => {
      cancelled = true
      window.clearTimeout(first)
      window.clearInterval(timer)
    }
  }, [key])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const clave = draft.trim()
    if (!clave) return
    saveKey(clave)
    setDraft('')
    setStatus('loading')
    setKey(clave)
  }

  const handleLogout = () => {
    saveKey('')
    setKey('')
    setTotals(null)
    setStatus('idle')
  }

  const ranking = totals
    ? [...finalists]
        .map((team, i) => ({ team, tone: i % 6, votes: totals[team.slug] ?? 0 }))
        .sort((a, b) => b.votes - a.votes)
    : []
  const max = Math.max(1, ...ranking.map((r) => r.votes))
  const total = ranking.reduce((sum, r) => sum + r.votes, 0)

  return (
    <>
      <a className="segunda-fase-back" href="/">
        <ArrowLeft size={20} strokeWidth={2.5} aria-hidden="true" /> Volver al inicio
      </a>
      <main className="pts-page">
        <div className="hero-grain" aria-hidden="true" />

        <header className="pts-header">
          <p className="pts-eyebrow">
            <span>✦</span> Fase 02 · Votación <span>✦</span>
          </p>
          <h1 className="pts-title">Puntos de los equipos</h1>
          {totals && (
            <p className="pts-lead">
              {total.toLocaleString('es-AR')} {total === 1 ? 'voto' : 'votos'} en total
            </p>
          )}
        </header>

        {!key ? (
          <form className="pts-lock" onSubmit={handleSubmit}>
            <label htmlFor="pts-clave">Clave para ver los puntos</label>
            <div className="pts-lock-row">
              <input
                id="pts-clave"
                type="password"
                autoComplete="current-password"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                required
              />
              <button type="submit">Ver puntos</button>
            </div>
            {status === 'wrong-key' && <p className="pts-msg" role="alert">Clave incorrecta. ¡Probá de nuevo!</p>}
          </form>
        ) : !totals ? (
          <p className="pts-msg pts-msg-center" role="status">
            {status === 'error' ? 'No se pudieron cargar los puntos. Reintentando…' : 'Cargando puntos…'}
          </p>
        ) : (
          <>
            <ol className="pts-board">
              {ranking.map(({ team, tone, votes }, place) => (
                <li key={team.slug} className={`pts-row pts-tone-${tone}${place === 0 && votes > 0 ? ' is-first' : ''}`}>
                  <span className="pts-place">{place + 1}°</span>
                  <img
                    className="pts-cover"
                    src={team.cover.src}
                    alt=""
                    decoding="async"
                    style={team.cover.portrait ? { objectPosition: 'center 20%' } : undefined}
                  />
                  <div className="pts-info">
                    <h2 className="pts-name">{team.name}</h2>
                    <span className="pts-bar" aria-hidden="true">
                      <span style={{ width: `${(votes / max) * 100}%` }} />
                    </span>
                  </div>
                  <p className="pts-votes">
                    <span className="pts-count">{votes.toLocaleString('es-AR')}</span>
                    {votes === 1 ? 'voto' : 'votos'}
                  </p>
                </li>
              ))}
            </ol>

            <footer className="pts-foot">
              <p role="status">
                {status === 'error'
                  ? 'Sin conexión: mostrando los últimos puntos.'
                  : `Se actualiza solo · ${updatedAt?.toLocaleTimeString('es-AR') ?? ''}`}
              </p>
              <button type="button" onClick={handleLogout}>Olvidar clave</button>
            </footer>
          </>
        )}
      </main>
    </>
  )
}

export default EquiposPuntos
