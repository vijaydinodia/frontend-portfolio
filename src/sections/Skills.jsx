import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const categoryConfig = {
  'Frontend': { color: 'border-primary', textColor: 'text-primary' },
  'Backend': { color: 'border-secondary', textColor: 'text-secondary' },
  'Database': { color: 'border-accent', textColor: 'text-accent' },
  'Tools': { color: 'border-green-500', textColor: 'text-green-500' },
  'Soft Skills': { color: 'border-yellow-500', textColor: 'text-yellow-500' },
};

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get('/api/skills');
        const skillsData = res.data.data;
        
        // Group skills by category
        const grouped = skillsData.reduce((acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push(skill);
          return acc;
        }, {});

        const formattedCategories = Object.keys(grouped).map(key => ({
          title: key,
          skills: grouped[key],
          color: categoryConfig[key]?.color || 'border-gray-500',
          textColor: categoryConfig[key]?.textColor || 'text-gray-500'
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
    <section id="skills" className="py-12 w-full relative bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Technical <span className="text-secondary">Skills</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className={`glass p-8 rounded-2xl border-t-4 ${category.color} hover:-translate-y-2 transition-transform duration-300`}
              >
                <h3 className={`text-2xl font-bold mb-6 ${category.textColor}`}>{category.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill._id}
                      className="flex flex-col items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors min-w-[70px]"
                    >
                      {skill.iconUrl ? (
                        <img
                          src={skill.iconUrl}
                          alt={skill.name}
                          className="w-10 h-10 object-contain"
                          style={{ filter: 'invert(1)' }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 text-lg font-bold text-textSecondary">
                          {skill.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-textMain text-xs font-medium text-center leading-tight">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
