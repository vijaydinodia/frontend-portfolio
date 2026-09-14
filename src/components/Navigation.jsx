import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
      setIsMobileMenuOpen(false);
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
            ? 'glass rounded-full py-2.5 px-6 sm:px-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10'
            : 'bg-transparent py-5 px-4 sm:px-6 lg:px-8'
        }`}
      >
        <Magnetic>
          <a href="#home" className="flex items-center group" aria-label="Home">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-accent shadow-[0_0_15px_rgba(59,130,246,0.35)] transition-all duration-300 group-hover:scale-110">
              <img 
                src={profile.profileImageUrl || "/vijay_profile.png"} 
                alt={profile.name || "Vijay Dinodia"} 
                className="w-full h-full object-cover object-top" 
              />
            </div>
          </a>
        </Magnetic>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-1">
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

          <div className="h-4 w-[1px] bg-white/20"></div>

          <div className="flex items-center space-x-3 pl-1">
            {profile.github && (
              <Magnetic range={35}>
                <a href={profile.github} target="_blank" rel="noreferrer" title="GitHub (50+ Repos)" className="text-textMuted hover:text-white transition-colors p-1 block">
                  <Github size={18} />
                </a>
              </Magnetic>
            )}
            {profile.linkedin && (
              <Magnetic range={35}>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="text-textMuted hover:text-[#0A66C2] transition-colors p-1 block">
                  <Linkedin size={18} />
                </a>
              </Magnetic>
            )}
            {profile.leetcode && (
              <Magnetic range={35}>
                <a href={profile.leetcode} target="_blank" rel="noreferrer" title="LeetCode (400+ Solved)" className="text-textMuted hover:text-[#FFA116] transition-colors p-1 block">
                  <SiLeetcode size={18} />
                </a>
              </Magnetic>
            )}
          </div>
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-4 right-4 mt-2 glass-panel p-6 rounded-2xl border border-white/10 flex flex-col items-center space-y-4 shadow-2xl bg-card/95 backdrop-blur-xl"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-textMuted hover:text-accent transition-colors text-base font-medium py-2"
            >
              {link.name}
            </a>
          ))}
          <div className="w-[80%] h-[1px] bg-white/10 my-2"></div>
          <div className="flex space-x-6 pt-2">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" title="GitHub" className="text-textMuted hover:text-white transition-colors">
                <Github size={20} />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="text-textMuted hover:text-[#0A66C2] transition-colors">
                <Linkedin size={20} />
              </a>
            )}
            {profile.leetcode && (
              <a href={profile.leetcode} target="_blank" rel="noreferrer" title="LeetCode" className="text-textMuted hover:text-[#FFA116] transition-colors">
                <SiLeetcode size={20} />
              </a>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
