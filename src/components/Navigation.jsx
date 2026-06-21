import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Magnetic from './Magnetic';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
        isScrolled ? 'top-4 px-4 sm:px-6 lg:px-8' : 'top-0 px-0'
      }`}
    >
      <div
        className={`w-full max-w-7xl flex justify-between items-center transition-all duration-500 ${
          isScrolled
            ? 'glass rounded-full py-3 px-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10'
            : 'bg-transparent py-6 px-4 sm:px-6 lg:px-8'
        }`}
      >
        <Magnetic>
          <a href="#home" className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary animate-gradient bg-300% tracking-wide block">
            VD.
          </a>
        </Magnetic>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Magnetic key={link.name} range={45}>
              <a
                href={link.href}
                className="text-textMuted hover:text-accent transition-colors text-sm font-semibold tracking-wider px-3 py-1.5 block"
              >
                {link.name}
              </a>
            </Magnetic>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-textMain hover:text-accent transition-colors p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:hidden glass absolute top-full left-4 right-4 mt-2 py-6 rounded-2xl flex flex-col items-center space-y-4 border border-white/10 shadow-2xl"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-textMain font-medium hover:text-accent transition-colors text-lg"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
