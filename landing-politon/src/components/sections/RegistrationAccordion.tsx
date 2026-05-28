import React, { useState } from 'react'
import premiosImg from '../../assets/registration/premios.png'
import ayudaImg from '../../assets/registration/inscripcion-ayuda.png'
import formularioImg from '../../assets/registration/formulario.png'
import { REGISTRATION_FORM_URL } from '../../lib/registration'

const REGISTRATION_ITEMS = [
  {
    title: 'Premios',
    kicker: 'Habrá grandes premios',
    text: 'Los equipos que lleven sus ideas más lejos van a tener reconocimiento y premios pensados para celebrar el trabajo real.',
    image: premiosImg,
  },
  {
    title: '¿Tenés problemas para inscribirte?',
    kicker: 'Equipos libres',
    text: 'Participan estudiantes de 4to, 5to y 6to. Pueden mezclarse entre años, Computación y Mecánica, como ustedes quieran.',
    image: ayudaImg,
  },
  {
    title: 'Formulario',
    kicker: 'Sumate al Politón',
    text: 'Inscribí tu equipo. Si quieren, también pueden apadrinar una dupla de ciclo básico para sumar nuevas miradas al desafío.',
    image: formularioImg,
  },
]

const RegistrationAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = REGISTRATION_ITEMS[activeIndex]

  return (
    <section id="inscripcion-info" className="signup-accordion-section">
      <div className="signup-accordion-bg" aria-hidden="true" />

      <div className="signup-accordion-inner">
        <div className="signup-accordion-copy">
          <p className="signup-accordion-eyebrow">Inscripción abierta</p>
          <h2 className="signup-accordion-title">Sumate a la primera fase</h2>
          <p className="signup-accordion-intro">
            Armá tu equipo, mezclá especialidades, invitá a otros años y vení a construir una solución en serio.
          </p>

          <div className="signup-accordion-list" role="tablist" aria-label="Información de inscripción">
            {REGISTRATION_ITEMS.map((item, index) => {
              const isActive = activeIndex === index

              return (
                <button
                  key={item.title}
                  className={`signup-accordion-item${isActive ? ' is-active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="signup-accordion-panel"
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <span className="signup-accordion-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="signup-accordion-heading">{item.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div id="signup-accordion-panel" className="signup-accordion-panel" role="tabpanel">
          <div className="signup-accordion-card">
            <p className="signup-accordion-kicker">{activeItem.kicker}</p>
            <p className="signup-accordion-text">{activeItem.text}</p>
            {activeIndex === 2 && (
              <a
                className="signup-accordion-cta"
                href={REGISTRATION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir formulario
              </a>
            )}
          </div>

          <div className="signup-accordion-visual" aria-hidden="true">
            {REGISTRATION_ITEMS.map((item, index) => (
              <img
                key={item.title}
                className={`signup-accordion-image${activeIndex === index ? ' is-active' : ''}`}
                src={item.image}
                alt=""
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegistrationAccordion
