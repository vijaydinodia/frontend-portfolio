import React, { useEffect } from 'react'
import SplashCursor from '../components/SplashCursor'
import Cursor from '../components/Cursor'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Experience from '../sections/Experience'
import Projects from '../sections/Projects'
import Stats from '../sections/Stats'
import Contact from '../sections/Contact'
import Lenis from '@studio-freight/lenis'

const PortfolioPage = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    let rafId;
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="bg-background min-h-screen text-textMain selection:bg-primary/30">
      <SplashCursor />
      <Cursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default PortfolioPage
