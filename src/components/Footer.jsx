import React, { useState, useEffect } from 'react';
import { Github, Linkedin, ArrowUp } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import axios from 'axios';
import Magnetic from './Magnetic';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [profile, setProfile] = useState({
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
            github: res.data.data.github || prev.github,
            linkedin: res.data.data.linkedin || prev.linkedin,
            leetcode: res.data.data.leetcode || prev.leetcode,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-8 border-t border-white/10 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="text-textMuted text-xs sm:text-sm font-light">
            &copy; {currentYear} <span className="text-white font-medium">Vijay Dinodia</span>. Built with React & Tailwind.
          </p>
        </div>
        
        <div className="flex items-center space-x-5">
          {profile.github && (
            <Magnetic range={25}>
              <a 
                href={profile.github} 
                target="_blank" 
                rel="noreferrer" 
                title="GitHub (50+ Repos)" 
                className="text-textMuted hover:text-white transition-all duration-200 p-1.5 hover:scale-110 active:scale-95 block"
              >
                <Github size={18} />
              </a>
            </Magnetic>
          )}
          {profile.linkedin && (
            <Magnetic range={25}>
              <a 
                href={profile.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                title="LinkedIn" 
                className="text-textMuted hover:text-[#0A66C2] transition-all duration-200 p-1.5 hover:scale-110 active:scale-95 block"
              >
                <Linkedin size={18} />
              </a>
            </Magnetic>
          )}
          {profile.leetcode && (
            <Magnetic range={25}>
              <a 
                href={profile.leetcode} 
                target="_blank" 
                rel="noreferrer" 
                title="LeetCode (400+ Solved)" 
                className="text-textMuted hover:text-[#FFA116] transition-all duration-200 p-1.5 hover:scale-110 active:scale-95 block"
              >
                <SiLeetcode size={18} />
              </a>
            </Magnetic>
          )}

          <div className="h-4 w-[1px] bg-white/15"></div>

          <Magnetic range={25}>
            <button
              onClick={scrollToTop}
              title="Scroll to Top"
              aria-label="Scroll to Top"
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-accent/40 text-textMuted hover:text-accent transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <ArrowUp size={16} />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
