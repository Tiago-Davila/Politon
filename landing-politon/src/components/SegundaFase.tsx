/**
 * SegundaFase.tsx — POLITÓN 2026
 *
 * Página /segunda-fase: el índice de finalistas solo, con el footer de la home
 * y un botón fijo para volver al inicio.
 */
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useLenis } from '../hooks/useLenis'
import FinalistsSection from './finalists/FinalistsSection'
import Register from './sections/Register'
import './SegundaFase.css'

const SegundaFase: React.FC = () => {
  useLenis()

  return (
    <>
      <a className="segunda-fase-back" href="/">
        <ArrowLeft size={20} strokeWidth={2.5} aria-hidden="true" /> Volver al inicio
      </a>
      <main>
        <FinalistsSection pageTitle="Finalistas — Segunda fase | POLITÓN 2026" />
      </main>
      <Register />
    </>
  )
}

export default SegundaFase
