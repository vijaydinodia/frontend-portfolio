import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import axios from 'axios';
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
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredLink, setHoveredLink] = useState(null);
  const [profile, setProfile] = useState({
    name: 'Vijay Dinodia',
    profileImageUrl: '/vijay_profile.png',
    github: 'https://github.com/vijaydinodia',
    linkedin: 'https://www.linkedin.com/in/vijaydinodia',
    leetcode: 'https://leetcode.com/u/vijaydinodia/'
  });

  useEffect(() => {
    axios.get('/api/profile')
      .then(res => {
        if (res.data?.data) {
          setProfile(prev => ({
            ...prev,
            name: res.data.data.name || prev.name,
            profileImageUrl: res.data.data.profileImageUrl || prev.profileImageUrl,
            github: res.data.data.github || prev.github,
            linkedin: res.data.data.linkedin || prev.linkedin,
            leetcode: res.data.data.leetcode || prev.leetcode,
          }));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Track active section for indicator
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={`fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
        isScrolled ? 'top-3.5 px-4 sm:px-6 lg:px-8' : 'top-0 px-0'
      }`}
    >
      <div
        className={`w-full max-w-7xl flex justify-between items-center transition-all duration-500 ${
          isScrolled
            ? 'glass rounded-full py-2.5 px-6 sm:px-8 shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-white/15 bg-card/80 backdrop-blur-xl'
            : 'bg-transparent py-5 px-4 sm:px-6 lg:px-8'
        }`}
      >
        {/* Logo / Avatar with subtle scale on load */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <Magnetic range={30}>
            <a href="#home" className="flex items-center group" aria-label="Home">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-accent shadow-[0_0_15px_rgba(59,130,246,0.35)] transition-all duration-300 group-hover:scale-105">
                <img 
                  src={profile.profileImageUrl || "/vijay_profile.png"} 
                  alt={profile.name || "Vijay Dinodia"} 
                  className="w-full h-full object-cover object-top" 
                />
              </div>
            </a>
          </Magnetic>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-2">
          <div 
            className="flex items-center space-x-1 relative"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.href.replace('#', '');
              const isHovered = hoveredLink === link.name;

              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.05 }}
                  className="relative"
                >
                  <Magnetic range={25}>
                    <a
                      href={link.href}
                      onMouseEnter={() => setHoveredLink(link.name)}
                      className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-medium tracking-wide transition-colors duration-200 block ${
                        isActive ? 'text-white' : 'text-textMuted hover:text-white'
                      }`}
                    >
                      {link.name}

                      {/* Smooth animated underline / pill indicator */}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}

                      {/* Hover subtle glow pill */}
                      {isHovered && !isActive && (
                        <motion.span
                          layoutId="hoverNavPill"
                          className="absolute inset-0 bg-white/[0.06] rounded-full -z-10"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </a>
                  </Magnetic>
                </motion.div>
              );
            })}
          </div>

          <div className="h-4 w-[1px] bg-white/20 mx-1"></div>

          {/* Social Icons with Staggered Entrance */}
          <div className="flex items-center space-x-2 pl-1">
            {profile.github && (
              <Magnetic range={30}>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub (50+ Repos)"
                  className="text-textMuted hover:text-white transition-all duration-200 p-1.5 rounded-lg hover:bg-white/5 block hover:scale-110 active:scale-95"
                >
                  <Github size={17} />
                </a>
              </Magnetic>
            )}
            {profile.linkedin && (
              <Magnetic range={30}>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="text-textMuted hover:text-[#0A66C2] transition-all duration-200 p-1.5 rounded-lg hover:bg-white/5 block hover:scale-110 active:scale-95"
                >
                  <Linkedin size={17} />
                </a>
              </Magnetic>
            )}
            {profile.leetcode && (
              <Magnetic range={30}>
                <a
                  href={profile.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  title="LeetCode (400+ Solved)"
                  className="text-textMuted hover:text-[#FFA116] transition-all duration-200 p-1.5 rounded-lg hover:bg-white/5 block hover:scale-110 active:scale-95"
                >
                  <SiLeetcode size={17} />
                </a>
              </Magnetic>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            aria-label="Toggle Navigation Menu"
            className="text-textMain hover:text-accent transition-colors p-2 rounded-lg bg-white/5 border border-white/10 active:scale-95"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 p-6 rounded-2xl border border-white/15 shadow-2xl bg-card/95 backdrop-blur-2xl flex flex-col items-center space-y-3 z-50"
          >
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-textMuted hover:text-accent transition-colors text-base font-medium py-1.5 w-full text-center"
              >
                {link.name}
              </motion.a>
            ))}
            <div className="w-[80%] h-[1px] bg-white/10 my-2"></div>
            <div className="flex space-x-6 pt-1">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" title="GitHub" className="text-textMuted hover:text-white transition-colors p-2">
                  <Github size={20} />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="text-textMuted hover:text-[#0A66C2] transition-colors p-2">
                  <Linkedin size={20} />
                </a>
              )}
              {profile.leetcode && (
                <a href={profile.leetcode} target="_blank" rel="noreferrer" title="LeetCode" className="text-textMuted hover:text-[#FFA116] transition-colors p-2">
                  <SiLeetcode size={20} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
