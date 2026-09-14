import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import TiltCard from '../components/TiltCard';
import { fadeUp, fadeLeft, fadeRight } from '../utils/animations';

const defaultAboutPara2 = "With experience as a MERN Stack Developer Intern at REGex Software Services, I focus on clean full-stack delivery, strong DSA fundamentals, and production-ready problem solving.";

const removeFixedLeetCodeCount = (text) => {
  if (!text) return text;
  return /\d+\+?\s+LeetCode/i.test(text) ? defaultAboutPara2 : text;
};

const normalizeHighlight = (item) => {
  if (!item?.title || !item?.desc) return null;

  if (/\d+\+?\s+LeetCode/i.test(item.title)) {
    return {
      title: 'LeetCode Practice',
      desc: item.desc,
    };
  }

  return item;
};

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [profile, setProfile] = useState({
    aboutPara1: 'I am a passionate Full Stack Engineer specializing in the MERN stack. My focus is on building robust backend architectures and highly interactive, premium frontend experiences.',
    aboutPara2: defaultAboutPara2,
    highlights: [
      { title: 'LeetCode Practice', desc: 'Solved 400+ problems with strong Data Structures and Algorithms foundation.' },
      { title: 'Full Product Delivery', desc: 'Building secure MERN applications and deploying to modern cloud platforms.' },
      { title: 'Hackathon Enthusiast', desc: 'Rapidly shipping production-ready MVPs under pressure.' },
    ],
  });

  useEffect(() => {
    axios.get('/api/profile')
      .then(res => setProfile(prev => ({ ...prev, ...res.data.data })))
      .catch(() => {});
  }, []);

  const fallbackHighlights = useMemo(() => {
    return [
      { title: 'LeetCode Practice', desc: 'Solved 400+ problems with strong Data Structures and Algorithms foundation.' },
      { title: 'Full Product Delivery', desc: 'Building secure MERN applications and deploying to modern cloud platforms.' },
      { title: 'Hackathon Enthusiast', desc: 'Rapidly shipping production-ready MVPs under pressure.' },
    ];
  }, []);

  const currentHighlights = useMemo(() => {
    const savedHighlights = Array.isArray(profile.highlights)
      ? profile.highlights.map(normalizeHighlight).filter(Boolean)
      : [];

    return savedHighlights.length ? savedHighlights : fallbackHighlights;
  }, [fallbackHighlights, profile.highlights]);

  const aboutPara2 = useMemo(() => removeFixedLeetCodeCount(profile.aboutPara2), [profile.aboutPara2]);

  return (
    <section id="about" className="py-12 md:py-20 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref}>
          {/* Section Header with FadeUp */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Me</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Column 1: Profile Photo Card (Slides in from Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="col-span-1 lg:col-span-4 h-full flex flex-col"
            >
              <TiltCard className="h-full flex flex-col" containerClassName="h-full w-full flex flex-col">
                <div className="relative group h-full w-full flex flex-col">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur opacity-25 group-hover:opacity-45 transition duration-500 animate-gradient bg-300%"></div>
                  <div className="relative glass rounded-2xl p-3.5 h-full w-full flex flex-col justify-center items-center border border-white/10 overflow-hidden shadow-2xl">
                    <img
                      src={profile.profileImageUrl || "/vijay_profile.png"}
                      alt={profile.name || "Vijay Dinodia"}
                      className="w-full h-full min-h-[380px] lg:min-h-[460px] max-h-[520px] object-cover object-top rounded-xl filter contrast-105 group-hover:scale-105 transition-all duration-700 ease-in-out border border-white/5 shadow-inner"
                    />
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Column 2: My Journey Narrative Card (Fades Up in Center) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="col-span-1 lg:col-span-4 h-full flex flex-col"
            >
              <TiltCard className="h-full flex flex-col" containerClassName="h-full w-full flex flex-col">
                <div className="relative group h-full w-full flex flex-col">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20 group-hover:opacity-35 transition duration-500"></div>
                  <div className="relative glass rounded-2xl p-7 sm:p-8 h-full w-full flex flex-col justify-between border border-white/10 shadow-2xl">
                    <div>
                      <div className="flex items-center gap-2.5 mb-5">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
                        <h3 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
                          My Journey
                        </h3>
                      </div>
                      <p className="text-textMuted mb-4 leading-relaxed font-light text-sm sm:text-base">
                        {profile.aboutPara1}
                      </p>
                      <p className="text-textMuted leading-relaxed font-light text-sm sm:text-base">
                        {aboutPara2}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 text-xs rounded-full bg-primary/15 text-primary border border-primary/30 font-medium">
                        ⚡ Full Stack Engineer
                      </span>
                      <span className="px-3 py-1.5 text-xs rounded-full bg-accent/15 text-accent border border-accent/30 font-medium">
                        🎯 400+ LeetCode
                      </span>
                      <span className="px-3 py-1.5 text-xs rounded-full bg-secondary/15 text-secondary border border-secondary/30 font-medium">
                        🚀 High-Performance APIs
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Column 3: 3 Highlight Cards (Slides in from Right, Staggered) */}
            <div className="col-span-1 lg:col-span-4 h-full flex flex-col justify-between gap-4">
              {currentHighlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.15, ease: [0.25, 0.1, 0.25, 1.0] }}
                  className="flex-1 h-full flex flex-col"
                >
                  <TiltCard className="flex-1 h-full flex flex-col" containerClassName="flex-1 h-full flex flex-col">
                    <div className="glass p-5 sm:p-6 rounded-2xl border-l-4 border-accent hover:border-primary transition-all duration-300 shadow-xl border border-white/10 h-full flex flex-col justify-center group hover:bg-white/[0.07]">
                      <h4 className="text-lg sm:text-xl font-bold text-textMain group-hover:text-accent transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-textMuted text-sm mt-2 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
