import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import axios from 'axios';
import { FolderGit2, Github } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import TiltCard from '../components/TiltCard';

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const Stats = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    leetcodeSolved: null,
    githubRepos: null,
    projectsBuilt: null,
    github: null,
    leetcode: null,
  });

  useEffect(() => {
    axios.get('/api/stats')
      .then((res) => {
        if (res.data?.data) {
          setStats((prev) => ({
            ...prev,
            ...res.data.data,
          }));
        }
      })
      .catch((err) => console.error('Error fetching stats:', err))
      .finally(() => setLoading(false));
  }, []);

  const cards = useMemo(() => [
    {
      key: 'leetcode',
      label: 'LeetCode Solved',
      value: toNumber(stats.leetcodeSolved),
      source: stats.leetcode?.username ? `@${stats.leetcode.username}` : 'Live from LeetCode',
      href: stats.leetcode?.profileUrl,
      icon: SiLeetcode,
      textColor: 'text-yellow-400',
      shadowClass: 'hover:shadow-yellow-500/5',
    },
    {
      key: 'github',
      label: 'GitHub Repos',
      value: toNumber(stats.githubRepos),
      source: stats.github?.username ? `@${stats.github.username}` : 'Live from GitHub',
      href: stats.github?.profileUrl,
      icon: Github,
      textColor: 'text-secondary',
      shadowClass: 'hover:shadow-secondary/5',
    },
    {
      key: 'projects',
      label: 'Projects Built',
      value: toNumber(stats.projectsBuilt),
      source: 'Portfolio CMS',
      icon: FolderGit2,
      textColor: 'text-accent',
      shadowClass: 'hover:shadow-accent/5',
    },
  ], [stats]);

  const renderValue = (value) => {
    if (value === null) {
      return loading ? (
        <span className="inline-block h-11 w-20 rounded-md bg-white/10 animate-pulse align-middle" />
      ) : (
        <span className="text-textMuted">--</span>
      );
    }

    return inView ? <CountUp end={value} duration={2.2} /> : '0';
  };

  return (
    <section className="py-8 md:py-12 w-full relative border-y border-white/5 bg-card/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const content = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.1, type: 'spring', stiffness: 100 }}
                className={`glass h-full min-h-[176px] p-6 rounded-2xl border border-white/10 shadow-lg ${card.shadowClass} transition-all duration-300 flex flex-col items-center justify-center`}
              >
                <Icon className={`${card.textColor} mb-4`} size={28} />
                <div className={`text-4xl md:text-5xl font-black ${card.textColor} mb-2 select-none min-h-[56px] flex items-center justify-center`}>
                  {renderValue(card.value)}
                </div>
                <p className="text-textMuted font-semibold text-sm md:text-base tracking-wide uppercase select-none">
                  {card.label}
                </p>
                <p className="text-textMuted/70 text-xs mt-2 truncate max-w-full">
                  {card.source}
                </p>
              </motion.div>
            );

            return (
              <TiltCard key={card.key} className="h-full">
                {card.href ? (
                  <a href={card.href} target="_blank" rel="noreferrer" className="block h-full">
                    {content}
                  </a>
                ) : content}
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
