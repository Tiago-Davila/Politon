import React, { useEffect, useRef } from 'react'
import { gsap } from './lib/gsap'
import { useLenis } from './hooks/useLenis'
import { LoaderProvider, useLoader } from './contexts/LoaderContext'

import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Countdown from './components/sections/Countdown'
import WhatIsHackathon from './components/sections/WhatIsHackathon'
import Challenges from './components/sections/Challenges'
import Talks from './components/sections/Talks'
import Register from './components/sections/Register'
import PageLoader from './components/ui/PageLoader'

/* Custom cursor — doble anillo tech */
const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Ocultar en touch
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) {
      dot.style.display = 'none'
      ring.style.display = 'none'
      return
    }

    const onMove = (e: MouseEvent) => {
      // Dot: sigue inmediato
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' })
      // Ring: con lag suave
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.22, ease: 'power2.out' })
    }

    const onEnter = () => {
      dot.classList.add('hovering')
      gsap.to(ring, { scale: 1.8, opacity: 0.4, duration: 0.2 })
    }
    const onLeave = () => {
      dot.classList.remove('hovering')
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor" aria-hidden="true" style={{ left: 0, top: 0 }} />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" style={{ left: 0, top: 0 }} />
    </>
  )
}

const AppContent: React.FC = () => {
  useLenis()
  const { isLoading } = useLoader()

  return (
    <>
      <PageLoader isVisible={isLoading} />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <WhatIsHackathon />
        <Challenges />
        <Talks />
        <Register />
      </main>
    </>
  )
}

const App: React.FC = () => {
  return (
    <LoaderProvider>
      <AppContent />
    </LoaderProvider>
  )
}

export default App
