import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';
import axios from 'axios';
import TiltCard from '../components/TiltCard';
import Magnetic from '../components/Magnetic';

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects');
        setProjects(res.data.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return null;

  return (
    <section id="projects" className="py-20 w-full relative bg-card/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Projects</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => {
              // Recruiter Core CS check
              const keywords = ['api', 'backend', 'auth', 'database', 'sql', 'mongodb', 'server', 'jwt'];
              const isBackendCore = keywords.some(k => project.title.toLowerCase().includes(k) || project.shortDescription.toLowerCase().includes(k) || project.techStack?.some(t => t.toLowerCase().includes(k)));

              return (
                <TiltCard
                  key={project._id}
                  className="h-full"
                >
                  <div
                    data-cursor="view"
                    className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full border border-white/10 relative"
                  >
                    {/* Glowing dynamic badges shown concurrently */}
                    <div className="absolute top-4 right-4 z-20 flex flex-wrap gap-2">
                      {isBackendCore && (
                        <span className="bg-accent/20 border border-accent/40 text-accent text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase shadow-[0_0_8px_rgba(6,182,212,0.35)] select-none">
                          CS Core
                        </span>
                      )}
                      {project.liveUrl && (
                        <span className="bg-secondary/20 border border-secondary/40 text-secondary text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase shadow-[0_0_8px_rgba(139,92,246,0.35)] select-none">
                          Active Demo
                        </span>
                      )}
                    </div>

                    <div className="relative h-48 overflow-hidden shrink-0 border-b border-white/10">
                      <div className="absolute inset-0 bg-background/25 group-hover:bg-transparent transition-colors z-10"></div>
                      {project.imageUrl && (
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      )}
                    </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-textMain group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-textMuted text-sm mb-6 line-clamp-3 font-light leading-relaxed">
                      {project.shortDescription}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      {project.techStack?.map(tag => (
                        <span key={tag} className="text-xs font-semibold bg-white/5 border border-white/5 px-2 py-1 rounded text-textMuted select-none">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-6 border-t border-white/10 pt-4 mt-auto">
                      {project.githubUrl && (
                        <Magnetic range={35}>
                          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm font-semibold text-textMuted hover:text-white transition-colors py-1">
                            <Github size={18} className="mr-2" /> Code
                          </a>
                        </Magnetic>
                      )}
                      {project.liveUrl && (
                        <Magnetic range={35}>
                          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm font-semibold text-accent hover:text-white transition-colors py-1">
                            <ExternalLink size={18} className="mr-2" /> Live Demo
                          </a>
                        </Magnetic>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
