import React from 'react'

const DAYS = [
  {
    day: 'Día 1',
    title: 'Comprender el problema',
    action: 'Idear soluciones',
    copy: 'Escuchamos, preguntamos y convertimos los desafíos en oportunidades claras para trabajar en equipo.',
  },
  {
    day: 'Día 2',
    title: 'Dar forma a la solución',
    action: 'Ordenar, mejorar y preparar el pitch',
    copy: 'La idea empieza a tomar forma: definimos cómo funciona, para quién es y cómo la vamos a contar.',
  },
  {
    day: 'Día 3',
    title: 'Ajustes finales',
    action: 'Reel y presentación',
    copy: 'Pulimos la propuesta, armamos el reel final y presentamos la solución al jurado.',
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
