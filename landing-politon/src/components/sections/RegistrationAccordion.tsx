import React, { useState } from 'react'
import premiosImg from '../../assets/registration/premios.webp'
import ayudaImg from '../../assets/registration/inscripcion-ayuda.webp'
import solucionesImg from '../../assets/registration/soluciones-accordion.webp'

const REGISTRATION_ITEMS = [
  {
    title: 'Premios',
    kicker: 'Habrá grandes premios',
    text: 'Los equipos que lleven sus ideas más lejos van a tener reconocimiento y premios.',
    image: premiosImg,
  },
  {
    title: 'Equipos',
    kicker: 'Equipos libres',
    text: 'Participan estudiantes de 4to, 5to y 6to. Pueden mezclarse entre años, Computación y Mecánica, como ustedes quieran.',
    image: ayudaImg,
  },
  {
    title: 'Soluciones',
    kicker: 'Múltiples actividades',
    text: 'En equipo deberán seguir las actividades propuestas para idear, iterar, validar y llevar a cabo una solución concreta al problema planteado.',
    image: solucionesImg,
  },
]

const RegistrationAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = REGISTRATION_ITEMS[activeIndex]

  return (
    <section id="inscripcion-info" className="signup-accordion-section">
      <div className="signup-accordion-bg" aria-hidden="true" />

      <div className="signup-accordion-inner">
        <div className="signup-accordion-copy" style={{ paddingTop: 'clamp(2rem, 5vw, 4rem)' }}>
          <h2 className="signup-accordion-title">Arrancará la primera fase</h2>
          <p className="signup-accordion-intro">
            Armá tu equipo, mezclá especialidades, invitá a otros años y vení a construir una solución propia.
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
            {/* inscripciones cerradas — link al formulario comentado
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
            */}
          </div>

          <div className="signup-accordion-visual" aria-hidden="true">
            <img
              key={activeItem.title}
              className="signup-accordion-image is-active"
              src={activeItem.image}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegistrationAccordion
