import React, { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import TextType from '../ui/TextType'

const BODY_TEXT =
  'Una hackathon es un evento de 48 horas donde equipos de 4 estudiantes del ciclo superior — 4to, 5to y 6to año — de las orientaciones Computación y Mecánica trabajan juntos para entender un problema real, generar ideas y presentar una solución concreta mediante un pitch y un reel.'

const WhatIsHackathon: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="que-es" className="what-section">
      <div className="what-container">
        <h2 ref={titleRef} className="what-title">
          ¿Qué es una Hackathon?
        </h2>
        <TextType
          as="p"
          text={BODY_TEXT}
          typingSpeed={30}
          loop={false}
          showCursor
          cursorCharacter="|"
          className="what-body"
          startOnVisible
        />
      </div>
    </section>
  )
}

export default WhatIsHackathon
