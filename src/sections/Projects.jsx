import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';
import axios from 'axios';

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

  if (loading) return null; // or a spinner

  return (
    <section id="projects" className="py-12 w-full relative bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Featured <span className="text-primary">Projects</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="glass rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10"></div>
                  {project.imageUrl && (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-textMain group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-textMuted text-sm mb-6 line-clamp-3">
                    {project.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.techStack?.map(tag => (
                      <span key={tag} className="text-xs font-medium bg-white/5 px-2 py-1 rounded text-textMuted">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 border-t border-white/10 pt-4 mt-auto">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-textMuted hover:text-white transition-colors">
                        <Github size={18} className="mr-2" /> Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-accent hover:text-white transition-colors">
                        <ExternalLink size={18} className="mr-2" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
