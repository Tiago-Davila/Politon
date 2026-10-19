import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useLenis } from './hooks/useLenis'
import { ScrollTrigger } from './lib/gsap'
import { LoaderProvider, useLoader } from './contexts/LoaderContext'

import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import WhatIsHackathon from './components/sections/WhatIsHackathon'
import Process from './components/sections/Process'
import PageLoader from './components/ui/PageLoader'

const RegistrationAccordion = React.lazy(() => import('./components/sections/RegistrationAccordion'))
const EventDaysSummary = React.lazy(() => import('./components/sections/EventDaysSummary'))
const Challenges = React.lazy(() => import('./components/sections/Challenges'))
const Talks = React.lazy(() => import('./components/sections/Talks'))
const Stream = React.lazy(() => import('./components/sections/Stream'))
const Register = React.lazy(() => import('./components/sections/Register'))
const FinalistsPage = React.lazy(() => import('./components/finalists/FinalistsPage'))

const LazySection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (shouldRender) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '250px 0px' }
    )

    if (ref.current) observer.observe(ref.current)
    /* El menú pide montar todo antes de saltar a una sección lejana */
    const mountAll = () => setShouldRender(true)
    window.addEventListener('lazy:mount-all', mountAll)
    return () => {
      observer.disconnect()
      window.removeEventListener('lazy:mount-all', mountAll)
    }
  }, [shouldRender])

  return (
    <div ref={ref} style={shouldRender ? undefined : { minHeight: 1 }}>
      {shouldRender ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  )
}

/* Las secciones lazy y las imágenes cambian el alto de la página después de que
   ScrollTrigger midió los pines: se recalcula cuando el body cambia de alto. */
const useScrollTriggerAutoRefresh = () => {
  useEffect(() => {
    let timer = 0
    let lastHeight = document.body.scrollHeight
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight
      if (h === lastHeight) return
      lastHeight = h
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        ScrollTrigger.refresh()
        lastHeight = document.body.scrollHeight
      }, 250)
    })
    ro.observe(document.body)
    return () => {
      ro.disconnect()
      window.clearTimeout(timer)
    }
  }, [])
}

const AppContent: React.FC = () => {
  useLenis()
  useScrollTriggerAutoRefresh()
  const { isLoading } = useLoader()

  return (
    <>
      <PageLoader isVisible={isLoading} />
      <Navbar />
      <main>
        <Hero />
        <WhatIsHackathon />
        <Process />
        <LazySection>
          <RegistrationAccordion />
        </LazySection>
        <LazySection>
          <EventDaysSummary />
        </LazySection>
        <LazySection>
          <Challenges />
        </LazySection>
        <LazySection>
          <Talks />
        </LazySection>
        <LazySection>
          <Stream />
        </LazySection>
        <LazySection>
          <Register />
        </LazySection>
      </main>
    </>
  )
}

const App: React.FC = () => {
  if (window.location.pathname.replace(/\/$/, '') === '/segunda-fase') {
    return <Suspense fallback={null}><FinalistsPage /></Suspense>
  }

  return (
    <LoaderProvider>
      <AppContent />
    </LoaderProvider>
  )
}

export default App
