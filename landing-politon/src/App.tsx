import React from 'react'
import { useLenis } from './hooks/useLenis'
import { LoaderProvider, useLoader } from './contexts/LoaderContext'

import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import WhatIsHackathon from './components/sections/WhatIsHackathon'
import Process from './components/sections/Process'
import RegistrationAccordion from './components/sections/RegistrationAccordion'
import Challenges from './components/sections/Challenges'
import Talks from './components/sections/Talks'
import Register from './components/sections/Register'
import PageLoader from './components/ui/PageLoader'

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
        <RegistrationAccordion />
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
