import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return null;

  return (
    <section id="experience" className="py-12 w-full relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center">My <span className="text-accent">Experience</span></h2>
          
          <div className="relative border-l-2 border-white/20 ml-4 md:ml-0 md:pl-0">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="mb-8 relative md:pl-8 pl-8"
              >
                {/* Timeline dot */}
                <div className="absolute w-4 h-4 rounded-full bg-accent -left-[9px] md:-left-[9px] top-1.5 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                
                <div className="glass p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-textMain">{exp.role}</h3>
                    <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <h4 className="text-lg text-primary font-medium mb-4">{exp.company} <span className="text-sm text-textMuted font-normal ml-2">({exp.type})</span></h4>
                  <p className="text-textMuted leading-relaxed whitespace-pre-wrap">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
