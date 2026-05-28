import React, { useState, useEffect } from 'react'

const TARGET = new Date('2026-06-24T00:00:00-03:00').getTime()

export const useCountdown = () => {
  const calc = () => {
    const d = Math.max(0, TARGET - Date.now())
    return {
      days: Math.floor(d / 86400000),
      hours: Math.floor((d % 86400000) / 3600000),
      minutes: Math.floor((d % 3600000) / 60000),
      seconds: Math.floor((d % 60000) / 1000),
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

const Unit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="cd-unit">
    <span className="cd-number">{String(value).padStart(2, '0')}</span>
    <span className="cd-label">{label}</span>
  </div>
)

const Countdown: React.FC = () => {
  const time = useCountdown()

  return (
    <section id="countdown" className="countdown-section">
      <Unit value={time.days} label="DÍAS" />
      <span className="cd-sep">:</span>
      <Unit value={time.hours} label="HORAS" />
      <span className="cd-sep">:</span>
      <Unit value={time.minutes} label="MIN" />
      <span className="cd-sep">:</span>
      <Unit value={time.seconds} label="SEG" />
    </section>
  )
}

export default Countdown
