/**
 * Register.tsx — POLITÓN 2026
 *
 * Footer: el hashtag gigante extruido en 3D (React Bits "DepthText") y, abajo a la
 * izquierda, los links a redes con efecto de texto que rueda al hacer hover.
 */
import React from 'react'
import DepthText from '../ui/DepthText'

const SOCIALS = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@politecnicomodelo',
    icon: (
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.1V8.9l5.8 3.1-5.8 3.1Z" />
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/stories/highlights/17898223374450633/',
    icon: (
      <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
    ),
  },
  {
    name: 'Twitch',
    href: 'https://www.twitch.tv/ipmtv_',
    icon: (
      <path d="M4.3 1 1.5 4.6v15.1h4.8V23h2.7l3.3-3.3h4.2L23 13.2V1H4.3Zm16.4 11.1-3.4 3.4h-4.8l-3 3v-3H5.4V3.2h15.3v8.9ZM17.6 6.4h-2.2v6.1h2.2V6.4Zm-5.8 0H9.6v6.1h2.2V6.4Z" />
    ),
  },
]

const Register: React.FC = () => (
  <footer id="registro" className="site-footer">
    <div className="site-footer-grain" aria-hidden="true" />

    <div className="site-footer-mark">
      <DepthText
        text="#POLITÓN2026"
        className="site-footer-depth"
        faceColor="var(--polyton-cream)"
        depthColor="var(--polyton-ink)"
        layers={18}
        depth={1.8}
        tilt={7}
        orbitSpeed={0.12}
        shadow={false}
        fontSize="clamp(3rem, 13.6vw, 15rem)"
        fontWeight={400}
      />
    </div>

    <div className="site-footer-bottom">
      <nav className="site-footer-social" aria-label="Redes sociales">
        <p className="site-footer-label">✦ Seguinos</p>
        <ul>
          {SOCIALS.map((s, i) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="site-footer-link">
                <span className="site-footer-index">{String(i + 1).padStart(2, '0')}</span>
                <svg className="site-footer-icon" viewBox="0 0 24 24" aria-hidden="true">
                  {s.icon}
                </svg>
                {/* Texto que rueda: la copia de abajo sube al hacer hover */}
                <span className="site-footer-roll">
                  <span>{s.name}</span>
                  <span aria-hidden="true">{s.name}</span>
                </span>
                <span className="site-footer-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className="site-footer-legal">© 2026 Politón · IPM</p>
    </div>
  </footer>
)

export default Register
