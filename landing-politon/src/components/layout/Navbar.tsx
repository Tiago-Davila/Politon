/**
 * Navbar.tsx — POLITÓN 2026
 * Usa el componente CardNav de React Bits adaptado.
 * Las secciones del sitio se mapean a 3 cards expandibles.
 */
import React from 'react'
import CardNav from './CardNav'
import logoImg from '../../assets/logo-completo.png'
import type { CardNavItem } from './CardNav'

const NAV_ITEMS: CardNavItem[] = [
  {
    label: 'La Hackathon',
    bgColor: '#1E2D5C',  /* polyton-night */
    textColor: '#EDE0BC', /* polyton-cream */
    links: [
      { label: '¿Qué es?',   ariaLabel: '¿Qué es una hackathon?', href: '#que-es'  },
      { label: 'Desafíos',   ariaLabel: 'Ver los desafíos',        href: '#desafios' },
      { label: 'Equipos',    ariaLabel: 'Cómo se forman los equipos', href: '#que-es' },
    ],
  },
  {
    label: 'El Evento',
    bgColor: '#2C3A6B',  /* polyton-blue */
    textColor: '#EDE0BC',
    links: [
      { label: 'Cronograma', ariaLabel: 'Ver el cronograma', href: '#cronograma' },
      { label: 'Lugar',      ariaLabel: 'Dónde se hace',     href: '#lugar'      },
      { label: 'Charlas',    ariaLabel: 'Ver las charlas',   href: '#charlas'    },
    ],
  },
  {
    label: 'Participá',
    bgColor: '#C94C2E',  /* polyton-red */
    textColor: '#FDFAF2', /* polyton-paper */
    links: [
      { label: 'Premios',      ariaLabel: 'Ver los premios',           href: '#premios'  },
      { label: 'Inscribite →', ariaLabel: 'Ir al formulario de inscripción', href: '#registro' },
    ],
  },
]

const Navbar: React.FC = () => {
  return (
    <CardNav
      logo={logoImg}
      logoAlt="POLITÓN 2026"
      items={NAV_ITEMS}
      baseColor="#FDFAF2"
      menuColor="#1E2D5C"
      buttonBgColor="#C94C2E"
      buttonTextColor="#FDFAF2"
      buttonLabel="¡Inscribite!"
      buttonHref="#registro"
      ease="power3.out"
    />
  )
}

export default Navbar
