import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import axios from 'axios';
import { FolderGit2, ExternalLink, Sparkles } from 'lucide-react';
import { SiLeetcode, SiGithub } from 'react-icons/si';
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
      badgeText: '400+ DSA Problems',
      source: stats.leetcode?.username ? `@${stats.leetcode.username}` : '@vijaydinodia',
      href: stats.leetcode?.profileUrl || 'https://leetcode.com/u/vijaydinodia/',
      icon: SiLeetcode,
      iconColor: 'text-[#FFA116]',
      glowColor: 'from-[#FFA116]/20 via-[#FFA116]/5 to-transparent',
      borderColor: 'border-[#FFA116]/30 hover:border-[#FFA116]/60',
      badgeBg: 'bg-[#FFA116]/10 text-[#FFA116] border-[#FFA116]/30',
      textColor: 'text-amber-400',
    },
    {
      key: 'github',
      label: 'GitHub Repositories',
      value: toNumber(stats.githubRepos),
      badgeText: '50+ Open Source Repos',
      source: stats.github?.username ? `@${stats.github.username}` : '@vijaydinodia',
      href: stats.github?.profileUrl || 'https://github.com/vijaydinodia',
      icon: SiGithub,
      iconColor: 'text-white',
      glowColor: 'from-blue-500/20 via-indigo-500/5 to-transparent',
      borderColor: 'border-blue-500/30 hover:border-blue-500/60',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      textColor: 'text-blue-400',
    },
    {
      key: 'projects',
      label: 'Featured Projects',
      value: toNumber(stats.projectsBuilt),
      badgeText: 'Full Stack & MERN MVPs',
      source: 'Production Ready',
      href: '#projects',
      icon: FolderGit2,
      iconColor: 'text-accent',
      glowColor: 'from-accent/20 via-primary/5 to-transparent',
      borderColor: 'border-accent/30 hover:border-accent/60',
      badgeBg: 'bg-accent/10 text-accent border-accent/30',
      textColor: 'text-accent',
    },
  ], [stats]);

  const renderValue = (value) => {
    if (value === null) {
      return loading ? (
        <span className="inline-block h-12 w-24 rounded-lg bg-white/10 animate-pulse align-middle" />
      ) : (
        <span className="text-textMuted">--</span>
      );
    }

    return inView ? <CountUp end={value} duration={2.2} suffix="+" /> : '0';
  };

  return (
    <section className="py-10 md:py-16 w-full relative border-y border-white/5 bg-card/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const content = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.1, type: 'spring', stiffness: 100 }}
                className={`glass h-full min-h-[210px] p-6 sm:p-7 rounded-2xl border ${card.borderColor} shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl`}
              >
                {/* Radial Glow on Top-Right */}
                <div className={`absolute -top-12 -right-12 w-36 h-36 bg-gradient-to-bl ${card.glowColor} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}></div>

                {/* Top Row: Icon + Badge / External Link */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="w-13 h-13 p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300 shadow-inner">
                    <Icon className={card.iconColor} size={28} />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-textMuted group-hover:text-white transition-colors">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${card.badgeBg}`}>
                      {card.source}
                    </span>
                    {card.href && <ExternalLink size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />}
                  </div>
                </div>

                {/* Middle: Big Metric Counter */}
                <div className="my-3 relative z-10">
                  <div className={`text-4xl sm:text-5xl font-black ${card.textColor} tracking-tight select-none flex items-center`}>
                    {renderValue(card.value)}
                  </div>
                </div>

                {/* Bottom: Label + Subtitle */}
                <div className="relative z-10 border-t border-white/5 pt-3 flex items-center justify-between">
                  <p className="text-white font-bold text-sm sm:text-base tracking-wide select-none">
                    {card.label}
                  </p>
                  <span className="text-[11px] text-textMuted font-medium">
                    {card.badgeText}
                  </span>
                </div>
              </motion.div>
            );

            return (
              <TiltCard key={card.key} className="h-full">
                {card.href ? (
                  <a href={card.href} target={card.href.startsWith('#') ? '_self' : '_blank'} rel="noreferrer" className="block h-full">
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
