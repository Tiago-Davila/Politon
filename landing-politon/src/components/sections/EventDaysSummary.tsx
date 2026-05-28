import React from 'react'

const DAYS = [
  {
    day: 'Día 1',
    title: 'Comprender el problema',
    action: 'Idear soluciones',
    copy: 'Escuchamos, preguntamos y convertimos el desafío en oportunidades claras para atacar en equipo.',
  },
  {
    day: 'Día 2',
    title: 'Tangibilizar',
    action: 'Prototipar y pitchar',
    copy: 'La idea baja a algo visible: maqueta, demo, historia, evidencia y una presentación con pulso.',
  },
  {
    day: 'Día 3',
    title: 'Ajustes finales',
    action: 'Reels y presentación',
    copy: 'Pulimos detalles, contamos la solución con energía y salimos a defender lo construido.',
  },
]

const EventDaysSummary: React.FC = () => (
  <section id="dias-del-evento" className="days-summary-section" aria-labelledby="days-summary-title">
    <div className="days-summary-grain" aria-hidden="true" />
    <span className="days-summary-marquee" aria-hidden="true">24 · 25 · 26</span>

    <div className="days-summary-header">
      <h2 id="days-summary-title" className="days-summary-title">
        Tres días. Una idea que despega.
      </h2>
    </div>

    <div className="days-summary-grid" aria-label="Resumen de los tres días del Politón 2026">
      {DAYS.map((item, index) => (
        <article className="days-summary-card" key={item.day}>
          <span className="days-summary-index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <p className="days-summary-day">{item.day}</p>
          <h3>{item.title}</h3>
          <strong>{item.action}</strong>
          <p>{item.copy}</p>
        </article>
      ))}
    </div>
  </section>
)

export default EventDaysSummary
