import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, X, Calendar, ShieldCheck, Cpu, ChevronLeft, ChevronRight, Eye, Image as ImageIcon, Maximize2 } from 'lucide-react';
import axios from 'axios';
import TiltCard from '../components/TiltCard';
import Magnetic from '../components/Magnetic';

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activePreviewImage, setActivePreviewImage] = useState(null);
  const [viewingScreenshot, setViewingScreenshot] = useState(null);
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
      setActivePreviewImage(selectedProject.thumbnail);
    } else {
      document.body.style.overflow = 'unset';
      setActivePreviewImage(null);
      setViewingScreenshot(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!viewingScreenshot) return;
      if (e.key === 'Escape') {
        setViewingScreenshot(null);
      } else if (e.key === 'ArrowLeft' && selectedProject?.screenshots?.length > 1) {
        const prevIdx = (viewingScreenshot.index - 1 + selectedProject.screenshots.length) % selectedProject.screenshots.length;
        setViewingScreenshot({
          ...selectedProject.screenshots[prevIdx],
          index: prevIdx
        });
        setActivePreviewImage(selectedProject.screenshots[prevIdx].url);
      } else if (e.key === 'ArrowRight' && selectedProject?.screenshots?.length > 1) {
        const nextIdx = (viewingScreenshot.index + 1) % selectedProject.screenshots.length;
        setViewingScreenshot({
          ...selectedProject.screenshots[nextIdx],
          index: nextIdx
        });
        setActivePreviewImage(selectedProject.screenshots[nextIdx].url);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewingScreenshot, selectedProject]);

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
    <section id="projects" className="py-12 md:py-20 w-full relative bg-card/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3 flex items-center justify-center gap-3 flex-wrap">
              <span>
                Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Projects</span>
              </span>
              {projects.length > 0 && (
                <span className="text-xs md:text-sm font-bold px-3 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary tracking-widest uppercase">
                  {projects.length} Total
                </span>
              )}
            </h2>
            <p className="text-textMuted max-w-2xl mx-auto text-base sm:text-lg font-light">
              Explore {projects.length > 0 ? `${projects.length} ` : ''}production-ready web applications, microservices, and interactive developer platforms.
            </p>
          </motion.div>
          
          <div className={hasMultiplePages ? "relative px-0 md:px-12" : ""}>
            <div className="overflow-hidden min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
                >
                  {displayProjects.map((project, idx) => {
                    const keywords = ['api', 'backend', 'auth', 'database', 'sql', 'mongodb', 'server', 'jwt'];
                    const isBackendCore = keywords.some(k => 
                      (project.title?.toLowerCase() || '').includes(k) || 
                      (project.shortDescription?.toLowerCase() || '').includes(k) || 
                      project.techStack?.some(t => (t?.toLowerCase() || '').includes(k))
                    );

                    return (
                      <motion.div
                        key={project._id}
                        initial={{ opacity: 0, y: 35 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
                        transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="h-full"
                      >
                        <TiltCard className="h-full">
                          <div
                            data-cursor="view"
                            className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full border border-white/10 hover:border-primary/40 relative cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                          >
                            {/* Badges */}
                            <div className="absolute top-4 right-4 z-20 flex flex-wrap gap-2">
                              {project.screenshots && project.screenshots.length > 0 && (
                                <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase shadow-[0_0_8px_rgba(16,185,129,0.35)] select-none backdrop-blur-md">
                                  {project.screenshots.length} Screens
                                </span>
                              )}
                              {isBackendCore && (
                                <span className="bg-accent/20 border border-accent/40 text-accent text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase shadow-[0_0_8px_rgba(6,182,212,0.35)] select-none backdrop-blur-md">
                                  CS Core
                                </span>
                              )}
                              {project.liveUrl && (
                                <span className="bg-secondary/20 border border-secondary/40 text-secondary text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase shadow-[0_0_8px_rgba(139,92,246,0.35)] select-none backdrop-blur-md">
                                  Active Demo
                                </span>
                              )}
                            </div>

                            {/* Thumbnail */}
                            <div className="relative h-48 overflow-hidden shrink-0 border-b border-white/10">
                              <div className="absolute inset-0 bg-background/30 group-hover:bg-transparent transition-colors z-10"></div>
                              
                              {/* Hover Quick View Overlay Pill */}
                              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold border border-white/20 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                  <Eye size={14} className="text-accent" /> View Details
                                </span>
                              </div>

                              {project.thumbnail && (
                                <img 
                                  src={project.thumbnail} 
                                  alt={project.title} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                              )}
                            </div>
                          
                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                              <h3 className="text-xl sm:text-2xl font-bold mb-2.5 text-textMain group-hover:text-primary transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-textMuted text-sm mb-5 line-clamp-3 font-light leading-relaxed">
                                {project.shortDescription}
                              </p>
                              
                              <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                                {project.techStack?.slice(0, 5).map(tag => (
                                  <span key={tag} className="text-[11px] font-semibold bg-white/5 border border-white/5 px-2 py-0.5 rounded text-textMuted select-none">
                                    {tag}
                                  </span>
                                ))}
                                {project.techStack?.length > 5 && (
                                  <span className="text-[11px] font-semibold bg-white/5 border border-white/5 px-2 py-0.5 rounded text-accent select-none">
                                    +{project.techStack.length - 5}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center space-x-4 border-t border-white/10 pt-4 mt-auto">
                                {project.githubUrl && (
                                  <Magnetic range={30}>
                                    <a 
                                      href={project.githubUrl} 
                                      target="_blank" 
                                      rel="noreferrer" 
                                      className="flex items-center text-xs sm:text-sm font-semibold text-textMuted hover:text-white transition-colors py-1 hover:scale-105 active:scale-95"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Github size={16} className="mr-1.5" /> GitHub
                                    </a>
                                  </Magnetic>
                                )}
                                {project.liveUrl && (
                                  <Magnetic range={30}>
                                    <a 
                                      href={project.liveUrl} 
                                      target="_blank" 
                                      rel="noreferrer" 
                                      className="flex items-center text-xs sm:text-sm font-semibold text-accent hover:text-white transition-colors py-1 hover:scale-105 active:scale-95"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <ExternalLink size={16} className="mr-1.5" /> Live Demo
                                    </a>
                                  </Magnetic>
                                )}
                              </div>
                            </div>
                          </div>
                        </TiltCard>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {hasMultiplePages && (
              <>
                <button
                  onClick={prevPage}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full glass border border-white/20 hover:bg-primary/20 hover:border-primary/50 text-white transition-all duration-300 hidden md:flex items-center justify-center shadow-lg active:scale-95 ${
                    canGoPrev ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-90'
                  }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={nextPage}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full glass border border-white/20 hover:bg-primary/20 hover:border-primary/50 text-white transition-all duration-300 hidden md:flex items-center justify-center shadow-lg active:scale-95 ${
                    canGoNext ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-90'
                  }`}
                  aria-label="Next Page"
                >
                  <ChevronRight size={22} />
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
        </div>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background/85 backdrop-blur-xl overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.94 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-3xl border border-white/15 shadow-2xl scrollbar-thin bg-card/95"
            >
              {/* Header Banner */}
              <div 
                onClick={() => {
                  if (selectedProject.screenshots && selectedProject.screenshots.length > 0) {
                    const currentImg = activePreviewImage || selectedProject.thumbnail;
                    const foundIdx = selectedProject.screenshots.findIndex(s => s.url === currentImg);
                    const idx = foundIdx !== -1 ? foundIdx : 0;
                    setViewingScreenshot({
                      ...selectedProject.screenshots[idx],
                      index: idx
                    });
                  }
                }}
                className={`relative h-56 sm:h-72 md:h-96 w-full overflow-hidden border-b border-white/10 shrink-0 bg-background/50 flex items-center justify-center ${
                  selectedProject.screenshots?.length > 0 ? 'cursor-pointer group/banner' : ''
                }`}
              >
                {(activePreviewImage || selectedProject.thumbnail) && (
                  <>
                    <img 
                      src={activePreviewImage || selectedProject.thumbnail} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 pointer-events-none select-none transition-all duration-500"
                    />
                    <img 
                      key={activePreviewImage || selectedProject.thumbnail}
                      src={activePreviewImage || selectedProject.thumbnail} 
                      alt={selectedProject.title} 
                      className="relative z-10 max-w-full max-h-full object-contain p-2 rounded-lg transition-all duration-500 shadow-2xl"
                    />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-black/30 pointer-events-none z-20"></div>

                {/* Banner Click to Expand Overlay */}
                {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/banner:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/40">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-semibold border border-white/20 shadow-2xl transform translate-y-2 group-hover/banner:translate-y-0 transition-transform">
                      <Maximize2 size={14} className="text-accent" /> Click to View Fullscreen & Details
                    </span>
                  </div>
                )}
                
                <span className="absolute bottom-6 left-6 md:left-8 z-30 bg-primary/25 border border-primary/40 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider select-none backdrop-blur-md">
                  {selectedProject.category}
                </span>

                {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                  <span className="absolute bottom-6 right-6 md:right-8 z-30 bg-black/60 border border-white/10 text-white/90 text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
                    <ImageIcon size={13} className="text-accent" /> {selectedProject.screenshots.length} Screenshots Available
                  </span>
                )}
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(null);
                  }}
                  className="absolute top-6 right-6 md:right-8 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/10 transition-all duration-300 hover:rotate-90 shadow-lg active:scale-90"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content Area with Progressive Reveals */}
              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column (Main info) */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-textMain mb-2">{selectedProject.title}</h3>
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

                  {/* Screenshots & Previews Gallery */}
                  {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                    <div className="border-t border-white/10 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base sm:text-lg font-bold text-textMain flex items-center gap-2">
                          <ImageIcon size={18} className="text-accent" /> Platform Screenshots & Dashboards
                        </h4>
                        <span className="text-xs text-accent font-medium flex items-center gap-1">
                          <Maximize2 size={12} /> Click any screen to open modal
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {selectedProject.screenshots.map((shot, sIdx) => {
                          const isActive = (activePreviewImage || selectedProject.thumbnail) === shot.url;
                          return (
                            <div 
                              key={sIdx}
                              onClick={() => {
                                setActivePreviewImage(shot.url);
                                setViewingScreenshot({ ...shot, index: sIdx });
                              }}
                              className={`group cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 p-2.5 glass flex flex-col hover:scale-[1.02] active:scale-[0.98] ${
                                isActive 
                                  ? 'border-accent shadow-[0_0_15px_rgba(6,182,212,0.35)] bg-accent/10 ring-1 ring-accent' 
                                  : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                              }`}
                            >
                              <div className="relative h-28 sm:h-32 w-full overflow-hidden rounded-lg bg-black/40 border border-white/5 mb-2">
                                <img 
                                  src={shot.url} 
                                  alt={shot.title} 
                                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                  <span className="text-[11px] font-semibold text-white bg-black/85 px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-xl backdrop-blur-sm">
                                    <Maximize2 size={13} className="text-accent" /> View with Details
                                  </span>
                                </div>
                                {isActive && (
                                  <div className="absolute top-2 right-2 bg-accent text-black font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md z-10 flex items-center gap-1">
                                    <Eye size={10} /> Viewing
                                  </div>
                                )}
                              </div>
                              <p className="text-xs font-semibold text-textMain group-hover:text-accent transition-colors line-clamp-1">
                                {shot.title}
                              </p>
                              {shot.caption && (
                                <p className="text-[11px] text-textMuted font-light mt-0.5 line-clamp-2">
                                  {shot.caption}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                    <div className="border-t border-white/5 pt-6">
                      <h4 className="text-base sm:text-lg font-bold text-textMain mb-4 flex items-center gap-2">
                        <ShieldCheck size={18} className="text-accent" /> Key Features
                      </h4>
                      <ul className="space-y-2.5">
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
                      <h4 className="text-base sm:text-lg font-bold text-textMain mb-3 flex items-center gap-2">
                        <Cpu size={18} className="text-secondary" /> Engineering Highlights
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
                    <h4 className="text-sm font-bold text-textMain uppercase tracking-wider border-b border-white/5 pb-2">Project Meta</h4>
                    
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
                  </div>

                  <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
                    <h4 className="text-sm font-bold text-textMain uppercase tracking-wider border-b border-white/5 pb-2">Technologies Used</h4>
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
                      <motion.a 
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        href={selectedProject.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center justify-center w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primaryHover hover:to-accentHover text-white font-bold transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.35)] text-center gap-2 text-sm sm:text-base"
                      >
                        <ExternalLink size={18} /> Live Demo
                      </motion.a>
                    )}
                    {selectedProject.githubUrl && (
                      <motion.a 
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        href={selectedProject.githubUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center justify-center w-full px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-bold transition-all duration-300 text-center gap-2 text-sm sm:text-base"
                      >
                        <Github size={18} /> GitHub
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screenshot Lightbox Modal with Title & Description */}
      <AnimatePresence>
        {viewingScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingScreenshot(null)}
            data-lenis-prevent
            className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/90 backdrop-blur-2xl overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative w-full max-w-5xl max-h-[92vh] flex flex-col glass rounded-3xl border border-white/20 shadow-2xl overflow-hidden bg-card/95"
            >
              {/* Lightbox Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-background/70 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-accent/15 text-accent border border-accent/30 hidden sm:flex items-center justify-center">
                    <ImageIcon size={18} />
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
                      {viewingScreenshot.title}
                    </h3>
                    <p className="text-xs text-textMuted font-light">
                      {selectedProject?.title} • Screen {viewingScreenshot.index + 1} of {selectedProject?.screenshots?.length}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewingScreenshot(null)}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all border border-white/10 shadow-lg active:scale-95"
                    aria-label="Close Screenshot Modal"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Main Image Stage */}
              <div className="relative flex-1 min-h-[300px] sm:min-h-[420px] max-h-[60vh] flex items-center justify-center bg-black/70 p-3 sm:p-6 overflow-hidden select-none">
                <img 
                  key={viewingScreenshot.url}
                  src={viewingScreenshot.url} 
                  alt={viewingScreenshot.title} 
                  className="max-w-full max-h-[58vh] object-contain rounded-xl shadow-2xl border border-white/10"
                />

                {/* Left / Right Nav Arrows if multiple */}
                {selectedProject?.screenshots?.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const prevIdx = (viewingScreenshot.index - 1 + selectedProject.screenshots.length) % selectedProject.screenshots.length;
                        setViewingScreenshot({
                          ...selectedProject.screenshots[prevIdx],
                          index: prevIdx
                        });
                        setActivePreviewImage(selectedProject.screenshots[prevIdx].url);
                      }}
                      className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md"
                      aria-label="Previous Screenshot"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextIdx = (viewingScreenshot.index + 1) % selectedProject.screenshots.length;
                        setViewingScreenshot({
                          ...selectedProject.screenshots[nextIdx],
                          index: nextIdx
                        });
                        setActivePreviewImage(selectedProject.screenshots[nextIdx].url);
                      }}
                      className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md"
                      aria-label="Next Screenshot"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>

              {/* Footer with Title, Detailed Description & Quick Thumbnails */}
              <div className="px-6 py-4 border-t border-white/10 bg-background/90 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
                <div className="space-y-1.5 flex-1 pr-0 sm:pr-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-accent bg-accent/15 px-2.5 py-0.5 rounded-full border border-accent/30">
                      Feature Overview
                    </span>
                    <span className="text-sm font-bold text-white">
                      {viewingScreenshot.title}
                    </span>
                  </div>
                  <p className="text-sm text-textMuted font-light leading-relaxed">
                    {viewingScreenshot.caption || 'High-resolution application preview and architecture interface.'}
                  </p>
                </div>

                {/* Quick Thumbnail Strip */}
                {selectedProject?.screenshots?.length > 1 && (
                  <div className="flex items-center gap-2 shrink-0 overflow-x-auto max-w-full pb-1 sm:pb-0">
                    {selectedProject.screenshots.map((shot, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setViewingScreenshot({ ...shot, index: idx });
                          setActivePreviewImage(shot.url);
                        }}
                        className={`relative w-12 h-9 rounded-lg overflow-hidden border transition-all ${
                          viewingScreenshot.index === idx 
                            ? 'border-accent ring-2 ring-accent/60 scale-105' 
                            : 'border-white/20 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={shot.url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
