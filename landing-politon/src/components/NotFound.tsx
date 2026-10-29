/**
 * NotFound.tsx — POLITÓN 2026
 *
 * Página 404: Polito triste y un link de vuelta a la home.
 */
import React, { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import polito404 from '../assets/mascot/politon-404.webp'
import './NotFound.css'

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = 'Página no encontrada | POLITÓN 2026'
  }, [])

  return (
    <main className="not-found">
      <img className="not-found-img" src={polito404} alt="Polito triste, mirando para abajo" width={1200} height={996} />
      <div className="not-found-copy">
        <p className="not-found-code">404</p>
        <h1>Página no encontrada</h1>
        <a className="not-found-cta" href="/">
          <ArrowLeft size={20} strokeWidth={2.5} aria-hidden="true" /> Volver al inicio
        </a>
      </div>
    </main>
  )
}

export default NotFound
