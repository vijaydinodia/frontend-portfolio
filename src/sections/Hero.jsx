import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { SiLeetcode, SiGithub } from 'react-icons/si';
import { ArrowRight, Download, FileText, Sparkles, Linkedin } from 'lucide-react';
import Magnetic from '../components/Magnetic';
import { fadeUp, scaleIn } from '../utils/animations';

const rolesList = [
  "MERN Stack Developer",
  "Full Stack Developer",
  "Backend Architect",
  "Software Developer",
  "DSA & Problem Solver"
];

const RoleRotator = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rolesList.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 sm:h-12 md:h-14 overflow-hidden relative inline-flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={rolesList[index]}
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -25, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary animate-gradient bg-300% font-extrabold tracking-tight"
        >
          {rolesList[index]}
        </motion.span>
      </AnimatePresence>
      <span className="ml-1.5 w-[3px] h-[28px] sm:h-[36px] md:h-[42px] inline-block bg-accent animate-pulse align-middle" />
    </div>
  );
};

const Hero = () => {
  const [profile, setProfile] = useState({
    name: 'Vijay Dinodia',
    tagline: 'I build Digital Experiences',
    subtitle: 'Welcome to my world',
    bio: 'A passionate MERN Stack Developer transforming complex problems into elegant, premium, and highly scalable solutions.',
    resumeUrl: '/vijay_cv.pdf',
    profileImageUrl: '/vijay_profile.png',
    github: 'https://github.com/vijaydinodia',
    linkedin: 'https://www.linkedin.com/in/vijaydinodia',
    leetcode: 'https://leetcode.com/u/vijaydinodia/',
  });

  useEffect(() => {
    axios.get('/api/profile')
      .then(res => {
        if (res.data?.data) {
          setProfile(prev => ({
            ...prev,
            ...res.data.data,
            resumeUrl: res.data.data.resumeUrl || '/vijay_cv.pdf',
            profileImageUrl: res.data.data.profileImageUrl || '/vijay_profile.png'
          }));
        }
      })
      .catch(() => {});
  }, []);

  const titleWords = useMemo(() => {
    return profile.name.split(' ').map(word => word.split(''));
  }, [profile.name]);

  const targetResumeUrl = profile.resumeUrl || '/vijay_cv.pdf';

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Subtle Developer Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Floating Slow Ambient Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 20, 0, -20, 0],
          y: [0, -25, 0, 25, 0]
        }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary/15 rounded-full blur-[140px] pointer-events-none -z-10" 
      />
      <motion.div 
        animate={{ 
          x: [0, -30, 0, 30, 0],
          y: [0, 25, 0, -25, 0]
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-accent/12 rounded-full blur-[120px] pointer-events-none -z-10" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.18, 0.1]
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/4 w-[350px] h-[350px] bg-secondary/15 rounded-full blur-[130px] pointer-events-none -z-10" 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Interactive Narrative */}
          <div className="flex flex-col items-start text-left order-1 lg:order-1">
            
            {/* Small Introduction Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-textMuted text-xs sm:text-sm font-medium mb-6 hover:border-accent/40 transition-colors shadow-sm"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 -ml-4.5"></span>
              <span>Available for Software Engineering Roles</span>
            </motion.div>

            {/* Main Greeting & Name Reveal (Staggered Characters) */}
            <div className="mb-2">
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl font-medium text-textMuted tracking-wide block mb-1"
              >
                Hi, I'm
              </motion.span>
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight flex flex-wrap gap-x-4">
                {titleWords.map((word, wordIdx) => (
                  <span key={wordIdx} className="inline-flex overflow-hidden py-1">
                    {word.map((char, charIdx) => {
                      const globalIdx = titleWords.slice(0, wordIdx).reduce((acc, w) => acc + w.length, 0) + charIdx;
                      return (
                        <motion.span
                          key={charIdx}
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + (globalIdx * 0.035), duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </span>
                ))}
              </h1>
            </div>
            
            {/* Dynamic Role Rotator */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-2xl sm:text-4xl md:text-5xl mb-6 flex items-center"
            >
              <RoleRotator />
            </motion.div>

            {/* Bio Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-textMuted text-base sm:text-lg md:text-xl max-w-xl mb-9 leading-relaxed font-light"
            >
              {profile.bio}
            </motion.p>

            {/* Interactive CTA Buttons with Micro-interactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-wrap gap-4 mb-8 items-center"
            >
              {/* Explore Projects Primary CTA */}
              <Magnetic range={35}>
                <motion.a 
                  href="#projects" 
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group px-7 py-3.5 rounded-full bg-primary hover:bg-primaryHover text-white text-sm sm:text-base font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] flex items-center gap-2"
                >
                  <span>Explore Projects</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                </motion.a>
              </Magnetic>

              {/* Download Resume Secondary CTA */}
              <Magnetic range={35}>
                <motion.a 
                  href={targetResumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  download={targetResumeUrl.endsWith('.pdf') ? "Vijay_Dinodia_Resume.pdf" : undefined}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group px-7 py-3.5 rounded-full border border-primary/50 bg-primary/10 hover:bg-primary/20 text-white text-sm sm:text-base font-semibold transition-all flex items-center gap-2 shadow-sm"
                >
                  <FileText size={16} className="text-accent group-hover:scale-110 transition-transform" />
                  <span>Download Resume</span>
                  <Download size={14} className="text-textMuted group-hover:translate-y-0.5 transition-transform" />
                </motion.a>
              </Magnetic>

              {/* Get in touch CTA */}
              <Magnetic range={30}>
                <motion.a 
                  href="#contact" 
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3.5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 backdrop-blur-md text-white text-sm sm:text-base font-medium transition-all hover:bg-white/10 block"
                >
                  Get in Touch
                </motion.a>
              </Magnetic>
            </motion.div>

            {/* Quick Developer Profile Badges (Staggered) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex flex-wrap items-center gap-2.5 pt-1"
            >
              <span className="text-xs text-textMuted/80 font-semibold uppercase tracking-wider mr-1 select-none">Profiles:</span>
              
              <a
                href={profile.github || "https://github.com/vijaydinodia"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 shadow-sm active:scale-95"
              >
                <SiGithub size={13} className="text-white" />
                <span>GitHub (50+ Repos)</span>
              </a>

              <a
                href={profile.leetcode || "https://leetcode.com/u/vijaydinodia/"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFA116]/10 border border-[#FFA116]/30 hover:border-[#FFA116]/60 hover:bg-[#FFA116]/20 text-xs font-semibold text-[#FFA116] transition-all duration-300 hover:-translate-y-0.5 shadow-sm active:scale-95"
              >
                <SiLeetcode size={13} className="text-[#FFA116]" />
                <span>LeetCode (400+ Solved)</span>
              </a>

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/20 text-xs font-semibold text-blue-400 transition-all duration-300 hover:-translate-y-0.5 shadow-sm active:scale-95"
                >
                  <Linkedin size={13} className="text-[#0A66C2]" />
                  <span>LinkedIn</span>
                </a>
              )}
            </motion.div>
          </div>

          {/* Right Column: Hero Profile Visual Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="w-full relative order-2 lg:order-2 flex items-center justify-center py-6 lg:py-0"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-accent/15 to-secondary/20 rounded-full blur-3xl filter pointer-events-none"></div>
            
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center">
              {/* Rotating Outer Glow Ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-full animate-spin [animation-duration:14s] opacity-50 blur-md"></div>
              
              {/* Ambient Ring Border */}
              <div className="absolute inset-[-4px] rounded-full border border-accent/30 animate-pulse [animation-duration:4s]"></div>

              {/* Glass Card for Avatar */}
              <div className="relative w-[90%] h-[90%] bg-card/60 backdrop-blur-2xl rounded-full border-2 border-white/20 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.3)] group transition-all duration-500 hover:border-accent/60 hover:shadow-[0_0_70px_rgba(6,182,212,0.5)]">
                {profile.profileImageUrl ? (
                  <img 
                    src={profile.profileImageUrl} 
                    alt={profile.name || "Vijay Dinodia"} 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                  />
                ) : (
                  <div className="text-center p-6 select-none">
                    <span className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                      VD
                    </span>
                  </div>
                )}
              </div>

              {/* Floating Tech Badges with micro-animations */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-3 left-2 sm:left-4 px-3.5 py-1.5 bg-card/90 backdrop-blur-xl rounded-2xl border border-white/15 shadow-xl flex items-center gap-2 cursor-default select-none hover:border-primary/50 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[11px] sm:text-xs font-black tracking-widest text-primary uppercase">React</span>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-3 right-2 sm:right-4 px-3.5 py-1.5 bg-card/90 backdrop-blur-xl rounded-2xl border border-white/15 shadow-xl flex items-center gap-2 cursor-default select-none hover:border-accent/50 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                <span className="text-[11px] sm:text-xs font-black tracking-widest text-accent uppercase">Node.js</span>
              </motion.div>

              <motion.div 
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-3 sm:-right-6 -translate-y-1/2 px-3.5 py-1.5 bg-card/90 backdrop-blur-xl rounded-2xl border border-white/15 shadow-xl flex items-center gap-2 cursor-default select-none hover:border-secondary/50 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-[11px] sm:text-xs font-black tracking-widest text-secondary uppercase">MERN</span>
              </motion.div>

              <motion.div 
                animate={{ x: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-1/2 -left-3 sm:-left-6 -translate-y-1/2 px-3.5 py-1.5 bg-card/90 backdrop-blur-xl rounded-2xl border border-white/15 shadow-xl flex items-center gap-2 cursor-default select-none hover:border-emerald-400/50 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[11px] sm:text-xs font-black tracking-widest text-emerald-400 uppercase">DSA / 400+</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
