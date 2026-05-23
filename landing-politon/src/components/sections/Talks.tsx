import React, { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import ProfileCard from '../ui/ProfileCard'
import { splitText } from '../../lib/textSplit'
import PolitoImg from '../../assets/polito-angulos.png'
import LogoImg from '../../assets/logo-completo.png'

const SPEAKERS = [
  {
    id: 's1',
    name: 'Ana Dev',
    title: 'Futuro Laboral',
    handle: 'anadev',
    status: 'Confirmada',
    avatarUrl: PolitoImg,
    iconUrl: LogoImg, // Icono de fondo
    innerGradient: 'linear-gradient(145deg, rgba(201, 76, 46, 0.5) 0%, rgba(201, 76, 46, 0.1) 100%)', // polyton-red
    behindGlowColor: 'rgba(201, 76, 46, 0.6)', 
  },
  {
    id: 's2',
    name: 'Leo Token',
    title: 'Gamificación',
    handle: 'leotoken',
    status: 'Confirmado',
    avatarUrl: PolitoImg,
    iconUrl: LogoImg,
    innerGradient: 'linear-gradient(145deg, rgba(232, 160, 32, 0.5) 0%, rgba(232, 160, 32, 0.1) 100%)', // polyton-gold
    behindGlowColor: 'rgba(232, 160, 32, 0.6)',
  },
  {
    id: 's3',
    name: 'Dra. S. Mind',
    title: 'Vínculos',
    handle: 'smind_psico',
    status: 'Confirmada',
    avatarUrl: PolitoImg,
    iconUrl: LogoImg,
    innerGradient: 'linear-gradient(145deg, rgba(124, 107, 196, 0.5) 0%, rgba(124, 107, 196, 0.1) 100%)', // indigo
    behindGlowColor: 'rgba(124, 107, 196, 0.6)',
  }
]

const Talks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    // Animar título
    if (titleRef.current) {
      const { chars } = splitText(titleRef.current)
      gsap.fromTo(
        chars,
        { y: '100%', opacity: 0 },
        {
          y: '0%', opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' }
        }
      )
    }

    // Animar cards de speakers
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.talks-card-wrapper')
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.2)',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' }
        }
      )
    }
  }, [])

  return (
    <section ref={sectionRef} id="charlas" className="talks-section">
      <div className="talks-header">
        <p className="talks-eyebrow">
          <span style={{ color: 'var(--polyton-gold)' }}>✦</span>
          {' '}Inspiración{' '}
          <span style={{ color: 'var(--polyton-gold)' }}>✦</span>
        </p>
        <div style={{ overflow: 'hidden' }}>
          <h2 ref={titleRef} className="talks-title">Speakers</h2>
        </div>
        <p className="talks-subtitle">Conocé a los expertos que te van a guiar en cada problemática.</p>
      </div>

      <div className="talks-grid" ref={cardsRef}>
        {SPEAKERS.map(speaker => (
          <div key={speaker.id} className="talks-card-wrapper">
            <ProfileCard
              name={speaker.name}
              title={speaker.title}
              handle={speaker.handle}
              status={speaker.status}
              avatarUrl={speaker.avatarUrl}
              miniAvatarUrl={speaker.avatarUrl}
              iconUrl={speaker.iconUrl}
              innerGradient={speaker.innerGradient}
              behindGlowColor={speaker.behindGlowColor}
              behindGlowSize="50%"
              enableTilt={true}
              enableMobileTilt={true}
              contactText="Ver Perfil"
              onContactClick={() => alert(`Perfil de ${speaker.name} próximamente`)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Talks
