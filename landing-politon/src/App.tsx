import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useLenis } from './hooks/useLenis'
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
const Register = React.lazy(() => import('./components/sections/Register'))

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
    return () => observer.disconnect()
  }, [shouldRender])

  return (
    <div ref={ref} style={shouldRender ? undefined : { minHeight: 1 }}>
      {shouldRender ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  )
}

const AppContent: React.FC = () => {
  useLenis()
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
          <Register />
        </LazySection>
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
