import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import axios from 'axios';

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
    <section className="py-10 w-full relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`grid ${
          showMentored 
            ? 'grid-cols-2 md:grid-cols-4' 
            : 'grid-cols-1 sm:grid-cols-3'
        } gap-8 text-center`}>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
              {inView ? <CountUp end={stats.leetcodeSolved} duration={2.5} suffix="+" /> : '0'}
            </div>
            <p className="text-textMuted font-medium text-sm md:text-base">LeetCode Solved</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-4xl md:text-5xl font-extrabold text-secondary mb-2">
              {inView ? <CountUp end={stats.githubRepos} duration={2.5} suffix="+" /> : '0'}
            </div>
            <p className="text-textMuted font-medium text-sm md:text-base">GitHub Repos</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-4xl md:text-5xl font-extrabold text-accent mb-2">
              {inView ? <CountUp end={stats.projectsBuilt} duration={2.5} suffix="+" /> : '0'}
            </div>
            <p className="text-textMuted font-medium text-sm md:text-base">Projects Built</p>
          </motion.div>

          {showMentored && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-4xl md:text-5xl font-extrabold text-green-500 mb-2">
                {inView ? <CountUp end={stats.studentsMentored} duration={2.5} suffix="+" /> : '0'}
              </div>
              <p className="text-textMuted font-medium text-sm md:text-base">Students Mentored</p>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Stats;
