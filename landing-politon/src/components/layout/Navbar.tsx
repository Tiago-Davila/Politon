/**
 * Navbar.tsx — POLITÓN 2026
 * Usa el componente CardNav de React Bits adaptado.
 * Las secciones del sitio se mapean a 3 cards expandibles.
 */
import React from 'react'
import CardNav from './CardNav'
import logoImg from '../../assets/logo-completo.png'
import type { CardNavItem } from './CardNav'
import { REGISTRATION_FORM_URL } from '../../lib/registration'

const NAV_ITEMS: CardNavItem[] = [
  {
    label: 'La Hackathon',
    bgColor: '#1E2D5C',  /* polyton-night */
    textColor: '#EDE0BC', /* polyton-cream */
    links: [
      { label: '¿Qué es?', ariaLabel: '¿Qué es una hackathon?', href: '#que-es' },
    ],
  },
  {
    label: 'El Evento',
    bgColor: '#2C3A6B',  /* polyton-blue */
    textColor: '#EDE0BC',
    links: [
      { label: 'Cómo se desarrolla', ariaLabel: 'Cómo se desarrolla la hackathon', href: '#como-se-desarrolla' },
      { label: 'Speakers',           ariaLabel: 'Ver los speakers',               href: '#charlas'           },
      { label: 'Días del evento',    ariaLabel: 'Resumen de los 3 días',         href: '#dias-del-evento'   },
    ],
  },
  {
    label: 'Participa',
    bgColor: '#C94C2E',  /* polyton-red */
    textColor: '#FDFAF2', /* polyton-paper */
    links: [
      { label: 'Información',     ariaLabel: 'Información de inscripción', href: '#inscripcion-info' },
      { label: 'Nuestras Redes',  ariaLabel: 'Nuestras redes sociales',    href: '#registro'        },
      { label: 'Inscribite →',    ariaLabel: 'Ir al formulario de inscripción', href: REGISTRATION_FORM_URL },
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
      buttonHref={REGISTRATION_FORM_URL}
      ease="power3.out"
    />
  )
}

export default Navbar
