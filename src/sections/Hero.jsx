import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import axios from 'axios';
import { SiLeetcode, SiGithub } from 'react-icons/si';
import { ExternalLink, Linkedin } from 'lucide-react';
import Magnetic from '../components/Magnetic';

const InteractiveParticles = () => {
  const pointsRef = useRef();

  const particlesPosition = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.2 + Math.random() * 1.6; // Spherical radius range
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    pointsRef.current.rotation.y += delta * 0.06;
    pointsRef.current.rotation.x += delta * 0.03;

    // Warp particle center positioning based on cursor coordinate inputs
    const targetX = state.pointer.x * 2.5;
    const targetY = state.pointer.y * 2.5;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.08;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#06B6D4"
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
};

const Interactive3DScene = () => {
  const meshRef1 = useRef();
  const meshRef2 = useRef();

  useFrame((state, delta) => {
    if (meshRef1.current) {
      meshRef1.current.rotation.x += delta * 0.12;
      meshRef1.current.rotation.y += delta * 0.18;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x -= delta * 0.08;
      meshRef2.current.rotation.y -= delta * 0.12;
    }
  });

  return (
    <Float speed={2.8} rotationIntensity={1.8} floatIntensity={2.8}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 3, 5]} intensity={1.5} color="#06B6D4" />
      <pointLight position={[-4, -4, 2]} intensity={1.2} color="#8B5CF6" />

      {/* Primary wireframe icosahedron */}
      <mesh ref={meshRef1}>
        <icosahedronGeometry args={[2.0, 1]} />
        <meshStandardMaterial color="#06B6D4" wireframe opacity={0.55} transparent />
      </mesh>

      {/* Orbiting wireframe torus */}
      <mesh ref={meshRef2}>
        <torusGeometry args={[3.0, 0.12, 16, 100]} />
        <meshStandardMaterial color="#8B5CF6" wireframe opacity={0.35} transparent />
      </mesh>

      <InteractiveParticles />
    </Float>
  );
};

