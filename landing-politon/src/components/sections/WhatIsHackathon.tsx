import React, { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import TextType from '../ui/TextType'
import politoVolando from '../../assets/mascot/polito-volando.webp'

const BODY_TEXT =
  'Es una jornada intensiva donde equipos de 4 integrantes trabajarán durante 48hs para comprender un problema real, idear soluciones, validarlas y construir una propuesta concreta. Luego, se encargarán de ver cómo comunicar esa solución y realizar un video formato reel que refleje la solución que idearon. Está enfocada en la creatividad, resolución de problemas, trabajo interdisciplinario y comunicación de ideas.'

const WhatIsHackathon: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const politoRef = useRef<HTMLDivElement>(null)

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

      /* Polito: entra volando desde abajo a la izquierda → flota en el lugar.
         Cada movimiento va en su propia capa para que no se pisen:
         .what-polito-flight (entrada) > img (idle) */
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduced && politoRef.current) {
        const flight = politoRef.current.querySelector('.what-polito-flight')
        const img = politoRef.current.querySelector('img')

        gsap
          .timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } })
          .fromTo(
            flight,
            { x: -140, y: 180, rotate: -24, scale: 0.6, opacity: 0 },
            { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.2)' }
          )
          .to(img, {
            y: -14,
            rotate: 2.5,
            duration: 1.8,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="que-es" className="what-section">
      <div className="what-layout">
        <div className="what-container">
          <h2 ref={titleRef} className="what-title">
            ¿Qué es una Hackatón?
          </h2>
          <TextType
            as="p"
            text={BODY_TEXT}
            typingSpeed={25}
            loop={false}
            showCursor
            cursorCharacter="|"
            className="what-body"
            startOnVisible
          />
        </div>

        <div ref={politoRef} className="what-polito">
          <div className="what-polito-flight">
            <img
              src={politoVolando}
              alt="Polito, el zeppelin mascota del IPM, volando"
              width={900}
              height={688}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatIsHackathon
