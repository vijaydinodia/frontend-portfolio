import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import TiltCard from '../components/TiltCard';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get('/api/experiences');
        setExperiences(res.data.data);
      } catch (err) {
        console.error("Error fetching experiences:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  // Track scrolling progress through the experience container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 65%"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 });

  if (loading) return null;

  return (
    <section id="experience" className="py-20 w-full relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary animate-gradient bg-300%">Experience</span>
          </h2>
          
          <div ref={containerRef} className="relative ml-4 md:ml-8 pl-8 md:pl-10">
            {/* Background static line */}
            <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-white/10 rounded-full" />
            
            {/* Scroll-driven glow progress line */}
            <motion.div 
              style={{ scaleY, transformOrigin: 'top' }}
              className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary via-accent to-secondary shadow-[0_0_8px_rgba(6,182,212,0.8)] rounded-full"
            />

            {experiences.map((exp, idx) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="mb-12 relative"
              >
                {/* Timeline status dot */}
                <div className="absolute w-4 h-4 rounded-full bg-background border-2 border-accent -left-[39px] md:-left-[41px] top-1.5 shadow-[0_0_8px_rgba(6,182,212,0.6)] z-10"></div>
                
                <TiltCard className="w-full">
                  <div className="glass p-6 rounded-xl border border-white/10 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                      <h3 className="text-2xl font-bold text-textMain">{exp.role}</h3>
                      <span className="text-xs font-semibold text-accent bg-accent/15 border border-accent/25 px-3 py-1 rounded-full w-fit whitespace-nowrap uppercase tracking-wider">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <h4 className="text-lg text-primary font-semibold mb-4">{exp.company} <span className="text-sm text-textMuted font-light ml-2">({exp.type})</span></h4>
                    <p className="text-textMuted leading-relaxed font-light whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