const TypewriterEffect = ({ tagline }) => {
  const words = useMemo(() => [
    tagline || "I build Digital Experiences",
    "MERN Stack Developer",
    "Full Stack Engineer",
    "DSA & Problem Solver",
    "SaaS Product Developer"
  ], [tagline]);

  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIdx];
    const typingSpeed = isDeleting ? 25 : 65;

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
        if (currentText === activeWord) {
          timer = setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIdx((prev) => (prev + 1) % words.length);
          return;
        }
      }
      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx, words]);

  return (
    <span className="relative">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary animate-gradient bg-300%">
        {currentText}
      </span>
      <span className="ml-1.5 w-[3px] h-[34px] md:h-[45px] inline-block bg-accent animate-pulse align-middle"></span>
    </span>
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
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkBreakpoints = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkBreakpoints();
    window.addEventListener('resize', checkBreakpoints);
    return () => window.removeEventListener('resize', checkBreakpoints);
  }, []);

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

  const ctas = useMemo(() => {
    const targetResumeUrl = profile.resumeUrl || '/vijay_cv.pdf';
    const resumeBtn = (
      <Magnetic key="resume">
        <a 
          href={targetResumeUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          download={targetResumeUrl.endsWith('.pdf') ? "Vijay_Dinodia_Resume.pdf" : undefined}
          className="px-8 py-4 rounded-full border border-primary/50 bg-primary/10 text-white font-medium transition-all hover:bg-primary/20 hover:-translate-y-1 block"
        >
          📄 Download Resume
        </a>
      </Magnetic>
    );

    const projectsBtn = (
      <Magnetic key="projects">
        <a href="#projects" className="px-8 py-4 rounded-full bg-primary hover:bg-primaryHover text-white font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] hover:-translate-y-1 block">
          💼 Explore Projects
        </a>
      </Magnetic>
    );

    const contactBtn = (
      <Magnetic key="contact">
        <a href="#contact" className="px-8 py-4 rounded-full border border-white/10 hover:border-white/30 bg-white/5 backdrop-blur-md text-white font-medium transition-all hover:bg-white/10 hover:-translate-y-1 block">
          🤝 Get in Touch
        </a>
      </Magnetic>
    );

    return [projectsBtn, resumeBtn, contactBtn];
  }, [profile.resumeUrl]);

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse [animation-duration:6s]"></div>
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-accent/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col items-start text-left order-1 lg:order-1">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-textMuted text-xs sm:text-sm font-medium mb-6 hover:border-accent/40 transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 -ml-4.5"></span>
              <span>{profile.subtitle}</span>
            </motion.div>

            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4 flex flex-wrap gap-x-4">
              {titleWords.map((word, wordIdx) => (
                <span key={wordIdx} className="inline-flex overflow-hidden py-1">
                  {word.map((char, charIdx) => {
                    const globalIdx = titleWords.slice(0, wordIdx).reduce((acc, w) => acc + w.length, 0) + charIdx;
                    return (
                      <motion.span
                        key={charIdx}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + (globalIdx * 0.04), duration: 0.8, type: "spring", damping: 15, stiffness: 100 }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-3xl md:text-5xl font-bold mb-8 min-h-[48px] md:min-h-[60px] flex items-center"
            >
              <TypewriterEffect tagline={profile.tagline} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="text-textSecondary text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-wrap gap-4 mb-6"
            >
              {ctas}
            </motion.div>

            {/* Quick Developer Profiles */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <span className="text-xs text-textMuted font-medium uppercase tracking-wider mr-1">Connect:</span>
              <a
                href={profile.github || "https://github.com/vijaydinodia"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                <SiGithub size={14} className="text-white" />
                <span>GitHub (50+ Repos)</span>
              </a>
              <a
                href={profile.leetcode || "https://leetcode.com/u/vijaydinodia/"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFA116]/10 border border-[#FFA116]/30 hover:border-[#FFA116]/60 hover:bg-[#FFA116]/20 text-xs font-semibold text-[#FFA116] transition-all duration-300 hover:-translate-y-0.5"
              >
                <SiLeetcode size={14} className="text-[#FFA116]" />
                <span>LeetCode (400+ Solved)</span>
              </a>
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/20 text-xs font-semibold text-blue-400 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Linkedin size={14} className="text-[#0A66C2]" />
                  <span>LinkedIn</span>
                </a>
              )}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full relative order-2 lg:order-2 flex items-center justify-center py-6 lg:py-0"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-accent/15 to-secondary/20 rounded-full blur-3xl filter pointer-events-none"></div>
            
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center">
              {/* Rotating Outer Glow Ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-full animate-spin [animation-duration:12s] opacity-50 blur-md"></div>
              
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
                      {profile.name ? profile.name.split(' ').map(n => n[0]).join('') : 'VD'}
                    </span>
                  </div>
                )}
              </div>

              {/* Floating Tech Badges with micro-animations */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-3 left-2 sm:left-4 px-3.5 py-1.5 bg-card/90 backdrop-blur-xl rounded-2xl border border-white/15 shadow-xl flex items-center gap-2 cursor-default select-none hover:border-primary/50 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[11px] sm:text-xs font-black tracking-widest text-primary uppercase">React</span>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-3 right-2 sm:right-4 px-3.5 py-1.5 bg-card/90 backdrop-blur-xl rounded-2xl border border-white/15 shadow-xl flex items-center gap-2 cursor-default select-none hover:border-accent/50 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                <span className="text-[11px] sm:text-xs font-black tracking-widest text-accent uppercase">Node.js</span>
              </motion.div>

              <motion.div 
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-3 sm:-right-6 -translate-y-1/2 px-3.5 py-1.5 bg-card/90 backdrop-blur-xl rounded-2xl border border-white/15 shadow-xl flex items-center gap-2 cursor-default select-none hover:border-secondary/50 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-[11px] sm:text-xs font-black tracking-widest text-secondary uppercase">MERN</span>
              </motion.div>

              <motion.div 
                animate={{ x: [0, -6, 0] }}
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
