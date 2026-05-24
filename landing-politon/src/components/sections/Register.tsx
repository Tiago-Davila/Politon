/**
 * Register.tsx — POLITÓN 2026
 *
 * Sección final: inscripción + redes sociales.
 * Layout de 3 columnas:
 *  - Izquierda: mockup de celular con video
 *  - Centro:    foto del colegio + redes sociales
 *  - Derecha:   QR + CTA "¿Te animás?"
 */
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import FotoColegioImg from '../../assets/foto-horizontal-redes.jpg'
import VideoSrc from '../../assets/video-simulacion-instagram.mp4'

gsap.registerPlugin(ScrollTrigger)

/* ── Línea Animada de Conexión ── */
const ConnectionLine: React.FC = () => {
  const redPathRef = useRef<SVGPathElement>(null)
  const shadowPathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const redPath = redPathRef.current
    const shadowPath = shadowPathRef.current
    if (!redPath || !shadowPath) return
    
    // Asumimos misma longitud para ambas (mismo d)
    const length = redPath.getTotalLength()

    gsap.set([redPath, shadowPath], {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    gsap.to([shadowPath, redPath], {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: 'power2.out', // Empieza rápido y frena suave
      scrollTrigger: {
        trigger: '#inscripcion',
        start: 'top 60%',
        toggleActions: 'play none none none', // Se dibuja sola y se queda ahí
      }
    })
  }, [])

  // El path que recorre las tres columnas por detrás
  // Entra en el video del celular (x:195, y:400) y termina en el QR (x:1085, y:380)
  const linePath = "M 195 400 C 195 700, 350 750, 450 550 S 500 150, 640 300 S 850 700, 1085 380"

  return (
    <div className="reg-connection-line" aria-hidden="true">
      <svg viewBox="0 0 1280 800" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Sombra de la linea */}
        <path
          ref={shadowPathRef}
          d={linePath}
          fill="none"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="6"
          strokeLinecap="round"
          transform="translate(4, 8)"
        />

        {/* Linea roja sólida */}
        <path
          ref={redPathRef}
          d={linePath}
          fill="none"
          stroke="var(--polyton-red)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

/* ── Íconos SVG inline ── */
const IconInstagram: React.FC = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const IconYouTube: React.FC = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const IconTwitch: React.FC = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2.149 0L.537 4.119v16.836h5.731V24h3.224l3.045-3.045h4.657l6.269-6.269V0H2.149zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045H4.836V2.149h16.478v11.463zm-3.224-7.343v6.269h-2.149V6.269h2.149zm-5.731 0v6.269h-2.149V6.269h2.149z"/>
  </svg>
)

/* ── QR Placeholder SVG ── */
const QRPlaceholder: React.FC = () => (
  <svg
    className="reg-qr-svg"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="QR de inscripción — próximamente"
  >
    <rect width="200" height="200" fill="#EDE0BC" rx="8"/>
    <rect x="20" y="20" width="60" height="60" rx="4" fill="none" stroke="#1E2D5C" strokeWidth="6"/>
    <rect x="34" y="34" width="32" height="32" rx="2" fill="#1E2D5C"/>
    <rect x="120" y="20" width="60" height="60" rx="4" fill="none" stroke="#1E2D5C" strokeWidth="6"/>
    <rect x="134" y="34" width="32" height="32" rx="2" fill="#1E2D5C"/>
    <rect x="20" y="120" width="60" height="60" rx="4" fill="none" stroke="#1E2D5C" strokeWidth="6"/>
    <rect x="34" y="134" width="32" height="32" rx="2" fill="#1E2D5C"/>
    {[
      [90,20],[100,20],[110,20],
      [90,30],[110,30],
      [90,40],[100,40],[110,40],
      [90,50],[110,50],
      [90,60],[100,60],[110,60],
      [90,70],[100,70],[110,70],
      [90,80],[110,80],
      [90,90],[100,90],[110,90],
      [20,90],[30,90],[40,90],[50,90],[60,90],
      [120,90],[130,90],[140,90],[150,90],[160,90],[170,90],
      [120,100],[140,100],[160,100],
      [120,110],[130,110],[140,110],[160,110],[170,110],
      [120,120],[140,120],[160,120],
      [120,130],[130,130],[150,130],[160,130],[170,130],
      [120,140],[140,140],[150,140],
      [120,150],[130,150],[140,150],[160,150],[170,150],
    ].map(([x, y], i) => (
      <rect key={i} x={x} y={y} width="8" height="8" rx="1" fill="#1E2D5C"/>
    ))}
    <text
      x="100" y="188"
      textAnchor="middle"
      fontFamily="monospace"
      fontSize="9"
      fill="#2C3A6B"
      letterSpacing="1"
    >
      PRÓXIMAMENTE
    </text>
  </svg>
)

const Register: React.FC = () => (
  <section id="inscripcion" className="reg-section">
    {/* Grain de fondo */}
    <div className="reg-grain" aria-hidden="true" />

    {/* Línea animada por detrás */}
    <ConnectionLine />
    
    {/* Título Principal */}
    <div className="reg-section-title-wrap">
      <h2 className="reg-section-title">Nuestras Redes</h2>
    </div>

    {/* Ornamento de texto rotado */}
    <span className="reg-watermark" aria-hidden="true">#POLITÓN2026</span>

    <div className="reg-container">

      {/* ── COLUMNA IZQUIERDA: celular con CSS ── */}
      <div className="reg-col reg-col-left">
        <div className="css-phone-mockup">
          <div className="css-phone-notch" />
          <div className="css-phone-button css-phone-button-left-1" />
          <div className="css-phone-button css-phone-button-left-2" />
          <div className="css-phone-button css-phone-button-right" />
          <video
            className="css-phone-video"
            src={VideoSrc}
            autoPlay
            muted
            loop
            playsInline
            aria-label="Video de Instagram del Politécnico Mercedes"
          />
        </div>
      </div>

      {/* ── COLUMNA CENTRAL: foto + redes ── */}
      <div className="reg-col reg-col-center">

        {/* Foto horizontal del colegio */}
        <div className="reg-school-photo-wrap">
          <img
            src={FotoColegioImg}
            alt="Alumnos del Instituto Politécnico Mercedes"
            className="reg-school-photo"
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
          <p className="reg-follow-label">Seguinos en nuestras redes</p>

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
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="reg-social-btn-icon"
              aria-label="YouTube"
            >
              <IconYouTube />
            </a>
            <a
              href="#"
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

      {/* ── COLUMNA DERECHA: QR + CTA ── */}
      <div className="reg-col reg-col-right">
        <div className="reg-qr-block">
          <p className="reg-qr-label">Escaneá para inscribirte</p>
          <div className="reg-qr-frame">
            <QRPlaceholder />
          </div>
        </div>

        <div className="reg-cta-block">
          <p className="reg-cta-question">¿Te<br />animás?</p>
          <a
            href="#"
            className="reg-cta-btn"
            aria-label="Inscribirse al Politón 2026"
          >
            Inscribite →
          </a>
        </div>
      </div>

    </div>
  </section>
)

export default Register
