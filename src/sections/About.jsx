import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import TiltCard from '../components/TiltCard';

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [profile, setProfile] = useState({
    aboutPara1: 'I am a passionate Full Stack Engineer specializing in the MERN stack. My focus is on building robust backend architectures and highly interactive, premium frontend experiences.',
    aboutPara2: "With experience as a MERN Stack Developer Intern, I've solved over 250+ LeetCode problems and actively participated in hackathons.",
    highlights: [
      { title: '250+ LeetCode Solved', desc: 'Strong foundation in Data Structures and Algorithms.' },
      { title: 'Hackathon Enthusiast', desc: 'Building MVPs rapidly under pressure.' },
    ],
  });

  useEffect(() => {
    axios.get('/api/profile')
      .then(res => setProfile(prev => ({ ...prev, ...res.data.data })))
      .catch(() => {});
  }, []);

  const currentHighlights = useMemo(() => {
    return [
      { title: '250+ LeetCode Solved', desc: 'Strong foundation in Data Structures and Algorithms.' },
      { title: 'Full Product Delivery', desc: 'Building secure MERN applications and deploying to cloud platforms.' },
      { title: 'Hackathon Enthusiast', desc: 'Rapidly shipping production-ready MVPs under pressure.' },
    ];
  }, []);

  return (
    <section id="about" className="py-10 md:py-16 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Me</span>
          </h2>
          
          <div className={`grid grid-cols-1 ${
            profile.profileImageUrl 
              ? 'md:grid-cols-2 lg:grid-cols-12' 
              : 'md:grid-cols-2'
          } gap-8 items-stretch`}>
            
            {profile.profileImageUrl && (
              <div className="hidden md:flex md:col-span-1 lg:col-span-4 justify-center items-center lg:items-stretch w-full">
                <TiltCard className="relative group w-full aspect-square lg:aspect-auto lg:h-full max-w-[320px] lg:max-w-full">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-gradient bg-300%"></div>
                  <div className="relative glass rounded-2xl p-3 h-full w-full flex items-center justify-center border border-white/10">
                    <img
                      src={profile.profileImageUrl}
                      alt={profile.name || "Vijay Dinodia"}
                      className="w-full h-full object-cover rounded-xl filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700 ease-in-out border border-white/5 shadow-inner"
                    />
                  </div>
                </TiltCard>
              </div>
            )}

            <div className={`${
              profile.profileImageUrl ? 'md:col-span-1 lg:col-span-5' : 'md:col-span-1'
            } relative group h-full`}>
              <TiltCard className="h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-15 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative glass rounded-2xl p-8 h-full flex flex-col justify-center border border-white/10">
                  <h3 className="text-2xl font-bold mb-4 text-secondary">My Journey</h3>
                  <p className="text-textMuted mb-4 leading-relaxed font-light">{profile.aboutPara1}</p>
                  <p className="text-textMuted leading-relaxed font-light">{profile.aboutPara2}</p>
                </div>
              </TiltCard>
            </div>

            <div className={`${
              profile.profileImageUrl ? 'md:col-span-2 lg:col-span-3' : 'md:col-span-1'
            } flex flex-col justify-center space-y-6 w-full`}>
              {currentHighlights.map((item, idx) => (
                <TiltCard key={idx} className="w-full">
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className="glass p-6 rounded-xl border-l-4 border-accent hover:border-primary transition-all duration-300 shadow-lg border border-white/10"
                  >
                    <h4 className="text-xl font-bold text-textMain">{item.title}</h4>
                    <p className="text-textMuted text-sm mt-2 font-light">{item.desc}</p>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
