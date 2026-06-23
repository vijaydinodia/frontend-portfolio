import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import axios from 'axios';
import TiltCard from '../components/TiltCard';

const Stats = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [stats, setStats] = useState({
    leetcodeSolved: 250,
    githubRepos: 30,
    projectsBuilt: 10,
    studentsMentored: 50,
  });

  useEffect(() => {
    axios.get('/api/stats')
      .then(res => {
        if (res.data?.data) {
          setStats(prev => ({
            ...prev,
            ...res.data.data
          }));
        }
      })
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  const showMentored = stats.studentsMentored && stats.studentsMentored > 0;

  return (
    <section className="py-8 md:py-12 w-full relative border-y border-white/5 bg-card/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`grid ${
          showMentored 
            ? 'grid-cols-2 md:grid-cols-4' 
            : 'grid-cols-1 sm:grid-cols-3'
        } gap-8 text-center`}>
          
          <TiltCard>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
              className="glass p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-black text-primary mb-2 select-none">
                {inView ? <CountUp end={stats.leetcodeSolved} duration={2.5} suffix="+" /> : '0'}
              </div>
              <p className="text-textMuted font-semibold text-sm md:text-base tracking-wide uppercase select-none">LeetCode Solved</p>
            </motion.div>
          </TiltCard>

          <TiltCard>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
              className="glass p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-secondary/5 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-black text-secondary mb-2 select-none">
                {inView ? <CountUp end={stats.githubRepos} duration={2.5} suffix="+" /> : '0'}
              </div>
              <p className="text-textMuted font-semibold text-sm md:text-base tracking-wide uppercase select-none">GitHub Repos</p>
            </motion.div>
          </TiltCard>

          <TiltCard>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
              className="glass p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-black text-accent mb-2 select-none">
                {inView ? <CountUp end={stats.projectsBuilt} duration={2.5} suffix="+" /> : '0'}
              </div>
              <p className="text-textMuted font-semibold text-sm md:text-base tracking-wide uppercase select-none">Projects Built</p>
            </motion.div>
          </TiltCard>

          {showMentored && (
            <TiltCard>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
                className="glass p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-green-500/5 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-black text-green-500 mb-2 select-none">
                  {inView ? <CountUp end={stats.studentsMentored} duration={2.5} suffix="+" /> : '0'}
                </div>
                <p className="text-textMuted font-semibold text-sm md:text-base tracking-wide uppercase select-none">Students Mentored</p>
              </motion.div>
            </TiltCard>
          )}

        </div>
      </div>
    </section>
  );
};

export default Stats;
