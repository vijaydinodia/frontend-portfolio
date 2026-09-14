import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import TiltCard from '../components/TiltCard';
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiSequelize,
  SiPostman,
  SiVercel,
  SiJsonwebtokens,
  SiGit,
  SiLeetcode
} from 'react-icons/si';
import { Network, Brain, Users, Database, Layers } from 'lucide-react';

const categoryConfig = {
  'Frontend': { 
    color: 'border-primary/60', 
    textColor: 'text-primary', 
    badgeBg: 'bg-primary/10 text-primary border-primary/30',
    glow: 'from-primary/20 via-primary/5 to-transparent'
  },
  'Backend': { 
    color: 'border-secondary/60', 
    textColor: 'text-secondary', 
    badgeBg: 'bg-secondary/10 text-secondary border-secondary/30',
    glow: 'from-secondary/20 via-secondary/5 to-transparent'
  },
  'Database': { 
    color: 'border-emerald-500/60', 
    textColor: 'text-emerald-400', 
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    glow: 'from-emerald-500/20 via-emerald-500/5 to-transparent'
  },
  'Tools': { 
    color: 'border-accent/60', 
    textColor: 'text-accent', 
    badgeBg: 'bg-accent/10 text-accent border-accent/30',
    glow: 'from-accent/20 via-accent/5 to-transparent'
  },
  'Soft Skills': { 
    color: 'border-amber-500/60', 
    textColor: 'text-amber-400', 
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    glow: 'from-amber-500/20 via-amber-500/5 to-transparent'
  },
};

const renderSkillIcon = (skill) => {
  const name = (skill.name || '').toLowerCase().trim();

  if (name.includes('next')) return <SiNextdotjs className="text-white" size={24} />;
  if (name.includes('react')) return <SiReact className="text-[#61DAFB]" size={24} />;
  if (name.includes('javascript')) return <SiJavascript className="text-[#F7DF1E]" size={24} />;
  if (name.includes('tailwind')) return <SiTailwindcss className="text-[#38BDF8]" size={24} />;
  if (name.includes('html') || name.includes('css')) return <SiHtml5 className="text-[#E34F26]" size={24} />;
  if (name.includes('node')) return <SiNodedotjs className="text-[#5FA04E]" size={24} />;
  if (name.includes('express')) return <SiExpress className="text-white" size={24} />;
  if (name.includes('rest')) return <Network className="text-[#06B6D4]" size={24} />;
  if (name.includes('jwt') || name.includes('oauth')) return <SiJsonwebtokens className="text-[#D63AFF]" size={24} />;
  if (name.includes('mongodb')) return <SiMongodb className="text-[#47A248]" size={24} />;
  if (name.includes('mongoose')) return <Database className="text-[#E23237]" size={24} />;
  if (name.includes('sequelize')) return <SiSequelize className="text-[#52B0E7]" size={24} />;
  if (name.includes('mysql')) return <SiMysql className="text-[#4479A1]" size={24} />;
  if (name.includes('git')) return <SiGit className="text-[#F05032]" size={24} />;
  if (name.includes('postman')) return <SiPostman className="text-[#FF6C37]" size={24} />;
  if (name.includes('vercel') || name.includes('render')) return <SiVercel className="text-white" size={24} />;
  if (name.includes('structure') || name.includes('dsa') || name.includes('leetcode')) return <SiLeetcode className="text-[#FFA116]" size={24} />;
  if (name.includes('problem')) return <Brain className="text-[#A855F7]" size={24} />;
  if (name.includes('agile') || name.includes('team')) return <Users className="text-[#38BDF8]" size={24} />;

  if (skill.iconUrl) {
    return (
      <img
        src={skill.iconUrl}
        alt={skill.name}
        className="w-6 h-6 object-contain"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  }

  return <Layers className="text-textSecondary" size={24} />;
};

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get('/api/skills');
        const skillsData = res.data?.data || [];
        
        // Group skills by category
        const grouped = skillsData.reduce((acc, skill) => {
          const cat = skill.category || 'Other';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(skill);
          return acc;
        }, {});

        const formattedCategories = Object.keys(grouped).map(key => ({
          title: key,
          skills: grouped[key],
          config: categoryConfig[key] || {
            color: 'border-primary/40',
            textColor: 'text-primary',
            badgeBg: 'bg-primary/10 text-primary border-primary/20',
            glow: 'from-primary/20 via-primary/5 to-transparent'
          }
        }));

        setSkillCategories(formattedCategories);
      } catch (err) {
        console.error("Error fetching skills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) return null;

  return (
    <section id="skills" className="py-12 md:py-20 w-full relative bg-card/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-primary animate-gradient bg-300%">Skills</span>
            </h2>
            <p className="text-textMuted max-w-2xl mx-auto text-base sm:text-lg font-light">
              Core technologies, architectural frameworks, and DSA problem-solving capabilities powering full-stack applications.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 35 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <div
                    className={`glass p-6 sm:p-7 rounded-2xl border-t-4 ${category.config.color} h-full hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-white/20`}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${category.config.glow} rounded-bl-full pointer-events-none opacity-30 group-hover:opacity-70 transition-opacity duration-500`}></div>

                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <h3 className={`text-xl sm:text-2xl font-bold ${category.config.textColor} flex items-center gap-2.5`}>
                          <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
                          {category.title}
                        </h3>
                        <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${category.config.badgeBg}`}>
                          {category.skills.length} Tech
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {category.skills.map((skill, skillIdx) => (
                          <motion.div
                            key={skill._id || skill.name}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.08] transition-all duration-200 group/item shadow-sm cursor-default"
                          >
                            <div className="w-9 h-9 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform duration-200 shadow-inner">
                              {renderSkillIcon(skill)}
                            </div>
                            
                            <div className="min-w-0 flex-1">
                              <span className="text-white text-xs sm:text-sm font-semibold block truncate group-hover/item:text-accent transition-colors">
                                {skill.name}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
