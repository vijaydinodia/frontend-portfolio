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
    <section id="experience" className="py-10 md:py-16 w-full relative overflow-hidden">
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
            <div className="absolute left-[17px] md:left-[21px] top-2 bottom-2 w-[2px] bg-white/10 rounded-full" />
            
            {/* Scroll-driven glow progress line */}
            <motion.div 
              style={{ scaleY, transformOrigin: 'top' }}
              className="absolute left-[17px] md:left-[21px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary via-accent to-secondary shadow-[0_0_8px_rgba(6,182,212,0.8)] rounded-full"
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
                <div className="absolute w-4 h-4 rounded-full bg-background border-2 border-accent -left-[22px] md:-left-[26px] top-1.5 shadow-[0_0_8px_rgba(6,182,212,0.6)] z-10"></div>
                
                <TiltCard className="w-full">
                  <div className="glass p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-primary/40 hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-textMain group-hover:text-primary transition-colors">{exp.role}</h3>
                      <span className="text-xs font-semibold text-accent bg-accent/15 border border-accent/25 px-3.5 py-1 rounded-full w-fit whitespace-nowrap uppercase tracking-wider shadow-sm">
                        {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 mb-5">
                      <h4 className="text-lg text-primary font-bold">{exp.company}</h4>
                      {exp.type && (
                        <span className="text-xs text-textMuted bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md font-medium">
                          {exp.type}
                        </span>
                      )}
                      {exp.location && (
                        <span className="text-xs text-textMuted/90 flex items-center gap-1 sm:ml-auto">
                          📍 {exp.location}
                        </span>
                      )}
                    </div>

                    <div className="text-textMuted leading-relaxed font-light space-y-2.5 mb-6">
                      {(exp.description || '').split('\n').map((line, lineIdx) => {
                        const cleanLine = line.trim().replace(/^[•\-\*]\s*/, '');
                        if (!cleanLine) return null;
                        return (
                          <div key={lineIdx} className="flex items-start gap-2.5 text-sm sm:text-base">
                            <span className="text-accent mt-1.5 shrink-0 text-xs">◆</span>
                            <span className="leading-relaxed">{cleanLine}</span>
                          </div>
                        );
                      })}
                    </div>

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                        {exp.technologies.map((tech, techIdx) => (
                          <span key={techIdx} className="text-xs font-semibold px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-textSecondary hover:text-white hover:border-white/20 transition-all duration-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
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
