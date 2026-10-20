/**
 * TeamCover.tsx — portada de un equipo finalista.
 * Usa la portada del equipo (o la primera foto); si no hay ninguna,
 * un afiche ilustrado con el número del equipo y Polito.
 */
import React from 'react'
import polito from '../../assets/mascot/polito-volando.webp'
import type { Finalist } from '../../data/finalists'

interface TeamCoverProps {
  team: Finalist
  index: number
  size?: 'lg' | 'sm'
}

const TeamCover: React.FC<TeamCoverProps> = ({ team, index, size = 'lg' }) => {
  const media = team.cover?.src ?? team.photos[0]?.src ?? null

  return (
    <div className={`fin-cover fin-cover-${size} fin-tone-${index % 6}`} style={{ '--tilt': `${index % 2 ? 8 : -6}deg` } as React.CSSProperties}>
      {media ? (
        <img className="fin-cover-media" src={media} alt="" loading="lazy" decoding="async" />
      ) : (
        <div className="fin-cover-media fin-cover-art">
          <span className="fin-cover-rays" />
          <span className="fin-cover-num">{team.number}</span>
          <img className="fin-cover-polito" src={polito} alt="" loading="lazy" decoding="async" />
        </div>
      )}
      {size === 'lg' ? <span className="fin-cover-tag">{team.name}</span> : null}
    </div>
  )
}

export default TeamCover
