/**
 * Register.tsx — POLITÓN 2026
 *
 * Sección final: transmisión en vivo + redes sociales + inscripción.
 * Layout de 3 columnas:
 *  - Izquierda: tarjeta de stream en vivo (YouTube + Twitch)
 *  - Centro:    foto del colegio + redes sociales
 *  - Derecha:   QR + CTA "¿Te animás?"
 */
import React from 'react'

import StreamPreviewVideo from '../../assets/stream-preview.mp4'

const IconInstagram: React.FC = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const IconYouTube: React.FC = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const IconTwitch: React.FC = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2.149 0L.537 4.119v16.836h5.731V24h3.224l3.045-3.045h4.657l6.269-6.269V0H2.149zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045H4.836V2.149h16.478v11.463zm-3.224-7.343v6.269h-2.149V6.269h2.149zm-5.731 0v6.269h-2.149V6.269h2.149z" />
  </svg>
)

const Register: React.FC = () => (
  <section id="registro" className="reg-section">
    {/* Grain de fondo */}
    <div className="reg-grain" aria-hidden="true" />

    {/* Línea animada comentada — firulete naranja sacado
    <ConnectionLine />
    */}

    {/* Título Principal */}
    <div className="reg-section-title-wrap">
      <h2 className="reg-section-title">Seguilo en vivo</h2>
    </div>

    {/* Ornamento de texto rotado */}
    <span className="reg-watermark" aria-hidden="true">#POLITÓN2026</span>

    <div className="reg-container">

      {/* ── COLUMNA IZQUIERDA: tarjeta de transmisión en vivo ── */}
      <div className="reg-col reg-col-left">
        <div className="reg-stream-card">

          {/* Badge EN VIVO */}
          <div className="reg-stream-live-badge" aria-label="Transmisión en vivo">
            <span className="reg-stream-live-dot" aria-hidden="true" />
            <span className="reg-stream-live-text">EN VIVO</span>
          </div>

          <p className="reg-stream-headline">
            Viví la hackatón<br />completa online
          </p>

          <p className="reg-stream-sub">
            La producción está a cargo<br />de los propios alumnos del IPM.
          </p>

          {/* Plataformas */}
          <div className="reg-stream-platforms">
            <a
              href="https://www.youtube.com/@politecnicomodelo"
              target="_blank"
              rel="noopener noreferrer"
              className="reg-stream-platform-btn reg-stream-platform-yt"
              aria-label="Ver stream en YouTube"
            >
              <IconYouTube />
              <span>YouTube</span>
            </a>
            <a
              href="https://www.twitch.tv/ipmtv_"
              target="_blank"
              rel="noopener noreferrer"
              className="reg-stream-platform-btn reg-stream-platform-tw"
              aria-label="Ver stream en Twitch"
            >
              <IconTwitch />
              <span>Twitch</span>
            </a>
          </div>

          <p className="reg-stream-dates">24 · 25 · 26 de Junio 2026</p>

        </div>
      </div>

      {/* ── COLUMNA CENTRAL: foto + redes ── */}
      <div className="reg-col reg-col-center">

        {/* Video preview del stream */}
        <div className="reg-school-photo-wrap">
          <video
            src={StreamPreviewVideo}
            className="reg-school-photo"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Preview del stream del Politón 2026"
          />
          <div className="reg-school-photo-overlay" />
          <span className="reg-school-badge">IPM</span>
        </div>

        {/* Separador ornamental */}
        <div className="reg-divider" aria-hidden="true">
          <span /><span className="reg-divider-star">✦</span><span />
        </div>

        {/* Texto + redes */}
        <div className="reg-social-block">
          <p className="reg-follow-label">Seguinos y no te perdés nada</p>

          <div className="reg-social-links-row">
            <a
              href="https://www.instagram.com/politecnicomodelo/"
              target="_blank"
              rel="noopener noreferrer"
              className="reg-social-btn-icon"
              aria-label="Instagram"
            >
              <IconInstagram />
            </a>
            <a
              href="https://www.youtube.com/@politecnicomodelo"
              target="_blank"
              rel="noopener noreferrer"
              className="reg-social-btn-icon"
              aria-label="YouTube"
            >
              <IconYouTube />
            </a>
            <a
              href="https://www.twitch.tv/ipmtv_"
              target="_blank"
              rel="noopener noreferrer"
              className="reg-social-btn-icon"
              aria-label="Twitch"
            >
              <IconTwitch />
            </a>
          </div>

          <p className="reg-hashtag">#POLITÓN2026</p>
        </div>
      </div>

      {/* ── COLUMNA DERECHA: qué vas a ver en el stream ── */}
      <div className="reg-col reg-col-right">
        <div className="reg-stream-card">

          {/* Badge CONTENIDO */}
          <div className="reg-stream-live-badge" aria-label="Contenido del stream">
            <span className="reg-stream-live-dot" aria-hidden="true" style={{ background: 'var(--polyton-gold)', boxShadow: '0 0 6px var(--polyton-gold)' }} />
            <span className="reg-stream-live-text">CONTENIDO</span>
          </div>

          <p className="reg-stream-headline">
            ¿Qué vas<br />a ver?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
            {[
              { icon: '📹', titulo: 'Cámara en vivo', desc: 'El evento en tiempo real' },
              { icon: '🎙️', titulo: 'Entrevistas', desc: 'Equipos, jurados y referentes' },
              { icon: '📱', titulo: 'Móviles', desc: 'Cobertura desde adentro' },
              { icon: '🎬', titulo: 'Secciones especiales', desc: 'Pitches, votaciones, juegos y más' },
            ].map(({ icon, titulo, desc }) => (
              <div
                key={titulo}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(237,224,188,0.15)',
                  borderRadius: '0.4rem',
                  padding: '0.5rem 0.7rem',
                }}
              >
                <span style={{ fontSize: '1.1rem', lineHeight: 1, flexShrink: 0 }}>{icon}</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-subtitle)', fontSize: '0.9rem', color: 'var(--polyton-cream)', margin: 0, lineHeight: 1.2 }}>
                    {titulo}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--polyton-sand)', margin: 0 }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="reg-stream-dates">24 · 25 · 26 de Junio 2026</p>

        </div>
      </div>

    </div>
  </section>
)

export default Register
