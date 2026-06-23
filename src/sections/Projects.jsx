import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, X, Calendar, ShieldCheck, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import TiltCard from '../components/TiltCard';
import Magnetic from '../components/Magnetic';

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const PROJECTS_PER_PAGE = 6;
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

  const displayProjects = useMemo(() => {
    return projects.slice(currentPage * PROJECTS_PER_PAGE, (currentPage + 1) * PROJECTS_PER_PAGE);
  }, [projects, currentPage]);

  const hasMultiplePages = projects.length > PROJECTS_PER_PAGE;
  const canGoPrev = currentPage > 0;
  const canGoNext = (currentPage + 1) * PROJECTS_PER_PAGE < projects.length;

  const nextPage = () => {
    if (canGoNext) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (canGoPrev) setCurrentPage(prev => prev - 1);
  };

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

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

  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    }
  }, [projects, currentPage, totalPages]);

  if (loading) return null;

  return (
    <section id="projects" className="py-10 md:py-16 w-full relative bg-card/5">
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
          
          <div className={hasMultiplePages ? "relative px-0 md:px-12" : ""}>
            <div className="overflow-hidden min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {displayProjects.map((project) => {
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
                          className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full border border-white/10 relative cursor-pointer"
                          onClick={() => setSelectedProject(project)}
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
                            {project.thumbnail && (
                              <img 
                                src={project.thumbnail} 
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
                                <a 
                                  href={project.githubUrl} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="flex items-center text-sm font-semibold text-textMuted hover:text-white transition-colors py-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Github size={18} className="mr-2" /> Code
                                </a>
                              </Magnetic>
                            )}
                            {project.liveUrl && (
                              <Magnetic range={35}>
                                <a 
                                  href={project.liveUrl} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="flex items-center text-sm font-semibold text-accent hover:text-white transition-colors py-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
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
                </motion.div>
              </AnimatePresence>
            </div>

            {hasMultiplePages && (
              <>
                <button
                  onClick={prevPage}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full glass border border-white/20 hover:bg-primary/20 hover:border-primary/50 text-white transition-all duration-300 hidden md:flex items-center justify-center shadow-lg ${
                    canGoPrev ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-90'
                  }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextPage}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full glass border border-white/20 hover:bg-primary/20 hover:border-primary/50 text-white transition-all duration-300 hidden md:flex items-center justify-center shadow-lg ${
                    canGoNext ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-90'
                  }`}
                  aria-label="Next Page"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {hasMultiplePages && (
            <div className="flex justify-center items-center space-x-3 mt-10">
              {Array.from({ length: totalPages }).map((_, pageIdx) => (
                <button
                  key={pageIdx}
                  onClick={() => setCurrentPage(pageIdx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentPage === pageIdx
                      ? 'bg-primary w-8 shadow-[0_0_8px_rgba(37,99,235,0.6)]'
                      : 'bg-white/20 hover:bg-white/40 w-2.5'
                  }`}
                  aria-label={`Go to page ${pageIdx + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background/80 backdrop-blur-lg overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-3xl border border-white/10 shadow-2xl scrollbar-thin"
            >
              {/* Header Banner */}
              <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden border-b border-white/10 shrink-0 bg-background/50 flex items-center justify-center">
                {selectedProject.thumbnail && (
                  <>
                    {/* Blurred backdrop image to fill empty gaps */}
                    <img 
                      src={selectedProject.thumbnail} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover blur-xl opacity-20 pointer-events-none select-none"
                    />
                    {/* Sharp, fitted main image */}
                    <img 
                      src={selectedProject.thumbnail} 
                      alt={selectedProject.title} 
                      className="relative z-10 max-w-full max-h-full object-contain"
                    />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20"></div>
                
                <span className="absolute bottom-6 left-6 md:left-8 z-30 bg-primary/25 border border-primary/40 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider select-none backdrop-blur-md">
                  {selectedProject.category}
                </span>
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 md:right-8 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/10 transition-all duration-300 hover:rotate-90 shadow-lg"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column (Main info) */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-3xl font-extrabold text-textMain mb-2">{selectedProject.title}</h3>
                    {selectedProject.completionDate && (
                      <p className="text-xs text-textMuted flex items-center gap-1.5 font-light">
                        <Calendar size={14} className="text-accent" /> Completed on {new Date(selectedProject.completionDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <div 
                      className="text-textMuted font-light leading-relaxed text-sm md:text-base space-y-4"
                      dangerouslySetInnerHTML={{ __html: selectedProject.fullDescription }}
                    />
                  </div>
                  
                  {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                    <div className="border-t border-white/5 pt-6">
                      <h4 className="text-lg font-bold text-textMain mb-4 flex items-center gap-2">
                        <ShieldCheck size={18} className="text-accent" /> Key Features
                      </h4>
                      <ul className="space-y-3">
                        {selectedProject.keyFeatures.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start text-sm text-textMuted font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-3 shrink-0"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedProject.challengesFaced && (
                    <div className="border-t border-white/5 pt-6">
                      <h4 className="text-lg font-bold text-textMain mb-3 flex items-center gap-2">
                        <Cpu size={18} className="text-secondary" /> Engineering Challenges
                      </h4>
                      <p className="text-sm text-textMuted font-light leading-relaxed">
                        {selectedProject.challengesFaced}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Column (Sidebar details) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
                    <h4 className="text-base font-bold text-textMain uppercase tracking-wider border-b border-white/5 pb-2">Project Meta</h4>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-textMuted font-light">Status</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        selectedProject.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        selectedProject.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {selectedProject.status}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-textMuted font-light">Category</span>
                      <span className="text-textMain font-medium">{selectedProject.category}</span>
                    </div>

                    {selectedProject.metrics && (Object.values(selectedProject.metrics).some(v => v)) && (
                      <div className="border-t border-white/5 pt-4 mt-4 space-y-3">
                        <span className="text-xs font-semibold text-textMuted uppercase tracking-wider block">Key Performance Metrics</span>
                        {selectedProject.metrics.users && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-textMuted font-light">Active Users</span>
                            <span className="text-accent font-semibold">{selectedProject.metrics.users}</span>
                          </div>
                        )}
                        {selectedProject.metrics.performanceScore && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-textMuted font-light">Performance</span>
                            <span className="text-green-500 font-semibold">{selectedProject.metrics.performanceScore}</span>
                          </div>
                        )}
                        {selectedProject.metrics.apiCalls && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-textMuted font-light">API Requests</span>
                            <span className="text-secondary font-semibold">{selectedProject.metrics.apiCalls}</span>
                          </div>
                        )}
                        {selectedProject.metrics.other && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-textMuted font-light">Other</span>
                            <span className="text-textMain font-medium">{selectedProject.metrics.other}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
                    <h4 className="text-base font-bold text-textMain uppercase tracking-wider border-b border-white/5 pb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack?.map(tag => (
                        <span key={tag} className="text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-textSecondary hover:text-white transition-colors select-none">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {selectedProject.liveUrl && (
                      <a 
                        href={selectedProject.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center justify-center w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primaryHover hover:to-accentHover text-white font-bold transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_30px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 text-center gap-2"
                      >
                        <ExternalLink size={18} /> View Live Demo
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a 
                        href={selectedProject.githubUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center justify-center w-full px-6 py-4 rounded-xl border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-bold transition-all duration-300 hover:-translate-y-0.5 text-center gap-2"
                      >
                        <Github size={18} /> Source Code Repository
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
