/**
 * Navbar.tsx — POLITÓN 2026
 * Usa el componente CardNav de React Bits adaptado.
 * Las secciones del sitio se mapean a 3 cards expandibles.
 */
import React from 'react'
import CardNav from './CardNav'
import logoImg from '../../assets/logo-completo-nav.webp'
import type { CardNavItem } from './CardNav'

const NAV_ITEMS: CardNavItem[] = [
  {
    label: 'La Hackatón',
    bgColor: '#1E2D5C',  /* polyton-night */
    textColor: '#EDE0BC', /* polyton-cream */
    links: [
      { label: '¿Qué es?', ariaLabel: '¿Qué es una hackatón?', href: '#que-es' },
    ],
  },
  {
    label: 'El evento',
    bgColor: '#2C3A6B',  /* polyton-blue */
    textColor: '#EDE0BC',
    links: [
      { label: 'Cómo se desarrolla', ariaLabel: 'Cómo se desarrolla la hackatón', href: '#como-se-desarrolla' },
      { label: 'Charlas', ariaLabel: 'Ver las charlas', href: '#charlas' },
      { label: 'Días del evento', ariaLabel: 'Resumen de los 3 días', href: '#dias-del-evento' },
    ],
  },
  {
    label: 'Participá',
    bgColor: '#C94C2E',  /* polyton-red */
    textColor: '#FDFAF2', /* polyton-paper */
    links: [
      { label: 'Información', ariaLabel: 'Información de inscripción', href: '#inscripcion-info' },
      { label: 'Nuestras redes', ariaLabel: 'Nuestras redes sociales', href: '#registro' },
      // { label: 'Inscribite →', ariaLabel: 'Ir al formulario de inscripción', href: REGISTRATION_FORM_URL }, // inscripciones cerradas
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
      rightContent={<span />}
      ease="power3.out"
    />
  )
}

export default Navbar
