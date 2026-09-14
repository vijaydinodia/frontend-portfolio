import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Cursor from '../components/Cursor';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import Stats from '../sections/Stats';
import Contact from '../sections/Contact';
import Preloader from '../components/Preloader';
import Lenis from '@studio-freight/lenis';

const PortfolioPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-background min-h-screen text-textMain selection:bg-primary/30 relative">
      <Preloader onLoaded={() => setIsLoaded(true)} />
      <Cursor />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
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
      </motion.div>
    </div>
  );
};

export default PortfolioPage;
