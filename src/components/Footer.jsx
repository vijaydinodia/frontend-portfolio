import React, { useState, useEffect } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import axios from 'axios';

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

  return (
    <footer className="w-full py-8 border-t border-white/10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-textMuted text-sm font-medium">
            &copy; {currentYear} Vijay Dinodia. All rights reserved.
          </p>
        </div>
        
        <div className="flex space-x-6">
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-textMuted hover:text-primary transition-colors">
              <Github size={20} />
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-textMuted hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
          )}
          {profile.leetcode && (
            <a href={profile.leetcode} target="_blank" rel="noreferrer" className="text-textMuted hover:text-primary transition-colors">
              <SiLeetcode size={20} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
