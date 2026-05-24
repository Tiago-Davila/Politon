/**
 * SpeakerCard — POLITÓN 2026
 *
 * Card de speaker: foto full-bleed, iconos flotantes en el fondo,
 * nombre + problemática arriba. Efecto tilt al hover.
 */
import React from 'react'
import './SpeakerCard.css'

interface SpeakerCardProps {
  name: string
  topic: string
  photoUrl: string
  iconUrl: string
  /** Color de acento temático (HEX / CSS var) */
  accent: string
  /** Color del glow de fondo */
  glowColor: string
  /** Gradiente overlay de color */
  colorGradient: string
  /** Color de fondo base */
  bgColor: string
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  name,
  topic,
  photoUrl,
  iconUrl,
  accent,
  glowColor,
  colorGradient,
  bgColor,
}) => {
  const cssVars = {
    '--sc-glow': glowColor,
    '--sc-gradient': colorGradient,
    '--sc-accent': accent,
    '--sc-bg': bgColor,
  } as React.CSSProperties

  const iconFloats = Array.from({ length: 6 })

  return (
    <div className="sc-wrapper" style={cssVars}>
      <div className="sc-behind" />

      <div className="sc-shell">
        <div className="sc-bg" />
        <div className="sc-color-wash" />

        <div className="sc-icons-bg" aria-hidden="true">
          {iconFloats.map((_, i) => (
            <img
              key={i}
              src={iconUrl}
              alt=""
              className="sc-icon-float"
            />
          ))}
        </div>

        <img
          src={photoUrl}
          alt={`Foto de ${name}`}
          className="sc-photo"
          loading="lazy"
        />

        <div className="sc-top-gradient" />

        <div className="sc-text">
          <p className="sc-name">{name}</p>
          <p className="sc-topic">{topic}</p>
        </div>

        <div className="sc-shine" />
        <div className="sc-border" />
      </div>
    </div>
  )
}

export default SpeakerCard
