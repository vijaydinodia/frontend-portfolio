import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import axios from 'axios';

const RotatingShapes = () => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 0]} />
        <meshStandardMaterial color="#06B6D4" wireframe opacity={0.5} transparent />
      </mesh>
      <mesh ref={meshRef} scale={1.5}>
        <torusKnotGeometry args={[2, 0.4, 128, 32]} />
        <meshStandardMaterial color="#2563EB" wireframe opacity={0.2} transparent />
      </mesh>
    </Float>
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

  const titleText = profile.name.split('');

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
              {titleText.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + (index * 0.05), duration: 0.8, type: "spring", damping: 15, stiffness: 100 }}
                  className={char === " " ? "w-4 md:w-6" : ""}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-3xl md:text-5xl font-bold mb-8"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary animate-gradient bg-300%">
                {profile.tagline}
              </span>
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
              <a href="#projects" className="px-8 py-4 rounded-full bg-primary hover:bg-primaryHover text-white font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] hover:-translate-y-1">
                Explore Projects
              </a>
              {profile.resumeUrl && (
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full border border-primary/50 bg-primary/10 text-white font-medium transition-all hover:bg-primary/20 hover:-translate-y-1">
                  Download Resume
                </a>
              )}
              <a href="#contact" className="px-8 py-4 rounded-full border border-white/10 hover:border-white/30 bg-white/5 backdrop-blur-md text-white font-medium transition-all hover:bg-white/10 hover:-translate-y-1">
                Get in Touch
              </a>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-[50vh] lg:h-[80vh] w-full relative order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-3xl filter"></div>
            <Canvas camera={{ position: [0, 0, 10] }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#06B6D4" />
              <pointLight position={[-10, -10, -10]} intensity={1} color="#2563EB" />
              <RotatingShapes />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
