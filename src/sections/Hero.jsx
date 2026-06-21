import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import axios from 'axios';
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
    "DSA & Problem Solver (250+ LeetCode)",
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
    resumeUrl: '',
  });

  useEffect(() => {
    axios.get('/api/profile')
      .then(res => setProfile(prev => ({ ...prev, ...res.data.data })))
      .catch(() => {});
  }, []);

  const titleWords = useMemo(() => {
    return profile.name.split(' ').map(word => word.split(''));
  }, [profile.name]);

  const ctas = useMemo(() => {
    const resumeBtn = profile.resumeUrl ? (
      <Magnetic key="resume">
        <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full border border-primary/50 bg-primary/10 text-white font-medium transition-all hover:bg-primary/20 hover:-translate-y-1 block">
          📄 Download Resume
        </a>
      </Magnetic>
    ) : (
      <Magnetic key="resume">
        <a href="#contact" className="px-8 py-4 rounded-full border border-primary/50 bg-primary/10 text-white font-medium transition-all hover:bg-primary/20 hover:-translate-y-1 block">
          📄 Request Resume
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
    <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden pt-20 pb-10">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]} gl={{ antialias: false }}>
          <Stars radius={100} depth={50} count={1000} factor={3} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          
          <div className="text-left flex flex-col justify-center order-2 lg:order-1 pt-10 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center space-x-4 mb-6"
            >
              <div className="h-[2px] w-12 bg-accent"></div>
              <p className="text-accent text-lg md:text-xl font-medium tracking-widest uppercase">
                {profile.subtitle}
              </p>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-4 flex flex-wrap overflow-hidden">
              {titleWords.map((wordChars, wordIdx) => (
                <span key={wordIdx} className="flex whitespace-nowrap mr-4 md:mr-6 last:mr-0">
                  {wordChars.map((char, charIdx) => {
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
              className="flex flex-wrap gap-4"
            >
              {ctas}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-[50vh] lg:h-[80vh] w-full relative order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-3xl filter pointer-events-none"></div>
            <Canvas camera={{ position: [0, 0, 7.5] }} dpr={[1, 1.5]}>
              <Interactive3DScene />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
