import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 border-t border-white/10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-textMuted text-sm font-medium">
            &copy; {currentYear} Vijay Dinodia. All rights reserved.
          </p>
        </div>
        
        <div className="flex space-x-6">
          <a href="https://github.com/vijaydinodia" target="_blank" rel="noreferrer" className="text-textMuted hover:text-primary transition-colors">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/vijaydinodia" target="_blank" rel="noreferrer" className="text-textMuted hover:text-primary transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="https://leetcode.com/u/vijaydinodia/" target="_blank" rel="noreferrer" className="text-textMuted hover:text-primary transition-colors">
            <SiLeetcode size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
